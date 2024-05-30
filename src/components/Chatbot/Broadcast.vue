<template>
  <div class="broadcast-section">
    <p class="ai-card-title">{{ keyword }} 관련 방송</p>
    <div v-if="broadcasts.length" class="broadcast-list">
      <div
        class="broadcast-card"
        v-for="broadcast in broadcasts"
        :key="broadcast.broadcastSeq"
        @click="navigateToBroadcast(broadcast.broadcastSeq)"
      >
        <img
          :src="broadcast.broadcastImage"
          alt="방송 이미지"
          class="broadcast-image"
        />
        <div class="broadcast-info">
          <h3 class="broadcast-title">{{ broadcast.broadcastTitle }}</h3>
          <p class="broadcast-summary">{{ broadcast.broadcastSummary }}</p>
          <p class="broadcast-time">
            {{ formatDate(broadcast.broadcastScheduledTime) }}
          </p>
          <img
            :src="broadcast.productImage"
            alt="제품 이미지"
            class="product-image"
          />
          <p class="product-name">{{ broadcast.productNm }}</p>
          <p class="discount-price">
            {{ formatPrice(broadcast.discountPrice) }}원
          </p>
          <p class="original-price">{{ formatPrice(broadcast.listPrice) }}원</p>
        </div>
      </div>
    </div>
    <div v-else class="no-broadcasts">
      <div
        style="
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 2.5rem;
          font-size: 2rem;
          color: lightgray;
          margin: 1rem auto;
          margin-top: 2rem;
          border-radius: 100%;
          border: 2px solid lightgray;
        "
      >
        !
      </div>
      <p style="height: 20px">현재 조회된 방송이 없습니다.</p>
    </div>
    <div class="card-button" @click="goToOrderList">
      <p class="card-text">다른 방송도 보러가기</p>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      broadcasts: [],
    };
  },
  props: {
    keyword: {
      type: String,
      required: true,
    },
  },

  mounted() {
    if (this.keyword) {

      this.fetchBroadcasts(this.keyword);
    }
  },
  methods: {
    fetchBroadcasts(keyword) {
      if (!keyword) {

        return;
      }

      axios
        .get(`/openai/broadcast-keyword`, {
          params: { keyword },
        })
        .then((response) => {

          this.broadcasts = response.data;
        })
        .catch((error) => {

        });
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("ko-KR", options);
    },
    formatPrice(price) {
      return price.toLocaleString();
    },
    goToOrderList() {
      this.$el.querySelector(".card-button").classList.add("clicked");
      setTimeout(() => {
        this.$router.push("/schedule");
      }, 150);
    },
    navigateToBroadcast(broadcastSeq) {
      this.$router.push(`/live-viewing/${broadcastSeq}`);
    },
  },
};
</script>

<style scoped>
.broadcast-section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.ai-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #037a00;
}

.broadcast-list {
  display: flex;
  overflow-x: scroll;
  padding: 10px 0;
}

.broadcast-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  padding: 15px;
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.broadcast-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.broadcast-info {
  width: 100%;
  text-align: center;
}

.broadcast-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
}

.broadcast-summary {
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
}

.broadcast-time {
  font-size: 0.9rem;
  color: #888;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px 0;
}

.product-name {
  font-size: 1rem;
  font-weight: bold;
}

.discount-price {
  font-size: 1.2rem;
  color: #ff4500;
  font-weight: bold;
}

.original-price {
  font-size: 0.9rem;
  color: #aaa;
  text-decoration: line-through;
}

.card-button {
  background-color: #037a00;
  padding: 15px 20px;
  border-radius: 100px;
  margin-top: 2rem;
  font-weight: bold;
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.1s ease;
  text-align: center;
}

.card-button:hover {
  transform: scale(1.02);
}

.card-button.clicked {
  transform: scale(0.98);
}

.card-text {
  font-size: 1.2rem;
}

.no-broadcasts {
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  margin: 20px 0;
}
</style>
