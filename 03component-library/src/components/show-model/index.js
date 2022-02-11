/*
 * @Date: 2022-02-09 18:16:58
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-02-11 10:12:48
 * @FilePath: \engineering-about-frontend\03component-library\src\components\show-model\index.js
 */
import ShowModel from './showModel.vue'

ShowModel.install = function(Vue) {
    Vue.component(ShowModel.name, ShowModel)
}

export default ShowModel
