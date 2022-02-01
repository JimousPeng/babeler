/*
 * @Author: jimouspeng
 * @Date: 2022-01-31 11:24:25
 * @LastEditTime: 2022-02-01 12:24:50
 * @LastEditors: your name
 * @Description: 自定义loader主体 
 * @FilePath: \engineering-about-frontend\self-loader\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

// const loaderUtils = require('loader-utils')

module.exports = function(content) {
    console.log('过loader处理', this.cacheable);
    // cacheable: 启动缓存，当文件输入和其依赖没有发生变化时，应该让loader直接使用缓存，而不是重复进行转换的工作
    if(this.cacheable) {
        this.cacheable()
    };
    console.log(this.sourceMap, '打印看看sourceMap');
    // webpack 5之后，不需要通过loader-utils获取参数，直接通过loader context示例
    // 参见文档： https://webpack.docschina.org/api/loaders/#thisgetoptionsschema
    const options = this.getOptions();
    console.log(options, '看看参数')
    let newContent = content.replace(/jimous-el/g, 'jimousiiii')
    // loader有两种方式返回处理后的内容，一种是return source
    // 另一种是调用this.callback(); 同时调用callback后不需要return (或return; 后面不需要加参数),以让webpack知道该loader返回undefined，从而知道返回的结果通过
    // this.callback()函数传递，而不是通过return。
    return newContent;
}
