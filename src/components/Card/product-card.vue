<template>
  <div class="card">
    <div class="icon-bg">
      <img :src="noImageSrc" alt="상품 이미지" class="product-image"/>
    </div>
    <div class="info">
      <h6>{{ productName }}</h6>
      <p class="original-price">{{ formattedOriginalPrice }}</p>
      <p class="discounted-price">{{ formattedDiscountedPrice }}</p>
    </div>
  </div>
</template>


<script>
import noImage from "@/assets/images/all-img/no-image.png";

export default {
  name: 'ProductCard',
  data() {
    return {
      noImageSrc: noImage
    }
  },
  props: {
    productName: String,
    originalPrice: Number,
    discountRate: Number
  },
  computed: {
    discountedPrice() {
      return this.originalPrice - (this.originalPrice * this.discountRate / 100);
    },
    formattedOriginalPrice() {
      return `${this.originalPrice.toLocaleString()}원`;
    },
    formattedDiscountedPrice() {
      return `${this.discountedPrice.toLocaleString()}원`;
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid lightblue;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
}
.icon-bg {
  background-color: grey;
  padding: 1px;
  margin-right: 10px;
  border: 1px solid #ddd;
  flex: 0 0 25%; /* 이미지 컨테이너의 크기를 카드 너비의 1/4로 고정 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-image {
  max-width: 100%;
  height: auto; /* 비율 유지 */
}
.info h1 {
  font-size: 1.5em;
  margin: 0;
}
.original-price {
  text-decoration: line-through;
  color: grey;
}
.discounted-price {
  font-size: 1.2em;
  color: red;
}
.reviews {
  font-size: 0.8em;
  color: grey;
}
</style>
