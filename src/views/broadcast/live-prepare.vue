<template>
  <div class="grid-container" v-if="!loading">
    <SellerBroadcastSchedule v-for="(item, index) in broadcastInfo" :key="index" :broadcastId="item.broadcastSeq"
      :broadcast-title="item.broadcastTitle" :thumbimage-src="item.broadcastImage"
      :productImg="item.productImage" :product-name="item.productNm"
      :product-price="item.listPrice" :discount-rate="item.discountRate" :discount-price="item.discountPrice"
      :live-date-time="item.broadcastScheduledTime" />
  </div>
  <div v-else class="loading-container">
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
    <p>정보를 불러오고 있습니다....</p>
  </div>

</template>

<script>
import SellerBroadcastSchedule from "@/components/Card/seller-broadcast-schedule.vue";
import axios from "axios";

export default {
  name: "live-prepare",
  components: {
    SellerBroadcastSchedule
  },
  data() {
    return {
      broadcastInfo: [],
      loading: true
    };
  },
  created() {
    this.loadUpcomingBroadcastInfo();
  },
  methods: {
    loadUpcomingBroadcastInfo() {
      axios.get("http://localhost:8090/prepare-broadcasts")
        .then((response) => {
          console.log(response.data);
          this.broadcastInfo = response.data;
          this.loading = false;
          console.log("broadcast info data : ", this.broadcastInfo);
        })
        .catch(error => {
          console.error('방송 예정 목록 load 실패 : ', error);
          this.loading = false;
        })
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* Creates four columns */
  grid-gap: 20px;
  overflow: auto;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 350px
}

.spinner-container {
  margin-bottom: 10px;
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #ccc;
  border-top-color: #134010;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
