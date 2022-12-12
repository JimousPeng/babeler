const path = require('path');
const { PluginMini } = require('./plugin-mini.js');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new PluginMini({
            name: 'mini-jim',
        }),
    ],
};
