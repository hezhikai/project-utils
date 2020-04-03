import Vue from 'vue';
import VueRouter from 'vue-router';
import wordRouter from './modules/word';
import layout from '@/components/layout/layout';
Vue.use(VueRouter);
let childrenRoutes = [...wordRouter];
const routes = [
  {
    path: '/',
    redirect: '/word/excel',
    component: layout,
    children: childrenRoutes
  }
].map((route) => {
  route.name = route.path;
  // route.component = componentsImport(route.component, route.name);
  return route;
});

let router = new VueRouter({
  routes
});
export default router;
