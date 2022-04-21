<!--
 * @Author: jimouspeng
 * @Date: 2022-04-21 16:30:59
 * @Description:  
 * @FilePath: \engineering-about-frontend\04RollupTool\vue\show-age\index.vue
-->
<template>
    <div>age: {{ age }}</div>
</template>
<script>
export default {
    name: 'showAge',
    props: {
        age: 0,
    },
};
</script>
<style lang="scss" scoped></style>
