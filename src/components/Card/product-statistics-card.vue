<template>
  <div class="card">
    <div class="row">
      <div class="row fs">
        <div class="product-category" style="font-weight: 400; color:gray">
          {{ category }} > {{ brand }}
        </div>
      </div>
      <div class="row fe">
        <div class="product-code" style="color:gray">{{ productCode }}</div>
      </div>
    </div>
    <div class="row" style="margin-top:0.5rem; font-weight:500">
      <div class="product-name">{{ productNm }}</div>
    </div>
    <div class="row">
      <div class="card-image">
        <img :src="imageUrl" alt="Product Image" />
      </div>
      <div class="stats-card-content">
        <div class="row">
          <p class="info-description">상품 가격</p>
          <div class="product-price info-data">{{ formattedProductPrice }}</div>
        </div>
        <div class="row">
          <p class="info-description">녹색 코드</p>
          <div class="green-code info-data">{{ greenCode }}</div>
        </div>
        <div class="row">
          <p class="info-description">인증 라벨</p>
          <div class="certification-images">
            <img
              v-for="(image, index) in certificationImages"
              :key="index"
              :src="image"
              alt="Certification Image"
            />
          </div>
        </div>
        <div class="row">
          <p class="info-description">인증 사유</p>
          <div class="certification-reason info-data">{{ certificationReason }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    productNm: {
      type: String,
      required: true,
    },
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
      type: Array, // Array로 타입 수정
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
  computed: {
    formattedProductPrice() {
      // 상품 가격을 숫자로 변환한 후 세 자리마다 콤마를 찍어 포맷합니다.
      const price = parseInt(this.productPrice.replace(/[^0-9]/g, ""));
      return price.toLocaleString() + "원";
    },
  },
};
</script>

<style scoped>
.product-name {
  font-size: 1.5rem;
  min-height: 72px;
}
.card {
  gap:1rem;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
.fe {
  justify-content: flex-end;
}

.fs {
  justify-content: flex-start;
}

.card-image {
  flex: 0 0 auto;
  width: 170px; /* 이미지 너비를 조절할 수 있습니다. */
  height: 170px; /* 이미지 높이를 조절할 수 있습니다. */
  margin-right: 1rem;;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  border:1px solid lightgray;
}

.stats-card-content {
  display: flex;
  flex-direction: column;
}


.stats-card-content p {
  font-size: 1rem;
  color: gray;
  min-width: 80px;
  white-space: nowrap;
}

.certification-images {
  display: flex;
  flex-wrap: wrap;
  margin-top: 6px;
  margin-bottom: 1rem;;
}

.certification-images img {
  max-width: 40px;
  max-height: 40px;
  margin-right: 8px;
}
.certification-reason{
  word-wrap:normal;
}

.info-data{
  font-size: 1rem;
  text-align: left;
}

</style>
