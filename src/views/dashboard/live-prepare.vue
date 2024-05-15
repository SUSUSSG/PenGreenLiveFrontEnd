<template>
  <div class="grid-container">
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
    let liveTime = new Date();
    liveTime.setMinutes(liveTime.getMinutes() + 15);  // 현재 시간으로부터 15분 후
    return {
      // items: [
      //   {
      //     broadcastTitle: '',
      //     thumbimageSrc: '',
      //     productImageSrc: '',
      //     productName: '',
      //     productPrice: '',
      //     discountRate: '',
      //     liveDateTime: '',
      //   }
      // ],
      broadcastInfo: [],
      // loadingCarousels: true,
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
          // this.loadingCarousels = false;
          console.log("broadcast info data : ", this.broadcastInfo);
        })
        .catch(error => {
          console.error('방송 예정 목록 load 실패 : ', error);
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
</style>
