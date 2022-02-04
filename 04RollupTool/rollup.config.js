/*
 * @Author: jimouspeng
 * @Date: 2022-02-04 21:53:15
 * @LastEditTime: 2022-02-04 21:53:15
 * @LastEditors: your name
 * @Description: Rollup配置文件
 * @FilePath: \engineering-about-frontend\04RollupTool\rollup.config.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

module.exports = {
    input: 'src/app.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
    },
};
