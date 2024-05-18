<template>
  <div :class="['chatbot-container', { active: isOpen }]">
    <div class="chatbot-header">
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
        "
      >
        <LottieAnimation
          @click="toggleChatbot"
          class="fixed-lottie"
          animationPath="src/assets/images/all-img/penguinLottie.json"
        />
        <span>챗봇 슈슈슉</span>
      </div>
      <button @click="toggleChatbot" class="close-button">
        <Icon icon="mdi:close" />
      </button>
    </div>
    <div class="chatbot-content" ref="chatContent">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['chat-message', message.type]"
      >
        <p style="overflow-wrap: break-word">{{ message.text }}</p>
      </div>
    </div>
    <div class="chatbot-input">
      <input
        v-model="inputMessage"
        @keyup.enter.prevent="sendMessage"
        type="text"
        placeholder="메시지를 입력하세요..."
      />
      <button @click="sendMessage">
        <Icon icon="mdi:send" class="chat-icon" />
      </button>
      <button
        @click="startVoiceRecognition"
        style="position: absolute; color: gray; background: none"
      >
        <Icon icon="mdi:microphone" class="chat-icon" />
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Icon from "@/components/icon";
import LottieAnimation from "@/components/UI/LottieAnimation.vue";

export default {
  components: {
    Icon,
    LottieAnimation,
  },
  data() {
    return {
      isOpen: false,
      inputMessage: "",
      isSending: false, // 메시지 전송 상태 추가
      messages: [
        { id: 1, text: "안녕하세요! 펭귄 슈슈슉이에요!", type: "bot" },
        {
          id: 2,
          text: "배송 조회, 설정, 방송 등 궁금한 것이 있다면 무엇이든 물어봐주세요!!",
          type: "bot",
        },
      ],
    };
  },
  methods: {
    toggleChatbot() {
      this.isOpen = !this.isOpen;
    },
    async sendMessage() {
      if (this.inputMessage.trim() !== "" && !this.isSending) {
        this.isSending = true; // 전송 상태 설정
        const userMessage = {
          id: this.messages.length + 1,
          text: this.inputMessage,
          type: "user",
        };
        this.messages.push(userMessage);
        this.scrollToBottom(); // 메시지 추가 후 스크롤 이동

        try {
          const response = await axios.post(
            "http://localhost:8090/openai/message",
            {
              message: this.inputMessage,
            }
          );
          const botMessage = {
            id: this.messages.length + 1,
            text: response.data.response,
            type: "bot",
          };
          this.messages.push(botMessage);
          this.scrollToBottom(); // 메시지 추가 후 스크롤 이동
        } catch (error) {
          console.error("Error:", error);
          const errorMessage = {
            id: this.messages.length + 1,
            text: "응답을 받지 못했습니다. 다시 시도해 주세요.",
            type: "bot",
          };
          this.messages.push(errorMessage);
          this.scrollToBottom(); // 메시지 추가 후 스크롤 이동
        }

        this.inputMessage = "";
        this.isSending = false; // 전송 상태 해제
      }
    },
    startVoiceRecognition() {
      // 음성 인식 기능 구현
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContent = this.$refs.chatContent;
        chatContent.scrollTop = chatContent.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 80px;
  right: -500px;
  width: 500px;
  height: 800px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0px 20px 20px 20px rgba(0, 0, 0, 0.1);
  transition: right 0.5s ease-in-out;
  z-index: 1000;
}

.chatbot-container.active {
  right: 40px;
}
.chatbot-header {
  border-radius: 1rem 1rem 0rem 0rem;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px;
}
.chatbot-content {
  display: flex;
  flex-direction: column;
  padding: 30px;
  overflow-y: auto;
  height: calc(100% - 120px);
}
.chatbot-input {
  display: flex;
  background-color: white;
  border-radius: 0rem 0rem 2rem 2rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  align-items: center;
  padding: 0 30px;
  padding-bottom: 30px;
}
.chatbot-input input {
  flex: 1;
  margin-right: 5px;
  border: 1px solid gray;
  border-radius: 10rem;
  padding-left: 3rem;
  height: 3rem;
}
.chatbot-input button {
  width: 3rem;
  height: 3rem;
  border: none;
  background-color: #04c947;
  color: white;
  border-radius: 100%;
  cursor: pointer;
}
.chatbot-input button:hover {
  background-color: #07772c;
}
.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  width: 1.4rem;
  height: 1.4rem;
  justify-self: flex-end;
}
.chat-message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
}
.chat-message.bot {
  background-color: #04c947;
  align-self: flex-start;
  color: whitesmoke;
  border-radius: 0rem 1rem 1rem 1rem;
}
.chat-message.user {
  background-color: #f1ede8;
  align-self: flex-end;
  border-radius: 1rem 1rem 0rem 1rem;
}
svg.iconify.iconify--mdi {
  display: none;
}
.chat-icon {
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.lottie-container.fixed-lottie {
  width: 3rem;
}
</style>
