<template>
  <div class="group mt-8">
    <div class="flex-row-wrapper">
      <h6 class="live-time">{{ timeRemaining }}</h6>
      <img
        class="live-thumbnail-image"
        :src="broadcastImage"
        alt="Image"
      />
      <div class="content-wrapper">
        <div class="live-title">{{ broadcastTitle }}</div>
        <div class="live-benefit-title">{{ benefitContent }}</div>
        <hr class="mt-2 mb-2" />
        <div class="product-wrapper">
          <img
            class="live-product-image"
            :src="productImage"
            alt="Image"
          />
          <div class="product-content-wrapper">
            <div class="product-title">
              {{ productNm }}
            </div>
            <div style="display: flex; flex-direction: row; align-items: center;">
              <div class="product-price">{{ discountRate }}% 할인</div>
              <div style="display: flex; flex-direction: column">
                <p style="font-size:0.8rem; color:gray; text-decoration:line-through;">{{ formattedListPrice }}원</p>
                <p style="font-weight: bold;">{{ formattedDiscountPrice }}원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!showSubscribeButton"
      class="image-wrapper"
      @click="
        showSubscribeButton = true;
        checkSubscription();
      "
    >
      <img
        class="live-thumbnail-image"
        :src="channelImage"
        alt="Image"
      />
      <div class="list-one-line">{{ channelNm }}</div>
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
import axios from "@/axios";

export default {
  props: {
    broadcastScheduledTime: {
      type: String,
      required: true,
    },
    broadcastImage: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    broadcastTitle: {
      type: String,
      required: true,
    },
    benefitContent: {
      type: String,
      required: true,
    },
    productNm: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    listPrice: {
      type: Number,
      required: true,
    },
    discountRate: {
      type: Number,
      required: true,
    },
    broadcastSeq: {
      type: Number,
      required: true,
    },
    channelNm: {
      type: String,
      required: true,
    },
    channelImage: {
      type: String,
      required: true,
    },
    channelSeq: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showSubscribeButton: false,
      isSubscribed: false,
    };
  },
  computed: {
    timeRemaining() {
      const broadcastTime = new Date(this.broadcastScheduledTime);
      const hours = String(broadcastTime.getHours()).padStart(2, "0");
      const minutes = String(broadcastTime.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    formattedDiscountPrice() {
      return this.discountPrice.toLocaleString();
    },
    formattedListPrice() {
      return this.listPrice.toLocaleString();
    }
  },
  methods: {
    checkSubscription() {
      axios
        .get("/notification-channel", {
          params: {
            channelSeq: this.channelSeq,
          },
        })
        .then((response) => {
          this.isSubscribed = response.data;
        })
        .catch((error) => {
          console.error("구독 정보 확인 실패:", error);
        });
    },
    handleSubscribe() {
      if (this.isSubscribed) {
        // 구독 해제
        axios
          .post("/notification-channel/remove", null, {
            params: {
              channelSeq: this.channelSeq,
            },
          })
          .then((response) => {
            this.isSubscribed = false;
            alert("구독이 취소되었습니다.");
          })
          .catch((error) => {
            console.error("구독 취소 실패:", error);
            alert("구독 취소 중 오류가 발생했습니다.");
          });
      } else {
        // 구독
        axios
          .post("/notification-channel", null, {
            params: {
              channelSeq: this.channelSeq,
            },
          })
          .then((response) => {
            this.isSubscribed = true;
            alert("구독이 완료되었습니다.");
          })
          .catch((error) => {
            console.error("구독 실패:", error);
            alert("구독 중 오류가 발생했습니다.");
          });
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
  transition: background-color 0.3s;
}
.group:hover {
    background-color: #f4f2ea;
}
.image-wrapper img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 100%;
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
  border-radius: 12px;
  height: 240px;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}
.live-title {
  font-size: 20px;
}

.live-product-image {
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius:10px;
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
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  background: red;
  height: fit-content;
  padding: 4px 16px;
  border-radius: 15rem;
  margin-right: 1rem;
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
  background-color: #ece6cc;
  color: gray;
  cursor: default;
}
</style>
