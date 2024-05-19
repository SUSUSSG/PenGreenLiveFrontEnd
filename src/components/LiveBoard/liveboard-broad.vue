<template>
  <div class="bg-white" id="broadCard">
    <div v-if="streamManager" class="video-player">
      <VideoPlayer :stream-manager="streamManager" :is-muted="true"/>
    </div>
    <div v-else class="broadcast-image">
      <img :src="broadcastImage" alt="Broadcast Image" />
      <div class="overlay">
        <div class="overlay-text">방송 대기중입니다</div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/Video/videoplayer.vue";

export default {
  components: {
    VideoPlayer,
  },
  props: {
    streamManager: Object,
    broadcastImage: String
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

.broadcast-image {
  position: relative;
}


.broadcast-image img {
  width: 1000px;
  height: 849px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  justify-content: center;
  align-items: center;
}

.overlay-text {
  color: white;
  font-size: 2rem;
  font-weight: bold;
}
</style>