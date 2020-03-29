import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import filters from './filters';
import '@/assets/css/index.less';
Vue.use(ElementUI);
Vue.use(filters);

export default Vue;
