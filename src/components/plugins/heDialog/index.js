import heDialog from './src/main.vue';

heDialog.install = function (Vue) {
  Vue.component(heDialog.name, heDialog);
};

export default heDialog;
