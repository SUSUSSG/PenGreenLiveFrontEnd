<template>
  <div class="product-card slick-slide">
    <div class="thum">
      <img :src="productImg" alt="상품 이미지" class="product-image" />
    </div>
    <div class="info flex items-center">
      <a class="a_detail w-full" name="Curation2">
        <dl class="w-full">
          <div v-if="brand" class="brand">{{ "[" + brand + "]" }}</div>
          <dt class="tit original-name" :data-tooltipe=productName>{{ productName }}</dt>
          <div class="price-info">
            <div class="prices">
              <del class="original-price">{{ formattedOriginalPrice }}</del>
              <div class="discount-price-wrap">
                <p class="discount-rate">{{ discountRate }}%</p>
                <strong class="discounted-price">{{ formattedDiscountedPrice }}</strong>
              </div>
            </div>
          </div>
        </dl>
      </a>
    </div>
    <div class="label-images">
      <img v-for="(img, index) in labelImg" :key="index" :src="img" alt="Label Image" class="label-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    productName: String,
    brand: Boolean,
    originalPrice: Number,
    discountRate: Number,
    productImg: String,
    labelImg: Array
  },
  computed: {
    discountedPrice() {
      let discountPrice = this.originalPrice - (this.originalPrice * this.discountRate / 100);
      discountPrice = Math.round(discountPrice / 10) * 10;
      return discountPrice;
    },
    formattedOriginalPrice() {
      return `${this.originalPrice.toLocaleString()}원`;
    },
    formattedDiscountedPrice() {
      return `${this.discountedPrice.toLocaleString()}원`;
    },
  },
  mounted() {
    this.$emit('updateDiscountedPrice', this.discountedPrice);
  }
}
</script>

<style scoped>
.slick-slide {
  position: relative;
  float: left;
  width: 100%;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #f0f1f4;
  padding-top: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
}

.product-card .thum {
  position: relative;
  float: left;
  /* width: 80px; */
  width: 30%;
  cursor: pointer;
  text-align: center;
}

.product-card .thum img {
  width: auto !important;
  max-width: 80px;
  height: auto !important;
  max-height: 90px;
}

.product-card .info {
  position: relative;
  width: 70%;
  height: 30%;
}

.product-card .info .tit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 18px;
  max-height: 36px;
  color: #131518;
  font-size: 14px;
  display: block;
}

.product-card .info .tit:hover::after {
  content: attr(data-tooltipe);
  position: absolute;
  background-color: rgba(236, 230, 204, 0.9);
  color: #111111;
  padding: 3px;
  border-radius: 10px;
  left: 0;
  white-space: nowrap;
  z-index: 10;
  cursor: pointer;
  font-size: 11px;
}

.product-card .info .price-info {
  display: flex;
  align-items: center;
  margin-top: 4px;
}

.product-card .info .discount-rate {
  color: red;
  font-size: 14px;
  margin-right: 10px;
}

.product-card .info .prices {
  display: flex;
  flex-direction: column;
}

.product-card .info .prices del {
  color: #b5b5b5;
  font-size: 12px;
}

.product-card .info .prices strong {
  color: #111111;
  font-weight: 500;
}

.product-card .label-images {
  position: absolute;
  right: 0;
  bottom: 5px;
}

.label-image {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

.brand {
  font-size: 0.8rem;
  margin-bottom: 5px;
}

.discount-price-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
