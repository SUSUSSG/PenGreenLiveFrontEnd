import axios from 'axios';

const state = {
  isAuthenticated: false,
  userRole: null,
  userName: null,
  userUUID: null,
};

const mutations = {
  setAuth(state, { isAuthenticated, userRole, userName, userUUID }) {
    state.isAuthenticated = isAuthenticated;
    state.userRole = userRole;
    state.userName = userName;
    state.userUUID = userUUID;
    console.log("setAuth mutation called", state.isAuthenticated, state.userName, state.userUUID); // 상태 업데이트 확인
  },
  clearAuth(state) {
    state.isAuthenticated = false;
    state.userRole = null;
    state.userName = null;
    state.userUUID = null;
  }
};

const actions = {
  async login({ commit }, { username, password }) {
    try {
      const response = await axios.post('/login', { username, password }, { withCredentials: true });
      const userData = JSON.parse(response.data.user);
      console.log("parsed user data", userData);

      commit('setAuth', { 
        isAuthenticated: true, 
        userRole: userData.role,
        userName: userData.name,
        userUUID: userData.uuid,
      });
      console.log("login response ", response.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  },
  async fetchUserRole({ commit }) {
    try {
      const response = await axios.get('/api/user-role', { withCredentials: true });
      
      commit('setAuth', { 
        isAuthenticated: true, 
        userRole: response.data.role,
        userName: response.data.name,
        userUUID: response.data.uuid,
      });
    } catch (error) {
      console.error('Failed to fetch user role', error);
      commit('clearAuth');
    }
  },
  logout({ commit }) {
    commit('clearAuth');
  }
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  userRole: state => state.userRole,
  userName: state => state.userName,
  userUUID: state => state.userUUID,
};

export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters
};
