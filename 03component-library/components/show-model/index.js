/*
 * @Date: 2022-02-09 18:16:58
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-02-09 18:20:54
 * @FilePath: \engineering-about-frontend\03component-library\components\show-model\index.js
 */
import ShowModel from './showModel.vue'
console.log(ShowModel)

ShowModel.install = function(Vue) {
    Vue.component(ShowModel.name, ShowModel)
}

export default ShowModel
