/*
 * @Date: 2022-01-28 15:59:33
 * @LastEditors: Please set LastEditors
 *
 * @Description:
 * webpack.config.js是webpack默认配置文件，也可以在命令行执行配置文件
 * 如果要用ts进行配置，需要安装相关依赖：npm install --save-dev typescript ts-node @types/node @types/webpack
 *
 * @LastEditTime: 2023-03-13 11:56:57
 * @FilePath: \engineering-about-frontend\01webpack-config\webpack.config.js
 */

// 输出动态HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loaderRules = require('./loader-config/index.js');
/** mini-css-extract-plugin 可用来分离样式文件，并且支持按需加载css */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 分离样式后，进行css文件优化，webpack 4使用插件optimize-css-assets-webpack-plugin
// webpack 5以上版本推荐使用这个css插件 https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/#getting-started
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// webpack v5 开箱即带有最新版本的 terser-webpack-plugin。
// 如果你使用的是 webpack v5 或更高版本，同时希望自定义配置，那么仍需要安装 terser-webpack-plugin。
// 如果使用 webpack v4，则必须安装 terser-webpack-plugin v4 的版本
// https://webpack.docschina.org/plugins/terser-webpack-plugin/
const TerserPlugin = require('terser-webpack-plugin');

// 帮助分析bundle构成的插件,可以通过在package.json配置进行自动化的对资源体积进行监控.
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// size-plugin: 每次打包后都会输出本地构建的资源体积，以及与上次构建相比体积变化了多少。
const sizePlugin = require('size-plugin')

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const path = require('path');
const wepbackConfig = {
    // context: 可以理解为资源入口的路径前缀，必须使用绝对路径
    context: path.join(__dirname, './src'),
    // 当配置了context的前提下，这里默认是访问src下的文件
    // entry可用字符串 | 数组(用于将多个资源预先整合) | 对象(多入口) | 函数
    // entry可通过配置提取vendor，结合代码切割splitChunks,将依赖的第三方模块抽取成一个新的bundle,这样可以有效利用客户端缓存，在用户
    // 后续请求页面时会加快整体的渲染速度。 这块后面结合vue或react来讲解
    // 这里cool即为chunkname，对应webpack模板变量[name]的值映射
    entry: {
        cool: './index.js',
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
        filename: '[name]@[chunkhash].js',
        library: 'jimous',
        //  output.libraryTarget：默认暴露为'var', 即当 library 加载完成，入口起点的返回值将分配给一个变量，后续配置组件库需要更改该配置
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
        // modules: 告诉webpack解析模块时应该搜索的目录, 并对不同文件类型配置对应loader处理
        modules: ['node_modules'],
    },
    // module: 决定了如何处理项目中的不同类型的模块
    module: {
        // rules.loader: Rule.loader 是 Rule.use: [ { loader } ] 的简写, 接收一个string
        // Rule.loaders: Rule.loaders 是 Rule.use 的别名, 接收一个数组，该数组包含该规则所使用的loader.
        rules: loaderRules,
    },
    // plugins： webpack插件配置
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './compile-config/template.html'),
        }),
        new sizePlugin(),
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        //     chunkFilename: '[id].css',
        // }),
        // new OptimizeCSSAssetsPlugin({
        //     // 生效范围，只压缩匹配到的资源
        //     assetNameRegExp: /\.css$/g,
        //     // 压缩处理器，默认为cssnano
        //     cssProcessor: require('cssnano'),
        //     // 压缩处理器的配置
        //     cssProcessorPluginOptions: {
        //         preset: ['default', { discardComments: { removeAll: true } }],
        //     },
        //     // 是否展示log
        //     canPrint: true,
        // }),
        // new Analyzer()
    ],
    // mode 配置可配合cross-env设置当前进程的全局变量, process.env是nodejs用于存放当前进程环境变量的对象，而NODE_ENV则可以让
    // 开发者指定当前的运行时环境。
    mode: process.env.NODE_ENV,
    /**devtool：控制是否生成，以及如何生成 source map， source map可以配合Sentry进行js的错误追踪。
     * 在使用 uglifyjs-webpack-plugin 时，你必须提供 sourceMap：true 选项来启用 source map 支持
     */
    devtool: false,
    /**支持的配置 contentBase, publicPath不支持
     * object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, magicHtml?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, server?, setupExitSignals?, setupMiddlewares?, static?, watchFiles?, webSocketServer? }
     */
    devServer: {
        static: path.resolve(__dirname, 'public'),
        open: true,
        hot: true, // 开启模块热替换
    },
    // webpack 4以上版本配置js压缩，如果开启了mode: production, 则不需要人为设置。
    // webpack 4默认使用了terser的插件 terser-webpack-plugin
    optimization: {
        // 代码分片， 针对异步模块，不需要配置也能生效
        // splitChunks: {
        //     chunks: 'all'
        // }
        // 允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)
        minimize: true, // 如果还想在开发环境下启用 CSS 优化，需要将 optimization.minimize 设置为 true
        // 自定义terser-webpack-plugin插件
        minimizer: [
            new TerserPlugin({
                // test: terser的作用范围
                test: /\.js(\?.*)?$/i,
                exclude: /\/excludes/,
                parallel: 2, // 允许使用多个进程进行压缩(进程数通过数字类型的值来指定， 默认值为boolean类型值false)
                // 更多配置项见文档
            }),
            new CssMinimizerPlugin(),
        ],
    },
};

// module.exports = wepbackConfig;

const configWithTimeCalculate = smp.wrap(wepbackConfig);

// 为了解决以下报错，将minicssExtractPlugin的插件配置放在SpeedMeasurePlugin配置后
// 参考issue: https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167
// You forgot to add 'mini-css-extract-plugin' plugin (i.e. `{ plugins: [new MiniCssExtractPlugin()] }`), 
// please read https://github.com/webpack-contrib/mini-css-extract-plugin#getting-started
// 初始化MiniCssExtractPlugin插件时，在绑定的compilation钩子上为loader执行上下文绑定了experimentalUseImportModule属性，由于SpeedMeasurePlugin接管了plugin初始化的this，导致
// loader使用MiniCssExtractPlugin.loader时无法找到experimentalUseImportModule属性，然后抛出错误。

configWithTimeCalculate.plugins.push(
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    })
);

module.exports = configWithTimeCalculate;