/*
 * @Date: 2021-12-02 13:17:07
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2021-12-21 15:21:37
 * @FilePath: \react-components\local-loader.js
 */

const loaderUtils = require('loader-utils');
const fs = require('fs');

console.log(loaderUtils, 'jimous---------------');

module.exports = function (source) {
    // const options = loaderUtils.getOptions(this);
    // console.log(options, '看看loader接受的参数');
    const newStr = source.replace(/jimous1/gi, 'hhhhh121212')
    console.log(source.length, 'jimous 看看 source', newStr);
    return newStr;
};
