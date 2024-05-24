<template>
  <div>
    <ScrollTopButton />
    <AIChatBot ref="chatbot" style="border-radius: 2rem 2rem 0 0" />

    <div class="border-container">
      <MenuHeaderNav />
      <hr />
      <DataTab @date-selected="handleDateSelect" />
      <hr />
      <div
        style="
          position: sticky;
          top: 5.5rem;
          z-index: 10;
          background-color: white;
        "
      >
        <Categories
          @category-selected="handleCategorySelect"
          style="padding-bottom: 1rem"
        />
        <hr />
      </div>
      <div class="content-wrapper">
        <template v-if="loading">
          <SkeletonCard v-for="n in 5" :key="n" />
        </template>
        <template v-else>
          <template v-if="liveData.length">
            <CardSchedule
              v-for="(item, index) in liveData"
              :key="index"
              :broadcastScheduledTime="item.broadcastScheduledTime"
              :broadcastImage="item.broadcastImage"
              :broadcastTitle="item.broadcastTitle"
              :benefitContent="item.benefitContent"
              :productNm="item.productNm"
              :productImage="item.productImage"
              :discountRate="item.discountRate"
              :discountPrice="item.discountPrice"
              :listPrice="item.listPrice"
              :channelNm="item.channelNm"
              :channelImage="item.channelImage"
              :channelSeq="item.channelSeq"
              :broadcastSeq="item.broadcastSeq"
            />
          </template>
          <template v-else>
            <p class="no-data-message">선택한 조건에 맞는 방송이 없습니다.</p>
          </template>
        </template>
        <hr class="mt-6" />
        <hr />
      </div>
      <div class="chatbot-wrapper">
        <LottieAnimation
          @click="toggleChatbot"
          class="fixed-lottie"
          animationPath="src/assets/images/all-img/penguinLottie.json"
        />
        <div class="lottie-title">
          <p>궁금한 것은 AI 슈슈슉에게 물어보세요!</p>
        </div>
      </div>
      <CustomFooter />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Categories from "@/components/Category/Categories.vue";
import CardSchedule from "@/components/Card/schedule-card.vue";
import MenuHeaderNav from "@/components/HeaderMain/menu-header-nav.vue";
import DataTab from "@/components/HeaderMain/date-tab.vue";
import ScrollTopButton from "@/components/Button/ScrollTopButton.vue";
import SkeletonCard from "@/components/Skeleton/Schedule-skeleton.vue";
import CustomFooter from "@/components/Footer/CustomFooter.vue";
import LottieAnimation from "@/components/UI/LottieAnimation.vue";
import AIChatBot from "@/components/Chatbot/AIChatBot.vue";

export default {
  components: {
    Categories,
    CardSchedule,
    MenuHeaderNav,
    DataTab,
    ScrollTopButton,
    SkeletonCard,
    CustomFooter,
    LottieAnimation,
    AIChatBot,
  },
  data() {
    return {
      liveData: [],
      selectedDate: null,
      selectedCategory: null,
      loading: true,
    };
  },
  created() {
    this.fetchLiveData();
  },
  mounted(){
    this.startHideTitleTimer();
  },
  watch: {
    selectedDate() {
      this.fetchLiveData();
    },
    selectedCategory() {
      this.fetchLiveData();
    },
  },
  methods: {
    handleDateSelect(date) {
      this.selectedDate = date;
    },
    handleCategorySelect(categoryCd) {
      this.selectedCategory = categoryCd;
    },
    async fetchLiveData() {
      this.loading = true;
      this.liveData = []; // 데이터 초기화
      try {
        const response = await axios.get("http://localhost:8090/schedule", {
          params: {
            scheduledDate: this.selectedDate,
            categoryCd: this.selectedCategory,
          },
        });
        if (Array.isArray(response.data)) {
          this.liveData = response.data.map((item) => ({
            ...item,
          }));
        }
      } catch (error) {
        console.error("Error fetching live data:", error);
      } finally {
        this.loading = false;
      }
    },
    arrayBufferToBase64(buffer) {
      let binary = "";
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    },
    toggleChatbot() {
      this.$refs.chatbot.toggleChatbot();
    },
    startHideTitleTimer() {
      setInterval(() => {
        const lottieTitle = document.querySelector(".lottie-title");
        const chatbotWrapper = document.querySelector(".chatbot-wrapper");
        if (lottieTitle) {
          lottieTitle.classList.add("opacity");
          setTimeout(() => {
            lottieTitle.style.display = "none";
          }, 500);
        }
        if (chatbotWrapper) {
          chatbotWrapper.classList.add("collapsed");
          setTimeout(() => {
            chatbotWrapper.classList.remove("collapsed");
            if (lottieTitle) {
              setTimeout(() => {
                lottieTitle.style.display = "block";
              }, 1500);
              setTimeout(() => {
                lottieTitle.classList.remove("opacity");
              }, 1500); // 1.5초 뒤에 천천히 나타나도록 함
            }
          }, 7500);
        }
      }, 15000); // 5초 후에 3초 간격으로 반복
    },
  },
};
</script>

<style scoped>
.border-container {
  width: 74%;
  margin: auto;
  border: 1px solid rgb(224, 224, 224);
  border-top: none;
}
.content-wrapper {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no-data-message {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 5rem;
  height: 100vh;
}
.under-category-section::-webkit-scrollbar {
  display: none;
}
.chatbot-wrapper {
  display: flex;
  width: 500px;
  background: rgb(255 255 255);
  height: fit-content;
  z-index: 998;
  position: fixed;
  bottom: 140px;
  right: 104px;
  flex-direction: row;
  align-items: center;
  border-radius: 10rem;
  gap: 1.5rem;
  font-size: 1.3rem;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  transition: width 2s ease-in-out; /* 애니메이션 추가 */
}
.fixed-lottie {
  width: 80px;
  height: 80px;
  cursor: pointer;
}

.lottie-title {
  width: fit-content;
  height: fit-content;
  text-align: center;
  font-weight: bold;
  transition: opacity 0.5s ease 1.5s; /* 1.5초 후에 나타나도록 트랜지션 추가 */
}
.opacity {
  opacity: 0;
}
.collapsed {
  width: 80px; /* 너비를 80px로 줄이기 */
}
</style>
