<template>
  <div class="live-container" :style="{ height: computedHeight + 'px' }">
    <LiveboardChat class="live-section" :card-width="'30vw'" :card-height="'98vh'" :current-room="{ id: chattingId }"
                   :current-writer="'구매자'" :showDeleteIcon="false" :showEditButton="false"/>

    <Live class="live-section-broad" show-icon-side-bar="true" show-title-bar="true" :stream-manager="mainStreamManager"
      :broadcast-image="broadcastImage" />

    <div class="live-section relative" :class="{ 'active-overlay': isOpen }">
      <div class="overlay" v-show="isOpen" :style="{ zIndex: isOpen ? 20 : -1 }"></div>
      <div v-if="selectedProduct">
        <header class="flex justify-between pb-4">
          <div></div>
          <Button text="돌아가기" @click="closePurchaseModal" />
        </header>
        <div class="scroll-wrapper overflow-auto">
          <div class="purchase-container flex flex-col justify-end">
            <LiveBoardPurchase class="purchase-section">
            </LiveBoardPurchase>
          </div>
        </div>
      </div>

      <div v-if="!selectedProduct" class="contents-wrap">
        <header class="flex justify-between items-center pb-4 border-b">
          <div class="broadcast-title">{{ broadcastTitle }}</div>
          <Button class="exit-button" @click="onClickRedirect()">나가기</Button>
        </header>
        <main class="main-content">
          <!-- 첫 번째 탭 그룹 -->
          <div class="overflow-auto">
            <TabGroup as="div" class="tab-group h-full">
              <TabList as="div" class="tab-list">
                <Tab v-for="tab in firstTabGroup" :key="tab" :class="{ 'tab-active': tab === activeFirstTab }"
                  @click="activeFirstTab = tab" class="tab">
                  {{ tab }}
                </Tab>
              </TabList>
              <TabPanels class="tab-panels">
                <TabPanel v-for="tab in firstTabGroup" :key="tab" v-show="tab === activeFirstTab" class="tab-panel">
                  <!-- 상품 정보 탭 -->
                  <div v-if="tab === '상품 정보'" class="product-list">
                    <ProductCard 
                      v-for="product in productList" 
                      :key="product.productName" 
                      :brand="product.brand"
                      :product-name="product.productName" 
                      :original-price="product.price"
                      :discount-rate="product.discountRate"
                      :product-img="product.productImg"
                      :label-img="product.labelImg" 
                      @click="showProductDetails(product)"
                      @updateDiscountedPrice="handleDiscountedPrice($event, product)" />
                  </div>
                  <!-- 라이브 소개 탭 -->
                  <div v-else-if="tab === '라이브 소개'">{{ liveIntroduction }}</div>
                  <!-- 라이브 혜택 탭 -->
                  <ul v-else-if="tab === '라이브 혜택'" class="benefits-list">
                    <li v-for="benefit in liveBenefits" :key="benefit">{{ benefit.benefitContent }}</li>
                  </ul>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
          <div class="overflow-auto">
            <!-- 두 번째 탭 그룹 -->
            <TabGroup as="div" class="tab-group h-full">
              <TabList as="div" class="tab-list">
                <Tab v-for="tab in secondTabGroup" :key="tab" :class="{ 'tab-active': tab === activeSecondTab }"
                  @click="activeSecondTab = tab" class="tab">
                  {{ tab }}
                </Tab>
              </TabList>
              <TabPanels class="tab-panels">
                <TabPanel v-for="tab in secondTabGroup" :key="tab" v-show="tab === activeSecondTab" class="tab-panel">
                  <!-- 공지사항 탭 -->
                  <ul v-if="tab === '공지사항'" class="notice-list">
                    <li v-for="notice in notices" :key="notice">{{ notice.noticeContent }}</li>
                  </ul>
                  <!-- 자주 묻는 질문 탭 -->
                  <dl v-else-if="tab === '자주 묻는 질문'">
                    <template v-for="(faq, index) in faqs" :key="`faq-${index}`">
                      <dt :data-question="`Q: ${faq.question}`">{{ faq.questionTitle }}</dt>
                      <dd>{{ faq.questionAnswer }}</dd>
                    </template>
                  </dl>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </main>
      </div>
    </div>
    <div v-if="!isBroadcasting" class="modal-overlay">
      <div class="modal-content">
        <p>방송이 종료되었습니다.</p>
        <Button class="exit-button" @click="onClickRedirect()">홈으로 이동</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from "@/axios";
import { OpenVidu } from 'openvidu-browser';
import LiveboardChat from "@/components/liveboard/liveboard-chat.vue";
import LiveBoardPurchase from "@/components/liveboard/liveboard-purchase.vue";
import Live from "@/components/Video/live.vue";
import ProductCard from "@/components/Card/product-card.vue";
import Button from "@/components/Button";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { useStore } from 'vuex';

// 방송 종료 여부
const isBroadcasting = ref(true);

// 방송 종료 이벤트 구독
const subscribeToBroadcastEnd = async (retryCount = 5, delay = 3000) => {
  console.log("subscribeToBroadcastEnd 함수 호출됨");
  const eventSource = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/subscribe`);
  const broadcastId = route.params.broadcastId;
  eventSource.addEventListener('broadcast-end', (event) => {
    if(event.data === broadcastId){
      isBroadcasting.value = false;
      console.log("Broadcast end event received for broadcastId:", broadcastId);
    }
  });
  eventSource.onerror = (error) => {
    if (retryCount > 0) {
          console.log(`Retrying... Attempts left: ${retryCount}`);
          setTimeout(() => subscribeToBroadcastEnd(retryCount - 1, delay), delay);
    } else {
      console.error('SSE error:', error);
      eventSource.close();
    }
  };
};

// 라우트 및 환경변수 설정
const route = useRoute();
const router = useRouter();
const APPLICATION_SERVER_URL = 'http://localhost:8090/';

//채팅 방 번호
const chattingId = ref(route.params.broadcastId);

// 세션 및 OpenVidu 관련 상태
const mySessionId = ref('');
const OV = ref(undefined);
const session = ref(undefined);
const mainStreamManager = ref(undefined);
const myUserName = `Subscriber${Math.floor(Math.random() * 100)}`;

// 제품 구매 관련 상태 및 모달 제어
const isOpen = ref(false);
const selectedProduct = ref(null);

// 상품 내역
const productList = ref([]);


// 탭 상태 및 탭 그룹 데이터
const firstTabGroup = ['상품 정보', '라이브 소개', '라이브 혜택'];
const secondTabGroup = ['공지사항', '자주 묻는 질문'];
const activeFirstTab = ref(firstTabGroup[0]);
const activeSecondTab = ref(secondTabGroup[0]);

// 방송 제목, 썸네일
const liveBroadcastInfo = ref({});
const broadcastTitle = computed(() => liveBroadcastInfo.value.broadcast?.broadcastTitle || '');
const broadcastImage = computed(() => liveBroadcastInfo.value.broadcast?.broadcastImage || '');

// 정보, 혜택, FAQ 및 알림 상태
const liveIntroduction = computed(() => liveBroadcastInfo.value.broadcast?.broadcastSummary || '');
const liveBenefits = computed(() => liveBroadcastInfo.value.benefits || []);
const notices = computed(() => liveBroadcastInfo.value.notices || []);
const faqs = computed(() => liveBroadcastInfo.value.faqs || []);

// 뷰포트 및 스크롤 높이 계산
const store = useStore();
const boxHeight = computed(() => store.getters.getBoxHeight);
const computedHeight = ref(0);

// 시청 시간 기록 상태
const watchStartTime = ref(null);
const watchEndTime = ref(null);
// 라이브 공지 및 Faq
let intervalId = ref(null);

// 세션 참가/종료 및 토큰 관련 메소드
const joinSession = async () => {

  OV.value = new OpenVidu();
  session.value = OV.value.initSession();
  session.value.on("streamCreated", ({ stream }) => {
    mainStreamManager.value = session.value.subscribe(stream);
  });

  const token = await getToken(mySessionId.value);
  await session.value.connect(token, { clientData: myUserName });

  window.addEventListener("beforeunload", leaveSession);

  // 시청 시작 시간 기록
  watchStartTime.value = new Date().toISOString();
  console.log('Watch start time recorded:', watchStartTime.value);
};

const leaveSession = () => {
  if (session.value) session.value.disconnect();

  // 시청 종료 시간 기록
  watchEndTime.value = new Date().toISOString();
  console.log('Watch end time recorded:', watchEndTime.value);

  sendWatchTime();
  cleanSessionProperties();

  window.removeEventListener("beforeunload", leaveSession);
};

const handleBeforeUnload = (event) => {
  leaveSession();
  // 표준에 따르면, 이벤트 핸들러 내에서 반환된 값이 사용자에게 표시되지 않을 수 있습니다.
  event.returnValue = '';
};
const sendWatchTime = async () => {
  if (!watchStartTime.value || !watchEndTime.value) return;

  const watchTime = {
    broadcastSeq: mySessionId.value,
    watchStartTime: watchStartTime.value,
    watchEndTime: watchEndTime.value,
  };

  try {
    const response = await axios.post(`/watch-times`, watchTime);
    console.log('Watch time successfully sent:', response.data);
  } catch (error) {
    console.error('Error adding watch time:', error);
  }
};
const incrementProductClicks = async (broadcastSeq, productSeq) => {
  await axios.post(`/product-clicks/broadcast/${broadcastSeq}/product/${productSeq}/increment-click`)
}

const cleanSessionProperties = () => {
  session.value = undefined;
  mainStreamManager.value = undefined;
  OV.value = undefined;
};

const getToken = async (sessionId) => {
  const sessionData = await createSession(sessionId);
  return createToken(sessionData);
};

const createSession = async (sessionId) => {
  const response = await axios.post(`/sessions`, { customSessionId: sessionId });
  return response.data;
};

const createToken = async (sessionId) => {
  const response = await axios.post(`/sessions/${sessionId}/connections`);
  return response.data;
};

const calculateHeight = () => {
  const viewportHeight = window.innerHeight;
  computedHeight.value = viewportHeight - boxHeight.value;
};

// 방송 정보 가져오기
const loadLiveBroadcastInfo = async () => {
  const broadcastId = route.params.broadcastId;
  console.log("해당 방송 id : " + broadcastId);
  try {
    const response = await axios.get(`/live-broadcast-info/${broadcastId}`);
    console.log(response.data);
    liveBroadcastInfo.value = response.data;
    console.log("broadcast info data : ", liveBroadcastInfo.value);
  } catch (error) {
    console.error('방송 예정 목록 load 실패 : ', error);
  }
  console.log("여기야~~ " + liveBroadcastInfo.value.broadcast.broadcastTitle);
};

// 상품 정보 가져오기
const loadBroadcastProduct = async () => {
  const broadcastId = route.params.broadcastId;
  console.log("해당 방송 id : " + broadcastId);
  try {
    const response = await axios.get(`/live-broadcast-product/${broadcastId}`);
    console.log(response.data);
    productList.value = response.data.map(product => {
      const labelImagesArray = product.labelImages.split(',').map(image => image.trim());
      console.log("labelImagesArray:", labelImagesArray);
      return {
        productName: product.productNm,
        brand: product.brand,
        price: product.listPrice,
        discountRate: product.discountRate,
        productImg: product.productImage,
        labelImg: labelImagesArray,
        productSeq: product.productSeq
      };
    });
    console.log("product info data : ", productList.value);
  } catch (error) {
    console.error('판새 상품 목록 load 실패 : ', error);
  }
};

// 라이브 실시간 정보 불러오기 (공지, faq)
const loadLiveBroadcastDetails = async () => {
  const broadcastId = route.params.broadcastId;
  try {
    const response = await axios.get(`/live-broadcast-info/${broadcastId}/details`);
    liveBroadcastInfo.value.notices = response.data.notices;
    liveBroadcastInfo.value.faqs = response.data.faqs;
  } catch (error) {
    console.error('방송 디테일 정보 load 실패 : ', error);
  }
}

// 유저 시청 기록 저장
const saveUserBroadcastHistory = async () => {
  const broadcastId = route.params.broadcastId;
  
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000; // 밀리초 단위로 변환
  const localDate = new Date(date.getTime() - offset);
  const viewedDate = localDate.toISOString().slice(0, 19);

  const requestData = {
    broadcastSeq: broadcastId,
    viewedDate: viewedDate
  }

  console.log("시청정보!!!" + JSON.stringify(requestData, null, 2));

  try {
    const response = await axios.post(`/user/view-history`, requestData)
    console.log(response.data);
  } catch (error) {
    console.error("시청 기록 저장 실패: ", error);
  }
}

// 모달 및 제품 선택 제어
const openModal = () => {
  isOpen.value = true;
};
const updateModal = (value) => {
  isOpen.value = value;
};
const showProductDetails = (product) => {
  store.commit('setSelectedProduct', product);
  incrementProductClicks(mySessionId.value, product.productSeq) // 프로덕트 seq 동적으로 바꿔야함
  selectedProduct.value = product;
};
const closePurchaseModal = () => {
  selectedProduct.value = null;
  // store.commit('setSelectedProduct', {});
  // selectedProduct.value = {};
  // isOpen.value = false;
};

const handleDiscountedPrice = (discountedPrice, product) => {
  product.discountedPrice = discountedPrice;
};
const incrementViewsCount = async (sessionId) => {
  console.log("세션 id", sessionId);
  await axios.patch(`/broadcasts/statistics/${sessionId}/viewsCount`,
      { withCredentials: true }
  );
};

const onClickRedirect = () => {
  window.location.href = "/";
};

onMounted(() => {
  mySessionId.value = route.params.broadcastId;
  joinSession();
  calculateHeight();
  incrementViewsCount(mySessionId.value);
  window.addEventListener('resize', calculateHeight);
  store.commit('resetState');
  store.commit('setBroadcastId', mySessionId.value);
  window.addEventListener('beforeunload', leaveSession);
  loadLiveBroadcastInfo(); // 방송정보 호출
  loadBroadcastProduct(); // 상품정보 호출

  intervalId = setInterval(loadLiveBroadcastDetails, 30000); // 15초

  subscribeToBroadcastEnd();
  saveUserBroadcastHistory();
});

onBeforeUnmount(() => {
  leaveSession();
  window.removeEventListener('beforeunload', handleBeforeUnload);

  if (intervalId) {
    clearInterval(intervalId);
  }

  if (eventSource) {
    eventSource.close();
  }
});

watch(boxHeight, calculateHeight);
</script>

<style scoped>
.live-container {
  width: 85.5%;
  margin: 0 auto;
  display: flex;
  gap: 1px;
  /* background: #E5E7EB; */
}

.tab-list {
  display: flex;
  justify-content: space-around;
}

.live-section {
  flex: 1;
  min-width: 0;
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.live-section-broad {
  flex: 1;
  min-width: 0;
  margin: 10px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}


.contents-wrap {
  height: 100%;
  overflow: hidden;
}

.main-content {
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
}

.tab {
  @apply py-2 px-4 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none;
  margin: 5px; /* 탭과 탭 패널에 마진 추가 */
}

.overflow-auto {
  overflow: hidden;
  flex: 1;
}

.tab-group {
  box-sizing: border-box; /* overflow: auto; */
  height: 100%;
}

.tab-active {
  @apply text-blue-500 border-b-2 border-blue-500;
}


.tab-panel {
  @apply p-4 bg-gray-50;

  padding: 1rem;
  flex: 0 0 auto;
  height: 75%;
  overflow-y: auto;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.tab-panels {
  box-sizing: border-box; /* overflow: auto; */
  height: 100%;
}

/* 구매 영역 */
.scroll-wrapper {
  overflow-y: auto;
  height: 32rem;
}


.purchase-section img {
  max-height: 70vh;
  width: auto;
  display: block;
  margin: 0 auto;
}

.scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.purchase-section {
  flex: 1;
  min-width: 0;
}

.purchase-wrap {
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: auto;
}

.product-discount,
.product-price {
  text-align: center;
  font-size: 20px;
  color: red;
}

/* 구매 영역 끝 */


/* 오른쪽 라이브 섹션에 대한 너비 조정 */
.live-section:last-child {
  flex: 1; /* 기존보다 작은 flex-factor 적용 */
  margin-right: 20px;
}

.exit-button {
  @apply bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600;
}

.product-list {
  gap: 10px; 
}

.exit-button {
  @apply bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600;
  margin: 0 10px; /* 버튼 주변 마진 추가 */
}

.flex-1 {
  flex: 1; /* 유동적 너비 할당 */
  display: flex;
  gap: 10px; /* 탭 사이 간격 */
}


.product-list ul {
  height: 100%; 
  overflow: auto;
}

/* 질문 및 답변 스타일 변경 */
dt {
  font-weight: bold;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 5px;
  margin-bottom: 5px;
  display: block;
  content: "Q: " attr(data-question); /* 질문 앞에 'Q:' 추가 */
}

dd {
  margin-left: 20px;
  color: #666;
  padding-bottom: 10px;
}

ul.notice-list,
ul.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0 10px;
}

.purchase-section {
  flex: 1;
  min-width: 0;
}

ul.notice-list li,
ul.benefits-list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.chat-card {
  height: auto;
}

.video-component {
  width: 100px !important;
}

.video-component.live-section {
  padding-left: 0;
  padding-right: 0;
  height: auto;
  max-width: 552px !important;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.tab-active {
  border-bottom: 1.5px solid #134010;
  color: #134010;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 방송 종료 시 */
.modal-content {
  background: white;
  width: 600px;
  height: 300px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-content p {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
}

.home-button {
  width: 100px;
  height: 40px;
  background-color: #134010;
  border-radius: 5px;
  padding: 7px;
}

.home-button a {
  color: white;
}

.broadcast-title {
  font-weight: bold;
  margin-left: 10px;
}
</style>
