class PluginMini {
    constructor(options) {
        console.log(options, '-------');
    }
    apply(compiler) {
        compiler.hooks.environment.tap('initJimousPlugin', (result) => {
            console.log('environment config init end------', result);
        });

        compiler.hooks.entryOption.tap('entryInit', (content, entry) => {
            console.log('打印看看content', content, entry);
        });
    }
}

exports.PluginMini = PluginMini;
