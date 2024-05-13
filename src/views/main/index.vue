<template>
  <section class="border-container">
    <ScrollTopButton />
    <MenuHeaderNav />
    <hr />
    <div>
      <swiper
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
              :src="'data:image/jpeg;base64,' + item.broadcastImage"
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
              :src="'data:image/jpeg;base64,' + item.broadcastImage"
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
                  <div class="additional-image-title">
                    {{ product.productNm }}
                  </div>
                  <div class="additional-image-price">
                    {{ product.discountPrice }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
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
        <Categories />
        <hr class="mt-6 mb-12" />
      </div>

      <h5 class="live-title mb-6" style="padding-left: 32px">
        바로 지금! 라이브 찬스
      </h5>
      <div class="live-section">
        <swiper
          :slidesPerView="'auto'"
          :spaceBetween="30"
          :pagination="false"
          class="live-caro"
          :loop="false"
          :navigation="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          style="padding-left: 32px"
        >
          <swiper-slide v-for="(item, index) in liveItems" :key="index">
            <img
              :src="'data:image/jpeg;base64,' + item.broadcastImage"
              alt="Main Image"
              class="main-image"
            />
            <p class="live-main-title">{{ item.broadcastTitle }}</p>
            <div class="live-item">
              <img
                :src="'data:image/jpeg;base64,' + item.productImage"
                alt="Live Thumbnail"
                class="live-thumbnail"
              />
              <div class="live-info">
                <div class="live-title">{{ item.productNm }}</div>
                <div class="live-discount">{{ item.discountPrice }}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
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
            :src="'data:image/jpeg;base64,' + card.broadcastImage"
            :title="card.broadcastTitle"
            :text="card.broadcastSummary"
            :datetime="card.broadcastScheduledTime"
            :buttonText="card.buttonText"
          />
        </swiper-slide>
      </swiper>
      <div class="pb-20" />
    </section>
    <hr />
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
import menuHeaderNav from "@/components/HeaderMain/menu-header-nav.vue";
import MenuHeaderNav from "@/components/HeaderMain/menu-header-nav.vue";
import ScrollTopButton from "@/components/Button/ScrollTopButton.vue";
import axios from "axios";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default {
  components: {
    Swiper,
    SwiperSlide,
    Categories,
    CardComponent,
    MenuHeaderNav,
    ScrollTopButton,
  },
  created() {
    this.fetchMainCarousels();
    this.fetchScheduledBroadcasts();
    this.fetchLiveChanceCarousels();
  },
  data() {
    return {
      modules: [Navigation, Pagination, Autoplay],
      carousels: [
        {
          mainImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRG7wmkHtth99WlKY9lAjoeQ_UYo1Gx8SJmcOEseQ8U93wnGFikyhOaxhWv0jOg4of1o&usqp=CAU",
          title: "slide title",
          description: "slide description",
          additionalImages: [
            "http://via.placeholder.com/80x80",
            "http://via.placeholder.com/80x80",
          ],
          additionalImagesTitle: ["product1", "product2"],
          additionalImagesPrice: ["10,000원", "15,000원"],
        },
      ],
      cardsData: [
        {
          imageSrc: "http://via.placeholder.com/150x150",
          title: "Title 1",
          text: "This is the description for card 1.",
          datetime: "2024-04-26T10:30:00",
          buttonText: "알림 설정",
        },
      ],
      liveItems: [
        {
          mainImage: "http://via.placeholder.com/90x160",
          thumbnail: "https://via.placeholder.com/90x90",
          mainTitle: "라이브 메인 타이틀1",
          title: "제로스토킹 네이버 가젯의 단 상품대",
          discount: "64% 49,000원",
        },
      ],
    };
  },
  methods: {
    fetchMainCarousels() {
      axios
        .get("http://localhost:8090/main-carousels")
        .then((response) => {
          this.carousels = response.data;
          console.log("Main carousels data:", this.carousels); // 로그 출력
        })
        .catch((error) => {
          console.error("Failed to fetch main carousels:", error);
        });
    },
    fetchScheduledBroadcasts() {
      axios
        .get("http://localhost:8090/schedule")
        .then((response) => {
          this.cardsData = response.data;
          console.log("Scheduled broadcasts data:", this.cardsData); // 로그 출력
        })
        .catch((error) => {
          console.error("Failed to fetch scheduled broadcasts:", error);
        });
    },
    fetchLiveChanceCarousels() {
      axios
        .get("http://localhost:8090/live-chance")
        .then((response) => {
          this.liveItems = response.data;
          console.log("Live chance carousels data:", this.liveItems); // 로그 출력
        })
        .catch((error) => {
          console.error("Failed to fetch live chance carousels:", error);
        });
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
  border-radius: 20px; /* 버튼의 둥근 모서리 스타일링 */
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
}

.live-caro .live-main-title {
  font-weight: bold;
  font-size: 16px;
}
/* 
.h5{
  font-size: 1.8rem;
} */
</style>
