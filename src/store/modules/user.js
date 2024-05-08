// src/store/modules/user.js
const state = {
    rooms: [
      { id: 1, name: 'Room 1' },
      { id: 2, name: 'Room 2' },
    ],
    enteredRooms: [
      { id: 1, name: 'Room 1' },
    ],
  };
  
  const mutations = {
    SET_ROOMS(state, rooms) {
      state.rooms = rooms;
    },
    SET_ENTERED_ROOMS(state, enteredRooms) {
      state.enteredRooms = enteredRooms;
    },
  };
  
  const actions = {
    loadRooms({ commit }) {
      commit('SET_ROOMS', [
        { id: 1, name: 'Room 1' },
        { id: 2, name: 'Room 2' },
        { id: 3, name: 'Room 3' },
      ]);
    },
    loadEnteredRooms({ commit }) {
      commit('SET_ENTERED_ROOMS', [
        { id: 1, name: 'Room 1' },
      ]);
    },
  };
  
  const getters = {
    rooms: (state) => state.rooms,
    enteredRooms: (state) => state.enteredRooms,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };