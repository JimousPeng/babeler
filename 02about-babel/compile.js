/** 来自babel/core核心库的parse(生成ast树)和 transformFromAstSync(同步转换AST到js代码) */
const { parse, transformFromAstSync } = require('@babel/core')

/** travaerse: 遍历ast节点 */
const travaerse = require('@babel/traverse').default
const fs = require('fs')
const path = require('path')

class Webpack {
    constructor(options) {
        this.entry = options.entry
        this.output = options.output
        this.modulesList = []
        this.requireModule = [] /** 保存下依赖模块 */
    }

    /** 解析代码 */
    getParseCode(file, type = 1) {
        /**dependecies: 记录依赖项
         * key: url, 文件外部引用的相对路径
         * value: absoluteUrl, 项目下的绝对路径
         */
        const dependecies = {}
        const fileCode = type == 1 ? fs.readFileSync(file, 'utf-8') : file
        /** parse: babel.parse(code: string, options?: Object, callback: Function);  Returns an AST
         * options: 可以参考babel配置字段
         * Given some code, parse it using Babel's standard behavior.
         * Referenced presets and plugins will be loaded such that optional syntax plugins are automatically enabled.
         * In Babel 7's early betas, this method was synchronous and parseSync did not exist.
         * For backward-compatibility, this function will behave synchronously if no callback is given.
         * If you're starting with Babel 7 stable and need synchronous behavior,
         * please use parseSync since this backward-compatibility will be dropped in Babel 8.
         */
        const astCode = parse(fileCode, {
            sourceType: 'module',
            // 默认情况下，顶层的 return 语句会引发错误。将此设置true为接受此类代码
            parserOpts: { allowReturnOutsideFunction: true },
        })
        /** 遍历ast节点,解析模块依赖关系 */
        travaerse(astCode, {
            /**直接require的情况下, 要遍历ExpressionStatement, 下面是仅处理const/var/let a = require(*)声明式引入的情况 */
            VariableDeclaration({ node }) {
                node.declarations.forEach((nodeItem) => {
                    if (nodeItem.init && nodeItem.init.callee && nodeItem.init.callee.name === 'require') {
                        if (nodeItem.init.arguments && nodeItem.init.arguments[0] && nodeItem.init.arguments[0].value.indexOf('@babel') > -1) {
                            // 如果文件内部还有外部依赖文件
                            console.log(nodeItem.init.arguments[0].value, 'hahahahah')
                            const url = nodeItem.init.arguments[0].value
                            let code2 = require(url)
                            // console.log(code2, '打印下code
                            dependecies[url] = url
                            file = url
                            code = code2
                            // return {
                            //     file: url,
                            //     dependecies: {},
                            //     code: code2,
                            // };
                        }
                        /** require节点 */
                        let url = nodeItem.init.arguments[0].value
                        // 写入依赖项
                        dependecies[url] = '.' + path.sep + path.join(path.dirname(file), url)
                        nodeItem.init.arguments[0].value = dependecies[url]
                    }
                })
            },
        })
        /**babel.transformFromAstAsync(ast: Object, code?: string, options?: Object)
         * Given an AST, transform it
         * ast: ast语法树
         * code: code, 用 null 即可
         * options: babel配置项
         */
        const { code } = transformFromAstSync(astCode, null, {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            ie: 10,
                        },
                    },
                ],
            ],
            plugins: [
                [
                    '@babel/plugin-transform-runtime',
                    {
                        corejs: 3,
                    },
                ],
            ],
        })

        return {
            file,
            dependecies,
            code,
        }
    }

    /** webpack编译函数 */
    compile() {
        const moduleInfo = this.getParseCode(this.entry)
        this.modulesList.push(moduleInfo)
        this.modulesList.forEach(({ dependecies, code }) => {
            for (const item in dependecies) {
                // 对dependecies的每一项进行遍历,生成对应模块代码
                this.modulesList.push(this.getParseCode(dependecies[item]))
            }
            /** 找出代码里面的require依赖 */
            let list = code.match(/require\("\S*"/g);
            let resourceList =
                list.length &&
                list.reduce((total, el) => {
                    let newEl = el.split('require(')[1].replace(/"/g, '')
                    let putFlag = true
                    for (const item in dependecies) {
                        if (dependecies[item] == newEl.replace(/\\\\/g, '\\')) {
                            // 如果发现当前遍历的依赖模块是已经记录到dependeices的，则忽略
                            putFlag = false
                        }
                    }
                    return putFlag ? [...total, newEl] : [...total]
                }, [])

            // console.log(resourceList, '111')

            resourceList.forEach(el => {
                // let code = require(el);
                let elPath = el + '.js';
                // resourceCode: 获取依赖模块资源
                const resourceCode = fs.readFileSync(path.resolve('./node_modules', elPath), 'utf-8');
                this.modulesList.push({
                    file: el,
                    dependecies: {},
                    code: resourceCode
                });
            })
        })

        // 生成依赖关系图
        const dependencyGraph = this.modulesList.reduce(
            (graph, item) => ({
                ...graph,
                [item.file]: {
                    dependecies: item.dependecies,
                    code: item.code,
                },
            }),
            {}
        )
        // console.log(dependencyGraph, '00000')
        this.generateCode(dependencyGraph)
    }

    /** 生成运行函数 */
    generateCode(graph) {
        const graphCode = JSON.stringify(graph)

        const bundle = `(function(graphCode) {
            var module = {
                exports: {}
            }
            function require(moduleID) {


                (function(require, exports, module){

                    console.log(moduleID);
                    eval(graphCode[moduleID].code);
                    
                })(require, module.exports, module)
                
                console.log(module, '打印看看module');
                return module.exports;
            }
            require('${this.entry}')
        })(${graphCode})`

        if (!fs.existsSync(this.output.path)) {
            fs.mkdirSync(this.output.path)
        }
        fs.writeFileSync(path.join(this.output.path, this.output.filename), bundle, 'utf-8');
        console.log('compile--complete');
    }
}

/** 执行webpack编译 */
new Webpack({
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: './lib',
    },
}).compile()
