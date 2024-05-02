<template>
  <div class="product-card">
    <div class="icon-bg">
      <img :src="noImageSrc" alt="상품 이미지" class="product-image"/>
    </div>
    <div class="info">
      <div class="product-name">{{ productName }}</div>
      <div class="original-price">{{ formattedOriginalPrice }}</div>
      <div class="discounted-price">{{ formattedDiscountedPrice }}</div>
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
.product-card {
  display: flex;
  align-items: center;
  padding: 10px;
}
.icon-bg {
  background-color: grey;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px; 
  height: 80px; 
}
.product-image {
  width: 100%; /* 부모 요소에 맞게 조정 */
  height: 100%; /* 부모 요소에 맞게 조정 */
  object-fit: cover;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px; /* 이미지와 정보 사이의 간격 */
}
.product-name {
  font-size: 1.2em;
  margin-bottom: 5px; /* 각 요소 간격 조정 */
}
.original-price {
  text-decoration: line-through;
  color: grey;
}
.discounted-price {
  font-size: 1.2em;
  color: red;
}

</style>
