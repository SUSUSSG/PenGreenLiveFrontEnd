<template>
    <LiveBoardTime></LiveBoardTime>
    <LiveBoardChat></LiveBoardChat>
    <LiveboardBroad></LiveboardBroad>
</template>
<script>
import LiveBoardTime from '@/components/LiveBoard/liveboard-time.vue';
import LiveBoardChat from '@/components/LiveBoard/liveboard-chat.vue';
import LiveboardBroad from '@/components/LiveBoard/liveboard-broad.vue';

export default {
    components: {
        LiveBoardTime,
        LiveBoardChat,
        LiveboardBroad
    }
};
</script>
<style lang=""></style>
  