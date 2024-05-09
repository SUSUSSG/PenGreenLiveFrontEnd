<!-- Publisher.vue -->
<template>
  <div>
    <h2>Publisher</h2>
    <button @click="joinSession">Start Broadcasting</button>
    <button @click="leaveSession">Stop Broadcasting</button>
    <div v-if="mainStreamManager">
      <user-video :stream-manager="mainStreamManager" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import UserVideo from "./UserVideo";

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/';

export default {
  name: "Publisher",
  components: {
    UserVideo,
  },
  data() {
    return {
      OV: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      mySessionId: "SessionA",
      myUserName: "Publisher" + Math.floor(Math.random() * 100),
    };
  },
  methods: {
    async joinSession() {
      this.OV = new OpenVidu();
      this.session = this.OV.initSession();

      this.getToken(this.mySessionId).then((token) => {
        this.session.connect(token, { clientData: this.myUserName }).then(() => {
          this.publisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            mirror: false,
          });
          this.mainStreamManager = this.publisher;
          this.session.publish(this.publisher);
        });
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
      this.publisher = undefined;
      this.OV = undefined;
    },

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
