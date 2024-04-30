<template>
  <div class="group" style="display: flex !important">
    <div class="flex-row-wrapper">
      <h6 class="live-time">{{ liveTime }}</h6>
      <img class="live-thumbnail-image" :src="thumbnailUrl" alt="Image" />
      <div class="content-wrapper">
        <div class="live-title">{{ liveTitle }}</div>
        <div class="live-benefit-title">{{ liveBenefitTitle }}</div>
        <hr class="mt-2 mb-2" />
        <div class="product-wrapper">
          <img class="live-product-image" :src="productImgUrl" alt="Image" />
          <div class="product-content-wrapper">
            <div class="product-title">
              {{ productName }} - {{ productDescription }}
            </div>
            <div class="product-price">60% 할인 {{ productPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="image-wrapper">
      <img class="live-thumbnail-image" :src="shopThumbnailUrl" alt="Image" />
      <div class="list-one-line">{{ shopName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    liveTime: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    productImgUrl: {
      type: String,
      required: true,
    },
    liveTitle: {
      type: String,
      required: true,
    },
    liveBenefitTitle: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    shopThumbnailUrl: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.content-wrapper {
  width: 100%;
}
.group {
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 240px;
}
.image-wrapper img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}
.flex-row-wrapper {
  width: 100%;
  display: flex !important;
  flex-direction: row;
  gap: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  align-items: center;
}
.image-wrapper {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 1rem;
  padding-right: 5rem;
}
.live-thumbnail-image {
  max-height: 240px;
  border-radius: 12px;
}
.live-title {
  font-size: 20px;
}

.live-product-image {
  height: 60px;
  width: 60px;
  object-fit: cover;
}
.live-benefit-title {
  color: darkgreen;
}
.product-wrapper {
  display: flex !important;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}
.product-content-wrapper {
  display: flex !important;
  flex-direction: column;
}
.product-price {
  font-weight: bold;
  color: darkgreen;
}
</style>
