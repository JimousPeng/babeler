/*
 * @Date: 2022-01-28 15:59:33
 * @LastEditors: your name
 *
 * @Description:
 * webpack.config.js是webpack默认配置文件，也可以在命令行执行配置文件
 * 如果要用ts进行配置，需要安装相关依赖：npm install --save-dev typescript ts-node @types/node @types/webpack
 *
 * @LastEditTime: 2022-02-01 14:10:14
 * @FilePath: \engineering-about-frontend\01webpack-config\webpack.config.js
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const loaderRules = require('./loader-config/index.js');
/** mini-css-extract-plugin 可用来分离样式文件，并且支持按需加载css */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path')
module.exports = {
    // context: 可以理解为资源入口的路径前缀，必须使用绝对路径
    context: path.join(__dirname, './src'),
    // 当配置了context的前提下，这里默认是访问src下的文件
    // entry可用字符串 | 数组(用于将多个资源预先整合) | 对象(多入口) | 函数
    // entry可通过配置提取vendor，结合代码切割splitChunks,将依赖的第三方模块抽取成一个新的bundle,这样可以有效利用客户端缓存，在用户
    // 后续请求页面时会加快整体的渲染速度。 这块后面结合vue或react来讲解
    // 这里cool即为chunkname，对应webpack模板变量[name]的值映射
    entry: {
        cool:  './index.js',
        // vendor: ['vue']
    },
    /** 
     * webpack4.x以上版本output默认输出路径为 /dist/main.js, 可不配置
     */
    output: {
        // path: 指定资源的输出位置
        path: path.resolve(__dirname, 'public'),
        // publicPath: 指定资源的请求位置,默认值为空字符，可用于配置cdn路径
        publicPath: '',
        // [name]: chunk-name的模板变量，
        // webpack还提供[hash: 本地打包所有资源生成的hash],  [chunkhash: 当前chunk内容的hash], [id: chunkid], [query: 指代filename配置项中的query]等模板变量
        filename: '[name].js',
        library: 'jimous',
        //  output.libraryTarget：默认暴露为'var', 即当 library 加载完成，入口起点的返回值将分配给一个变量，后续配置组件库需要更改该配置
        libraryTarget: 'var',
    },
    // https://www.webpackjs.com/plugins/split-chunks-plugin/
    optimization: {
        // 代码分片， 针对异步模块，不需要配置也能生效
        // splitChunks: {
        //     chunks: 'all'
        // }
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
        // modules: 告诉webpack解析模块时应该搜索的目录, 并对不同文件类型配置对应loader处理
        modules: ['node_modules'],
    },
    // module: 决定了如何处理项目中的不同类型的模块
    module: {
        // rules.loader: Rule.loader 是 Rule.use: [ { loader } ] 的简写, 接收一个string
        // Rule.loaders: Rule.loaders 是 Rule.use 的别名, 接收一个数组，该数组包含该规则所使用的loader.
        rules: loaderRules
    },
    // plugins： webpack插件配置
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-config'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
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
