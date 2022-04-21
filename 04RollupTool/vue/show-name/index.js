import showName from './index.vue';

showName.install = function (Vue) {
    Vue.components(showName.name, showName);
};

export default showName;
