<template>
  <div class="video-wrapper">
    <video ref="videoElement" :muted="isMuted" autoPlay class="video"></video>
  </div>
  <div v-if="subtitles.length" class="subtitles">
    <p v-for="subtitle in subtitles" :key="subtitle.timestamp">{{ subtitle.text }}</p>
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
        brokerURL: 'wss://pengreen.live/ws/init',  // WebSocket 엔드포인트 URL
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      this.websocketClient.onConnect = () => {
        console.log("WebSocket 연결 성공");

        // 자막 메시지 구독
        this.websocketClient.subscribe(
            `/sub/subtitles/${broadcastId}`,
            (msg) => {
              try {
                console.log("자막 메시지 파싱 전");
                const parsedMessage = JSON.parse(msg.body); // JSON 파싱

                console.log("자막 메시지 파싱 후", parsedMessage);

                // 자막 메시지를 자막 배열에 추가
                const subtitle = {
                  text: parsedMessage.text, // 자막 내용
                  timestamp: parsedMessage.timestamp // 타임스탬프
                };
                this.subtitles.push(subtitle);

                // 일정 시간 후 자막 제거
                setTimeout(() => {
                  this.subtitles = this.subtitles.filter(sub => sub.timestamp !== subtitle.timestamp);
                }, 5000); // 5초 후 자막 제거

              } catch (e) {
                console.error("자막 메시지 파싱 중 에러 발생:", e);
                // 파싱 에러 발생 시 기본 정보로 자막 추가
                const errorSubtitle = {
                  text: "자막을 파싱할 수 없습니다.",
                  timestamp: Date.now()
                };
                this.subtitles.push(errorSubtitle);

                // 일정 시간 후 에러 자막 제거
                setTimeout(() => {
                  this.subtitles = this.subtitles.filter(sub => sub.timestamp !== errorSubtitle.timestamp);
                }, 5000); // 5초 후 자막 제거
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
        }, 1000); // 1초 지연 후 소리 켜기
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
  aspect-ratio: 9 / 16;
  position: relative;
}

.video {
  width: 100%;
  height: auto;
  display: block;
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
