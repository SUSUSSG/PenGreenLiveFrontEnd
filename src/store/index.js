// src/store/index.js
import { createStore } from 'vuex';
import userModule from './modules/user';

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
      commit('setBoxHeight', height);
    },
  },
  getters: {
    getBoxHeight: (state) => state.boxHeight,
  },
  modules: {
    user: userModule, // user 모듈을 등록합니다
  },
});