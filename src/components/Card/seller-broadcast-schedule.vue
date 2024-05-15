<template>
  <div class="broadcast-card">
    <p class="broadcast-time"> {{ formattedLiveDateTime }}</p>
    <h1 class="broadcast-title">{{ broadcastTitle }}</h1>
    <div class="broadcast-image" :style="{ backgroundImage: 'url(' + thumbimageSrc + ')' }">
    </div>

    <div class="product-card-container">
      <ProductCard :product-name="productName" :original-price="productPrice" :discount-rate="discountRate"
        :product-img="productImg" />
    </div>

    <div>

    </div>
    <!-- 조건부 렌더링 -->
    <div v-if="isPrepareTime">
      <button class="action-button" @click="onClickRedirect()">방송 준비</button>
    </div>
    <div v-else>
      <p style="text-align: center;">방송 준비는 라이브 시작 <br> 15분전부터만 가능합니다.</p>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/Card/product-card.vue";

export default {
  components: {
    ProductCard
  },
  name: 'BroadcastCard',
  props: {
    broadcastId: Number,
    broadcastTitle: String,
    thumbimageSrc: String,
    productImg: String,
    productName: String,
    productPrice: Number,
    discountRate: Number,
    liveDateTime: String
  },
  computed: {
    formattedLiveDateTime() {
      // 서버에서 받아온 방송 시작 시간
      const serverLiveTime = new Date(this.liveDateTime);

      // 클라이언트의 시간대와 UTC 시간대의 차이를 보정
      const offsetInMilliseconds = new Date().getTimezoneOffset() * 60000; // 밀리초 단위로 변환
      const adjustedServerLiveTime = new Date(serverLiveTime.getTime() + offsetInMilliseconds); // 클라이언트의 시간대에 맞게 조정

      const year = adjustedServerLiveTime.getFullYear();
      const month = ('0' + (adjustedServerLiveTime.getMonth() + 1)).slice(-2);
      const day = ('0' + adjustedServerLiveTime.getDate()).slice(-2);
      const hours = ('0' + adjustedServerLiveTime.getHours()).slice(-2);
      const minutes = ('0' + adjustedServerLiveTime.getMinutes()).slice(-2);

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    isPrepareTime() {
      const now = new Date();
      // 서버에서 받아온 방송 시작 시간을 클라이언트의 시간대에 맞게 조정
      const serverLiveTime = new Date(this.liveDateTime);
      const offsetInMilliseconds = new Date().getTimezoneOffset() * 60000;
      const adjustedServerLiveTime = new Date(serverLiveTime.getTime() + offsetInMilliseconds);
      const prepareTime = new Date(adjustedServerLiveTime.getTime() - 15 * 60000); // 15분 전
      const endTime = new Date(adjustedServerLiveTime.getTime() + 15 * 60000); // 방송 시작 후 15분 후
      // 현재 시간이 방송 시작 15분 전부터 방송 시작 후 15분까지인지 확인
      return now >= prepareTime && now <= endTime;

    },
    discountedPrice() {
      return this.productPrice - (this.productPrice * (this.discountRate / 100));
    },
    formattedOriginalPrice() {
      return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(this.productPrice);
    },
    formattedDiscountedPrice() {
      return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(this.discountedPrice);
    },
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
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
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
  /* color: #111111; */
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
}

.product-card-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-left: -20px;
}
</style>
