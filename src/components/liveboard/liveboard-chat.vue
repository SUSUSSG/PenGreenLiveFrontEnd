<template>
  <div class="chat-card bg-white rounded pt-3 px-4 mt-4 pb-2" :style="{ height: cardHeight, width: cardWidth }">
    <div class="inline-flex justify-between items-center">
      <div class="text-base flex-grow">채팅</div>
      <div>
        <Button v-if="showEditButton" icon="fluent:add-48-filled" @click="editChatting"
          btnClass="btn-dark rounded-full p-0 h-8 w-8 flex items-center justify-center" />
      </div>
    </div>
    <div class="mt-3 mb-3">
      <Alert type="primary-light" dismissible>{{ notice }}</Alert>
    </div>
    <div class="scroll-wrapper">
      <div class="chat-container flex flex-col justify-end">
        <ul class="chat-messages">
          <li v-for="message in chatMessages" :key="message.seq" class="chat-message">
            <div class="chat-message-content">
              <span class="message-info flex items-center">
                <Icon v-if="showDeleteIcon" icon="heroicons:x-mark-20-solid" @click="deleteMessage(message.seq)"></Icon>
                <span class="chat-user-id">{{ message.userId }}</span>
                <span class="chat-text">{{ message.content }}</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat-input-container">
      <textarea type="text" placeholder="채팅을 입력하세요" v-model="newMessage" class="chat-input-field"
        @keyup.enter="sendChat" />
      <button type="button" class="chat-send-button" @click="sendChat">
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
            <Button type="button"
              class="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white rounded px-4 py-2 transition-colors duration-150"
              @click="submitNotice">
              등록
            </Button>
          </div>
        </div>
        <!-- 금칙어 설정 입력 필드 -->
        <div class="flex flex-col space-y-2 mb-4 mt-7">
          <label for="addChatOption" class="text-sm font-medium text-gray-700">금칙어 설정</label>
          <div class="flex items-center space-x-2">
            <input id="addChatOption" type="text" name="addChatOption" v-model="forbiddenword" placeholder="금칙어 입력"
              class="flex-grow block w-full min-w-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-l-md" />
            <Button type="button"
              class="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white rounded px-4 py-2 transition-colors duration-150"
              @click="submitForbiddenword">
              등록
            </Button>
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
import Modal from "@/components/Modal/index.vue"; // 정확한 경로로 모달 컴포넌트 임포트
import Textinput from "@/components/Textinput/index.vue";
import Icon from "@/components/Icon";

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
      default: '500px', // Default height if not provided
    },
    cardWidth: {
      type: String,
      default: '400px', // Default width if not provided
    },
    showDeleteIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      notice: "채팅 공지사항이 올라올 곳입니다.",
      isOpen: false, // 모달 상태,
      chatNotice: '',
      forbiddenword: '',
      forbiddenwordList: [],
      chatMessages: [
        // 샘플 채팅 데이터
        { seq: 1, userId: '혜지', content: '롯데 이겼어?', timestamp: '11:00 AM' },
        { seq: 2, userId: '민석', content: '아니 졌어', timestamp: '11:00 AM' },
        { seq: 3, userId: '소진', content: 'NC 이겼어?', timestamp: '11:00 AM' },
        { seq: 4, userId: '진욱', content: '아니 졌어', timestamp: '11:00 AM' },
        { seq: 5, userId: 'lorem', content: "의미없는 텍스트입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", timestamp: '11:01 AM' },
        { seq: 6, userId: 'lorem', content: "의미없는 텍스트입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", timestamp: '11:01 AM' },
        { seq: 7, userId: 'lorem', content: "의미없는 텍스트입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", timestamp: '11:01 AM' },
        { seq: 8, userId: 'lorem', content: "의미없는 텍스트입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", timestamp: '11:01 AM' },
        { seq: 9, userId: 'lorem', content: "의미없는 텍스트입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", timestamp: '11:01 AM' },
        { seq: 10, userId: 'lorem', content: "의미없는 텍스트입니다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", timestamp: '11:01 AM' },
      ],
      maxChatMessages: 50
    }
  },
  methods: {
    editChatting() {
      this.isOpen = true; // 모달 상태를 true로 설정하여 직접 열기
    },
    submitNotice() {
      if (this.chatNotice.trim()) {
        this.notice = this.chatNotice;
      }
    },
    submitForbiddenword() {
      if (this.forbiddenword.trim()) {
        this.forbiddenwordList.push(this.forbiddenword)
        this.forbiddenword = ''
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
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* 넘치는 내용이 없도록 함 */
}


.scroll-wrapper {
  flex-grow: 1;
  overflow-y: auto;
  /* Apply scroll to the wrapper */
}

.chat-container {
  flex-direction: column;
  justify-content: flex-end;
}

.chat-messages {}

.chat-message {
  background: #f9f9f9;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.chat-user-id {
  margin-left: 5px;
  font-weight: bold;
  color: #333;
}

.chat-text {
  margin-left: 0.5rem;
  /* margin-top: 0.5rem; */
  word-break: break-word;
}

.chat-input-container {
  padding: 0.5rem;
  background: #f4f4f4;
  border-top: 1px solid #ccc;
  display: flex;
}

.chat-input-field {
  flex: 1;
  border: none;
  padding: 0.5rem;
  background: white;
  border-radius: 0.25rem;
}

.chat-send-button {
  width: 2.5rem;
  height: 2.5rem;
  background: #3071a9;
  color: white;
  border: none;
  border-radius: 50%;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-send-button:hover {
  background: #265d8a;
}

.chat-container::-webkit-scrollbar {
  width: 12px;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
}
</style>
