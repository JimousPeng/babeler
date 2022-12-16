const path = require('path');
const { PluginMini } = require('./plugin-mini.js');
const { pluginReplace } = require('./plugin-replace.js');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // new PluginMini({
        //     name: 'mini-jim',
        //     outputFile: 'jimous.md',
        // }),
        new pluginReplace(),
    ],
    mode: 'development',
};
