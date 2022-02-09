<!--
 * @Date: 2022-02-09 18:09:49
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-02-09 18:20:29
 * @FilePath: \engineering-about-frontend\03component-library\components\show-model\showModel.vue
-->
<template>
    <div>{{ hisName }}</div>
</template>
<script>
export default {
    name: 'ShowModel',
    data() {
        return {
            hisName: 'jimous is cool',
        }
    },
}
</script>
<style lang="scss" scoped></style>
