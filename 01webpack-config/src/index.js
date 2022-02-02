/*
 * @Date: 2022-01-28 16:13:58
 * @LastEditors: your name
 * @Description: 描述文件内容
 * @LastEditTime: 2022-02-02 22:25:52
 * @FilePath: \engineering-about-frontend\01webpack-config\src\index.js
 */

import '@/style/index.css'
import ImgUrl from '@/image/jimous.jpg';
import('./a.js')
console.log(ImgUrl, '看看图片地址')

import indexHtml from '@/template/index.html';
console.log(indexHtml, '----------');
// 调用 open() 方法打开一个新文档并且用 write() 方法设置文档内容后，必须记住用 document.close() 方法关闭文档，并迫使其内容显示出来。
// 注意：如果目标文件已经存在，它将被清除。如果这个方法没有参数，会显示一个新窗口(about:blank)
// document.open();
// 如果 document.write() 调用发生在 HTML 里的 <script> 标签中，那么它将不会自动调用 document.open(),需要手动调用
// document.write(indexHtml);
// document.close();

function createDiv() {
    const divEL = document.createElement('div');
    divEL.innerHTML = 'jimous is cool';
    divEL.classList.add('jimous-el')
    return divEL
}

function createImg() {
    const divEL = document.createElement('img');
    divEL.setAttribute('src', ImgUrl )
    divEL.classList.add('jimous-el')
    return divEL
}

document.body.appendChild(createDiv());

document.body.appendChild(createImg());
