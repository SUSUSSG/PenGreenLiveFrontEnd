<template>
  <div class="broadcast-card">
    <p class="broadcast-time">{{ formattedLiveDateTime.current }}</p>
    <h1 class="broadcast-title">{{ broadcastTitle }}</h1>
    <div class="broadcast-image" :style="{ backgroundImage: 'url(' + thumbimageSrc + ')' }"></div>

    <div class="product-card-container">
      <swiper :slides-per-view="1" :space-between="10" pagination>
        <swiper-slide v-for="(product, index) in products" :key="index">
          <ProductCard :product-name="product.productNm" :original-price="product.listPrice"
            :discount-rate="product.discountRate" :product-img="product.productImage" :brand="false" />
        </swiper-slide>
      </swiper>
    </div>

    <div v-if="isPrepareTime">
      <button class="action-button" @click="onClickRedirect()">방송 준비</button>
    </div>
    <div v-else>
      <p style="text-align: center;">방송 준비는 라이브 시작 <br> 15분전부터만 가능합니다.</p>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "@/components/Card/product-card.vue";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default {
  components: {
    Swiper,
    SwiperSlide,
    ProductCard
  },
  name: 'BroadcastCard',
  props: {
    broadcastId: Number,
    broadcastTitle: String,
    thumbimageSrc: String,
    liveDateTime: String,
    products: Array
  },
  computed: {
    formattedLiveDateTime() {
      const serverLiveTime = new Date(this.liveDateTime);
      const year = serverLiveTime.getFullYear();
      const month = ('0' + (serverLiveTime.getMonth() + 1)).slice(-2);
      const day = ('0' + serverLiveTime.getDate()).slice(-2);
      const hours = ('0' + serverLiveTime.getHours()).slice(-2);
      const minutes = ('0' + serverLiveTime.getMinutes()).slice(-2);
      
      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      return {current: formattedTime};
    },
    isPrepareTime() {
      const now = new Date();
      const serverLiveTime = new Date(this.liveDateTime);
      const prepareTime = new Date(serverLiveTime.getTime() - 15 * 60000);
      const endTime = new Date(serverLiveTime.getTime() + 15 * 60000);
      return now >= prepareTime && now <= endTime;
    }
  },
  watch: {
    liveDateTime(newVal, oldVal) {
      const serverLiveTime = new Date(newVal);

    }
  },
  created() {
    const serverLiveTime = new Date(this.liveDateTime);

  },
  methods: {
    onClickRedirect() {
      this.$router.push({ name: '라이브보드', params: { broadcastId: this.broadcastId } });
    }
  }
}
</script>


<style scoped>
.broadcast-image {
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  margin-bottom: 10px;
}

.broadcast-title {
  font-size: 15px;
  color: #111111;
  padding-top: 10px;
  padding-bottom: 15px;
}

.broadcast-time {
  color: #134010;
  font-size: 18px;
  font-weight: bold;
}

.broadcast-card {
  border: 2px;
  width: 300px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: white;
}

.action-button {
  width: 100%;
  padding: 10px;
  background-color: #134010;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  align-self: center;
  border-radius: 10px;
}

.product-card-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-left: -20px;
}
</style>
