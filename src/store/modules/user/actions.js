export default {
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
}