<template>
  <div class="broadcast-card">
    <p class="broadcast-time"> {{ formattedLiveDateTime }}</p>
    <h1 class="broadcast-title">{{ broadcastTitle }}</h1>
    <div class="broadcast-image" :style="{ backgroundImage: 'url(' + thumbimageSrc + ')' }">
    </div>
  
    <div class="product-card-container">
      <ProductCard 
          :product-name="productName"
          :original-price="productPrice"
          :discount-rate="discountRate"
          :product-img="productImg"/>
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
      const liveTime = new Date(this.liveDateTime);
      return liveTime.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    isPrepareTime() {
      const now = new Date();
      console.log(now);
      const liveTime = new Date(this.liveDateTime);
      const prepareTime = new Date(liveTime.getTime() - 15 * 60000); // 15분 전
      return now >= prepareTime && now <= liveTime;
    },
    discountedPrice() {
      return this.productPrice - (this.productPrice * (this.discountRate / 100));
    },
    formattedOriginalPrice() {
      return new Intl.NumberFormat('ko-KR', {style: 'currency', currency: 'KRW'}).format(this.productPrice);
    },
    formattedDiscountedPrice() {
      return new Intl.NumberFormat('ko-KR', {style: 'currency', currency: 'KRW'}).format(this.discountedPrice);
    },
  },
  methods: {
    onClickRedirect() {
      this.$router.push({name: '라이브보드'}) 
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
  background-color: black;
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
