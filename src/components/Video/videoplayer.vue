<template>
  <div class="video-wrapper">
    <!-- ref 속성을 추가하여 video 요소를 직접 참조할 수 있습니다. -->
    <video ref="videoElement" autoPlay class="video"></video>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',

  props: {
    streamManager: Object,
  },

  mounted() {
    // this.$refs를 통해 video 요소에 접근하고, 해당 요소에 비디오 스트림을 추가합니다.
    this.streamManager.addVideoElement(this.$refs.videoElement);
  },
};
</script>

<style scoped>
.video-wrapper {
  width: 100%;
  aspect-ratio: 9 / 16;
}

.video {
  width: 100%;
  height: auto;
  display: block;
}
</style>
