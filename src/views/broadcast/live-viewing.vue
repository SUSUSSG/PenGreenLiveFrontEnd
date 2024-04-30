<template>
  <div class="live-container">
    <LiveboardChat :card-width="'33vw'" :card-height="'100vh'"/>
    <Live class="live-section" show-icon-side-bar="false" show-title-bar="false"></Live>
    <LiveBoardPurchase class="purchase-section h-full"/>
  </div>
</template>

<script>
import LiveboardChat from "@/components/liveboard/liveboard-chat.vue";
import LiveBoardPurchase from "@/components/liveboard/liveboard-purchase.vue"
import Live from "@/components/Video/live.vue";

export default {
  name: "live-viewing",
  components: {
    LiveboardChat,
    Live,
    LiveBoardPurchase,
  },
  data(){
    return {
    }
  }
};
</script>

<style scoped>
.live-container {
  display: flex;
  height: 100vh;
}

.live-section {
  flex: 1; /* 모든 섹션은 가로 방향으로 1/3의 비율을 차지합니다. */
  min-width: 0; /* Flexbox 내용물이 넘칠 때를 대비 */
}

.purchase-section {
  flex: 1;
  min-width: 0; 
}

</style>
