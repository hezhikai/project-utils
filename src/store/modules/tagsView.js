import router from '@/router';
import methods from '@/utils/methods';
/**
 * 解构 view 对象
 * @param {object} view 页面视图
 * @returns {object} 解构后的 view 对象
 */
function deconstructView(view) {
  const { name, meta = {}, path, query, params, fullPath } = view;
  return {
    name,
    meta,
    path,
    query,
    params,
    fullPath
  };
}
const tagsView = {
  state: {
    visitedViews: methods.getLocalStorageItem('visitedViews') || [], //已访问的页面列表
    activeView: methods.getLocalStorageItem('activeView') || {}, //激活的页面
    homePage: '/home' //首页路径
  },
  mutations: {
    ADD_VISITED_VIEWS(state, view) {
      state.visitedViews.push(deconstructView(view));
      methods.setLocalStorageItem('visitedViews', state.visitedViews);
    },
    DEL_VISITED_VIEW(state, view) {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          methods.setLocalStorageItem('visitedViews', state.visitedViews);
          break;
        }
      }
    },
    CHANGE_ACTIVE_VIEW(state, view) {
      state.activeView = deconstructView(view);
      methods.setLocalStorageItem('activeView', state.activeView);
    }
  },
  actions: {
    /**
     * 添加当前页面到已访问页面列表
     * @param {object} store store 对象
     * @param {object} view 当前页面
     */
    addVisitedViews({ commit, state }, view) {
      let isViewInCache = state.visitedViews.find(
        (item) => item.path === view.path && item.name === view.name
      );
      if (!isViewInCache) {
        commit('ADD_VISITED_VIEWS', view);
      }
    },
    /**
     * 从已访问页面列表中删除当前页面
     * @param {object} store store 对象
     * @param {object} view 当前页面
     */
    delVisitedView({ commit, state }, view) {
      commit('DEL_VISITED_VIEW', view);
      if (
        view.path === state.activeView.path &&
        state.visitedViews.length > 0
      ) {
        commit('CHANGE_ACTIVE_VIEW', state.visitedViews[0]);
        router.push(state.visitedViews[0].path);
      } else if (state.visitedViews.length === 0) {
        router.push(state.homePage);
      }
    },
    /**
     * 将激活的页面改为当前页面
     * @param {object} store store 对象
     * @param {object} view 当前页面
     */
    changeActiveView({ commit }, view) {
      commit('CHANGE_ACTIVE_VIEW', view);
    }
  }
};
export default tagsView;
