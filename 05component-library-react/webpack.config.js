/*
 * @Date: 2021-12-01 17:21:50
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-01-20 15:48:19
 * @FilePath: \react-components\webpack.config.js
 */
const path = require('path')
const getEntryTool = require('./compile/getEntryTool.js')
console.log(getEntryTool())

module.exports = {
    entry: getEntryTool,
    output: {
        path: path.resolve('./lib'),
        filename: '[name]/index.js',
        library: 'MyLibrary',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: path.resolve('./local-loader.js'),
                        options: {
                            name: 'jimous',
                        },
                    },
                ],
            },
            {
                test: /\.[s|c]ss/,
                exclude: /node_modules/,
                use: ['sass-loader']
            }
        ],
    },
    mode: 'development',
    resolve: {
        alias: {
            react: './node_modules/react'
        }
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },
}
