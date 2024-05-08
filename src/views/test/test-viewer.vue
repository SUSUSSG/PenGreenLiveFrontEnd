<!-- Subscriber.vue -->
<template>
  <div>
    <h2>Subscriber</h2>
    <button @click="joinSession">Join Session</button>
    <button @click="leaveSession">Leave Session</button>
    <!-- 단일 스트림만 표시 -->
    <user-video v-if="mainStreamManager" :stream-manager="mainStreamManager" />
  </div>
</template>

<script>
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import UserVideo from "./UserVideo";

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/';

export default {
  name: "Subscriber",
  components: {
    UserVideo,
  },
  data() {
    return {
      OV: undefined,
      session: undefined,
      mainStreamManager: undefined, // 메인 스트림을 관리하기 위한 변수
      mySessionId: "SessionA",
      myUserName: "Subscriber" + Math.floor(Math.random() * 100),
    };
  },
  methods: {
    async joinSession() {
      this.OV = new OpenVidu();
      this.session = this.OV.initSession();

      // 새로운 스트림이 생성되면 해당 스트림을 주 스트림으로 설정
      this.session.on("streamCreated", ({ stream }) => {
        this.mainStreamManager = this.session.subscribe(stream);
      });

      // 세션 연결
      this.getToken(this.mySessionId).then((token) => {
        this.session.connect(token, { clientData: this.myUserName });
      });

      window.addEventListener("beforeunload", this.leaveSession);
    },

    leaveSession() {
      if (this.session) this.session.disconnect();
      this.cleanSessionProperties();
      window.removeEventListener("beforeunload", this.leaveSession);
    },

    cleanSessionProperties() {
      this.session = undefined;
      this.mainStreamManager = undefined;
      this.OV = undefined;
    },

    // 서버에서 세션과 토큰 생성 관련 메소드
    async getToken(sessionId) {
      const session = await this.createSession(sessionId);
      return this.createToken(session);
    },

    async createSession(sessionId) {
      const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId });
      return response.data;
    },

    async createToken(sessionId) {
      const response = await axios.post(APPLICATION_SERVER_URL + `api/sessions/${sessionId}/connections`);
      return response.data;
    },
  },
};
</script>
