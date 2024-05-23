<template>
  <div className="video-wrapper">
    <video ref="videoElement" muted="isMuted" autoPlay className="video"></video>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',

  props: {
    streamManager: Object,
    isMuted: Boolean,
    isPublisher: false
  },

  mounted() {
    this.streamManager.addVideoElement(this.$refs.videoElement);
    if(!this.isPublisher){
      this.unmuteVideo();
    }
  },
  methods: {
    unmuteVideo() {
      const videoElement = this.$refs.videoElement;
      videoElement.muted = true;
      videoElement.play().then(() => {
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
  position: relative;
}

.video {
  width: 100%;
  height: auto;
  display: block;
}
</style>
