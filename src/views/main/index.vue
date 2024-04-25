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
          <img :src="item.mainImage" alt="Carousel Image" class="background-image">
          <div class="slide-content">
            <h2 v-if="item.title">{{ item.title }}</h2>
            <p v-if="item.description">{{ item.description }}</p>
            <div class="additional-images-container">
              <img
                v-for="(additionalImage, subIndex) in item.additionalImages"
                :src="additionalImage"
                :key="'additional-image-' + index + '-' + subIndex"
                class="additional-image"
              >
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Navigation, Pagination, Autoplay],
      carousels: [
        {
          mainImage:
            "http://via.placeholder.com/700x300",
          title: "첫 번째 슬라이드",
          description: "첫 번째 슬라이드에 대한 설명입니다.",
          additionalImages: [
            "http://via.placeholder.com/80x80",
            "http://via.placeholder.com/80x80",
          ],
        },
        {
          mainImage:
            "http://via.placeholder.com/700x300",
          title: "두 번째 슬라이드",
          description: "두 번째 슬라이드에 대한 설명입니다.",
          additionalImages: [
          "http://via.placeholder.com/80x80",
          "http://via.placeholder.com/80x80",

          ],
        },
        {
          mainImage:
            "http://via.placeholder.com/700x300",
          title: "3 번째 슬라이드",
          description: "3 번째 슬라이드에 대한 설명입니다.",
          additionalImages: [
          "http://via.placeholder.com/80x80",
          ],
        },
        {
          mainImage:
            "http://via.placeholder.com/700x300",
          title: "4 번째 슬라이드",
          description: "4 번째 슬라이드에 대한 설명입니다.",
          additionalImages: [
          "http://via.placeholder.com/80x80",
          "http://via.placeholder.com/80x80",
          ],
        },
      ],
    };
  }
};
</script>

<style scoped>
.main-caro .carousel-slide {
  max-width: 700px;
  height: 400px;
  border-radius: 10px;
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
</style>
