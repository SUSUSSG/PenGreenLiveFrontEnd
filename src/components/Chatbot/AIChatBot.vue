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
        <p style="overflow-wrap: break-word">
          {{ message.text }}
        </p>
      </div>
      <OrderHistory v-if="showOrderHistoryComponent" />
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
import OrderHistory from "@/components/Chatbot/OrderHistory.vue";

export default {
  components: {
    Icon,
    LottieAnimation,
    OrderHistory, // 주문 내역 컴포넌트 추가
  },
  data() {
    return {
      isOpen: false,
      inputMessage: "",
      isSending: false,
      messages: [
        { id: 1, text: "안녕하세요! 펭귄 슈슈슉이에요!", type: "bot" },
        {
          id: 2,
          text: "배송 조회, 설정, 방송 등 궁금한 것이 있다면 무엇이든 물어봐주세요!!",
          type: "bot",
        },
      ],
      recognition: null,
      showOrderHistoryComponent: false, // 주문 내역 컴포넌트 표시 여부 상태 추가
    };
  },
  mounted() {
    if ("webkitSpeechRecognition" in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.lang = "ko-KR";
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.inputMessage = transcript;
        this.sendMessage();
      };

      this.recognition.onerror = (event) => {
        console.error("Speech recognition error", event);
      };

      this.recognition.onend = () => {
        if (this.isOpen) {
          this.recognition.start();
        }
      };
    } else {
      console.error(
        "webkitSpeechRecognition is not supported in this browser."
      );
    }
  },
  methods: {
    toggleChatbot() {
      this.isOpen = !this.isOpen;
      if (!this.isOpen && this.recognition) {
        this.recognition.stop();
      }
    },
    async sendMessage() {
      if (this.inputMessage.trim() !== "" && !this.isSending) {
        this.isSending = true;
        const userMessage = {
          id: this.messages.length + 1,
          text: this.inputMessage,
          type: "user",
        };
        this.messages.push(userMessage);
        this.scrollToBottom();

        try {
          const response = await axios.post(
            "http://localhost:8090/openai/message",
            {
              message: this.inputMessage,
            }
          );
          let botMessageText = response.data.response;
          if (botMessageText.includes("@주문내역")) {
            botMessageText =
              "구매하신 상품의 주문 상태를 확인해드릴게요!🧐 잠시만 기다려주세요😀";
            this.showOrderHistoryComponent = true; // 주문 내역 컴포넌트 표시
          }
          const botMessage = {
            id: this.messages.length + 1,
            text: botMessageText,
            type: "bot",
          };
          this.messages.push(botMessage);
          this.scrollToBottom();
        } catch (error) {
          console.error("Error:", error);
          const errorMessage = {
            id: this.messages.length + 1,
            text: "응답을 받지 못했습니다. 다시 시도해 주세요.",
            type: "bot",
          };
          this.messages.push(errorMessage);
          this.scrollToBottom();
        }

        this.inputMessage = "";
        this.isSending = false;
      }
    },
    startVoiceRecognition() {
      if (this.recognition) {
        this.recognition.start();
      } else {
        console.error("Speech recognition not initialized.");
      }
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
