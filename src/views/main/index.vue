<template>
  <section class="border-container">
    <ScrollTopButton />
    <MenuHeaderNav />
    <hr />
    <div>
      <swiper
        v-if="!loadingCarousels"
        :slidesPerView="'auto'"
        :centeredSlides="true"
        :spaceBetween="0"
        :pagination="{ clickable: true }"
        class="main-caro"
        :loop="false"
        :navigation="false"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
      >
        <swiper-slide
          v-for="(item, index) in carousels"
          :key="index"
          class="carousel-slide"
        >
          <div class="slide-background">
            <img
              :src="item.broadcastImage"
              :style="{
                filter:
                  'blur(30px) brightness(110%) saturate(110%) contrast(90%)',
                position: 'absolute',
                width: '100%',
                'z-index': '0',
                height: '100%',
              }"
            />
            <img
              :src="item.broadcastImage"
              alt="Carousel Image"
              class="background-image"
            />
            <div class="slide-content">
              <div style="display: flex; flex-direction: column; width: 100%">
                <h4 v-if="item.broadcastTitle">{{ item.broadcastTitle }}</h4>
                <p v-if="item.broadcastSummary">{{ item.broadcastSummary }}</p>
              </div>
              <div class="additional-images-container">
                <div
                  v-for="(product, subIndex) in item.products"
                  :key="'product-' + index + '-' + subIndex"
                >
                  <img :src="product.productImage" class="additional-image" />
                  <div
                    class="additional-image-title"
                    style="
                      width: 100px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ product.productNm }}
                  </div>
                  <div class="additional-image-price">
                    {{ formatPrice(product.discountPrice) }}원
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div
        v-else
        class="skeleton-container"
        style="padding: 0px !important; margin: 0px !important"
      >
        <SkeletonMainCarousel />
      </div>
    </div>

    <section class="under-category-section">
      <hr class="mb-3" />
      <div
        style="
          position: sticky;
          top: 5.5rem;
          z-index: 10;
          background-color: white;
        "
      >
        <Categories @category-selected="onCategorySelected" />
        <hr class="mt-6 mb-12" />
      </div>

      <h5 class="live-title mb-6" style="padding-left: 32px">
        바로 지금! 라이브 찬스
      </h5>
      <div class="live-section">
        <swiper
          v-if="liveItems.length"
          :slidesPerView="'auto'"
          :spaceBetween="30"
          :pagination="false"
          class="live-caro"
          :loop="false"
          :navigation="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          style="padding-left: 32px"
        >
          <swiper-slide
            v-for="(item, index) in liveItems"
            :key="index"
            @click="navigateToBroadcast(item.broadcastSeq)"
          >
            <img
              :src="item.broadcastImage"
              alt="Main Image"
              class="main-image"
            />
            <p
              class="live-main-title"
              style="
                width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ item.broadcastTitle }}
            </p>
            <div class="live-item">
              <img
                :src="item.productImage"
                alt="Live Thumbnail"
                class="live-thumbnail"
              />
              <div class="live-info">
                <div class="live-title">{{ item.productNm }}</div>
                <div class="live-discount">{{ formatPrice(item.discountPrice) }}원</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div v-else class="skeleton-container">
          <SkeletonChance v-for="n in 3" :key="n" />
        </div>
      </div>
      <hr class="mt-6 mb-12" />
      <div class="more-link-wrapper">
        <h5 class="live-title mb-6" style="padding-left: 32px">
          예정된 라이브
        </h5>
        <router-link
          to="/schedule"
          class="more-link mb-3"
          style="padding-right: 32px"
          >더 보기</router-link
        >
      </div>
      <swiper
        v-if="cardsData.length"
        :slidesPerView="'auto'"
        :spaceBetween="30"
        :pagination="false"
        class="live-caro"
        :loop="false"
        :navigation="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        style="padding-left: 32px"
      >
        <swiper-slide v-for="(card, index) in cardsData" :key="'card-' + index">
          <CardComponent
            :imageSrc="card.broadcastImage"
            :title="card.broadcastTitle"
            :text="card.broadcastSummary"
            :datetime="card.broadcastScheduledTime"
            :buttonText="card.buttonText"
          />
        </swiper-slide>
      </swiper>
      <div v-else class="skeleton-container">
        <SkeletonChance v-for="n in 4" :key="n" />
      </div>
      <div class="pb-20" />
    </section>
    <CustomFooter />
    <AIChatBot ref="chatbot" style="border-radius: 2rem 2rem 0 0" />
    <div class="chatbot-wrapper">
      <img class="fixed-lottie" @click="toggleChatbot" src="https://kr.object.ncloudstorage.com/susussg-img-bucket/logo/pengreenlive-logo.png"/>
      <div class="lottie-title">
        <p>궁금한 것은 AI 슈슈슉에게 물어보세요!</p>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Categories from "@/components/Category/Categories.vue";
import CardComponent from "@/components/Card/BroadcastCard.vue";
import MenuHeaderNav from "@/components/HeaderMain/menu-header-nav.vue";
import ScrollTopButton from "@/components/Button/ScrollTopButton.vue";
import SkeletonCarousel from "@/components/Skeleton/Schedule-skeleton.vue";
import SkeletonChance from "@/components/Skeleton/Main-chance-skeleton.vue";
import CustomFooter from "@/components/Footer/CustomFooter.vue";
import LottieAnimation from "@/components/UI/LottieAnimation.vue";
import AIChatBot from "@/components/Chatbot/AIChatBot.vue";

import SkeletonMainCarousel from "@/components/Skeleton/Main-Carou-skeleton.vue";
import axios from "@/axios";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default {
  components: {
    Swiper,
    SwiperSlide,
    Categories,
    CardComponent,
    MenuHeaderNav,
    ScrollTopButton,
    SkeletonCarousel,
    SkeletonChance,
    CustomFooter,
    SkeletonMainCarousel,
    LottieAnimation,
    AIChatBot,
  },
  mounted() {
    this.fetchMainCarousels();
    this.fetchScheduledBroadcasts();
    this.fetchLiveChanceCarousels();
    this.startHideTitleTimer();
  },
  data() {
    return {
      modules: [Navigation, Pagination, Autoplay],
      carousels: [],
      cardsData: [],
      liveItems: [],
      categoryCodes: {
        전체: null,
        뷰티: "BCT-CTG-001",
        식품: "BCT-CTG-002",
        생활용품: "BCT-CTG-003",
        유아동: "BCT-CTG-004",
        테크: "BCT-CTG-005",
        패션: "BCT-CTG-006",
      },
      selectedCategory: "전체",
      loadingCarousels: true, // 로딩 상태 추가
    };
  },
  methods: {
    fetchMainCarousels() {
      axios
        .get("/main-carousels")
        .then((response) => {
          this.carousels = response.data;
          this.loadingCarousels = false; // 데이터 로드 완료 후 로딩 상태 false
          console.log("Main carousels data:", this.carousels);
        })
        .catch((error) => {
          console.error("Failed to fetch main carousels:", error);
        });
    },
    fetchScheduledBroadcasts() {
      const categoryCode =
        this.selectedCategory === "전체" ? null : this.selectedCategory;
      const params = {};
      if (categoryCode) {
        params.categoryCd = categoryCode;
      }
      axios
        .get("/schedule", { params: params })
        .then((response) => {
          this.cardsData = response.data;
          console.log("Scheduled broadcasts data:", this.cardsData);
        })
        .catch((error) => {
          console.error("Failed to fetch scheduled broadcasts:", error);
        });
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
              },1500);
              setTimeout(() => {
                lottieTitle.classList.remove("opacity");
              }, 1500); // 1.5초 뒤에 천천히 나타나도록 함
            }
          }, 7500);
        }
      }, 15000); // 5초 후에 3초 간격으로 반복
    },
    fetchLiveChanceCarousels() {
      const categoryCode =
        this.selectedCategory === "전체" ? null : this.selectedCategory;
      const params = {};
      if (categoryCode) {
        params.categoryCd = categoryCode;
      }
      axios
        .get("/live-chance", { params: params })
        .then((response) => {
          this.liveItems = response.data;
          console.log("Live chance carousels data:", this.liveItems);
        })
        .catch((error) => {
          console.error("Failed to fetch live chance carousels:", error);
        });
    },
    navigateToBroadcast(broadcastSeq) {
      this.$router.push(`/live-viewing/${broadcastSeq}`);
    },
    onCategorySelected(categoryCd) {
      this.selectedCategory = categoryCd;
      this.fetchScheduledBroadcasts();
      this.fetchLiveChanceCarousels();
    },
    toggleChatbot() {
      this.$refs.chatbot.toggleChatbot();
    },
    formatPrice(value) {
      if (!value) return "";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

.main-caro .carousel-slide {
  max-width: 700px;
  height: 400px;
  overflow: hidden;
}

/* 메인 캐러셀 슬라이드 */
.main-caro .swiper-slide {
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.main-caro .swiper-slide-active {
  opacity: 1;
}

.slide-background {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fafafa;
}

.background-image {
  object-fit: cover;
  border-radius: 20px;
  margin: 2rem 0 2rem 2rem;
  aspect-ratio: 3 / 4;
  z-index: 1;
}

.main-caro .slide-content {
  flex: 1;
  text-align: left;
  color: rgb(60, 60, 60);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4rem 1rem 2rem;
}

.main-caro h2 {
  font-size: 2em;
  margin-bottom: 0.5em;
  font-weight: 500 !important;
}

.main-caro p {
  font-size: 0.8em;
  color: #ffffff;
  font-weight: 400;
  background-color: #ff2424;
  word-break: break-word;
  word-wrap: break-word;
  padding: 4px 16px;
  width: -webkit-fit-content;
  border-radius: 50px;
  margin-top: 1rem;
}

.main-caro .start-button {
  padding: 10px 20px;
  border: none;
  background-color: #000;
  color: white;
  cursor: pointer;
  border-radius: 20px;
  font-size: 0.9em;
  outline: none;
}

.main-caro .additional-images-container {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.main-caro .additional-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
}

.main-caro .additional-image-price {
  padding-left: 4px;
  font-weight: bold;
}

.main-caro .additional-image-title {
  padding-left: 4px;
  text-align: start;
  font-size: 0.8em;
  margin-top: 5px;
}

.main-caro .additional-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}

.hot-live-caro .slide-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
}

.hot-live-caro .background-image {
  width: 360px;
  height: auto;
  object-fit: cover;
  aspect-ratio: 9/16;
}

.hot-live-caro .slide-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  color: rgb(60, 60, 60);
  z-index: 2;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2rem;
  margin-top: 2rem;
}

.additional-text-container {
  margin-left: 140px;
}

.hot-live-caro .additional-text-container h2,
.hot-live-caro .additional-text-container p {
  font-size: 1.2em;
}

.hot-live-caro .additional-images-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 2rem;
  gap: 8px;
}

.hot-live-caro .additional-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.under-category-section::-webkit-scrollbar {
  display: none;
}

.more-link-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: #134010;
}

.more-link {
  text-decoration: underline;
}

.live-caro .swiper-slide {
  width: auto;
}

.live-caro .live-item {
  display: flex;
  align-items: center;
}

.live-caro .live-thumbnail {
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 10px;
  aspect-ratio: 1/1;
}

.live-caro .live-info {
  display: flex;
  flex-direction: column;
  width: 130px;
}

.live-caro .live-title {
  font-weight: bold;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.live-caro .live-discount {
  color: darkgreen;
  font-weight: bold;
}

.live-section .main-image {
  width: 200px;
  height: auto;
  aspect-ratio: 3/4;
  object-fit: cover;
}

.live-caro .live-main-title {
  font-weight: bold;
  font-size: 16px;
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  width: 200px;
  background-color: white;
}

.skeleton-card .skeleton {
  background-color: #e0e0e0;
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
}

.skeleton-card .skeleton-title {
  background-color: #e0e0e0;
  width: 70%;
  height: 20px;
  margin-bottom: 8px;
}

.skeleton-card .skeleton-text {
  background-color: #e0e0e0;
  width: 90%;
  height: 14px;
}

.skeleton-container {
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding-left: 32px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
}

.skeleton-main-carousel {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;
  align-content: center;
  align-items: center;
}

@keyframes pulse-diagonal {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
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
  width: 64px;
  height: 64px;
  cursor: pointer;
  border-radius:100%;
  aspect-ratio: 1/1;
  object-fit:cover;
  margin: 0.5rem;
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
