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
        v-for="(message, index) in messages"
        :key="index"
        :class="['chat-message', message.type]"
      >
        <p
          v-if="message.type !== 'component'"
          style="overflow-wrap: break-word"
        >
          {{ message.text }}
        </p>
        <component :is="message.component" v-else />
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
import OrderHistory from "@/components/Chatbot/OrderHistory.vue";
import Profile from "@/components/Chatbot/Profile.vue";
import Refund from "@/components/Chatbot/Refund.vue";
export default {
  components: {
    Icon,
    LottieAnimation,
    OrderHistory,
    Profile,
    Refund,
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
            const botMessage = {
              id: this.messages.length + 1,
              text: "주문 정보를 조회해볼게요! 잠시만 기다려주세요!!",
              type: "bot",
            };
            this.messages.push(botMessage);
            const orderHistoryMessage = {
              id: this.messages.length + 1,
              type: "component",
              component: OrderHistory,
            };
            this.messages.push(orderHistoryMessage);
            const afterBotMessage = {
              id: this.messages.length + 1,
              text: "주문 내역을 가져왔어요! 도움이 더 필요하시다면 언제든 말씀해주세요😆",
              type: "bot",
            };
            this.messages.push(afterBotMessage);
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          } else if (botMessageText.includes("@프로필")) {
            const botMessage = {
              id: this.messages.length + 1,
              text: "개인정보와 관련된 설정은 '정보수정' 페이지에서 가능해요! 페이지로 이동하시겠어요?",
              type: "bot",
            };
            this.messages.push(botMessage);
            const orderHistoryMessage = {
              id: this.messages.length + 1,
              type: "component",
              component: Profile,
            };
            this.messages.push(orderHistoryMessage);
            const afterBotMessage = {
              id: this.messages.length + 1,
              text: "다른 도움이 필요하시다면 말씀해주세요!!",
              type: "bot",
            };
            this.messages.push(afterBotMessage);
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          } else if (botMessageText.includes("@환불")) {
            const botMessage = {
              id: this.messages.length + 1,
              text: "환불과 관련된 정책은 구매하신 상품의 판매 채널에 따라 상이하여 '펭그린라이브'에서 직접 환불 처리를 진행하지 않는 점 참고 부탁드려요.",
              type: "bot",
            };
            this.messages.push(botMessage);
            const botMessage2 = {
              id: this.messages.length + 1,
              text: "그 대신에 최근에 구매한 상품의 채널 정보를 알려드릴게요.",
              type: "bot",
            };
            this.messages.push(botMessage2);
            const orderHistoryMessage = {
              id: this.messages.length + 1,
              type: "component",
              component: Refund,
            };
            this.messages.push(orderHistoryMessage);
            const afterBotMessage = {
              id: this.messages.length + 1,
              text: "이외에 궁금한 점이 있다면 질문해주세요!! 슈슈슉이 답변드릴게요🙌",
              type: "bot",
            };
            this.messages.push(afterBotMessage);
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          } else if (botMessageText.includes("@방송")) {
            
          } else if (botMessageText.includes("@환경이야기")) {
            
          } else if (botMessageText.includes("@시청기록")) {
            
          } else if (botMessageText.includes("@결제수단")) {
            
          } else {
            const botMessage = {
              id: this.messages.length + 1,
              text: botMessageText,
              type: "bot",
            };
            this.messages.push(botMessage);
          }
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

.chat-message.component {
  min-width: 440px;
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
