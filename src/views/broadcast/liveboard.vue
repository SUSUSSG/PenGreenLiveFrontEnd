<template>
  <div className="main-wrapper">
    <div v-if="liveBroadcastInfo.broadcast">
      <LiveBoardTime @start-broadcast="joinSession" @stop-broadcast="handleStopBroadcast"
                    :broadcast-title="liveBroadcastInfo.broadcast.broadcastTitle"
                    :live-date-time="liveBroadcastInfo.broadcast.broadcastScheduledTime"/>
      <div className="content-wrapper">
        <div className="flex-row">
          <div className="flex-col">
            <div className="flex-row">
              <LiveboardBroad :stream-manager="mainStreamManager"
                              :broadcast-image="liveBroadcastInfo.broadcast.broadcastImage" />
              <LiveBoardChat :current-room="{ id: broadcastId }" :current-writer="'판매자'" class="card-radius"/>
            </div>
          </div>
          <div className="flex-col">
            <LiveBoardStatistics ref="liveBoardStatistics" :session-id="mySessionId" :start-check="readyToCheck"
                                @update-statistics="updateStatistics"
                                :channelNm="liveBroadcastInfo.broadcast.channelNm"/>
            <LiveboardProduct :products="liveBoradcastProduct" />
            <LiveboardPrompt :broadcastSeq="broadcastId" />
          </div>
          <div className="flex-col">
            <LiveboardSidebar @toggle-video="toggleVideo" @toggle-audio="toggleAudio"
                              @broadcast-device-selected="handleDeviceChange"
                              :notices="liveBroadcastInfo.notices"
                              :faqs="liveBroadcastInfo.faqs"
                              :broadcast-id="broadcastId"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import {OpenVidu} from 'openvidu-browser';
import { Client } from '@stomp/stompjs';
import LiveBoardTime from "@/components/liveboard/liveboard-time.vue";
import LiveBoardChat from "@/components/liveboard/liveboard-chat.vue";
import LiveboardBroad from "@/components/liveboard/liveboard-broad.vue";
import LiveBoardStatistics from "@/components/liveboard/liveboard-statistics.vue";
import LiveboardPrompt from "@/components/liveboard/liveboard-prompt.vue";
import LiveboardSidebar from "@/components/liveboard/liveboard-sidebar.vue";
import LiveboardProduct from "@/components/liveboard/liveboard-product.vue";


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
      liveBroadcastInfo: [],
      // 방송 판매 상품
      liveBoradcastProduct: [],
      // 방송 아이디
      broadcastId: this.$route.params.broadcastId,
      recognition: null,
      subtitleWs: null,
      subtitles: []
    };
  },
  methods: {
    //방송중인 상태에서 사용하는 카메라와 오디오 장치를 변경합니다.
    handleDeviceChange({camera, microphone}) {
      // 카메라 변경
      if (camera) {


        navigator.mediaDevices
            .getUserMedia({
              video: {deviceId: camera, width: 900, height: 1600} // 새로운 해상도 설정
            })
            .then((newVideoStream) => {

              const videoTrack = newVideoStream.getVideoTracks()[0];
              this.publisher.replaceTrack(videoTrack);
            })
            .catch((error) => {

            });
      }

      // 마이크 변경
      if (microphone) {
        navigator.mediaDevices
            .getUserMedia({audio: {deviceId: microphone}})
            .then((newAudioStream) => {
              const audioTrack = newAudioStream.getAudioTracks()[0];
              this.publisher.replaceTrack(audioTrack);
            })
            .catch((error) => {

            });
      }
    },
    //Video와 Audio출력을 활성/비활성합니다.
    toggleVideo(isActive) {
      if (this.publisher) {

        this.publisher.publishVideo(!isActive);
      } else {

      }
    },
    toggleAudio(isActive) {
      if (this.publisher) {
        this.publisher.publishAudio(!isActive);
      } else {

      }
    },
    startRecognition() {
      if (!('webkitSpeechRecognition' in window)) {
        alert('해당 브라우저에서 자막 기능을 지원하지 않습니다.');
        return;
      }
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'ko-KR';
      this.recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        this.sendSubtitle(transcript);
      };
      this.recognition.onerror = (event) => {

      };
      this.recognition.start();
    },
    stopRecognition() {
      if (this.recognition) {
        this.recognition.stop();
      }
    },
    setupWebSocket() {
      this.stompClient = new Client({
        brokerURL: 'wss://pengreen.live/ws/init',  // WebSocket 엔드포인트 URL
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      this.stompClient.onConnect = (frame) => {

        this.stompClient.subscribe(`/sub/subtitles/${this.broadcastId}`, (message) => {
          const subtitle = JSON.parse(message.body);
          this.subtitles.push(subtitle);

        });
      };

      this.stompClient.onStompError = (frame) => {


      };

      this.stompClient.activate();
    },
    sendSubtitle(text) {
      if (this.stompClient && this.stompClient.connected) {
        const subtitle = {
          broadcastId: this.broadcastId,
          text,
          timestamp: Date.now(),
        };
        this.stompClient.publish({
          destination: `/pub/subtitles/${this.broadcastId}`,
          body: JSON.stringify(subtitle),
        });

      }
    },

    //세션을 생성하고 publisher 입장에서 방송을 송출합니다.
    joinSession() {
      if (this.isSessionActive) {

        return;
      }
      // this.createProductClicks(this.$route.params.broadcastId);
      this.OV = new OpenVidu();
      this.OV.enableProdMode(); // 로그 제거
      this.session = this.OV.initSession();
      this.session.on("streamCreated", ({stream}) => {
        const subscriber = this.session.subscribe(stream);
        this.subscribers.push(subscriber);
      });
      this.session.on("streamDestroyed", ({stream}) => {
        const index = this.subscribers.indexOf(stream.streamManager, 0);
        if (index >= 0) {
          this.subscribers.splice(index, 1);
        }
      });
      this.getToken(this.mySessionId).then(token => {
        this.session.connect(token, {clientData: this.myUserName})
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
              this.startRecognition(); // 방송 시작 시 자막 인식 시작
            })
            .catch(error => {

            });
      });
      this.isSessionActive = true;
      this.readyToCheck = true;  // 방송을 시작할 때 true로 설정

      window.addEventListener("beforeunload", this.leaveSession);
    },
    //세션을 종료합니다.
    async handleStopBroadcast(elapsedTime) {
      const maxViewerCount = this.maxViewers;
      const avgViewerCount = Math.round(this.averageViewers);

      await this.updateProductClicks(this.mySessionId);
      // 평균 시청자수와 최대 시청자수, 방송 진행시간을 db에 반영하는 axios 요청
      await this.updateBroadcastStatistics({maxViewerCount, avgViewerCount, broadcastDuration: elapsedTime});

      // 평균 시청 시간 계산
      await this.calculateAndDeleteWatchTime(this.mySessionId);

      //구매 전환률 업데이트
      await this.updateConversionRate(this.mySessionId);

      // 방송 종료 로직
      this.leaveSession();
    },
    leaveSession() {
      if (!this.isSessionActive) {

        return;
      }

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
      this.stopRecognition(); // 방송 종료 시 자막 인식 중지
      this.readyToCheck = false;  // 방송을 중지할 때 false로 설정
      window.location.href = "/broadcast-statistics";
    },
    // 비동기 요청으로 세션을 만들고 세션 접속에 필요한 토큰을 가져옵니다.
    getToken(sessionId) {
      return this.createSession(sessionId).then(sessionId => this.createToken(sessionId));
    },
    createSession(sessionId) {
      return axios.post(`/sessions`, {customSessionId: sessionId}, {
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.data);
    },
    createToken(sessionId) {
      return axios.post(`/sessions/${sessionId}/connections`, {}, {
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.data);
    },
    async updateConversionRate(broadcastSeq){
      try{
        const response = axios.post(`/product-clicks/updateConversionRates/${broadcastSeq}`)
      }catch (error){

      }
    },
    async updateBroadcastStatistics({maxViewerCount, avgViewerCount, broadcastDuration}) {

      try {
        const response = await axios.patch(`/broadcasts/statistics/${this.mySessionId}`, {
          maxViewerCount,
          avgViewerCount,
          broadcastDuration
        });

      } catch (error) {

      }
    },
    async calculateAndDeleteWatchTime(broadcastSeq) {
      try {
        const response = await axios.post(`/watch-times/calculate/${broadcastSeq}`);

      } catch (error) {

      }
    },
    async updateProductClicks(broadcastSeq){
      try{
        const response = await axios.post(`/product-clicks/broadcast/${broadcastSeq}/update-average-clicks`)

      } catch (error){

      }
    },
    updateStatistics({maxViewers, averageViewers}) {
      this.maxViewers = maxViewers;
      this.averageViewers = averageViewers;
    },
    // 라이브 방송 정보 불러오기
    loadLiveBroadcastInfo() {
      const broadcastId = this.$route.params.broadcastId;

      axios.get(`/live-broadcast-info/${broadcastId}`)
          .then((response) => {

            this.liveBroadcastInfo = response.data;
            this.loading = false;

          })
          .catch(error => {

            this.loading = false;
          })
    },

    // 라이브 판매상품 불러오기
    loadLiveBroadcastProduct() {
      const broadcastId = this.$route.params.broadcastId;

      axios.get(`/live-broadcast-product/${broadcastId}`)
          .then((response) => {

            this.liveBoradcastProduct = response.data;

          })
          .catch(error => {

          })
    }
  },
  //컴포넌트가 생성될 시 mySessionId변수에 현재 url정보(방송id)를 할당합니다.
  created() {
    this.mySessionId = this.$route.params.broadcastId || 'defaultSessionId';
    this.loadLiveBroadcastInfo();
    this.loadLiveBroadcastProduct();
    this.setupWebSocket(); // 웹소켓 설정
  }
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.content-wrapper {
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: hidden;
  margin-top: 15px;
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

.card-radius {
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}
</style>
