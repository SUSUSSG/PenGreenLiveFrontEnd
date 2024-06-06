<template>
  <div class="wrap">
    <div class="container">
      <section class="room-list">
        <section class="room-tab">
          <div :class="activatedRoomTab" @click="activeTab('ALL')">
            전체 채팅 방
          </div>
          <div :class="activatedEnteredTab" @click="activeTab('MINE')">
            내가 속한 채팅 방
          </div>
        </section>
        <section style="width: 100%; height: calc(100% - 50px); overflow: auto">
          <keep-alive>
            <div style="overflow: hidden">
              <template v-if="isAllTab">
                <template v-for="room in rooms" :key="room.id">
                  <section style="padding: 5px">
                    <div class="room-item" @click="openChatRoom(room)">
                      <p>{{ room.name }}</p>
                    </div>
                  </section>
                </template>
              </template>
              <template v-else>
                <template v-for="room in enteredRooms" :key="room.id">
                  <section style="padding: 5px">
                    <div class="room-item" @click="openChatRoom(room)">
                      <p>{{ room.name }}</p>
                    </div>
                  </section>
                </template>
              </template>
            </div>
          </keep-alive>
        </section>
      </section>
      <section class="chat-area">
        <div class="chat-wrap">
          <section class="chat-header">
            <p>
              접속 중인 방 이름: <span>{{ enteredRoomName }}</span>
            </p>
          </section>

          <section class="chat-list" v-if="!isLoading">
            <template v-for="message in messages" :key="message">
              <div
                style="
                  width: 100%;
                  min-height: 60px;
                  margin: 10px;
                  padding: 10px;
                "
              >
                <div style="background: rgb(75 209 71 / 23%); min-height: 60px">
                  {{ message }}
                </div>
              </div>
            </template>
          </section>

          <base-spinner v-else />

          <section class="chat-input-area">
            <input
              class="chat-input"
              type="text"
              @keyup.enter="send"
              v-model="textMessage"
            />
            <button class="chat-input-send-btn" @click="send">보내기</button>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { Client } from "@stomp/stompjs";

export default {
  name: "chat-view",
  setup() {
    const store = useStore();
    const activeRoomTab = ref("ALL");
    const rooms = ref([]);
    const enteredRooms = ref([]);
    const isLoading = ref(false);
    const currentRoom = ref(null);
    const websocketClient = ref(null);
    const textMessage = ref("");
    const messages = ref([]);
    const activatedRoomTab = computed(() =>
      activeRoomTab.value === "ALL" ? "active-all-room" : "all-room"
    );
    const activatedEnteredTab = computed(() =>
      activeRoomTab.value === "MINE" ? "active-my-room" : "my-room"
    );
    const isAllTab = computed(() => activeRoomTab.value === "ALL");
    const enteredRoomName = computed(() =>
      currentRoom.value ? currentRoom.value.name : ""
    );
    const loadRooms = async () => {
      try {
        await store.dispatch("user/loadRooms");
        await store.dispatch("user/loadEnteredRooms");
        rooms.value = store.getters["user/rooms"];
        enteredRooms.value = store.getters["user/enteredRooms"];
      } catch (error) {

      }
    };
    const activeTab = (tab) => {
      activeRoomTab.value = tab;
    };
    const openChatRoom = async (room) => {
      isLoading.value = true;
      await disconnect();
      currentRoom.value = room;
      clear();
      await connect();
    };
    const disconnect = () => {
      if (websocketClient.value) {
        websocketClient.value.publish({
          destination: `/pub/room/${currentRoom.value.id}/leave`,
          body: JSON.stringify({ message: textMessage.value, writer: "user1" }),
        });
        websocketClient.value.deactivate();
      }
    };
    const connect = () => {
      const url = "ws://localhost:8090/ws/init";
      websocketClient.value = new Client({
        brokerURL: url,
        connectHeaders: {
          "withCredentials": true,
        },
        onConnect: () => {
          websocketClient.value.subscribe(
            `/sub/room/${currentRoom.value.id}`,
            (msg) => {
              messages.value.push(msg.body);
            }
          );
          websocketClient.value.publish({
            destination: `/pub/room/${currentRoom.value.id}/entered`,
            body: JSON.stringify({
              message: textMessage.value,
              writer: "user1",
            }),
          });
          isLoading.value = false;
        },
        onWebSocketError: () => {
          isLoading.value = false;
        },
      });
      websocketClient.value.activate();
    };
    const send = () => {
      if (!websocketClient.value) return;
      websocketClient.value.publish({
        destination: `/pub/room/${currentRoom.value.id}`,
        body: JSON.stringify({ message: textMessage.value, writer: "user1" }),
      });
      textMessage.value = "";
    };
    const clear = () => {
      textMessage.value = "";
      messages.value = [];
    };
    onMounted(async () => {
      await loadRooms();
    });
    onBeforeUnmount(() => {
      disconnect();
    });
    return {
      activeRoomTab,
      rooms,
      enteredRooms,
      isLoading,
      currentRoom,
      websocketClient,
      textMessage,
      messages,
      activatedRoomTab,
      activatedEnteredTab,
      isAllTab,
      enteredRoomName,
      loadRooms,
      activeTab,
      openChatRoom,
      disconnect,
      connect,
      send,
      clear,
    };
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}
body {
  margin: 0;
}

html {
  font-family: "ROboto", sans-serif;
}

.wrap {
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.room-list {
  width: 400px;
  height: 600px;
  border: 1px solid black;
  margin-right: 2px;
}

.room-tab {
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
}

.all-room {
  border-radius: 5px;
  padding: 10px;
  background: rgba(154, 175, 154, 0.45);
  cursor: pointer;
}

.all-room:hover {
  background: rgba(0, 245, 0, 0.85);
}

.my-room {
  border-radius: 5px;
  padding: 10px;
  background: rgba(154, 175, 154, 0.45);
  cursor: pointer;
}
.active-my-room {
  border-radius: 5px;
  padding: 10px;
  background: rgba(0, 245, 0, 0.85);
  cursor: pointer;
}

.active-all-room {
  border-radius: 5px;
  padding: 10px;
  background: rgba(0, 245, 0, 0.85);
  cursor: pointer;
}

.my-room:hover {
  background: rgba(0, 245, 0, 0.85);
}

.room-item {
  width: 100%;
  height: 70px;
  background: #25ab25;
  border-radius: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.room-item:hover {
  background: #1bce1b;
}

.room-item > p {
  font-size: 20px;
  font-weight: 800;
  color: white;
}

.chat-area {
  width: 600px;
  height: 600px;
  border: 1px solid black;
}

.chat-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.chat-header {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid #c8c8e3;
  border-radius: 10px;
}

.chat-list {
  width: 100%;
  height: 100%;
  overflow: auto;
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid rgba(208, 185, 185, 0.34);
  padding: 10px;
}

.chat-input-area {
  width: 100%;
  height: 200px;
  background: white;
  padding: 20px;
}

.chat-input {
  height: 100%;
  width: 80%;
  margin-right: 20px;
  border-radius: 10px;
}

.chat-input-send-btn {
  height: 100%;
  width: calc(20% - 20px);
  border-radius: 10px;
  border-style: none;
}
</style>
