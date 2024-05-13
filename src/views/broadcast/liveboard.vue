<template>
  <div class="main-wrapper">
    <LiveBoardTime @start-broadcast="joinSession" @stop-broadcast="leaveSession"/>
    <div class="content-wrapper">
      <div class="flex-row">
        <div class="flex-col">
          <div class="flex-row">
            <LiveboardBroad :stream-manager="mainStreamManager"/>
            <LiveBoardChat :current-room="{ id: 1 }" :current-writer="'판매자'"/>
          </div>
        </div>
        <div class="flex-col">
          <LiveBoardStatistics />
          <LiveboardProduct />
          <LiveboardPrompt />
        </div>
        <div class="flex-col">
          <LiveboardSidebar @toggle-video="toggleVideo" @toggle-audio="toggleAudio" :broadcast-title="무야호" @broadcast-device-selected="handleDeviceChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import LiveBoardTime from "@/components/LiveBoard/liveboard-time.vue";
import LiveBoardChat from "@/components/LiveBoard/liveboard-chat.vue";
import LiveboardBroad from "@/components/liveboard/liveboard-broad.vue";
import LiveBoardStatistics from "@/components/LiveBoard/liveboard-statistics.vue";
import LiveboardPrompt from "@/components/LiveBoard/liveboard-prompt.vue";
import LiveboardSidebar from "@/components/LiveBoard/liveboard-sidebar.vue";
import LiveboardProduct from "@/components/LiveBoard/liveboard-product.vue";

export default {
  components: {
    LiveBoardTime,
    LiveBoardChat,
    LiveboardBroad,
    LiveBoardStatistics,
    LiveboardPrompt,
    LiveboardSidebar,
    LiveboardProduct
  },
  data() {
    return {
      OV: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      mySessionId: '',
      myUserName: "Admin",
      isSessionActive: false,
    };
  },
  methods: {
    //방송중인 상태에서 사용하는 카메라와 오디오 장치를 변경합니다.
    handleDeviceChange({ camera, microphone }) {
      // 카메라 변경
      if (camera) {
        console.log("카메라");
        console.log(camera);
        navigator.mediaDevices
            .getUserMedia({
              video: { deviceId: camera, width: 900, height: 1600 } // 새로운 해상도 설정
            })
            .then((newVideoStream) => {
              console.log(camera);
              const videoTrack = newVideoStream.getVideoTracks()[0];
              this.publisher.replaceTrack(videoTrack);
            })
            .catch((error) => {
              console.error('Error accessing camera stream:', error);
            });
      }

      // 마이크 변경
      if (microphone) {
        navigator.mediaDevices
            .getUserMedia({ audio: { deviceId: microphone } })
            .then((newAudioStream) => {
              const audioTrack = newAudioStream.getAudioTracks()[0];
              this.publisher.replaceTrack(audioTrack);
            })
            .catch((error) => {
              console.error('Error accessing microphone:', error);
            });
      }
    },
    //Video와 Audio출력을 활성/비활성합니다.
    toggleVideo(isActive) {
      if (this.publisher) {
        console.log(!isActive);
        this.publisher.publishVideo(!isActive);
      } else {
        console.error('Publisher is not initialized');
      }
    },
    toggleAudio(isActive) {
      if (this.publisher) {
        this.publisher.publishAudio(!isActive);
      } else {
        console.error('Publisher is not initialized');
      }
    },
    //세션을 생성하고 publisher 입장에서 방송을 송출합니다.
    joinSession() {
      if (this.isSessionActive) {
        console.log("세션은 이미 활성화 상태입니다.");
        return;
      }
      this.OV = new OpenVidu();
      this.session = this.OV.initSession();
      this.session.on("streamCreated", ({ stream }) => {
        const subscriber = this.session.subscribe(stream);
        this.subscribers.push(subscriber);
      });
      this.session.on("streamDestroyed", ({ stream }) => {
        const index = this.subscribers.indexOf(stream.streamManager, 0);
        if (index >= 0) {
          this.subscribers.splice(index, 1);
        }
      });
      this.session.on("exception", ({ exception }) => {
        console.warn(exception);
      });
      this.getToken(this.mySessionId).then(token => {
        this.session.connect(token, { clientData: this.myUserName })
            .then(() => {
              this.publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                resolution: "900x1600",
                frameRate: 30,
                insertMode: "APPEND",
                mirror: false,
              });
              this.mainStreamManager = this.publisher;
              this.session.publish(this.publisher);
            })
            .catch(error => {
              console.log("There was an error connecting to the session:", error.code, error.message);
            });
      });
      this.isSessionActive = true;
      window.addEventListener("beforeunload", this.leaveSession);
    },
    //세션을 종료합니다.
    leaveSession() {
      if (!this.isSessionActive) {
        console.log("세션은 이미 종료되었습니다.");
        return;
      }
      console.log("세션 끝");
      // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
      if (this.session) this.session.disconnect();

      // Empty all properties...
      this.session = undefined;
      this.mainStreamManager = undefined;
      this.publisher = undefined;
      this.subscribers = [];
      this.OV = undefined;

      // Remove beforeunload listener
      window.removeEventListener("beforeunload", this.leaveSession);
      this.isSessionActive = false;
      this.$router.push('/broadcast-statistics');
    },
    // 비동기 요청으로 세션을 만들고 세션 접속에 필요한 토큰을 가져옵니다.
    getToken(sessionId) {
      return this.createSession(sessionId).then(sessionId => this.createToken(sessionId));
    },
    createSession(sessionId) {
      return axios.post(`${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8090/'}api/sessions`, { customSessionId: sessionId }, {
        headers: { 'Content-Type': 'application/json' }
      }).then(response => response.data);
    },
    createToken(sessionId) {
      return axios.post(`${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8090/'}api/sessions/${sessionId}/connections`, {}, {
        headers: { 'Content-Type': 'application/json' }
      }).then(response => response.data);
    }
  },
  //컴포넌트가 생성될 시 mySessionId변수에 현재 url정보(방송id)를 할당합니다.
  created() {
    this.mySessionId = this.$route.params.broadcastId || 'defaultSessionId';
  }
};
</script>

<style lang="scss" scoped>
/* CSS remains the same as before */
.main-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content-wrapper {
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: hidden;
}
.flex-row {
  display: flex !important;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}
.flex-col {
  display: flex !important;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
