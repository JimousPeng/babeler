/*
 * @Date: 2022-02-09 18:16:58
 * @LastEditors: Please set LastEditors
 * @Description: 描述文件内容
 * @LastEditTime: 2022-04-20 17:19:08
 * @FilePath: \engineering-about-frontend\03component-library\src\components\show-model\index.js
 */
import ShowModel from './showModel.vue'

ShowModel.install = function(Vue) {
    Vue.component(ShowModel.name, ShowModel)
}

// const ToastExecute = Vue.extend(ShowModel)  // 微组件打包方式

export default ShowModel
