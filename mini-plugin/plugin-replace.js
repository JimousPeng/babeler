class pluginReplace {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('emit', (compilation, cb) => {
            console.log(Object.keys(compilation));

            const assets = compilation.assets;

            let fileContent = null;
            Object.keys(assets).forEach((key) => {
                if (/js$/.test(key)) {
                    console.log(assets[key], 'JAHAH');
                    const sourceCode = assets[key].source();
                    fileContent = sourceCode.replace(/\[zhanwei\]/g, 'muyuan ~~');
                }
            });
            /** 更改输出文件 */
            compilation.assets['main.js'] = {
                source() {
                    // 定义文件的内容
                    return fileContent;
                },
                size() {
                    // 定义文件的体积
                    return Buffer.byteLength(fileContent, 'utf8');
                },
            };
            cb();
        });
    }
}

exports.pluginReplace = pluginReplace;
