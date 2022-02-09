<!--
 * @Date: 2022-02-09 15:35:22
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-02-09 18:19:00
 * @FilePath: \engineering-about-frontend\03component-library\src\app.vue
-->
<template>
    <div id="app">
        <span>{{ name }}</span>
        <show-model></show-model>
    </div>
</template>
<script>
export default {
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
