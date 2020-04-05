import router from '@/router';
import methods from '@/utils/methods';
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
    visitedViews: methods.getLocalStorageItem('visitedViews') || [],
    activeView: methods.getLocalStorageItem('activeView') || {},
    homePage: '/home'
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
    addVisitedViews({ commit, state }, view) {
      let isViewInCache = state.visitedViews.find(
        (v) => v.path === view.path && v.name === view.name
      );
      if (!isViewInCache) {
        commit('ADD_VISITED_VIEWS', view);
      }
    },
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
    changeActiveView({ commit }, view) {
      commit('CHANGE_ACTIVE_VIEW', view);
    }
  }
};
export default tagsView;
