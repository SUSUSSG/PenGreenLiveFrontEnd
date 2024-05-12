<template>
  <div class="bg-white" id="broadCard">
    <div class="text-base">
      송출 화면
    </div>
    <div v-if="streamManager" class="video-player">
      <VideoPlayer :stream-manager="streamManager"/>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/Video/videoplayer.vue";
import OvVideo from "@/views/test/OvVideo.vue";

export default {
  components: {
    OvVideo,
    VideoPlayer,
  },
  props: {
    streamManager: Object,
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
#broadCard {
  height: 100%;
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
  width: 100%;
  object-fit: cover;
}

</style>