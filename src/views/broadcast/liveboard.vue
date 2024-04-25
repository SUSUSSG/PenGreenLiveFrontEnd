<template>
    <LiveBoardStatistics></LiveBoardStatistics>
    <LiveBoardTime></LiveBoardTime>
    <LiveBoardChat></LiveBoardChat>
    <LiveboardBroad></LiveboardBroad>
</template>
<script>
import LiveBoardTime from '@/components/LiveBoard/liveboard-time.vue';
import LiveBoardChat from '@/components/LiveBoard/liveboard-chat.vue';
import LiveboardBroad from '@/components/LiveBoard/liveboard-broad.vue';
import LiveBoardStatistics from '@/components/LiveBoard/liveboard-statistics.vue';

export default {
    components: {
        LiveBoardTime,
        LiveBoardChat,
        LiveboardBroad,
        LiveBoardStatistics
    }
};
</script>
<style lang=""></style>
  