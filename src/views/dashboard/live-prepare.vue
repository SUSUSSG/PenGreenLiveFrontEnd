<template>
  <div class="grid-container">
    <SellerBroadcastSchedule
        v-for="item in items"
        :key="item.id"
        :broadcast-title="item.broadcastTitle"
        :thumbimage-src="item.thumbimageSrc"
    :product-image-src="item.productimageSrc"
    :product-name="item.productName"
    :product-price="item.productPrice"
    :discount-rate="item.discountRate"
    :live-date-time="item.liveDateTime"
    />
  </div>
</template>

<script>
import SellerBroadcastSchedule from "@/components/Card/seller-broadcast-schedule.vue";
import noImage from "@/assets/images/all-img/no-image.png" // Verify this path is correct

export default {
  name: "live-prepare",
  components:{
    SellerBroadcastSchedule
  },
  data() {
    let liveTime = new Date();
    liveTime.setMinutes(liveTime.getMinutes() + 15);  // 현재 시간으로부터 15분 후
    return {
      items: [
        {
          "id": 1,
          "broadcastTitle": "맛있는 사과를 팔아요",
          "thumbimageSrc": "http://via.placeholder.com/200x200",
          "productimageSrc": "http://via.placeholder.com/100x130",
          "productName": "충주 사과",
          "productPrice": 42000,
          "discountRate": 30,
          "liveDateTime": liveTime.toISOString()
        },
        {
          "id": 2,
          "broadcastTitle": "신선한 오렌지 판매중",
          "thumbimageSrc": "http://via.placeholder.com/200x200",
          "productimageSrc": "http://via.placeholder.com/100x130",
          "productName": "제주 오렌지",
          "productPrice": 35000,
          "discountRate": 20,
          "liveDateTime": "2024-03-22-20:00"
        },
        {
          "id": 3,
          "broadcastTitle": "고소한 피칸 구매하세요",
          "thumbimageSrc": "http://via.placeholder.com/200x200",
          "productimageSrc": "http://via.placeholder.com/100x130",
          "productName": "미국 피칸",
          "productPrice": 50000,
          "discountRate": 25,
          "liveDateTime": "2024-03-23-19:30"
        },
        {
          "id": 4,
          "broadcastTitle": "달콤한 체리, 지금 할인 중",
          "thumbimageSrc": "http://via.placeholder.com/200x200",
          "productimageSrc": "http://via.placeholder.com/100x130",
          "productName": "워싱턴 체리",
          "productPrice": 60000,
          "discountRate": 15,
          "liveDateTime": "2024-03-24-18:00"
        },
        {
          "id": 4,
          "broadcastTitle": "달콤한 체리, 지금 할인 중",
          "thumbimageSrc": "http://via.placeholder.com/200x200",
          "productimageSrc": "http://via.placeholder.com/100x130",
          "productName": "워싱턴 체리",
          "productPrice": 60000,
          "discountRate": 15,
          "liveDateTime": "2024-03-24-18:00"
        },
        {
          "id": 4,
          "broadcastTitle": "달콤한 체리, 지금 할인 중",
          "thumbimageSrc": "http://via.placeholder.com/200x200",
          "productimageSrc": "http://via.placeholder.com/100x130",
          "productName": "워싱턴 체리",
          "productPrice": 60000,
          "discountRate": 15,
          "liveDateTime": "2024-03-24-18:00"
        },


      ]

    };
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
