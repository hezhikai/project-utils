
/**
 * 获取 getters
 * @param {object} config store 配置项
 */
function getGetters (config) {
  let defaultGetters = {};
  let { modules, getters } = config;
  if (Object.prototype.toString.call(modules) === '[object Object]') {
    Object.keys(modules).forEach(rootKey => {
      if (Object.prototype.toString.call(modules[rootKey].state) === '[object Object]') {
        Object.keys(modules[rootKey].state).forEach(subKey => {
          defaultGetters[subKey] = (state) => state[rootKey][subKey];
        });
      }
    });
  }
  return Object.assign({}, defaultGetters, getters);
}
const VueStore = (Vuex, config = {}) => {
  return new Vuex.Store(Object.assign({}, config, { getters: getGetters(config) }));
};
export default VueStore;
