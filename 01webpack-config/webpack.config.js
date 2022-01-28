/*
 * @Date: 2022-01-28 15:59:33
 * @LastEditors: jimouspeng
 *
 * @Description:
 * webpack.config.js是webpack默认配置文件，也可以在命令行执行配置文件
 * 如果要用ts进行配置，需要安装相关依赖：npm install --save-dev typescript ts-node @types/node @types/webpack
 *
 * @LastEditTime: 2022-01-28 17:14:45
 * @FilePath: \engineering-about-frontend\01webpack-config\webpack.config.js
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
module.exports = {
    entry: path.resolve(__dirname, 'src'),
    /** webpack4.x以上版本output默认输出路径为 /dist/main.js, 可不配置
     * output.libraryTarget：默认暴露为'var'
     * 即当 library 加载完成，入口起点的返回值将分配给一个变量，后续配置组件库需要更改该配置
     */
    output: {
        // path: 指定资源的输出位置
        path: path.resolve(__dirname, 'public'),
        // publicPath: 指定资源的请求位置,默认值为空字符，可用于配置cdn路径
        publicPath: '',
        filename: 'jimous.js',
        library: 'jimous',
        libraryTarget: 'var',
    },
    /**resolve: 设置模块如何被解析
     * resolver 是一个库(library),帮助webpack找到bundle中需要引入的模块代码
     * 这些代码在包含在每个 require/import 语句中
     * 当打包模块时，webpack 使用 enhanced-resolve 来解析文件路径
     * 使用 enhanced-resolve，webpack 能够解析三种文件路径: 绝对路径，相对路径，模块路径
     */
    resolve: {
        // alias: 创建 import 或 require 的别名，来确保模块引入变得更简单
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        // modules: 告诉webpack解析模块时应该搜索的目录
        modules: ['node_modules'],
    },
    // module: 决定了如何处理项目中的不同类型的模块
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: 缩小打包作用域
                exclude: /node_modules/,
                // test命中文件的处理loader
                loader: []
            }
        ],
    },
    // plugins： webpack插件配置
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-config',
        }),
    ],
    // mode 配置可配合cross-env设置当前进程的全局变量
    mode: process.env.NODE_ENV,
    /**devtool：控制是否生成，以及如何生成 source map
     * 在使用 uglifyjs-webpack-plugin 时，你必须提供 sourceMap：true 选项来启用 source map 支持
     */
    devtool: false,
    /**支持的配置 contentBase, publicPath不支持
     * object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, magicHtml?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, server?, setupExitSignals?, setupMiddlewares?, static?, watchFiles?, webSocketServer? }
     */
    devServer: {
        static: path.resolve(__dirname, 'public'),
        open: true
    },
}
