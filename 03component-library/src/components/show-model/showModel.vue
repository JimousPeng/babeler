<!--
 * @Date: 2022-02-09 18:09:49
 * @LastEditors: Please set LastEditors
 * @Description: 描述文件内容
 * @LastEditTime: 2022-04-20 16:29:31
 * @FilePath: \engineering-about-frontend\03component-library\src\components\show-model\showModel.vue
-->
<template>
    <div>{{ hisName }} and hisAge is {{ age }}</div>
</template>
<script>
export default {
    name: 'show-model',
    props: ['age'],
    data() {
        return {
            hisName: 'jimous is cool',
        };
    },
};
</script>
<style lang="scss" scoped></style>
