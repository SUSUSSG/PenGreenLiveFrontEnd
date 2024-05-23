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
          animationPath="/src/assets/images/all-img/penguinLottie.json"
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
        <component :is="message.component" v-bind="message.props" v-else />
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
import { markRaw } from "vue"; // markRaw 가져오기
import Icon from "@/components/Icon/index.vue";
import LottieAnimation from "@/components/UI/LottieAnimation.vue";
import OrderHistory from "@/components/Chatbot/OrderHistory.vue";
import Profile from "@/components/Chatbot/Profile.vue";
import Refund from "@/components/Chatbot/Refund.vue";
import BroadcastCard from "@/components/Chatbot/Broadcast.vue";
import RecentViewedBroadcasts from "@/components/Chatbot/RecentViewedBroadcasts.vue";
import Payment from "@/components/Chatbot/Payment.vue";
export default {
  components: {
    Icon: markRaw(Icon),
    LottieAnimation: markRaw(LottieAnimation),
    OrderHistory: markRaw(OrderHistory),
    Profile: markRaw(Profile),
    Refund: markRaw(Refund),
    BroadcastCard: markRaw(BroadcastCard),
    RecentViewedBroadcasts : markRaw(RecentViewedBroadcasts),
    Payment : markRaw(Payment),
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
              component: markRaw(OrderHistory),
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
            const profileMessage = {
              id: this.messages.length + 1,
              type: "component",
              component: markRaw(Profile),
            };
            this.messages.push(profileMessage);
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
            const refundMessage = {
              id: this.messages.length + 1,
              type: "component",
              component: markRaw(Refund),
            };
            this.messages.push(refundMessage);
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
            const [, Broadcastkeyword] = botMessageText.split(",");

            // 디버깅을 위해 console.log 추가
            console.log("Broadcastkeyword:", Broadcastkeyword);

            // Broadcastkeyword가 정의되지 않았거나 빈 문자열일 때 기본 값을 설정합니다.
            const keyword = Broadcastkeyword?.trim() || "default_keyword";
            console.log("keyword:", keyword);

            const botMessage = {
              id: this.messages.length + 1,
              text: `${keyword}와(과) 관련된 방송을 찾아드릴게요!! 잠시만 기다려주세요!`,
              type: "bot",
            };
            this.messages.push(botMessage);

            const broadcastMessage = {
              id: this.messages.length + 1,
              type: "component",
              component: markRaw(BroadcastCard),
              props: { keyword },
            };
            this.messages.push(broadcastMessage);

            const afterBotMessage = {
              id: this.messages.length + 1,
              text: "도움이 필요하면 언제든지 불러주세요!",
              type: "bot",
            };
            this.messages.push(afterBotMessage);
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          } else if (botMessageText.includes("@환경이야기")) {
            setTimeout(() => {
              const botMessage = {
                id: this.messages.length + 1,
                text: "환경과 관련된 이야기를 원하시는군요! 어느 펭귄 한 마리의 이야기를 들려드릴게요...",
                type: "bot",
              };
              this.messages.push(botMessage);
              setTimeout(() => {
                this.scrollToBottom();
              }, 100);
            }, 100);
            setTimeout(() => {
              const botMessage = {
                id: this.messages.length + 1,
                text: "어느 날, 남극 대륙의 하얀 눈밭에서 평화롭게 생활하던 펭귄들이 큰 변화를 맞이하게 되었습니다. 이상하게도, 날씨가 점점 따뜻해지더니 펭귄들이 사랑하는 얼음과 눈이 서서히 녹아내리기 시작했습니다. 처음엔 그저 일시적인 현상이라 생각했지만, 점점 빙하가 녹아내리는 속도는 빨라졌습니다. 펭귄들의 집이 점점 사라져갔습니다.",
                type: "bot",
              };
              this.messages.push(botMessage);
              setTimeout(() => {
                this.scrollToBottom();
              }, 100);
            }, 3000);
            setTimeout(() => {
              const botMessage = {
                id: this.messages.length + 1,
                text: "펭귄들은 새로운 집을 찾아 헤매야 했습니다. 매일같이 조금씩 줄어드는 얼음과 눈을 보며 그들의 마음은 무거워졌습니다. 빙하가 녹으면 바다도 따뜻해지고, 그로 인해 물고기들도 서식지를 옮기게 되어 펭귄들의 식량도 점점 부족해졌습니다. 펭귄들은 더 이상 이대로 있을 수 없었습니다.",
                type: "bot",
              };
              this.messages.push(botMessage);
              setTimeout(() => {
                this.scrollToBottom();
              }, 100);
            }, 8000);
            setTimeout(() => {
              const botMessage = {
                id: this.messages.length + 1,
                text: "한편, 지구 반대편에서는 지구 온난화에 대해 심각하게 고민하던 사람들이 있었습니다. 이들은 지구의 환경을 보호하고자 친환경 제품을 개발하기 시작했습니다. 재생 가능 에너지를 사용하고, 일회용 플라스틱 대신 지속 가능한 소재를 사용하며, 에너지 절약을 실천하는 다양한 방법들을 고안해냈습니다. 사람들은 이러한 노력을 통해 환경 파괴 요소를 줄여나가고 있었습니다.",
                type: "bot",
              };
              this.messages.push(botMessage);
              setTimeout(() => {
                this.scrollToBottom();
              }, 100);
            }, 16000);
            setTimeout(() => {
              const botMessage = {
                id: this.messages.length + 1,
                text: "이러한 변화는 서서히 효과를 보기 시작했습니다. 사람들의 노력 덕분에 탄소 배출량이 줄어들었고, 지구의 온도가 서서히 안정화되었습니다. 남극의 빙하가 더 이상 녹지 않게 되자 펭귄들은 서서히 자신들의 집을 되찾아갔습니다. 여전히 어려움은 많았지만, 희망을 잃지 않고 서로 도우며 살아갔습니다.",
                type: "bot",
              };
              this.messages.push(botMessage);
              setTimeout(() => {
                this.scrollToBottom();
              }, 100);
            }, 24000);
            setTimeout(() => {
              const botMessage = {
                id: this.messages.length + 1,
                text: "그리고 어느 날, 펭귄들에게 새로운 소식이 전해졌습니다. 인간들이 지구 온난화를 막기 위해 열심히 노력하고 있다는 것이었습니다. 펭귄들은 이제 자신들의 미래가 더 밝아졌음을 알게 되었습니다. 다시 말해, 더 오랜 시간 동안 이 아름다운 남극에서 행복하게 살 수 있다는 뜻이었습니다.",
                type: "bot",
              };
              this.messages.push(botMessage);
              setTimeout(() => {
                this.scrollToBottom();
              }, 100);
            }, 32000);
            setTimeout(() => {
              const botMessage = {
                id: this.messages.length + 1,
                text: "펭귄들은 다시 평화를 찾았습니다. 깨끗한 얼음 위에서 미끄럼을 타고, 차가운 바닷물에서 수영을 즐기며, 무리를 지어 함께 살아가는 그들의 일상은 다시금 즐거움으로 가득 차게 되었습니다. 인간들의 노력 덕분에 펭귄들은 행복한 날들을 맞이할 수 있었습니다.",
                type: "bot",
              };
              this.messages.push(botMessage);
              setTimeout(() => {
                this.scrollToBottom();
              }, 100);
            }, 40000);
            setTimeout(() => {
              const botMessage = {
                id: this.messages.length + 1,
                text: "이제 펭귄들은 더 이상 두려워하지 않았습니다. 지구의 환경을 지키려는 인간들의 노력이 계속된다면, 그들의 행복한 날들도 영원히 이어질 것이라는 희망을 품고 있었습니다. 이렇게 펭귄들은 다시 한번 희망과 행복을 찾으며 남극의 평화로운 일상을 이어나갔습니다. -끝-",
                type: "bot",
              };
              this.messages.push(botMessage);
              setTimeout(() => {
                this.scrollToBottom();
              }, 100);
            }, 48000);
            setTimeout(() => {
              const botMessage = {
                id: this.messages.length + 1,
                text: "제 이야기를 들어주셔서 감사합니다~! 다른 도움이 필요하신게 있다면 말씀해주세요!!",
                type: "bot",
              };
              this.messages.push(botMessage);
              setTimeout(() => {
                this.scrollToBottom();
              }, 100);
            }, 53000);
          } else if (botMessageText.includes("@시청기록")) {
            const botMessage = {
              id: this.messages.length + 1,
              text: "최근에 시청한 방송 기록을 보여드릴게요📺",
              type: "bot",
            };
            this.messages.push(botMessage);
            const broadcastMessage = {
              id: this.messages.length + 1,
              type: "component",
              component: markRaw(RecentViewedBroadcasts),
            };
            this.messages.push(broadcastMessage);
            const afterBotMessage = {
              id: this.messages.length + 1,
              text: "최근 시청기록을 가져왔어요~ 다른 도움이 필요하시면 말씀해주세요 :)",
              type: "bot",
            };
            this.messages.push(afterBotMessage);
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          } else if (botMessageText.includes("@결제수단")) {
            const botMessage = {
              id: this.messages.length + 1,
              text: "결제수단 관리는 마이페이지의 결제수단 관리에서 가능해요!",
              type: "bot",
            };
            this.messages.push(botMessage);
            const brandpayMessage = {
              id: this.messages.length + 1,
              type: "component",
              component: markRaw(Payment),
            };
            this.messages.push(brandpayMessage);
            const afterBotMessage = {
              id: this.messages.length + 1,
              text: "도움이 필요하시다면 언제든지 불러주세요~!",
              type: "bot",
            };
            this.messages.push(afterBotMessage);
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
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
