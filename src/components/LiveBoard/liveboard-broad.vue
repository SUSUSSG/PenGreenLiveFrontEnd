<template>
    <div class="bg-white" id="broadCard">
        <div class="text-base">
            송출 화면
        </div>
        <videoPlayer :videoSource="videoSourceSrc" class="video-player" />
    </div>
</template>

<script>
import videoPlayer from "@/components/Video/videoplayer.vue";
import videoSource from "@/assets/video/test-video.mp4";

export default {
    components: {
        videoPlayer
    },
    data() {
        return {
            videoSourceSrc: videoSource
        }
    }
}
</script>

<style scoped>
#broadCard {
    height: 850px;
    width: auto;
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.text-base {
    margin-bottom: 5px;
}

.video-player {
    aspect-ratio: 9/16;
    width:100%;
    object-fit:cover;
}

</style>