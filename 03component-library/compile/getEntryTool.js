/*
 * @Date: 2021-12-21 18:03:21
 * @LastEditors: jimouspeng
 * @Description: 打包入口文件解析
 * @LastEditTime: 2022-02-11 10:04:44
 * @FilePath: \engineering-about-frontend\03component-library\compile\getEntryTool.js
 */
const fs = require('fs');
const baseDir = './src';
const outputDir = './lib';

/**
 * 生成打包入口配置路径
 * @returns { index: './src/index.js', 'show-dialog': './src/components/show-dialog/index.js', ... }
 */

module.exports = () => {
    const entryList = {
        index: `${baseDir}/index.js`,
    };
    /** 获取组件列表数组 */
    const componentsList = fs.readdirSync(`${baseDir}/components`);
    componentsList.length && componentsList.forEach((el) => {
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
