/*
 * @Date: 2022-03-08 12:52:18
 * @LastEditors: jimouspeng
 * @Description: webpack插件
 * @LastEditTime: 2022-03-08 14:54:38
 * @FilePath: \engineering-about-frontend\06webpack-plugin\plugin.js
 */

/** plugin:
 * 1. 一个 JavaScript 命名函数
 * 2. 在插件函数的 prototype 上或者类定义一个 apply 方法
 * 3. 指定一个绑定到 webpack 自身的事件钩子
 * 4. 处理 webpack 内部实例的特定数据
 * 5. 功能完成后调用 webpack 提供的回调
 *
 * @compiler
 * Compiler 模块是 webpack 的支柱引擎，它通过 CLI 或 Node API 传递的所有选项，创建出一个 compilation 实例。
 * 它扩展(extend)自 Tapable 类，以便注册和调用插件。大多数面向用户的插件首，会先在 Compiler 上注册。
 *
 * compiler 对象代表了完整的 webpack 环境配置。
 * 这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。
 * 当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境
 *
 *
 * @compilation
 * Compilation 模块会被 Compiler 用来创建新的编译（或新的构建）。
 * compilation 实例能够访问所有的模块和它们的依赖（大部分是循环依赖）。
 * 它会对应用程序的依赖图中所有模块进行字面上的编译(literal compilation)。
 * 在编译阶段，模块会被加载(loaded)、封存(sealed)、优化(optimized)、分块(chunked)、哈希(hashed)和重新创建(restored)
 * compilation 对象代表了一次资源版本构建。
 *
 * 当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。
 * 一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。
 * compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')

// function JimousPlugin(options) {
//     /** options: 插件实例化参数 */
//     console.log(options, '打印看看配置文件')
// }
// JimousPlugin.prototype.apply = function (compiler) {
//     compiler.hooks.compilation.tap('JimousPlugin', (compilation) => {
//         /** beforeEmit -> 生成资源到 output 目录之前 */
//         HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('JimousPlugin', (data, cb) => {
//             console.log(data)
//             data.html += '++'
//             cb(null, data)
//         })
//     })
// }
// class JimousPlugin {
//     constructor(options) {
//         console.log(options, '参数')
//     }
//     apply(compiler) {
//         compiler.hooks.compilation.tap('JimousPlugin', (compilation) => {
//             /** beforeEmit -> 生成资源到 output 目录之前 */
//             HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('JimousPlugin', (data, cb) => {
//                 console.log(data)
//                 data.html += '++'
//                 cb(null, data)
//             })
//         })
//     }
// }

class JimousPlugin {
    constructor(options) {}
    apply(compiler) {
        /** compiler.hooks.someHook.tap(...)
         * someHook -> 选择插件触发的 compiler 钩子
         * emit -> 生成资源到 output 目录之前
         */
        compiler.hooks.emit.tapAsync('JimousPlugin', (compilation, callback) => {
            /**
             * 可以通过打印Object.keys(compilation)查看compilation编译资源
             * @assets {object}
             * 打包后 dist 目录下的文件资源都放在 assets 对象中
             * source() -> 获取资源函数
             */
            const assets = compilation.assets
            let fileContent = null
            Object.keys(assets).forEach((key) => {
                if (/js$/.test(key)) {
                    // console.log(typeof assets[key]) //object
                    // console.log(Object.keys(assets[key]))
                    const sourceCode = assets[key].source()
                    // let size = assets[key].size()
                    // console.log(sourceCode, size)
                    fileContent = sourceCode.replace(/jimous/g, 'jimous cool')
                    // console.log(size, Buffer.byteLength(fileContent, 'utf8')) // 对比下字节大小变化
                }
            })
            /** 更改输出文件 */
            compilation.assets['main.js'] = {
                source() {
                    // 定义文件的内容
                    return fileContent
                },
                size() {
                    // 定义文件的体积
                    return Buffer.byteLength(fileContent, 'utf8')
                },
            }
            /** 新增输出文件 */
            const readmeMd = 'hhhhhhhhh'
            compilation.assets['read.md'] = {
                source() {
                    // 定义文件的内容
                    return readmeMd
                },
                size() {
                    // 定义文件的体积
                    return Buffer.byteLength(readmeMd, 'utf8')
                },
            }
            callback()
        })
    }
}

module.exports = JimousPlugin
