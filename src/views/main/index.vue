<template>
  <div>
    <div>메인페이지입니다.</div>
    <swiper
      :modules="modules"
      :slides-per-view="sliderPreview"
      :space-between="space"
      navigation
      :pagination="{ clickable: true }"
      class="main-caro"
    >
      <swiper-slide v-for="(item, i) in carousels" :key="i">
        <div
          class="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px]"
          :style="{
            backgroundImage: 'url(' + item.img + ')',
          }"
        >
          <div
            class="pt-20 container text-center px-4 slider-content h-full w-full min-h-[300px] rounded-md flex flex-col items-center justify-center text-white"
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
  EffectFade,
} from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

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
          img: 'https://via.placeholder.com/1920x1080?text=Slide+1',
          title: '첫 번째 슬라이드',
          description: '이것은 첫 번째 슬라이드에 대한 설명입니다.',
        },
        {
          img: 'https://via.placeholder.com/1920x1080?text=Slide+2',
          title: '두 번째 슬라이드',
          description: '두 번째 슬라이드에 대한 설명입니다.',
        },
        {
          img: 'https://via.placeholder.com/1920x1080?text=Slide+3',
          title: '세 번째 슬라이드',
          description: '세 번째 슬라이드의 설명입니다.',
        },
        {
          img: 'https://via.placeholder.com/1920x1080?text=Slide+4',
          title: '네 번째 슬라이드',
          description: '마지막 슬라이드에 대한 설명입니다.',
        },
      ],
    };
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade],
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