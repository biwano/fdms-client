export default {
  namespaced: true,
  state: {
    busy: 0
  },
  mutations: {
    busy(state) {
      state.busy++;
    },
    available(state) {
      state.busy--;
    }
  },
  getters: {
    busy(state) {
      return state.busy > 0;
    }
  }
};
