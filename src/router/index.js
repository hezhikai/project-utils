import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import officeRouter from './modules/office';
import layout from '@/components/layout/layout';
import home from '@/views/home';
Vue.use(VueRouter);
let childrenRoutes = [...officeRouter];
const routes = [
  {
    path: '*',
    redirect: store.getters.homePage,
    component: layout,
    children: childrenRoutes
  },
  {
    path: '/home',
    component: layout,
    children: [
      {
        name: '首页',
        path: '/',
        meta: {
          title: '首页'
        },
        component: home
      }
    ]
  }
].map((route) => {
  route.name = route.path;
  // route.component = componentsImport(route.component, route.name);
  return route;
});
/* 避免跳转重复地址的报错 --start */
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
/* 避免跳转重复地址的报错 --end */
let router = new VueRouter({
  routes
});
export default router;
