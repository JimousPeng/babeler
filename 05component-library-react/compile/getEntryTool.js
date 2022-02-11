/*
 * @Date: 2021-12-21 18:03:21
 * @LastEditors: jimouspeng
 * @Description: 打包入口文件解析
 * @LastEditTime: 2021-12-22 19:14:52
 * @FilePath: \react-components\compile\getEntryTool.js
 */
const fs = require('fs');
const baseDir = './src';
const outputDir = './lib';
module.exports = () => {
    const entryList = {
        index: `${baseDir}/index.jsx`,
    };
    /** 获取组件列表数组 */
    const componentsList = fs.readdirSync(`${baseDir}/components`);
    componentsList.forEach((el) => {
        const getCurrentJs = fs.readdirSync(`${baseDir}/components/${el}`);
        if (getCurrentJs.length === 0) return;
        const dirPath = `${outputDir}/${el}`;
        entryList[el] = `${baseDir}/components/${el}/${getCurrentJs[0]}`;
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    });
    return entryList;
};
