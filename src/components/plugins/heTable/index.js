import heTable from './src/main.vue';

heTable.install = function (Vue) {
  Vue.component(heTable.name, heTable);
};

export default heTable;
