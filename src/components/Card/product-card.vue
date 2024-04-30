<template>
  <div class="card">
    <div class="icon-bg">
      <img src="icon.png" alt="상품 이미지" />
    </div>
    <div class="info">
      <h1>{{ productName }}</h1>
      <p class="original-price">{{ originalPrice | currency }}</p>
      <p class="discounted-price">{{ discountedPrice | currency }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    productName: String,
    originalPrice: Number,
    discountRate: Number
  },
  computed: {
    discountedPrice() {
      // 할인가를 계산합니다.
      return this.originalPrice - (this.originalPrice * this.discountRate / 100);
    }
  },
  filters: {
    currency(value) {
      // 원화 표시로 포맷합니다.
      return `${value.toLocaleString()}원`;
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
}
.icon-bg {
  background-color: grey;
  padding: 1px;
  margin-right: 10px;
  border : 1px solid
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
