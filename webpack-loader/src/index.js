import '../style/index.scss';
import '../style/common.css';
// import css from '../style/index.css';
// import commoncss from '../style/common.css';
// console.log('打印一下', css, commoncss);
/** 不使用style-loader，手动插入style标签 */
// const style = document.createElement('style');
// style.innerHTML = css[0][1] + commoncss[0][1];
// document.getElementsByTagName('head')[0].appendChild(style);

const newEl = document.createElement('div');
newEl.classList.add('color-span');
newEl.innerHTML = '<span>hello world</span>';
document.body.appendChild(newEl);
