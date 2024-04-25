<template>
  <div>
    <swiper
      :slidesPerView="'auto'"
      :centeredSlides="true"
      :spaceBetween="30"
      :pagination="{ clickable: true }"
      class="main-caro"
      :loop="false"
      :navigation="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
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
            <h2 v-if="item.title">{{ item.title }}</h2>
            <p v-if="item.description">{{ item.description }}</p>
            <div class="additional-images-container">
              <img
                v-for="(additionalImage, subIndex) in item.additionalImages"
                :src="additionalImage"
                :key="'additional-image-' + index + '-' + subIndex"
                class="additional-image"
              />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
  <hr />
  <Categories />
  <hr class="mt-6"/>
  <section class="under-category-section" style="width: 60%; margin: auto">
    <h6 class="mb-6 mt-12">인기 라이브</h6>
    <swiper
      :slidesPerView="1"
      :centeredSlides="false"
      :spaceBetween="30"
      :pagination="{ clickable: true }"
      class="hot-live-caro"
      :loop="false"
      :navigation="false"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      style="width: 100%; margin: auto"
    >
      <swiper-slide
        v-for="(item, index) in hotLiveCarousels"
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
            <div class="additional-images-container">
              <img
                v-for="(additionalImage, subIndex) in item.additionalImages"
                :src="additionalImage"
                :key="'additional-image-' + index + '-' + subIndex"
                class="additional-image"
              />
            </div>
            <div class="additional-text-container">
              <h5 v-if="item.viewersCount" class="mb-4">{{ item.viewersCount }}명이 보는 중!</h5>
              <h3 v-if="item.title" class="mb-2">{{ item.title }}</h3>
              <p v-if="item.description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Categories from "@/components/Category/Categories.vue";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default {
  components: {
    Swiper,
    SwiperSlide,
    Categories,
  },
  data() {
    return {
      modules: [Navigation, Pagination, Autoplay],
      carousels: [
        {
          mainImage:
            "https://img.etoday.co.kr/pto_db/2024/04/20240419110132_2014644_647_358.jpg",
          title: "첫 번째 슬라이드",
          description: "첫 번째 슬라이드에 대한 설명입니다.",
          additionalImages: [
            "http://via.placeholder.com/80x80",
            "http://via.placeholder.com/80x80",
          ],
        },
        {
          mainImage: "https://i.ytimg.com/vi/7DSJl9e-UUE/maxresdefault.jpg",
          title: "두 번째 슬라이드",
          description: "두 번째 슬라이드에 대한 설명입니다.",
          additionalImages: [
            "http://via.placeholder.com/80x80",
            "http://via.placeholder.com/80x80",
          ],
        },
        {
          mainImage:
            "https://i.ytimg.com/vi/mZPkoLfdGQg/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLCFJ-0K3KXYHBQNleHWKeh-ljm5Nw",
          title: "3 번째 슬라이드",
          description: "3 번째 슬라이드에 대한 설명입니다.",
          additionalImages: ["http://via.placeholder.com/80x80"],
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

.slide-background {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
}

.background-image {
  width: 50%;
  height: 100%;
  object-fit: cover; /* 이미지가 컨테이너를 꽉 채우도록 설정 */
}

.main-caro .slide-content {
  position: absolute;
  top: 50%;
  right: -3%;
  transform: translate(-50%, -50%);
  text-align: left;
  color: rgb(60, 60, 60);
  z-index: 2;
}

.main-caro h2 {
  font-size: 2em; /* 제목의 크기를 설정 */
  margin-bottom: 1em;
}

.main-caro p {
  font-size: 1em; /* 설명 텍스트의 크기를 설정 */
  margin-bottom: 2em;
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
  justify-content: left;
  gap: 10px;
  margin-top: 10rem;
}

.main-caro .additional-image {
  width: 80px; /* 추가 이미지의 크기를 설정 */
  height: 80px;
  object-fit: cover;
  border-radius: 10px; /* 이미지의 둥근 모서리 스타일링 */
}
.hot-live-caro .carousel-slide {
  max-width: 100%;
  height: 400px;
  margin: auto;
  overflow: hidden;
}

.hot-live-caro .slide-content {
  position: absolute;
  display: flex;
  flex-direction: row;
  height: 90%;
  left: 31%;
  top: 10%;
  text-align: left;
  color: rgb(60, 60, 60);
  z-index: 2;
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
  margin-bottom: 8px;
  gap: 8px;
}

.hot-live-caro .additional-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.hot-live-caro .slide-background {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
}

.hot-live-caro .background-image {
  width: 30%;
  height: 100%;
  object-fit: cover;
}
</style>
