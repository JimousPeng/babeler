/*
 * @Date: 2022-01-19 18:28:00
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-01-19 18:29:58
 * @FilePath: \react-components\parse.js
 */
const esprima = require('esprima');
let code = 'const company = "zhuanzhuan" ';
const ast = esprima.parseScript(code);
ast.body.forEach(el => {
    console.log(el, '打印el')
})