<template>
    <div class="bg-white rounded pt-3 px-4 mt-4 ml-5" id="broadCard">
        <div class="text-base">
                송출 화면
        </div>
        <videoPlayer :videoSource="videoSourceSrc"></videoPlayer>
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
            videoSourceSrc : videoSource
        }
        
    }
}
</script>
<style>
#broadCard {
  width: 400px;
  max-width: 100%;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
}
.text-base {
    margin-bottom: 5px;
}
</style>