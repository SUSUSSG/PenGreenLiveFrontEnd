<template>
  <div class="video-wrapper">
    <video ref="videoPlayer" class="video" playsinline>
      <source :src="videoSource" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  props: {
    videoSource: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.initializePlayer();
  },
  methods: {
    initializePlayer() {
      const videoElement = this.$refs.videoPlayer;
      videoElement.muted = true; // Start the video muted
      videoElement.play()
          .then(() => {
            console.log("Video playback started!");
          })
          .catch((error) => {
            console.error("Error starting video playback:", error);
          });
    }
  }
};
</script>

<style scoped>
.video-wrapper {
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.video{
  max-height: 1010px;
  width: auto!important;
}
</style>
