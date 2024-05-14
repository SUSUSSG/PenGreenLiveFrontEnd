<template>
  <div class="grid-container">
    <SellerBroadcastSchedule
        v-for="item in items"
        :key="item.id"
        :broadcast-title="item.broadcastTitle"
        :thumbimage-src="item.thumbimageSrc"
    :product-image-src="item.productimageSrc"
    :product-name="item.productName"
    :product-price="item.originalPrice"
    :discount-rate="item.discountRate"
    :live-date-time="item.liveDateTime"
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
      boradcastSeq: '',
      items: [
        {
          broadcastTitle: '',
          thumbimageSrc: '',
          productImageSrc: '',
          productName: '',
          originalPrice: '',
          discountRate: '',
          liveDateTime: '',
        }
      ]
    };
  },
  created() {
    this.loadUpcomingBroadcastInfo();
  },
  methods: {
    loadUpcomingBroadcastInfo() {
      const url = `http://localhost:8090/upcoming-broadcasts`;

      axios.get(url)
        .then(response => {
          console.log(response.data),
          this.items = response.data.map (item => {
            return {
              broadcastTitle: item.broadcastTitle,
              thumbimageSrc: item.broadcastImage,
              productImageSrc: item.productImage,
              productName: item.productNm,
              originalPrice: item.listPrice,
              discountRate: item.discountRate,
              liveDateTime: item.broadcastScheduledTime,
            }
          });
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
