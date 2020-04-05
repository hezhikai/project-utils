import Vue from 'vue';
import Vuex from 'vuex';
import StorePackage from './utils/storePackage';
import app from './modules/app';
import tagsViews from './modules/tagsView';

Vue.use(Vuex);
const store = StorePackage(Vuex, {
  modules: {
    app,
    tagsViews
  }
});

export default store;
