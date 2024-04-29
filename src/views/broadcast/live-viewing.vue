<template>
  <div class="live-container">
    <LiveboardChat :card-width="'33vw'" :card-height="'100vh'"/>
    <Live class="live-section" show-icon-side-bar="false" show-title-bar="false"></Live>
    <div class="live-section empty-space">
    </div>
  </div>
</template>

<script>
import LiveboardChat from "@/components/liveboard/liveboard-chat.vue";
import Live from "@/components/Video/live.vue";

export default {
  name: "live-viewing",
  components: {
    LiveboardChat,
    Live,
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

.empty-space {
  /* 비어있는 공간을 위한 스타일링이 필요하면 여기에 추가합니다. */
}
</style>
