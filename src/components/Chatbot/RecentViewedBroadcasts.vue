<template>
  <div class="broadcast-section">
    <p class="ai-card-title">나의 최근 시청기록</p>
    <div class="broadcast-list">
      <div
        class="broadcast-card"
        v-for="broadcast in broadcasts"
        :key="broadcast.broadcastSeq"
        @click="navigateToBroadcast(broadcast.broadcastSeq)"

      >
      <div class="row">
        <img :src="broadcast.channelImage? broadcast.channelImage
                    : 'https://placehold.co/80x80'" alt="채널 이미지" class="channel-image"/>
        <p class="channel-name"> {{ broadcast.channelNm }}</p>
      </div>
        <img
          :src="broadcast.broadcastImage"
          alt="방송 이미지"
          class="broadcast-image"
        />
        <div class="broadcast-info">
          <h3 class="broadcast-title">{{ broadcast.broadcastTitle }}</h3>
          <p class="broadcast-time">
            {{ formatDate(broadcast.viewedDate) }}
          </p>
          <img
            :src="broadcast.productImage"
            alt="제품 이미지"
            class="product-image"
          />
          <p class="product-name">{{ broadcast.productNm }}</p>
          <p class="original-price">{{ formatPrice(broadcast.listPrice) }}원</p>
        </div>
      </div>
    </div>
    <div class="card-button" @click="goToBroadcastHistory">
      <p class="card-text">자세히 보러가기</p>
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
  
  mounted() {
    this.fetchBroadcasts();
  },
  methods: {
    fetchBroadcasts() {
      axios
        .get(`/recently-viewed/broadcasts`)
        .then((response) => {
          console.log("Broadcasts response:", response.data);
          this.broadcasts = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the orders:", error);
        });
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("ko-KR", options);
    },
    formatPrice(price) {
      return price.toLocaleString();
    },
    goToBroadcastHistory() {
      this.$el.querySelector(".card-button").classList.add("clicked");
      setTimeout(() => {
        this.$router.push("/broadcast-history");
      }, 150);
    },
    navigateToBroadcast(broadcastSeq) {
      this.$router.push(`/live-viewing/${broadcastSeq}`);
    },
  },
};
</script>


<style scoped>
.row{
  display: flex;
  flex-direction: row;
  width: 100%;
  height:fit-content;
  justify-content:flex-start;
  align-items: center;
  margin-bottom:1rem;
  gap: 1rem;
}

.channel-image{
  border-radius: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 60px;
  height: 60px;
  border : 0.5px solid gray;
}

.channel-name{
  font-size: 1.2rem;
  font-weight: bold;
  width:180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
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
</style>
