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
    <div class="chatbot-content">
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
        type="text"
        placeholder="메시지를 입력하세요..."
      />
      <button @click="sendMessage">
        <Icon icon="mdi:send" class="chat-icon"/>
      </button>
      <button @click="startVoiceRecognition" style="position:absolute; color: black; background:none;">
        <Icon icon="mdi:microphone" class="chat-icon"/>
      </button>
    </div>
  </div>
</template>

<script>
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
      messages: [
        { id: 1, text: "안녕하세요! 무엇을 도와드릴까요?", type: "bot" },
        {
          id: 2,
          text: "안녕하세요! 주문 상태를 확인하고 싶어요.",
          type: "user",
        },
        { id: 3, text: "주문 번호를 입력해 주세요.", type: "bot" },
      ],
    };
  },
  methods: {
    toggleChatbot() {
      this.isOpen = !this.isOpen;
    },
    sendMessage() {
      if (this.inputMessage.trim() !== "") {
        this.messages.push({
          id: this.messages.length + 1,
          text: this.inputMessage,
          type: "user",
        });
        this.inputMessage = "";
        // 여기에 실제 메시지를 처리하는 로직 추가
      }
    },
    startVoiceRecognition() {
      // 음성 인식 기능 구현
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
  padding: 20px 30px;
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
  border-radius: 0rem 0rem 1rem 1rem;
  height: 5rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  align-items: center;
  padding: 0 1rem;
}
.chatbot-input input {
  flex: 1;
  margin-right: 5px;
  border: 1px solid black;
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
.chat-icon{
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
