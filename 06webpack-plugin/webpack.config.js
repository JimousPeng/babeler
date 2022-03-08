const HtmlWebpackPlugin = require('html-webpack-plugin')
const JimousPlugin = require('./plugin.js')

module.exports = {
    entry: './main.js',
    plugins: [
        new HtmlWebpackPlugin(),
        new JimousPlugin({
            name: 'jimous',
        }),
    ],
    mode: 'development',
}
