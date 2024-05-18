<template>
  <div class="main-wrapper">
    <LiveBoardTime @start-broadcast="joinSession" @stop-broadcast="handleStopBroadcast" 
      :boradcast-title="liveBroadcastInfo.broadcast.broadcastTitle" 
      :live-date-time="liveBroadcastInfo.broadcast.broadcastScheduledTime"/>
    <div class="content-wrapper">
      <div class="flex-row">
        <div class="flex-col">
          <div class="flex-row">
            <LiveboardBroad :stream-manager="mainStreamManager" />
            <LiveBoardChat :current-room="{ id: 1 }" :current-writer="'판매자'" />
          </div>
        </div>
        <div class="flex-col">
          <LiveBoardStatistics ref="liveBoardStatistics" :session-id="mySessionId" :start-check="readyToCheck"
            @update-statistics="updateStatistics" />
          <LiveboardProduct />
          <LiveboardPrompt />
        </div>
        <div class="flex-col">
          <LiveboardSidebar @toggle-video="toggleVideo" @toggle-audio="toggleAudio" :broadcast-title="무야호"
            @broadcast-device-selected="handleDeviceChange" />
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
      totalViewers: 0,
      readyToCheck: false,
      maxViewers: 0,
      averageViewers: 0,

      // 실시간 방송 정보
      liveBroadcastInfo: []
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
      this.readyToCheck = true;  // 방송을 시작할 때 true로 설정
      console.log(this.readyToCheck);
      window.addEventListener("beforeunload", this.leaveSession);
    },
    //세션을 종료합니다.
    async handleStopBroadcast(elapsedTime) {
      const maxViewerCount = this.maxViewers;
      const avgViewerCount = Math.round(this.averageViewers);

      console.log('Final statistics before axios request:', {
        maxViewerCount,
        avgViewerCount,
        elapsedTime,
      });

      // 평균 시청자수와 최대 시청자수, 방송 진행시간을 db에 반영하는 axios 요청
      await this.updateBroadcastStatistics({ maxViewerCount, avgViewerCount, broadcastDuration: elapsedTime });

      // 방송 종료 로직
      this.leaveSession();
    },
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
      this.readyToCheck = false;  // 방송을 중지할 때 false로 설정
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
    },
    async updateBroadcastStatistics({ maxViewerCount, avgViewerCount, broadcastDuration }) {
      console.log('Updating broadcast statistics:', {
        maxViewerCount,
        avgViewerCount,
        broadcastDuration,
        mySessionId: this.mySessionId
      });

      try {
        const response = await axios.patch(`http://localhost:8090/broadcasts/statistics/${this.mySessionId}`, {
          maxViewerCount,
          avgViewerCount,
          broadcastDuration
        });
        console.log('Statistics updated:', response.data);
      } catch (error) {
        console.error('Error updating statistics:', error.response ? error.response.data : error.message);
      }
    },
    updateStatistics({ maxViewers, averageViewers }) {
      console.log('Updating parent statistics:', {
        maxViewers,
        averageViewers,
      });
      this.maxViewers = maxViewers;
      this.averageViewers = averageViewers;
    },
    loadLiveBroadcastInfo() {
      const broadcastId = this.$route.params.broadcastId;
      console.log("해당 방송 id : " + broadcastId);
      axios.get(`http://localhost:8090/basic-broadcast-info/${broadcastId}`)
        .then((response) => {
          console.log(response.data);
          this.liveBroadcastInfo = response.data;
          this.loading = false;
          console.log("broadcast info data : ", this.liveBroadcastInfo);
        })
        .catch(error => {
          console.error('방송 예정 목록 load 실패 : ', error);
          this.loading = false;
        })
    }
  },
  //컴포넌트가 생성될 시 mySessionId변수에 현재 url정보(방송id)를 할당합니다.
  created() {
    this.mySessionId = this.$route.params.broadcastId || 'defaultSessionId';
    this.loadLiveBroadcastInfo()
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
