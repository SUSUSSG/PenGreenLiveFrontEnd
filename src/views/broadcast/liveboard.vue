<template>
    <LiveboardPrompt></LiveboardPrompt><LiveboardSidebar></LiveboardSidebar>
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
import LiveboardPrompt from '@/components/LiveBoard/liveboard-prompt.vue';
import LiveboardSidebar from '@/components/LiveBoard/liveboard-sidebar.vue';

export default {
    components: {
        LiveBoardTime,
        LiveBoardChat,
        LiveboardBroad,
        LiveBoardStatistics,
        LiveboardPrompt,
        LiveboardSidebar
    }
};
</script>
<style lang=""></style>
  