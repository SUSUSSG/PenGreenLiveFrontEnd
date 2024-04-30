<template>
  <div class="card">
    <div class="card-image">
      <img :src="imageUrl" alt="Product Image" />
    </div>
    <div class="stats-card-content">
      <div class="product-info">
        <p class="info-description">상품 코드</p>
        <div class="product-code">{{ productCode }}</div>
        <p class="info-description">녹색 제품 통합 아이디</p>
        <div class="green-code">{{ greenCode }}</div>
        <p class="info-description">인증 라벨</p>
        <div class="certification-images">
          <img
            v-for="(image, index) in certificationImages"
            :key="index"
            :src="image"
            alt="Certification Image"
          />
        </div>
        <p class="info-description">친환경 인증 사유</p>
        <div class="certification-reason">{{ certificationReason }}</div>
      </div>
      <div class="product-details">
        <p class="info-description">상품 가격</p>
        <div class="product-price">{{ productPrice }}</div>
        <p class="info-description">상품 브랜드</p>
        <div class="product-brand">{{ brand }}</div>
        <p class="info-description">상품 카테고리</p>
        <div class="product-category">{{ category }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    productCode: {
      type: String,
      required: true,
    },
    greenCode: {
      type: String,
      required: true,
    },
    certificationImages: {
      type: Array,
      required: true,
    },
    certificationReason: {
      type: String,
      required: true,
    },
    productPrice: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  overflow: hidden;
}

.card-image {
  flex: 0 0 auto;
  width: 200px; /* 이미지 너비를 조절할 수 있습니다. */
  height: 200px; /* 이미지 높이를 조절할 수 있습니다. */
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stats-card-content {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.stats-card-content div{
    font-size: 20px;
}
.stats-card-content p{
    font-size: 1rem;
    color:gray;
}
.product-info {
  flex: 1;
}

.certification-images {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}

.certification-images img {
  max-width: 50px;
  max-height: 50px;
  margin-right: 8px;
}

.product-details {
  margin-top: 16px;
}



</style>
