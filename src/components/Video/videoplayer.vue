<template>
  <div class="video-wrapper">
    <video ref="videoElement" :muted="isMuted" autoPlay class="video"></video>
    <div v-if="subtitlesActive && subtitles.length" class="subtitles">
      <p v-for="subtitle in subtitles" :key="subtitle.timestamp">{{ subtitle.text }}</p>
    </div>
  </div>
</template>

<script>
import { Client } from "@stomp/stompjs";

export default {
  name: 'VideoPlayer',

  props: {
    streamManager: Object,
    isMuted: Boolean,
    isPublisher: {
      type: Boolean,
      default: false
    },
    subtitlesActive: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      subtitles: [],
      ws: null,
    };
  },

  mounted() {
    this.streamManager.addVideoElement(this.$refs.videoElement);
    if (!this.isPublisher) {
      this.unmuteVideo();
      this.setupWebSocket();
    }
  },

  beforeDestroy() {
    if (this.ws) {
      this.ws.close();
    }
  },

  methods: {
    setupWebSocket() {
      const broadcastId = this.$route.params.broadcastId;
      this.websocketClient = new Client({
        brokerURL: 'wss://pengreen.live/ws/init',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      this.websocketClient.onConnect = () => {
        this.websocketClient.subscribe(
            `/sub/subtitles/${broadcastId}`,
            (msg) => {
              try {
                const parsedMessage = JSON.parse(msg.body);
                const subtitle = {
                  text: parsedMessage.text,
                  timestamp: parsedMessage.timestamp
                };
                this.subtitles.push(subtitle);
                setTimeout(() => {
                  this.subtitles = this.subtitles.filter(sub => sub.timestamp !== subtitle.timestamp);
                }, 5000);
              } catch (e) {
                const errorSubtitle = {
                  text: "자막을 파싱할 수 없습니다.",
                  timestamp: Date.now()
                };
                this.subtitles.push(errorSubtitle);
                setTimeout(() => {
                  this.subtitles = this.subtitles.filter(sub => sub.timestamp !== errorSubtitle.timestamp);
                }, 5000);
              }
            }
        );
      };

      this.websocketClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      };

      this.websocketClient.activate();
    },

    unmuteVideo() {
      const videoElement = this.$refs.videoElement;
      videoElement.muted = true;
      videoElement.play().then(() => {
        setTimeout(() => {
          videoElement.muted = false;
        }, 1000);
      }).catch(error => {
        console.error("음소거된 비디오 재생 실패:", error);
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
  height: 100%;
  position: relative;
  overflow: hidden;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.subtitles {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  font-size: 1.2em;
  border-radius: 5px;
}
</style>

