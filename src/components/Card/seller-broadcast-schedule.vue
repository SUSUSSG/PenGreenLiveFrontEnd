<template>
  <div class="broadcast-card">
    <div class="broadcast-image" :style="{ backgroundImage: 'url(' + thumbimageSrc + ')' }">
      <!-- Empty div for the background image -->
    </div>
    <h1 class="broadcast-title">{{ broadcastTitle }}</h1>
    <ProductCard
        :product-name="productName"
        :original-price="productPrice"
        :discount-rate="discountRate"/>
    <div>
      <p>라이브 일시: {{ formattedLiveDateTime }}</p>
    </div>
    <!-- 조건부 렌더링 -->
    <div v-if="isPrepareTime">
      <button class="action-button" @click="onClickRedirect()">방송 준비</button>
    </div>
    <div v-else>
      <p>방송 준비는 라이브 시작 15분전부터만 가능합니다.</p>
    </div>
  </div>
</template>

<script>
import noImage from "@/assets/images/all-img/no-image.png"
import ProductCard from "@/components/Card/product-card.vue";

export default {
  components: {
    ProductCard
  },
  name: 'BroadcastCard',
  props: {
    broadcastTitle: String,
    thumbimageSrc: String,
    productimageSrc: {
      type: String,
      default: noImage
    },
    productName: String,
    productPrice: Number,
    discountRate: Number,
    liveDateTime: String
  },
  data() {
    return {
      noImageSrc: noImage
    };
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
      this.$router.push({name: '라이브보드'}) // About 페이지로 이동}
    }
  }
}
</script>

<style scoped>
.broadcast-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
}
.broadcast-title {
  font-size: 18px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 5px;
}
.broadcast-card {
  border: 2px solid black;
  width: 300px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.action-button {
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  align-self: center; /* 중앙 정렬 */
}

</style>
