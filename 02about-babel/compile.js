/** 来自babel/core核心库的parse(生成ast树)和 transformFromAstSync(同步转换AST到js代码) */
const { parse, transformFromAstSync } = require('@babel/core');

/** travaerse: 遍历ast节点 */
const travaerse = require('@babel/traverse').default;
const fs = require('fs');
const path = require('path');

class Webpack {
    constructor(options) {
        this.entry = options.entry;
        this.output = options.output;
        this.modules = [];
        this.requireModule = []; /** 保存下依赖模块 */
    }

    /** 解析代码 */
    buildCode(file, type = 1) {
        const dependecies = {};
        const fileCode = type == 1 ? fs.readFileSync(file, 'utf-8') : file;
        const astCode = parse(fileCode, {
            sourceType: 'module',
        });
        /** 遍历ast节点,解析模块依赖关系 */
        travaerse(astCode, {
            /**直接require的情况下, 要遍历ExpressionStatement */
            VariableDeclaration({ node }) {
                node.declarations.forEach((nodeItem) => {
                    if (nodeItem.init && nodeItem.init.callee && nodeItem.init.callee.name === 'require') {
                        if (
                            nodeItem.init.arguments &&
                            nodeItem.init.arguments[0] &&
                            nodeItem.init.arguments[0].value.indexOf('@babel') > -1
                        ) {

                            console.log(nodeItem.init.arguments[0].value, 'hahahahah');
                            const url = nodeItem.init.arguments[0].value;
                            let code2 = require(url);
                            // console.log(code2, '打印下code
                            dependecies[url] = url;
                            file = url;
                            code = code2;
                            // return {
                            //     file: url,
                            //     dependecies: {},
                            //     code: code2,
                            // };
                        }
                        /** require节点 */
                        let url = nodeItem.init.arguments[0].value;
                        dependecies[url] = '.' + path.sep + path.join(path.dirname(file), url);
                        nodeItem.init.arguments[0].value = dependecies[url];
                    }
                });
            },
        });
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
        });

        return {
            file,
            dependecies,
            code,
        };
    }

    /** 生成运行函数 */
    generateCode(graph) {
        const graphCode = JSON.stringify(graph);

        const bundle = `(function(graphCode) {
            var module = {
                exports: {}
            }
            function require(moduleID) {


                (function(require, exports, module){

                    eval(graphCode[moduleID].code);
                    
                })(require, module.exports, module)


                return module.exports;
            }
            require('${this.entry}')
        })(${graphCode})`;

        if (!fs.existsSync(this.output.path)) {
            fs.mkdirSync(this.output.path);
        }
        fs.writeFileSync(path.join(this.output.path, this.output.filename), bundle, 'utf-8');
    }

    /** webpack编译函数 */
    compile() {
        const moduleInfo = this.buildCode(this.entry);
        this.modules.push(moduleInfo);
        this.modules.forEach(({ dependecies, code }) => {
            for (const item in dependecies) {
                this.modules.push(this.buildCode(dependecies[item], 1));
            }
            if (code.indexOf('@babel') > -1) {
                /** 如果编译后的代码里面还有@ */
                console.log('满足条件');
                // this.modules.push(this.buildCode(code, 2));
            }
        });

        // 生成依赖关系图
        const dependencyGraph = this.modules.reduce(
            (graph, item) => ({
                ...graph,
                [item.file]: {
                    dependecies: item.dependecies,
                    code: item.code,
                },
            }),
            {}
        );
        console.log(dependencyGraph, '00000')
        this.generateCode(dependencyGraph);
    }
}

/** 执行webpack编译 */
new Webpack({
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: './lib',
    },
}).compile();
