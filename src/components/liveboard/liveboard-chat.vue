<template>
  <div class="chat-card bg-white p-4">
    <div class="inline-flex justify-between items-center" :style="{ width: cardWidth }">
      <div class="text-base flex-grow">채팅</div>
      <div>
        <Button v-if="showEditButton" icon="fluent:add-48-filled" @click="editChatting"
          btnClass="btn-green rounded-full p-0 h-8 w-8 flex items-center justify-center" />
      </div>
    </div>
    <div class="mt-3 mb-3">
      <Alert class="green-alert" dismissible>{{ notice }}</Alert>
    </div>
    <div v-if="alertMessage" class="mt-3 mb-3">
      <Alert class="red-alert" dismissible>{{ alertMessage }}</Alert>
    </div>
    <div class="scroll-wrapper">
      <div class="chat-container flex flex-col justify-end">
        <ul class="chat-messages">
          <li v-for="message in chatMessages" :key="message.seq" class="chat-message flex">
            <div class="mr-2 flex items-center">
              <Icon v-if="showDeleteIcon" icon="heroicons:x-mark-20-solid" @click="deleteMessage(message.seq)"></Icon>
            </div>
            <div class="flex flex-row">
              <span class="chat-time">{{ message.time }}</span>
              <span class="chat-user-id">{{ message.writer }}</span>
              <span :class="{'chat-text': true, 'text-gray': message.message === '비속어가 포함된 채팅입니다.'}">
                {{ message.message }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat-input-container">
      <input type="text" :placeholder="isBlocked ? `채팅이 비활성화됨 (${remainingTime})` : '채팅을 입력하세요'" v-model="newMessage" class="chat-input-field"
        @keyup.enter.prevent="sendChat" :disabled="isBlocked" />
      <button type="button" class="chat-send-button" @click="sendChat" :disabled="isBlocked">
        <Icon icon="heroicons-outline:paper-airplane" class="transform rotate-[60deg]" />
      </button>
    </div>
    <!-- 모달 컴포넌트 추가 -->
    <Modal title="채팅 관리" :activeModal="isOpen" @close="isOpen = false">
      <template v-slot:default>
        <div class="flex flex-col space-y-2 mb-2">
          <label for="addChatNotice" class="text-sm font-medium text-gray-700">한줄 공지사항</label>
          <div class="flex items-center space-x-2">
            <input id="addChatNotice" type="text" name="addChatNotice" v-model="chatNotice" placeholder="공지사항을 입력하세요."
              class="flex-1 block w-full min-w-0 rounded-l-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            <Button btnClass="btn-primary btn-sm" @click="submitNotice">등록</Button>
          </div>
        </div>
        <!-- 금칙어 설정 입력 필드 -->
        <div class="flex flex-col space-y-2 mb-4 mt-7">
          <label for="addChatOption" class="text-sm font-medium text-gray-700">금칙어 설정</label>
          <div class="flex items-center space-x-2">
            <input id="addChatOption" type="text" name="addChatOption" v-model="forbiddenword" placeholder="금칙어 입력"
              class="flex-grow block w-full min-w-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-l-md" />
            <Button btnClass="btn-primary btn-sm" @click="submitForbiddenword">등록</Button>
          </div>
        </div>

        <!-- 금칙어 목록 -->
        <div class="space-y-2">
          <div v-for="(word, index) in forbiddenwordList" :key="index"
            class="flex items-center justify-between bg-gray-100 p-2 rounded">
            <span>{{ word }}</span>
            <button @click="removeForbiddenword(index)" class="bg-red-500 hover:bg-red-600 text-white rounded p-1">
              <Icon icon="heroicons-outline:x" />
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Card from "@/components/Card";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Modal from "@/components/Modal/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import Icon from "@/components/Icon";
import { Client } from "@stomp/stompjs";

export default {
  components: {
    Card,
    Alert,
    Button,
    Modal,
    Textinput,
    Icon
  },
  props: {
    showEditButton: {
      type: Boolean,
      default: true,
    },
    cardHeight: {
      type: String,
    },
    cardWidth: {
      type: String,
    },
    showDeleteIcon: {
      type: Boolean,
      default: true
    },
    currentRoom: {
      type: Object,
      default: () => ({ id: 1 })
    },
    currentWriter: {
      type: String,
      default: 'user'
    }
  },
  watch: {
    chatMessages: {
      handler() {
        this.$nextTick(() => {
          const container = this.$el.querySelector(".scroll-wrapper");
          container.scrollTop = container.scrollHeight;
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.connect();
  },

  beforeUnmount() {
    this.disconnect();
  },
  data() {
    return {
      notice: "채팅 공지사항이 올라올 곳입니다.",
      isOpen: false,
      chatNotice: '',
      forbiddenword: '',
      forbiddenwordList: [],
      newMessage: '',
      chatMessages: [],
      websocketClient: null,
      messageIdCounter: 1,
      lastMessage: '',
      repeatCount: 0,
      isBlocked: false,
      remainingTime: 10,
      spamTimeout: null,
      countdownInterval: null,
      alertMessage: '',
      messageTimestamps: []
    }
  },
  methods: {
    connect() {
      const url = "ws://localhost:8090/ws/init";
      this.websocketClient = new Client({
        brokerURL: url,
        onConnect: () => {
          this.websocketClient.subscribe(
            `/sub/room/${this.currentRoom.id}/notice`,
            (msg) => {
              const noticeData = JSON.parse(msg.body);
              this.notice = noticeData.message;  // 공지사항 업데이트
            }
          );
          this.websocketClient.subscribe(
          `/sub/room/${this.currentRoom.id}`,
          (msg) => {
            try {
              console.log("메시지 파싱 전");
              const parsedMessage = JSON.parse(msg.body); // JSON 파싱
              console.log("메시지 파싱 후", parsedMessage);

              // 메시지 객체에 작성자와 메시지 내용을 분리하여 추가
              this.chatMessages.push({
              seq: this.messageIdCounter++,
              writer: parsedMessage.writer, // 작성자 ID
              message: parsedMessage.message, // 메시지 내용
              time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) // 현재 시간 정보
            }); 

            } catch (e) {
              console.error("메시지 파싱 중 에러 발생:", e);
              // 파싱 에러 발생 시 기본 정보로 메시지 추가
              this.chatMessages.push({
                seq: this.messageIdCounter++,
                writer: "System",
                message: "메시지를 파싱할 수 없습니다."
              });
            }
          }
        );

          this.websocketClient.publish({
            destination: `/pub/room/${this.currentRoom.id}/entered`,
            body: JSON.stringify({ message: "입장했습니다.", writer: this.currentWriter }),
          });
        },
        onWebSocketError: (error) => {
          console.error('WebSocket Error:', error);
        },
      });
      this.websocketClient.activate();
    },

    disconnect() {
      if (this.websocketClient) {
        this.websocketClient.deactivate();
      }
    },

    sendChat() {
      if (!this.websocketClient || !this.newMessage.trim() || this.isBlocked) {
        return;
      }

      const now = Date.now();
      this.messageTimestamps.push(now);

      // Check for spamming within 3 seconds
      this.messageTimestamps = this.messageTimestamps.filter(timestamp => now - timestamp <= 3000);
      if (this.messageTimestamps.length >= 5) {
        this.isBlocked = true;
        this.remainingTime = 10;
        this.alertMessage = `도배 방지로 채팅이 비활성화되었습니다. ${this.remainingTime}초 남았습니다.`;
        this.spamTimeout = setTimeout(this.resetSpamBlock, 10000);
        this.countdownInterval = setInterval(() => {
          this.remainingTime--;
          if (this.remainingTime > 0) {
            this.alertMessage = `도배 방지로 채팅이 비활성화되었습니다. ${this.remainingTime}초 남았습니다.`;
          } else {
            clearInterval(this.countdownInterval);
          }
        }, 1000);
        return;
      }

      if (this.newMessage === this.lastMessage) {
        this.repeatCountthis.repeatCount++;
      } else {
        this.repeatCount = 1;
        this.lastMessage = this.newMessage;
      }

      if (this.repeatCount >= 3) {
        this.isBlocked = true;
        this.remainingTime = 10;
        this.alertMessage = `도배 방지로 채팅이 비활성화되었습니다. ${this.remainingTime}초 남았습니다.`;
        this.spamTimeout = setTimeout(this.resetSpamBlock, 10000);
        this.countdownInterval = setInterval(() => {
          this.remainingTime--;
          if (this.remainingTime > 0) {
            this.alertMessage = `도배 방지로 채팅이 비활성화되었습니다. ${this.remainingTime}초 남았습니다.`;
          } else {
            clearInterval(this.countdownInterval);
          }
        }, 1000);
        return;
      }

      this.websocketClient.publish({
        destination: `/pub/room/${this.currentRoom.id}`,
        body: JSON.stringify({ message: this.newMessage, writer: this.currentWriter }),
      });
      this.newMessage = ""; // 입력 필드 초기화
    },

    resetSpamBlock() {
      this.isBlocked = false;
      this.repeatCount = 0;
      this.lastMessage = '';
      this.messageTimestamps = [];
      this.alertMessage = '';
      clearInterval(this.countdownInterval);
    },

    editChatting() {
      this.isOpen = true;
    },

    submitNotice() {
      if (this.chatNotice.trim()) {
        this.notice = this.chatNotice;
        const noticeMessage = {
          type: 'NOTICE',
          message: this.chatNotice,
          writer: 'System'
        };
        this.websocketClient.publish({
          destination: `/pub/room/${this.currentRoom.id}/notice`,
          body: JSON.stringify(noticeMessage),
        });
        this.chatNotice = '';  // 입력 필드 초기화
      }
    },


    submitForbiddenword() {
      if (this.forbiddenword.trim()) {
        this.forbiddenwordList.push(this.forbiddenword);
        this.forbiddenword = '';
      }
    },

    removeForbiddenword(index) {
      this.forbiddenwordList.splice(index, 1);
    },

    deleteMessage(seq) {
      this.chatMessages = this.chatMessages.filter(message => message.seq !== seq);
    }
  }
}
</script>

<style>
.chat-card {
  width: 100%;
  height: 850px;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.scroll-wrapper {
  flex-grow: 1;
  overflow-y: auto;
  height: 100%;
}

.chat-container {
  flex-direction: column;
  justify-content: flex-end;
}

.chat-message {
  padding: 0.5rem 0;
}

.chat-user-id {
  font-weight: bold;
  font-size: 16px;
  color: #23A100;
  margin-left: 8px;
  text-wrap: nowrap;
}

.chat-text {
  word-break: break-word;
  margin-left: 12px;
}

.chat-time {
  font-size: 10px;
  color: #888;
  overflow-wrap: unset;
  text-wrap: nowrap;
  margin-top: 4px;
}

.chat-input-container {
  display: flex;
  margin-top: 3px;
}

.chat-input-field {
  flex: 1;
  border: 1px solid;
  background: white;
  border-radius: 5rem;
  height: 40px;
  align-content: center;
  padding-left: 1rem;
  resize: none;
  overflow-y: hidden;
}

.chat-input-field::after {
  border-color: #1C6D16;
}

.chat-input-field::-webkit-scrollbar-track {
  background: transparent;
}

.chat-send-button {
  width: 2.5rem;
  height: 2.5rem;
  background: #1C6D16;
  color: white;
  border: none;
  border-radius: 50%;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-gray {
    color: #c3c3c3;
  }
.chat-send-button:hover {
  background: #265d8a;
}

.btn-green {
  background-color: #134010;
  color: white;
}

.green-alert {
  color: #134010;
  background-color: rgba(19, 64, 16, 0.2);
}

.red-alert {
  color: #D32F2F;
  background-color: rgba(211, 47, 47, 0.2);
}

.py-\[18px\] {
  padding: 13px;
}

.text-base {
  font-weight: bold;
}
</style>