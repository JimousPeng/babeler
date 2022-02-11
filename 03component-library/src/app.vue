<!--
 * @Date: 2022-02-09 15:35:22
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-02-11 10:14:06
 * @FilePath: \engineering-about-frontend\03component-library\src\app.vue
-->
<template>
    <div id="app">
        <span>{{ name }}</span>
        <show-dialog />
        <show-model />
    </div>
</template>
<script>
import showDialog from './components/show-dialog/showDialog.vue'
export default {
    components: { showDialog },
    data() {
        return {
            name: 'jimous',
        }
    },
    created() {
        console.log('created--------')
    },
}
</script>
<style lang="scss" scoped></style>
