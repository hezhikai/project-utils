import Vue from 'vue';
import Vuex from 'vuex';
import StorePackage from './utils/storePackage';
import app from './modules/app';

Vue.use(Vuex);
const store = StorePackage(Vuex, {
  modules: {
    app
  },
});

export default store;
