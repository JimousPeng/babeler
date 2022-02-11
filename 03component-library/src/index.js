/*
 * @Date: 2022-02-09 15:03:41
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-02-11 10:13:43
 * @FilePath: \engineering-about-frontend\03component-library\src\index.js
 */
console.log('哈哈哈')
Promise.resolve('12').then((res) => {
    console.log(res)
})

import Vue from 'vue'
import App from './app.vue'
import ShowModel from './components/show-model/index'
import ShowDialog from './components/show-dialog/index'
Vue.use(ShowModel)
Vue.use(ShowDialog)
// 每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的
new Vue({
    el: '#app',
    render: (h) => h(App),
})
