<template>
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
            :src="item.mainImage"
            alt="Carousel Image"
            class="background-image"
          />
          <div class="slide-content">
            <div>
              <h2 v-if="item.title">{{ item.title }}</h2>
              <p v-if="item.description">{{ item.description }}</p>
            </div>
            <div class="additional-images-container">
              <div
                v-for="(additionalImage, subIndex) in item.additionalImages"
                :key="'additional-image-' + index + '-' + subIndex"
              >
                <img :src="additionalImage" class="additional-image" />
                <div class="additional-image-title">
                  {{ item.additionalImagesTitle[subIndex] }}
                </div>
                <div class="additional-image-price">
                  {{ item.additionalImagesPrice[subIndex] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
  <hr />
  <Categories />
  <hr class="mt-6" />
  <section class="under-category-section" style="width: 77%; margin: auto">
    <h4 class="pt-12" style="padding-left : 32px;">인기 라이브</h4>
    <swiper
      :slidesPerView="1"
      :centeredSlides="false"
      :spaceBetween="30"
      :pagination="{ clickable: true }"
      class="hot-live-caro"
      :loop="false"
      :navigation="false"
      :autoplay="{ delay: 6000, disableOnInteraction: false }"
      style="width: 100%; margin: auto"
    >
      <swiper-slide
        v-for="(item, index) in hotLiveCarousels"
        :key="index"
        class="carousel-slide"
      >
        <div class="slide-container">
          <img
            :src="item.mainImage"
            alt="Carousel Image"
            class="background-image"
          />
          <div class="slide-content">
            <div class="additional-text-container">
              <h6 v-if="item.viewersCount" class="mb-4">
                {{ item.viewersCount }}명이 보는 중!
              </h6>
              <h3 v-if="item.title" class="mb-2">{{ item.title }}</h3>
              <p v-if="item.description">{{ item.description }}</p>
            </div>
            <div class="additional-images-container">
              <img
                v-for="(additionalImage, subIndex) in item.additionalImages"
                :key="'additional-image-' + index + '-' + subIndex"
                :src="additionalImage"
                class="additional-image"
              />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <hr />
    <div class="more-link-wrapper">
      <h4 class="mb-6 pt-12 live-title" style="padding-left : 32px;">예정된 라이브</h4>
      <router-link to="/schedule" class="more-link">더 보기</router-link>
    </div>
    <swiper
      :slidesPerView="'auto'"
      :spaceBetween="30"
      :pagination="false"
      class="live-caro"
      :loop="false"
      :navigation="true"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      style="padding-left: 32px"
    >
      <swiper-slide v-for="(card, index) in cardsData" :key="'card-' + index">
        <CardComponent
          :imageSrc="card.imageSrc"
          :title="card.title"
          :text="card.text"
          :datetime="card.datetime"
          :buttonText="card.buttonText"
        />
      </swiper-slide>
    </swiper>
    <h4 class="mb-6 pt-12 live-title" style="padding-left : 32px;">바로 지금! 라이브 찬스</h4>

    <div class="live-section">
      <swiper
        :slidesPerView="'auto'"
        :spaceBetween="30"
        :pagination="false"
        class="live-caro"
        :loop="false"
        :navigation="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        style="padding-left: 32px"
      >
        <swiper-slide v-for="(item, index) in liveItems" :key="index">
          <img :src="item.mainImage" alt="Main Image" class="main-image" />
          <p class="live-main-title">{{ item.mainTitle }}</p>
          <div class="live-item">
            <img
              :src="item.thumbnail"
              alt="Live Thumbnail"
              class="live-thumbnail"
            />
            <div class="live-info">
              <div class="live-title">{{ item.title }}</div>
              <div class="live-discount">{{ item.discount }}</div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="pb-20" />
  </section>
  <hr />
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

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default {
  components: {
    Swiper,
    SwiperSlide,
    Categories,
    CardComponent,
    MenuHeaderNav,
  },
  data() {
    return {
      modules: [Navigation, Pagination, Autoplay],
      carousels: [
        {
          mainImage:
            "https://g-selected.pstatic.net/MjAyNDA0MjNfMjI5/MDAxNzEzODQ5MDI3MDE3.A_xY4KPpLycWqmbe8uKSRHR8evuG_uOTK92gplRC0tcg.4mFLnckQ8tHdxJf3jt0cJYrOb-lgIzzyaHv3KSbfZfog.PNG/live_up1.png?type=w600_q90",
          title: "이찬원과 함께하는 가정의 달",
          description: "6,506명이 기다리는 중",
          additionalImages: [
            "https://phinf.pstatic.net/dthumb/?src=%22https%3A%2F%2Fshop-phinf.pstatic.net%2F20240125_126%2F17061434095045bT0Y_JPEG%2F107279237300263844_1793856330.jpg%22&service=selective&type=f240_240_q90",
            "https://phinf.pstatic.net/dthumb/?src=%22https%3A%2F%2Fshop-phinf.pstatic.net%2F20240125_192%2F1706144165346yli4D_JPEG%2F107279949049973868_573632295.jpg%22&service=selective&type=f240_240_q90",
          ],
          additionalImagesTitle: ["테스트 상품1", "테스트 상품2"],
          additionalImagesPrice: ["10,000원", "15,000원"],
        },
        {
          mainImage: "https://i.ytimg.com/vi/7DSJl9e-UUE/maxresdefault.jpg",
          title: "두 번째 슬라이드",
          description: "두 번째 슬라이드에 대한 설명입니다.",
          additionalImages: [
            "http://via.placeholder.com/80x80",
            "http://via.placeholder.com/80x80",
          ],
          additionalImagesTitle: ["테스트 상품3", "테스트 상품4"],
          additionalImagesPrice: ["10,000원", "15,000원"],
        },
        {
          mainImage:
            "https://i.ytimg.com/vi/mZPkoLfdGQg/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLCFJ-0K3KXYHBQNleHWKeh-ljm5Nw",
          title: "3 번째 슬라이드",
          description: "3 번째 슬라이드에 대한 설명입니다.",
          additionalImages: ["http://via.placeholder.com/80x80"],
          additionalImagesTitle: ["테스트 상품2"],
          additionalImagesPrice: ["10,000원"],
        },
        {
          mainImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRG7wmkHtth99WlKY9lAjoeQ_UYo1Gx8SJmcOEseQ8U93wnGFikyhOaxhWv0jOg4of1o&usqp=CAU",
          title: "4 번째 슬라이드",
          description: "4 번째 슬라이드에 대한 설명입니다.",
          additionalImages: [
            "http://via.placeholder.com/80x80",
            "http://via.placeholder.com/80x80",
          ],
          additionalImagesTitle: ["테스트 상품1", "테스트 상품2"],
          additionalImagesPrice: ["10,000원", "15,000원"],
        },
      ],
      hotLiveCarousels: [
        {
          viewersCount: 158,
          mainImage:
            "https://img.etoday.co.kr/pto_db/2024/04/20240419110132_2014644_647_358.jpg",
          title: "첫 번째 슬라이드",
          description: "첫 번째 슬라이드에 대한 설명입니다.",
          additionalImages: [
            "https://emoji.slack-edge.com/T0674GTPH0A/%25EB%258D%25A4%25EB%25B8%2594%25EB%258F%2584%25EC%2596%25B4%25EB%25B0%2595%25EC%2588%2598/cf86b0e2fc5e5f82.gif",
            "http://via.placeholder.com/80x80",
          ],
        },
        {
          viewersCount: 163,
          mainImage: "https://i.ytimg.com/vi/7DSJl9e-UUE/maxresdefault.jpg",
          title: "두 번째 슬라이드",
          description: "두 번째 슬라이드에 대한 설명입니다.",
          additionalImages: [
            "http://via.placeholder.com/80x80",
            "http://via.placeholder.com/80x80",
          ],
        },
        {
          viewersCount: 179,
          mainImage:
            "https://i.ytimg.com/vi/mZPkoLfdGQg/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLCFJ-0K3KXYHBQNleHWKeh-ljm5Nw",
          title: "3 번째 슬라이드",
          description: "3 번째 슬라이드에 대한 설명입니다.",
          additionalImages: ["http://via.placeholder.com/80x80"],
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
        {
          imageSrc: "http://via.placeholder.com/150x150",
          title: "Title 2",
          text: "This is the description for card 2.",
          datetime: "2024-04-26T12:30:00",
        },
        {
          imageSrc: "http://via.placeholder.com/150x150",
          title: "Title 3",
          text: "This is the description for card 3.",
          datetime: "2024-04-26T17:30:00",
        },
        {
          imageSrc: "http://via.placeholder.com/150x150",
          title: "Title 4",
          text: "This is the description for card 4.",
          datetime: "2024-04-27T10:30:00",
        },
        {
          imageSrc: "http://via.placeholder.com/150x150",
          title: "Title 4",
          text: "This is the description for card 4.",
          datetime: "2024-04-27T12:30:00",
        },
        {
          imageSrc: "http://via.placeholder.com/150x150",
          title: "Title 4",
          text: "This is the description for card 4.",
          datetime: "2024-04-28T11:30:00",
        },
        {
          imageSrc: "http://via.placeholder.com/150x150",
          title: "Title 4",
          text: "This is the description for card 4.",
          datetime: "2024-04-28T19:30:00",
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
        {
          mainImage: "http://via.placeholder.com/90x160",
          thumbnail: "https://via.placeholder.com/90x90",
          mainTitle: "라이브 메인 타이틀2",
          title: "두 번째 라이브 아이템",
          discount: "50% 20,000원",
        },
        {
          mainImage: "http://via.placeholder.com/90x160",
          thumbnail: "https://via.placeholder.com/90x90",
          mainTitle: "라이브 메인 타이틀2",
          title: "두 번째 라이브 아이템",
          discount: "50% 20,000원",
        },
        {
          mainImage: "http://via.placeholder.com/90x160",
          thumbnail: "https://via.placeholder.com/90x90",
          mainTitle: "라이브 메인 타이틀2",
          title: "두 번째 라이브 아이템",
          discount: "50% 20,000원",
        },
        {
          mainImage: "http://via.placeholder.com/90x160",
          thumbnail: "https://via.placeholder.com/90x90",
          mainTitle: "라이브 메인 타이틀2",
          title: "두 번째 라이브 아이템",
          discount: "50% 20,000원",
        },
        {
          mainImage: "http://via.placeholder.com/90x160",
          thumbnail: "https://via.placeholder.com/90x90",
          mainTitle: "라이브 메인 타이틀2",
          title: "두 번째 라이브 아이템",
          discount: "50% 20,000원",
        },
        {
          mainImage: "http://via.placeholder.com/90x160",
          thumbnail: "https://via.placeholder.com/90x90",
          mainTitle: "라이브 메인 타이틀2",
          title: "두 번째 라이브 아이템",
          discount: "50% 20,000원",
        },
        {
          mainImage: "http://via.placeholder.com/90x160",
          thumbnail: "https://via.placeholder.com/90x90",
          mainTitle: "라이브 메인 타이틀2",
          title: "두 번째 라이브 아이템",
          discount: "50% 20,000원",
        },
        {
          mainImage: "http://via.placeholder.com/90x160",
          thumbnail: "https://via.placeholder.com/90x90",
          mainTitle: "라이브 메인 타이틀2",
          title: "두 번째 라이브 아이템",
          discount: "50% 20,000원",
        },
      ],
    };
  },
};
</script>
<style scoped>
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
  opacity: 1; /* 현재 활성화된 슬라이드는 불투명 */
}
.slide-background {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fafafa;
}

.background-image {
  width: 50%;
  height: 100%;
  object-fit: cover;
  padding: 2rem 0 2rem 2rem;
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
  font-weight: 500!important;
}

.main-caro p {
  font-size: 1em;
  color: #ff4343;
  font-weight: 500;
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
.main-caro .additional-image-price{
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
  border: 1px solid lightgray;
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
.under-category-section {
  border-left: 1px solid #e6e7eb;
  border-right: 1px solid #e6e7eb;
}
.under-category-section::-webkit-scrollbar {
  display: none;
}
.more-link-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: #134010;
  margin: 0 24px 24px 0;
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
</style>
