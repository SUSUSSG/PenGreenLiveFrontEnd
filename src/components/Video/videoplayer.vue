<template>
  <div className="video-wrapper">
    <video ref="videoElement" muted autoPlay className="video"></video>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',

  props: {
    streamManager: Object,
    isMuted: Boolean,
  },

  mounted() {
    this.streamManager.addVideoElement(this.$refs.videoElement);
    this.unmuteVideo();
  },
  methods: {
    unmuteVideo() {
      const videoElement = this.$refs.videoElement;
      videoElement.muted = true;
      videoElement.play().then(() => {
        // 무음으로 비디오가 자동 재생되면 짧은 지연 후에 소리를 켭니다.
        setTimeout(() => {
          videoElement.muted = false;
        }, 1000); // 1초 지연 후 소리 켜기
      }).catch(error => {
        console.error("Failed to play video muted:", error);
      });
    },
  },
  watch: {
    isMuted(newVal) {
      if (this.$refs.videoElement) {
        this.$refs.videoElement.muted = newVal;
      }
    },
  }
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
