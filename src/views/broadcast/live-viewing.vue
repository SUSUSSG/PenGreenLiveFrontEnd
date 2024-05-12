<template>
  <button @click="joinSession">버튼</button>
  <div class="live-container" :style="{ height: computedHeight + 'px' }">
    <LiveboardChat class="live-section" :card-width="'30vw'" :card-height="'98vh'" :current-room="{ id: 1 }"
                   :current-writer="'구매자'" :showDeleteIcon="false" :showEditButton="false"/>

    <Live class="live-section-broad" show-icon-side-bar="true" show-title-bar="true" :stream-manager="mainStreamManager"></Live>
    <div class="live-section relative" :class="{'active-overlay': isOpen}">
      <div class="overlay" v-show="isOpen" :style="{ zIndex: isOpen ? 20 : -1 }"></div>
      <div v-if="selectedProduct">
        <header class="flex justify-between pb-4">
          <div></div>
          <Button text="돌아가기" @click="closePurchaseModal"/>
        </header>
        <div class="scroll-wrapper overflow-auto">
          <div class="purchase-container flex flex-col justify-end">
              <LiveBoardPurchase class="purchase-section"
              :brand="selectedProduct.brand"             
              :productName="selectedProduct.productName"
              :price="selectedProduct.price"
              :discountRate="selectedProduct.discountRate"
              :discountedPrice="selectedProduct.discountedPrice"
              :product-img="selectedProduct.productImg"
            />
          </div>
        </div>
      </div>

      <div v-if="!selectedProduct" class="contents-wrap">
        <header class="flex justify-between items-center pb-4 border-b">
          <div></div> <!-- 좌측 공백 -->
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
                        :product-name="product.productName"
                        :original-price="product.price"
                        :discount-rate="product.discountRate"
                        :product-img="product.productImg"
                        @click="showProductDetails(product)"
                        @updateDiscountedPrice="handleDiscountedPrice($event, product)"
                    />
                  </div>
                  <!-- 라이브 소개 탭 -->
                  <div v-else-if="tab === '라이브 소개'">{{ liveIntroduction }}</div>
                  <!-- 라이브 혜택 탭 -->
                  <ul v-else-if="tab === '라이브 혜택'" class="benefits-list">
                    <li v-for="benefit in liveBenefits" :key="benefit">{{ benefit }}</li>
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
                    <li v-for="notice in notices" :key="notice">{{ notice }}</li>
                  </ul>
                  <!-- 자주 묻는 질문 탭 -->
                  <dl v-else-if="tab === '자주 묻는 질문'">
                    <template v-for="(faq, index) in faqs" :key="`faq-${index}`">
                      <dt :data-question="`Q: ${faq.question}`">{{ faq.question }}</dt>
                      <dd>{{ faq.answer }}</dd>
                    </template>
                  </dl>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </main>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import LiveboardChat from "@/components/liveboard/liveboard-chat.vue";
import LiveBoardPurchase from "@/components/liveboard/liveboard-purchase.vue";
import Live from "@/components/Video/live.vue";
import ProductCard from "@/components/Card/product-card.vue";
import Button from "@/components/Button";
import { useRouter } from 'vue-router'
import PurchaseModal from "@/components/Modal/purchase-modal.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { useStore } from 'vuex';

// 라우트 및 환경변수 설정
const route = useRoute();
const router = useRouter();
const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8090/';

// 세션 및 OpenVidu 관련 상태
const mySessionId = ref('');
const OV = ref(undefined);
const session = ref(undefined);
const mainStreamManager = ref(undefined);
const myUserName = `Subscriber${Math.floor(Math.random() * 100)}`;

// 제품 구매 관련 상태 및 모달 제어
const isOpen = ref(false);
const selectedProduct = ref(null);
const productList = ref([
  {
    brand: "동구밭",
    productName: "동구밭 중건성 헤어케어 5종 기획세트",
    price: 47500,
    discountRate: 30,
    productImg: "/src/assets/images/all-img/product-sample.jpg"
  },
  {
    brand: "세타필",
    productName: "세타필 젠틀 바디워시 리프레싱 1,000ml",
    price: 26500,
    discountRate: 40,
    productImg: "https://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0013/A00000013522735ko.jpg?l=ko"
  },
  {
    brand: "민쉭이네",
    productName: "가지가지 나뭇가지",
    price: 10000,
    discountRate: 30,
    productImg: "https://ae01.alicdn.com/kf/S02dbb2aba6c14e829d6fd38a80523470G/33cm-DIY.jpeg_640x640.jpeg_.webp"
  }
]);

// 탭 상태 및 탭 그룹 데이터
const firstTabGroup = ['상품 정보', '라이브 소개', '라이브 혜택'];
const secondTabGroup = ['공지사항', '자주 묻는 질문'];
const activeFirstTab = ref(firstTabGroup[0]);
const activeSecondTab = ref(secondTabGroup[0]);

// 정보, 혜택, FAQ 및 알림 상태
const liveIntroduction = "라이브 소개 입니다.";
const liveBenefits = ["혜택1", "혜택2"];
const notices = [
  "안녕하세요 상품 구매 이후 채팅창에 구매 인증해주시면 사은품이 나갑니다 ^^",
  "현금으로 결제할시 추가 서비스 들어갑니다 ^^"
];
const faqs = [
  { question: "질문 1", answer: "답변 1" },
  { question: "질문 2", answer: "답변 2" }
];

// 뷰포트 및 스크롤 높이 계산
const store = useStore();
const boxHeight = computed(() => store.getters.getBoxHeight);
const computedHeight = ref(0);

const calculateHeight = () => {
  const viewportHeight = window.innerHeight;
  computedHeight.value = viewportHeight - boxHeight.value;
};


// 세션 참가/종료 및 토큰 관련 메소드
const joinSession = async () => {
  OV.value = new OpenVidu();
  session.value = OV.value.initSession();
  session.value.on("streamCreated", ({ stream }) => {
    mainStreamManager.value = session.value.subscribe(stream);
  });

  const token = await getToken(mySessionId.value);
  session.value.connect(token, { clientData: myUserName });

  window.addEventListener("beforeunload", leaveSession);
};

const leaveSession = () => {
  if (session.value) session.value.disconnect();
  cleanSessionProperties();
  window.removeEventListener("beforeunload", leaveSession);
};

const cleanSessionProperties = () => {
  session.value = undefined;
  mainStreamManager.value = undefined;
  OV.value = undefined;
};

const getToken = async (sessionId) => {
  const sessionData = await createSession(sessionId);
  return createToken(sessionData);
};

const calculateHeight = () => {
  const viewportHeight = window.innerHeight;
  computedHeight.value = viewportHeight - boxHeight.value;

const createSession = async (sessionId) => {
  const response = await axios.post(`${APPLICATION_SERVER_URL}api/sessions`, { customSessionId: sessionId });
  return response.data;
};

const createToken = async (sessionId) => {
  const response = await axios.post(`${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`);
  return response.data;
};

// 모달 및 제품 선택 제어
const openModal = () => { isOpen.value = true; };
const updateModal = (value) => { isOpen.value = value; };
const showProductDetails = (product) => { selectedProduct.value = product; };
const closePurchaseModal = () => { selectedProduct.value = null; };
const handleDiscountedPrice = (discountedPrice, product) => { product.discountedPrice = discountedPrice; };

// 나가기 버튼 동작
const onClickRedirect = () => { router.push({ name: 'home' }); };

// 초기 설정 및 리스너 등록
onMounted(() => {
  mySessionId.value = route.params.broadcastId;
  calculateHeight();
  window.addEventListener('resize', calculateHeight);
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
  box-sizing: border-box;
  /* overflow: auto; */
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
  box-sizing: border-box;
  /* overflow: auto; */
  height: 100%;
}

/* 구매 영역 */
.scroll-wrapper {
  max-height: calc(80vh - 67px);
  overflow-y: auto;
}

.purchase-container {
  padding-bottom: 20px;
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

.product-discount, .product-price {
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
  /* display: flex;/ */
  /* flex-wrap: wrap; */
  gap: 10px; /* 상품 카드 사이의 간격을 설정합니다. */
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
  height: 100%; /* ul의 높이를 부모의 100%로 설정 */
  overflow: auto; /* ul 내부에서 스크롤 발생 */
}

/* 질문 및 답변 스타일 변경 */
dt {
  font-weight: bold;
  border-bottom: 1px dashed #ccc; /* 구분선 추가 */
  padding-bottom: 5px;
  margin-bottom: 5px;
  display: block;
  content: "Q: " attr(data-question); /* 질문 앞에 'Q:' 추가 */
}

dd {
  margin-left: 20px;
  color: #666;
  padding-bottom: 10px; /* 답변 스타일 변경 */
}

ul.notice-list, ul.benefits-list {
  list-style: none; /* 기본 목록 스타일 제거 */
  padding: 0;
  margin: 0 10px;
}

.purchase-section {
  flex: 1;
  min-width: 0;
}

ul.notice-list li, ul.benefits-list li {
  padding: 10px;
  border-bottom: 1px solid #eee; /* 구분선 추가 */
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
</style>
