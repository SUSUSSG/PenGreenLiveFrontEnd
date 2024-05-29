import axios from '@/axios';

const state = {
  isAuthenticated: false,
  userRole: null,
  userName: null,
  userUUID: null,
  channelSeq: null,
};

const mutations = {
  setAuth(state, { isAuthenticated, userRole, userName, userUUID, channelSeq }) {
    state.isAuthenticated = isAuthenticated;
    state.userRole = userRole;
    state.userName = userName;
    state.userUUID = userUUID;
    state.channelSeq = channelSeq;
    console.log("setAuth mutation called", state.isAuthenticated, state.userName, state.userUUID, state.channelSeq); // 상태 업데이트 확인
  },
  clearAuth(state) {
    state.isAuthenticated = false;
    state.userRole = null;
    state.userName = null;
    state.userUUID = null;
    state.channelSeq = null;
  }
};

const actions = {
  async login({ commit }, { username, password }) {
    try {
      const response = await axios.post('/login', { "username": username, "password" : password }, 
    );
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
      alert("로그인 실패");
    }
  },
  async loginVendor({ commit }, { username, password }) {
    try {
      const response = await axios.post('/vendor/login', { username, password }, { withCredentials: true });
      const userData = JSON.parse(response.data.user);
      console.log("parsed user data", userData);

      commit('setAuth', { 
        isAuthenticated: true, 
        userRole: userData.role,
        userName: userData.name,
        userUUID: userData.uuid,
        channelSeq: userData.channelSeq
      });
      console.log("login response ", response.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  },
  async fetchUserRole({ commit }) {
    try {
      const response = await axios.get('/user-role', { withCredentials: true });
      
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
    alert("로그아웃 되었습니다.");
  }
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  userRole: state => state.userRole,
  userName: state => state.userName,
  userUUID: state => state.userUUID,
  channelSeq: state => state.channelSeq,
};

export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters
};
