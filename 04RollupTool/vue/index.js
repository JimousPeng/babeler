import ShowName from './show-name/index.vue';
import ShowAge from './show-age/index.vue';

const components = [ShowName, ShowAge];

const install = function (Vue) {
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
};
export default {
    install,
};
