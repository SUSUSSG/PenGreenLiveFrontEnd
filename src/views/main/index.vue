<template>
  <div>
    <div>메인페이지입니다.</div>
    <swiper
      :modules="modules"
      :slides-per-view="3"
      :space-between="10"
      :effect="'coverflow'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="{ clickable: true }"
      class="main-caro"
    >
      <swiper-slide v-for="(item, i) in carousels" :key="i">
        <div
          class="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[400px]"
          :style="{
            backgroundImage: 'url(' + item.img + ')',
          }"
        >
          <div
            class="pt-20 container text-center px-4 slider-content h-full w-full min-h-[400px] rounded-md flex flex-col items-center justify-center text-white"
          >
            <div class="max-w-sm">
              <h2 v-if="item.title" class="text-xl font-medium text-white">
                {{ item.title }}
              </h2>
              <p v-if="item.description" class="text-sm">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    sliderPreview: {
      type: Number,
      default: 1,
    },
    space: {
      type: Number,
      default: 0,
    },
    carousels: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      carousels: [
        {
          img: "https://i.namu.wiki/i/aC6h0MKu3PAAegyUIPps5zOdQ1efqgNSTHKDzj1BL-bB0n8IZQALvtXp73MNCasoMpYCGKIQ4C8WWi3_E7-kwg.gif",
          title: "첫 번째 슬라이드",
          description: "이것은 첫 번째 슬라이드에 대한 설명입니다.",
        },
        {
          img: "https://i.ytimg.com/vi/7DSJl9e-UUE/maxresdefault.jpg",
          title: "두 번째 슬라이드",
          description: "두 번째 슬라이드에 대한 설명입니다.",
        },
        {
          img: "http://via.placeholder.com/800x500",
          title: "세 번째 슬라이드",
          description: "세 번째 슬라이드의 설명입니다.",
        },
        {
          img: "https://i.ytimg.com/vi/h8eQxRIrK_s/maxres2.jpg?sqp=-oaymwEoCIAKENAF8quKqQMcGADwAQH4AbYIgAK4CIoCDAgAEAEYSiBYKGUwDw==&rs=AOn4CLClrIaPLDGOqflkWdL_AzMByrUgDw",
          title: "네 번째 슬라이드",
          description: "마지막 슬라이드에 대한 설명입니다.",
        },
      ],
    };
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow],
    };
  },
};
</script>

<style lang="scss">
.main-caro {
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-family: unset !important;
    @apply rtl:rotate-180;
  }

  .swiper-button-next:after {
    content: url("https://api.iconify.design/heroicons-outline/chevron-right.svg?color=white&width=24");
  }

  .swiper-button-prev:after {
    content: url("https://api.iconify.design/heroicons-outline/chevron-left.svg?color=white&width=24");
  }

  .swiper-pagination-bullet {
    height: 2px;
    width: 24px;
    @apply rounded-[1px] bg-white bg-opacity-70;

    &.swiper-pagination-bullet-active {
      @apply bg-opacity-100;
    }
  }
}
</style>