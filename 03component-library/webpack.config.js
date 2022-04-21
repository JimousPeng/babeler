/*
 * @Date: 2022-02-09 15:08:45
 * @LastEditors: Please set LastEditors
 * @Description: webpack配置文件
 * @LastEditTime: 2022-04-20 16:24:29
 * @FilePath: \engineering-about-frontend\03component-library\webpack.config.js
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const getEntryTool = require('./compile/getEntryTool.js')

module.exports = {
    entry: getEntryTool,
    output: {
        path: path.resolve('./lib'),
        filename: '[name]/index.js',
        library: '[name]',
        // 作为组件库打包，输出文件类型应该是umd类型
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.[s|c]ss/,
                exclude: /node_modules/,
                use: ['vue-style-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './components')
        },
    },
    mode: process.env.NODE_ENV,
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './template.html'),
        }),
        new VueLoaderPlugin(),
    ],
    // resolve: {
    //     alias: {
    //         vue: './node_modules/vue',
    //     },
    // },
    // externals: {
    //     vue: {
    //         root: 'Vue',
    //         commonjs2: 'vue',
    //         commonjs: 'vue',
    //         amd: 'vue',
    //     },
    // },
}
