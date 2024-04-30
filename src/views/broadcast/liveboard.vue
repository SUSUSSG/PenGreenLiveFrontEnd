<template>
  <div class="main-wrapper">
    <LiveBoardTime />
    <div class="content-wrapper">
      <div class="flex-row">
        <div class="flex-col">
          <div class="flex-row">
            <LiveboardBroad />
            <LiveBoardChat />
          </div>
        </div>
        <div class="flex-col">
          <LiveBoardStatistics />
          <LiveboardProduct />
          <LiveboardPrompt />
        </div>
        <div class="flex-col">
          <LiveboardSidebar />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LiveBoardTime from "@/components/LiveBoard/liveboard-time.vue";
import LiveBoardChat from "@/components/LiveBoard/liveboard-chat.vue";
import LiveboardBroad from "@/components/LiveBoard/liveboard-broad.vue";
import LiveBoardStatistics from "@/components/LiveBoard/liveboard-statistics.vue";
import LiveboardPrompt from "@/components/LiveBoard/liveboard-prompt.vue";
import LiveboardSidebar from "@/components/LiveBoard/liveboard-sidebar.vue";
import LiveboardProduct from "@/components/LiveBoard/liveboard-product.vue";

export default {
  components: {
    LiveBoardTime,
    LiveBoardChat,
    LiveboardBroad,
    LiveBoardStatistics,
    LiveboardPrompt,
    LiveboardSidebar,
    LiveboardProduct
  }
};
</script>
<style lang="scss" scoped>
.main-wrapper{
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content-wrapper {
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: hidden;
}

.flex-row {
  display: flex !important;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.flex-col {
  display: flex !important;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
  