import { createStore } from "vuex";

export default createStore({
  state: {
    boxHeight: 0,
  },
  mutations: {
    setBoxHeight(state, height) {
      state.boxHeight = height;
    },
  },
  actions: {
    updateBoxHeight({ commit }, height) {
      commit("setBoxHeight", height);
    },
  },
  getters: {
    getBoxHeight: (state) => state.boxHeight,
  },
});
