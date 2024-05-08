// src/store/modules/user.js
const state = {
    rooms: [
      { id: 1, name: 'Dummy Room1' },
     

    ],
    enteredRooms: [
      { id: 1, name: 'Dummy Room1' },
    ],
  };
  
  const mutations = {
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    setEnteredRooms(state, enteredRooms) {
      state.enteredRooms = enteredRooms;
    },
  };
  
  const actions = {
    async loadRooms(context) {

      let response = await fetch(`/api/v1/room`, {
          method: "GET"
      });

      const responseData = await response.json();

      if(!response.ok) {
          //error }
      }

      const rooms = [];
      for(const data of responseData.data) {
          const room = {
              id: data.roomId,
              name: data.name
          };

          rooms.push(room);
      }

      context.commit('setRooms', rooms);
  },

  async loadEnteredRooms(context) {
      const userId = 2;

      let response = await fetch(`/api/v1/room/joined?userId=${userId}`, {
          method: "GET",
      });

      const responseData = await response.json();
      if(!response.ok) {
          //error }
      }
      const enteredRooms = [];
      for(const data of responseData.data) {
          const room = {
              id: data.roomId,
              name: data.roomName
          };
          enteredRooms.push(room);
      }

      context.commit('setEnteredRooms', enteredRooms);

  }
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