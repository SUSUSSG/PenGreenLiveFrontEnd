<template>
  <div class="grid-container" v-if="!loading">
    <SellerBroadcastSchedule
      v-for="(item, index) in broadcastInfo"
      :key="index"
      :broadcastId="item.broadcastSeq"
      :broadcast-title="item.broadcastTitle"
      :thumbimage-src="'data:image/jpeg;base64,' + item.broadcastImage"
      :productImg="'data:image/jpeg;base64,' + item.productImage"
      :product-name="item.productNm"
      :product-price="item.listPrice"
      :discount-rate="item.discountRate"
      :live-date-time="item.broadcastScheduledTime"
    />
  </div>
  <div v-else class="loading-container">
      <!-- 로딩 중인 동안 보여줄 메시지 또는 로딩 화면 -->
      <p>Loading...</p>
    </div>
</template>

<script>
import SellerBroadcastSchedule from "@/components/Card/seller-broadcast-schedule.vue";
import axios from "axios";

export default {
  name: "live-prepare",
  components:{
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
      axios.get("http://localhost:8090/upcoming-broadcasts")
        .then((response) => {
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
  grid-template-columns: repeat(5, 1fr); /* Creates four columns */
  grid-gap: 20px;
  overflow: auto;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
