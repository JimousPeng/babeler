class PluginMini {
    static fileOptions = {
        outputFile: 'jimous.md',
    };
    constructor(options) {
        console.log(options);
        this.options = Object.assign({}, options, PluginMini.fileOptions);
        console.log(this.options, '-------');
    }
    apply(compiler) {
        /** webpack 模块实例，可以通过 compiler 对象访问, 可以确保使用的是模块的正确版本（不要直接 require/import webpack） */
        const { webpack } = compiler;

        /** Compilation 对象提供了对一些有用常量的访问 */
        const { Compilation } = webpack;

        /** RawSource 是其中一种 “源码”("sources") 类型，不包含SourceMap， 用来在 compilation 中表示资源的源码
         * new RawSource(sourceCode: String | Buffer)
         * https://github.com/webpack/webpack-sources#source
         */
        const { RawSource } = webpack.sources;

        /** thisCompilation: 初始化 compilation 时调用，在触发 compilation 事件之前调用 <SyncHook> */
        compiler.hooks.thisCompilation.tap('compilationInit', (compilation) => {
            /** processAssets: asset 处理, <AsyncSeriesHook> */

            /** 绑定到 “thisCompilation” 钩子 */
            compilation.hooks.processAssets.tap(
                {
                    name: 'PluginMini',
                    /** 用某个靠后的资源处理阶段, 确保所有资源已被插件添加到 compilation
                     *
                     * stage:
                     * PROCESS_ASSETS_STAGE_ADDITIONAL — 在编译中添加额外的 asset
                     * PROCESS_ASSETS_STAGE_PRE_PROCESS — asset 进行了基础预处理
                     * PROCESS_ASSETS_STAGE_DERIVED — 从已有 asset 中获取新的 asset
                     * PROCESS_ASSETS_STAGE_ADDITIONS — 为现有的 asset 添加额外的内容，例如 banner 或初始代码
                     * PROCESS_ASSETS_STAGE_OPTIMIZE — 以通用的方式优化已有 asset
                     * PROCESS_ASSETS_STAGE_OPTIMIZE_COUNT — 优化现有资产的数量，例如，进行合并操作
                     * PROCESS_ASSETS_STAGE_OPTIMIZE_COMPATIBILITY — 优化现有 asset 兼容性，例如添加 polyfills 或者 vendor prefixes
                     * PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE — 优化现有 asset 大小，例如进行压缩或者删除空格
                     * PROCESS_ASSETS_STAGE_DEV_TOOLING — 为 asset 添加开发者工具，例如，提取 source map
                     * PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE 5.8.0+ — 优化已有 asset 数量，例如，通过将 asset 内联到其他 asset 中
                     * PROCESS_ASSETS_STAGE_SUMMARIZE — 整理现有 asset 列表
                     * PROCESS_ASSETS_STAGE_OPTIMIZE_HASH — 优化 asset 的 hash 值，例如，生成 asset 内容的真实 hash 值
                     * PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER — 优化已有 asset 的转换操作，例如对 asset 进行压缩，并作为独立的 asset
                     * PROCESS_ASSETS_STAGE_ANALYSE — 分析已有 asset
                     * PROCESS_ASSETS_STAGE_REPORT — 创建用于上报的 asset
                     */
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                (assets) => {
                    /** "assets" 是一个包含 compilation 中所有资源(assets)的对象
                     * 该对象的键是资源的路径, 值是文件的源码
                     */
                    const mainSource = compilation.getAsset('main.js').source;
                    console.log(mainSource);

                    const content =
                        '# In this build:\n\n' +
                        Object.keys(assets)
                            .map((filename) => `- ${filename}`)
                            .join('\n');

                    /** emitAsset: 向 compilation 添加新的资源，这样 webpack 就会自动生成并输出到 output 目录 */
                    compilation.emitAsset(this.options.outputFile, new RawSource(content));
                }
            );
        });
    }
}

exports.PluginMini = PluginMini;
