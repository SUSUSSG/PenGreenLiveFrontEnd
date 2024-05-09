<template>
  <!-- 채팅 카드 전체 컨테이너 -->
  <div class="chat-card bg-white p-4">
    <!-- 채팅 헤더 -->
    <div class="inline-flex justify-between items-center" :style="{ width: cardWidth }">
      <div class="text-base flex-grow">채팅</div>
      <div>
        <!-- 채팅 편집 버튼 -->
        <Button v-if="showEditButton" icon="fluent:add-48-filled" @click="editChatting"
          btnClass="btn-green rounded-full p-0 h-8 w-8 flex items-center justify-center" />
      </div>
    </div>
    <!-- 채팅 공지사항 영역 -->
    <div class="mt-3 mb-3">
      <Alert class="green-alert" dismissible>{{ notice }}</Alert>
    </div>
    <!-- 채팅 메시지 스크롤 영역 -->
    <div class="scroll-wrapper">
      <div class="chat-container flex flex-col justify-end">
        <ul class="chat-messages">
          <!-- 채팅 메시지 반복 출력 -->
          <li v-for="message in chatMessages" :key="message.seq" class="chat-message flex">
            <div class="mr-2 flex items-center">
              <!-- 메시지 삭제 아이콘 -->
              <Icon v-if="showDeleteIcon" icon="heroicons:x-mark-20-solid" @click="deleteMessage(message.seq)"></Icon>
            </div>
            <div class="flex flex-col">
              <span class="chat-user-id">{{ message.userId }}</span>
              <span class="chat-text">{{ message.content }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 채팅 입력 영역 -->
    <div class="chat-input-container">
      <textarea type="text" placeholder="채팅을 입력하세요" v-model="newMessage" class="chat-input-field"
        @keyup.enter="sendChat" />
      <button type="button" class="chat-send-button" @click="sendChat">
        <Icon icon="heroicons-outline:paper-airplane" class="transform rotate-[60deg]" />
      </button>
    </div>
    <!-- 채팅 관리 모달 -->
    <Modal title="채팅 관리" :activeModal="isOpen" @close="isOpen = false">
      <template v-slot:default>
        <!-- 한줄 공지사항 입력 영역 -->
        <div class="flex flex-col space-y-2 mb-2">
          <label for="addChatNotice" class="text-sm font-medium text-gray-700">한줄 공지사항</label>
          <div class="flex items-center space-x-2">
            <input id="addChatNotice" type="text" name="addChatNotice" v-model="chatNotice" placeholder="공지사항을 입력하세요."
              class="flex-1 block w-full min-w-0 rounded-l-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            <Button btnClass="btn-primary btn-sm" @click="submitNotice">등록</Button>
          </div>
        </div>
        <!-- 금칙어 설정 입력 영역 -->
        <div class="flex flex-col space-y-2 mb-4 mt-7">
          <label for="addChatOption" class="text-sm font-medium text-gray-700">금칙어 설정</label>
          <div class="flex items-center space-x-2">
            <input id="addChatOption" type="text" name="addChatOption" v-model="forbiddenword" placeholder="금칙어 입력"
              class="flex-grow block w-full min-w-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-l-md" />
            <Button btnClass="btn-primary btn-sm" @click="submitForbiddenword">등록</Button>
          </div>
        </div>
        <!-- 금칙어 목록 출력 영역 -->
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
    // 부모 컴포넌트로부터 받는 속성들
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
    }
  },
  data() {
    return {
      // 데이터 모델 정의
      notice: "채팅 공지사항이 올라올 곳입니다.",
      isOpen: false, // 모달 상태
      chatNotice: '',
      forbiddenword: '',
      forbiddenwordList: [],
      chatMessages: [
        // 샘플 채팅 데이터
        { seq: 1, userId: '혜지', content: '롯데 이겼어?', timestamp: '11:00 AM' },
        { seq: 2, userId: '민석', content: '아니 또 졌어', timestamp: '11:01 AM' },
        { seq: 3, userId: '소진', content: 'NC 이겼어?', timestamp: '11:01 AM' },
        { seq: 4, userId: '진욱', content: '아니 졌어', timestamp: '11:02 AM' },
      ],
      maxChatMessages: 50
    }
  },
  methods: {
    // 메소드 정의
    editChatting() {
      this.isOpen = true; // 모달 상태를 true로 설정하여 직접 열기
    },
    submitNotice() {
      // 공지사항 등록
      if (this.chatNotice.trim()) {
        this.notice = this.chatNotice;
      }
    },
    submitForbiddenword() {
      // 금칙어 등록
      if (this.forbiddenword.trim()) {
        this.forbiddenwordList.push(this.forbiddenword)
        this.forbiddenword = ''
      }
    },
    removeForbiddenword(index) {
      // 금칙어 목록에서 제거
      this.forbiddenwordList.splice(index, 1);
    },
    deleteMessage(seq) {
      // 메시지 삭제
      this.chatMessages = this.chatMessages.filter(message => message.seq !== seq);
    }
  }
}
</script>
<style>
/* 채팅 카드 스타일 */
.chat-card {
  width: 100%;
  height: 850px;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 스크롤바 숨김 처리 */
.scroll-wrapper::-webkit-scrollbar {
  display: none;
}

/* 채팅 메시지 컨테이너 스타일 */
.chat-container {
  padding: 0.3rem;
  flex-direction: column;
  justify-content: flex-end;
}

/* 채팅 메시지 스타일 */
.chat-message {
  padding: 0.5rem;
}

/* 사용자 ID 스타일 */
.chat-user-id {
  font-weight: bold;
  font-size: 13px;
  color: #23A100;
}

/* 채팅 텍스트 스타일 */
.chat-text {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  word-break: break-word;
}

/* 채팅 입력 영역 스타일 */
.chat-input-container {
  padding: 0.5rem;
  background: #f4f4f4;
  border-top: 1px solid #ccc;
  display: flex;
}

/* 채팅 입력 필드 스타일 */
.chat-input-field {
  flex: 1;
  border: none;
  padding: 0.5rem;
  background: white;
  border-radius: 0.25rem;
}

/* 채팅 전송 버튼 스타일 */
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

/* 전송 버튼 호버 효과 */
.chat-send-button:hover {
  background: #265d8a;
}

/* 추가된 스타일 */
.btn-green {
  background-color: #134010;
  color: white;
}

.green-alert {
  color: #134010;
  background-color: rgba(19, 64, 16, 0.2);
}

.chat-input-container {
  background-color: rgba(19, 64, 16, 0.2);
  border-top: 0px;
  margin-top: 3px;
}

.chat-send-button {
  background-color: #134010;
}

.text-base {
  font-weight: bold;
}
</style>