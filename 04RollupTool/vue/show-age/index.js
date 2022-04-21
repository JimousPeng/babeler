import showAge from './index.vue';

showAge.install = function (Vue) {
    Vue.components(showAge.name, showAge);
};

export default showAge;
