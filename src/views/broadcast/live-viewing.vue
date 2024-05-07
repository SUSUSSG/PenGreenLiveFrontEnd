<template>
  <div class="live-container" :style="{ height: computedHeight + 'px' }">
    <LiveboardChat class="live-section" :card-width="'30vw'" :card-height="'98vh'" :showEditButton="false"/>

    <Live class="live-section-broad" show-icon-side-bar="true" show-title-bar="true"></Live>
    <div class="live-section relative" :class="{'active-overlay': isOpen}">
      <div class="overlay" v-show="isOpen" :style="{ zIndex: isOpen ? 20 : -1 }"></div>

      <div v-if="selectedProduct">
        <header class="flex justify-between pb-4">
          <div></div> <!-- 좌측 공백 -->
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
        <div class="sticky bottom-0 flex justify-between items-center pt-4">
          <Button class="w-full order-button" text="구매하기" @click="openModal"/>
        </div>
        <div class="modal flex justify-between items-center modal-adjust z-30" v-show="isOpen">
          <PurchaseModal @update:isOpen="updateModal"     
            :productName="selectedProduct.productName"
            :price="selectedProduct.price"
            :discountedPrice="selectedProduct.discountedPrice"/>
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
import LiveboardChat from "@/components/liveboard/liveboard-chat.vue";
import LiveBoardPurchase from "@/components/liveboard/liveboard-purchase.vue"
import Live from "@/components/Video/live.vue";
import ProductCard from "@/components/Card/product-card.vue";
import {ref, onMounted, computed, watch} from 'vue';
import { useStore } from 'vuex';
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue';
import Button from "@/components/Button";
import PurchaseModal from "@/components/Modal/purchase-modal.vue";
import { useRouter } from 'vue-router'

const router = useRouter()
const firstTabGroup = ['상품 정보', '라이브 소개', '라이브 혜택'];
const secondTabGroup = ['공지사항', '자주 묻는 질문'];
const activeFirstTab = ref(firstTabGroup[0]);
const activeSecondTab = ref(secondTabGroup[0]);
const buttons = [
  {
    title: 'Home',
  },
  {
    title: 'Profile',
  },
  {
    title: 'Messages',
  },
  {
    title: 'Settings',
  },
];

let liveIntroduction = "라이브 소개 입니다.";
let liveBenefits = ["혜택1", "혜택2"];
let notices = ["안녕하세요 상품 구매 이후 채팅창에 구매 인증해주시면 사은품이 나갑니다 ^^", "현금으로 결제할시 추가 서비스 들어갑니다 ^^"];
let faqs = [
  {question: "박찬호 선수생활에 대해서 궁금합니다.", answer: "제가 LA에 있을때는 말이죠 정말 제가 꿈에 무대인 메이저리그로 진출해서 가는 식당마다 싸인해달라 기자들은 항상 붙어다니며 취재하고 제가 그 머~ 어~ 대통령이 된 기분이였어요 그런데 17일만에 17일만에 마이너리그로 떨어졌어요 못던져서 그만두고 그냥 확 한국으로 가버리고 싶었어요 그래서 집에 가는길에 그 맥주6개 달린거 있잖아요 맥주6개 그걸 사가지고 집으로 갔어요 그전에는 술먹으면 야구 못하는줄 알았어요 그냥 한국으로 가버릴려구.... 그리고 맥주 6개먹고 확 죽어버릴려고 그랬어요 야구 못하게 되니깐 그러나 집에가서 일단은 부모님에게 전화를 해야겠다고 생각을 했어요 다음날 가려고 전화를 딱 했는데 어머니께서 찬호야 어후~ 찬호야 아들 잘있어 밥은 먹고 다니는겨~ 잘지내는겨 대뜸 그러시는 거에요 내가 말도 하기도 전해 그래서 저는 야구좀 안되지만 잘하고 있다고 여기사람들 잘챙겨준다고 라고 거짓말을  했어요 한국은 못가게 됬지 내일 야구장은 가야하지 막막하더라구요 그럼 어떻게 가야하나 생각을 했어요 그리고 나서 영어공부를 하게 됬는데요 영어... 감독한테 이야기를 못해서 한이 맺힌거지 그래서 이야기 할려고 한 단어씩 한 문장씩 만들어서 그래서 다음날 써 먹었어요 그리고 감독에게 Hey How are you라고 말했어요 이렇게 해서 영어공부를 하는거에요 그리고 마이너생활하다. 이제 메이저리그로 콜업이 됬어요 너무 긴장이 되더라구요 막상 콜업되니깐 콜업전에 그소식을 듣고 정말 기분이 미칠듯이 좋았는데 막상 콜업되고 2회때 갑작스럽게 마운드에 올라서니깐 긴장이 되더라구요 그리고 공을 던졌어요 역시 아니나 다를까 볼넷을 줬어요 그리고 나서 코치님이 딱 올라오는거에요 아 또 내려가는구나 라고 생각했는데 긴장하지 말고 편한하게 던져라 말하고 마운드를 내려가는 거에요 긴장이 한결 풀리더니 갑자기 포수 글러브쏙으로 잘들어가는거에요 어 된다. 이거 된다. 하고 속으로 생각했어요 그리고 직구 또 직구 던지고 새미 소사를 삼진잡았어요 정말 그때 기분은 말로 표현할수가 없는거에요  이때부터 자신감이 붙은거에요 그리고 3회말에 만루의 위기가 있었는데 소사를 다시 삼진 처리하고 큰 위기를 넘기고 정말 그때 삼진 7개를 잡아내고 기분이 하늘로 날아갈것 같았어요 그리고 한국으로 왔는데 많은 사람들이 막 환호하고 그.. 뭐~ 영웅이다. 정말 대단하다. 라고 말했어요 그때 정말 이 눈물이 나더라구요 그리고 텍사스로 제가 이적을 했어요 하지만 못던졌어요 그리고 많은 사람들이 저를 보고 막 매국노 또 야구 때려쳐라 그러는거에요 그리고 한국으로 갔는데 이 계란이 날라오는거에요 그때 정말 확 죽어버리고 싶었어요 야구는 안되지 사람들은 날 싫어하지 정말 절망적이더라구요 너무 힘들어서 그냥 이대로 죽었으면 하는 안좋은 생각까지 할려고 그랬어요 그리고 2005년 도중에 샌디에이고로 트레이드 된거에요 그리고 2006년 대망의  제1회 WBC에 참가하게 되죠 그때 저는 선발투수가 아니였어요 감독님께서 찬호야 마무리투수로써 활약하면 좋을것 같은데 어떻게 생각하니라고 물어보시는거에요 그래서 저는 어후 전 괜찮습니다. 팀에 도움이 될수만 있다면 보직을 변경하겠습니다. 라고 말을했어요 그리고 저희 팀이 4강에 진출을 하게됬어요 어후 기분정말 끝내주더라구요 그리고 뉴욕메츠로 가다가 그리고 친정팀인 LA로 다시 갔어요 이때 정말 선수들이 반겨주더라구요 제가 맞히 집나간 강아지 처럼 반겨주더라구요 너무 좋았어요 그리고 시즌이 끝나고 필라델피아로 갔어요 이듬해에 저희팀이 월드시리즈라는 무대에 갑니다. 야 그때 기분정말 말로표현할수가 없을정도 였는데요"},
  {question: "질문 2", answer: "답변 2"}
];
let address = '';

const isOpen = ref(false);
const openModal = () => {
  isOpen.value = true;
};

const updateModal = (value) => {
  isOpen.value = value;
};

const handleDiscountedPrice = (discountedPrice, product) => {
  product.discountedPrice = discountedPrice;
}

let selectedProduct = ref(null);
let productList = ref([
  {brand: "동구밭", productName: "동구밭 중건성 헤어케어 5종 기획세트", price : 47500, discountRate : 30, productImg : "src/assets/images/all-img/product-sample.jpg"},
  {brand: "세타필", productName: "세타필 젠틀 바디워시 리프레싱 1,000ml", price : 26500, discountRate : 40, productImg : "https://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0013/A00000013522735ko.jpg?l=ko"},
  {brand: "민쉭이네", productName: "가지가지 나뭇가지", price : 10000, discountRate : 30, productImg : "https://ae01.alicdn.com/kf/S02dbb2aba6c14e829d6fd38a80523470G/33cm-DIY.jpeg_640x640.jpeg_.webp"}
]);

const showProductDetails = (product) => {
  selectedProduct.value = product;
};

const closePurchaseModal = () => {
  selectedProduct.value = null;
};

const onClickRedirect = () => {
  router.push({name: 'home'})
}

const store = useStore();
const boxHeight = computed(()=> store.getters.getBoxHeight);
const computedHeight = ref(0); // 초기화

const calculateHeight = () => {
  const viewportHeight = window.innerHeight;
  computedHeight.value = viewportHeight - boxHeight.value;
  console.log('viewportHeight' + viewportHeight);
  console.log('header: ' + boxHeight.value);
  console.log('live-container: ' + computedHeight.value);

};

onMounted(() => {
  calculateHeight();
  window.addEventListener('resize', calculateHeight);
});

watch(boxHeight, calculateHeight);

</script>

<style scoped>
.live-container {
  display: flex;
  gap: 1px;
  background: #E5E7EB;
}

.tab-list{
  display : flex;
  justify-content: space-around;
}

.live-section {
  flex: 1;
  min-width: 0;
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  overflow : hidden;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.live-section-broad {
  flex: 1;
  min-width: 0;
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  overflow : hidden;
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
  max-height: calc(80vh - 100px);
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
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: auto;
}

.product-discount, .product-price {
  text-align: center;
  font-size: 20px;
  color: red;
}

.modal {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.overlay {
  min-width: 0;
  border: 1px solid #ccc;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* display: none; */
}

.live-section.active-overlay {
  position: relative;
  z-index: 2; /* 오버레이가 필요할 때만 적용 */
}

/* 구매 영역 끝 */


/* 오른쪽 라이브 섹션에 대한 너비 조정 */
.live-section:last-child {
  flex: 0.9; /* 기존보다 작은 flex-factor 적용 */
  margin-right : 20px;
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

.chat-card{
  height: auto;
}

.video-component{
  width: 100px!important;
}

.video-component.live-section {
    padding-left: 0;
    padding-right: 0;
    height: auto;
    max-width: 552px !important;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}
</style>
