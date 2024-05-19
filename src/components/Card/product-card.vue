<template>
  <div class="product-card slick-slide">
    <div class="thum">
      <img :src="productImg" alt="상품 이미지" class="product-image" />
    </div>
    <div class="info flex items-center">
      <a class="a_detail" name="Curation2">
        <dl>
          <dt class="tit original-name">{{ productName }}</dt>
          <dd class="price">
            <del class="original-price">{{ formattedOriginalPrice }}</del>
            <strong class="discounted-price">{{ formattedDiscountedPrice }}</strong>
          </dd>
        </dl>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProductCard',
  data() {
  },
  props: {
    productName: String,
    originalPrice: Number,
    discountRate: Number,
    productImg: String
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
  }
},
mounted() {
  this.$emit('updateDiscountedPrice', this.discountedPrice);
},
}
</script>

<style scoped>
.slick-slide {
  float: left;
  width: 310px;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #f0f1f4;
}

.product-card .thum {
  position: relative;
  float: left;
  width: 80px;
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
  width: 190px;
  height: 80px;
  margin-left: 100px;
}

.product-card .info .tit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 18px;
  max-height: 36px;
  color: #131518;
  font-size: 14px;
}

.product-card .info .price {
  margin-top: 2px;
}

.product-card .info .price del {
  padding-right: 2px;
  color: #b5b5b5;
  font-size: 12px;
}

.product-card .info .price strong {
  color: #e02020;
  font-weight: 500;
}

.product-image {
  margin: 10px;
  border-radius: 5px;
}
</style>
