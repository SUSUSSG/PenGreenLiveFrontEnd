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
  max-width: calc(90vh * 9 / 16); /* 16:9 aspect ratio */
  height: auto;
  border-radius: 10px;
  overflow: hidden;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Video fits the wrapper size */
}
</style>
