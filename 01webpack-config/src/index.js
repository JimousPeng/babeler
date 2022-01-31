/*
 * @Date: 2022-01-28 16:13:58
 * @LastEditors: your name
 * @Description: 描述文件内容
 * @LastEditTime: 2022-01-31 11:18:00
 * @FilePath: \engineering-about-frontend\01webpack-config\src\index.js
 */

import '@/style/index.css'
import ImgUrl from '@/image/jimous.jpg';
console.log(ImgUrl, '看看图片地址')

import indexHtml from '@/template/index.html';
console.log(indexHtml, '----------');
document.open();
// 如果 document.write() 调用发生在 HTML 里的 <script> 标签中，那么它将不会自动调用 document.open(),需要手动调用
document.write(indexHtml);
document.close();

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
