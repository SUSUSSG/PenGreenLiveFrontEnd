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
    <div
      v-if="!showSubscribeButton"
      class="image-wrapper"
      @click="showSubscribeButton = true"
    >
      <img class="live-thumbnail-image" :src="shopThumbnailUrl" alt="Image" />
      <div class="list-one-line">{{ shopName }}</div>
    </div>
    <div v-show="showSubscribeButton" class="subscribe-button-wrapper">
      <button
        class="subscribe-button"
        :class="{ subscribed: isSubscribed }"
        @click="handleSubscribe"
      >
        {{ isSubscribed ? "구독 중" : "구독하기" }}
      </button>
      <span class="close" @click="showSubscribeButton = false">&times;</span>
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
  data() {
    return {
      showSubscribeButton: false,
      isSubscribed: false,
    };
  },
  methods: {
    handleSubscribe() {
      if (this.isSubscribed) {
        // 구독 해제
        this.isSubscribed = false;
      } else {
        // 구독
        this.isSubscribed = true;
      }
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
  transition: 1s ease-in-out;
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
.subscribe-button-wrapper {
  padding: 0 40px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.subscribe-button {
  font-size: 16px;
  background-color: #1c6d16;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  width: 100%;
  height: 36px;
  margin: 0 20px;
}

.close {
  position: absolute;
  top: 1;
  right: 0;
  margin-right: 10px;
  padding: 5px 10px;
  font-size: 18px;
  font-weight: bold;
  color: #aaa;
  background-color: lightgray;
  border-radius: 50%;
  cursor: pointer;
}

.close:hover {
  color: black;
}

.subscribe-button-wrapper {
  width: 219px;
}

.subscribe-button.subscribed {
  background-color: #ECE6CC;
  color: gray;
  cursor: default;
}
</style>
