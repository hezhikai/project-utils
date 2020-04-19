import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import filters from './filters';
import '@/assets/css/index.less';
import methods from '@/utils/methods';
import plugins from '@/components/plugins';

Vue.use(ElementUI);
Vue.use(filters);

Vue.prototype.$methods = methods;
Object.keys(plugins).forEach((key) => {
  Vue.use(plugins[key]);
});

export default Vue;
