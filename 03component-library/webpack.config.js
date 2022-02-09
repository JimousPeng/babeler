/*
 * @Date: 2022-02-09 15:08:45
 * @LastEditors: jimouspeng
 * @Description: webpack配置文件
 * @LastEditTime: 2022-02-09 18:14:24
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
        // library: 'MyLibrary',
        // libraryTarget: 'umd',
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
    mode: 'development',
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
