import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            rooms: [],
            enteredRooms: [],
            userId: 2,
        };
    },
    mutations,
    getters,
    actions,
}