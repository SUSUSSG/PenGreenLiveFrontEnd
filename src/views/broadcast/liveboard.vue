<template>
    <div class="scroll-container">
        <div class="scroll-content">
            <div>
                <LiveBoardTime></LiveBoardTime>
            </div>
            <div class="inline-flex" id="body">
                <div>
                    <div class="inline-flex">
                        <LiveboardBroad></LiveboardBroad>
                        <LiveBoardChat></LiveBoardChat>
                        <LiveboardProduct></LiveboardProduct>
                    </div>
                    <div class="inline-flex">
                        <LiveBoardStatistics></LiveBoardStatistics>
                        <LiveboardPrompt></LiveboardPrompt>
                    </div>
                </div>
                <div id="sidebar">
                    <LiveboardSidebar></LiveboardSidebar>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LiveBoardTime from '@/components/LiveBoard/liveboard-time.vue';
import LiveBoardChat from '@/components/LiveBoard/liveboard-chat.vue';
import LiveboardBroad from '@/components/LiveBoard/liveboard-broad.vue';
import LiveBoardStatistics from '@/components/LiveBoard/liveboard-statistics.vue';
import LiveboardPrompt from '@/components/LiveBoard/liveboard-prompt.vue';
import LiveboardSidebar from '@/components/LiveBoard/liveboard-sidebar.vue';
import LiveboardProduct from '@/components/LiveBoard/liveboard-product.vue';

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
<style>
.scroll-container {
  overflow-x: auto;
}

.scroll-content {
  display: inline-block;
}
</style>