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
          <LiveboardSidebar />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import LiveBoardTime from "@/components/LiveBoard/liveboard-time.vue";
import LiveBoardChat from "@/components/LiveBoard/liveboard-chat.vue";
import LiveboardBroad from "@/components/liveboard/liveboard-broad.vue";
import LiveBoardStatistics from "@/components/LiveBoard/liveboard-statistics.vue";
import LiveboardPrompt from "@/components/LiveBoard/liveboard-prompt.vue";
import LiveboardSidebar from "@/components/LiveBoard/liveboard-sidebar.vue";
import LiveboardProduct from "@/components/LiveBoard/liveboard-product.vue";

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8090/';
axios.defaults.headers.post["Content-Type"] = "application/json";

// 라우트에서 broadcastId를 가져옵니다.
const route = useRoute();
const mySessionId = ref('');
const OV = ref(undefined);
const session = ref(undefined);
const mainStreamManager = ref(undefined);
const publisher = ref(undefined);
const subscribers = ref([]);
const myUserName = "Admin";

// 세션 연결 및 토큰 관리
const joinSession = async () => {
  OV.value = new OpenVidu();
  session.value = OV.value.initSession();

  // 스트림 생성 이벤트 처리
  session.value.on("streamCreated", ({ stream }) => {
    const subscriber = session.value.subscribe(stream);
    subscribers.value.push(subscriber);
  });

  // 스트림 소멸 이벤트 처리
  session.value.on("streamDestroyed", ({ stream }) => {
    const index = subscribers.value.indexOf(stream.streamManager, 0);
    if (index >= 0) {
      subscribers.value.splice(index, 1);
    }
  });

  session.value.on("exception", ({ exception }) => {
    console.warn(exception);
  });

  // 세션에 연결
  const token = await getToken(mySessionId.value);
  session.value.connect(token, { clientData: myUserName })
      .then(() => {
        const localPublisher = OV.value.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: "900x1600",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false,
        });

        mainStreamManager.value = localPublisher;
        publisher.value = localPublisher;
        session.value.publish(publisher.value);
      })
      .catch((error) => {
        console.log("There was an error connecting to the session:", error.code, error.message);
      });

  window.addEventListener("beforeunload", leaveSession);
};

const leaveSession = () => {
  if (session.value) session.value.disconnect();
  session.value = undefined;
  mainStreamManager.value = undefined;
  publisher.value = undefined;
  subscribers.value = [];
  OV.value = undefined;
  window.removeEventListener("beforeunload", leaveSession);
};

// 세션 및 토큰 생성 메소드
const getToken = async (sessionId) => {
  const sessionData = await createSession(sessionId);
  return createToken(sessionData);
};

const createSession = async (sessionId) => {
  const response = await axios.post(`${APPLICATION_SERVER_URL}api/sessions`, { customSessionId: sessionId }, {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
};

const createToken = async (sessionId) => {
  const response = await axios.post(`${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`, {}, {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
};

// 컴포넌트가 로드될 때 URL 파라미터로부터 세션 ID 설정
onMounted(() => {
  if (route.params.broadcastId) {
    mySessionId.value = route.params.broadcastId;
  } else {
    console.error('Broadcast ID is missing in the route parameters.');
  }
});

</script>

<style lang="scss" scoped>
.main-wrapper{
  width:100%;
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
  