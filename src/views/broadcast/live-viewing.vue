<template>
  <div class="live-container">
    <LiveboardChat :card-width="'33vw'" :card-height="'100vh'"/>
    <Live class="live-section" show-icon-side-bar="false" show-title-bar="false"></Live>
    <div class="live-section">
      <header class="flex justify-between items-center p-4 border-b">
        <div></div> <!-- 좌측 공백 -->
        <button class="exit-button">나가기</button>
      </header>
      <main class="flex flex-col h-full">
        <!-- 첫 번째 탭 그룹 -->
        <div class="flex-1 overflow-auto">
          <TabGroup as="div" class="tab-group mt-4">
            <TabList as="div" class="flex space-x-1">
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
                  />
                </div>
                <!-- 라이브 소개 탭 -->
                <div v-else-if="tab === '라이브 소개'">{{ liveIntroduction }}</div>
                <!-- 라이브 혜택 탭 -->
                <ul v-else-if="tab === '라이브 혜택'">
                  <li v-for="benefit in liveBenefits" :key="benefit">{{ benefit }}</li>
                </ul>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
        <div class="flex-1 overflow-auto mt-4">
          <!-- 두 번째 탭 그룹 -->
          <TabGroup as="div" class="tab-group mt-4">
            <TabList as="div" class="flex space-x-1">
              <Tab v-for="tab in secondTabGroup" :key="tab" :class="{ 'tab-active': tab === activeSecondTab }"
                   @click="activeSecondTab = tab" class="tab">
                {{ tab }}
              </Tab>
            </TabList>
            <TabPanels class="tab-panels">
              <TabPanel v-for="tab in secondTabGroup" :key="tab" v-show="tab === activeSecondTab" class="tab-panel">
                <!-- 공지사항 탭 -->
                <ul v-if="tab === '공지사항'">
                  <li v-for="notice in notices" :key="notice">{{ notice }}</li>
                </ul>
                <!-- 자주 묻는 질문 탭 -->
                <dl v-else-if="tab === '자주 묻는 질문'">
                  <template v-for="(faq, index) in faqs" :key="`faq-${index}`">
                    <dt>{{ faq.question }}</dt>
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
</template>

<script setup>
import LiveboardChat from "@/components/liveboard/liveboard-chat.vue";
import Live from "@/components/Video/live.vue";
import ProductCard from "@/components/Card/product-card.vue";
import {ref} from 'vue';
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue';

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
</script>
<script>
export default {
  name: "live-viewing",
  components: {
    LiveboardChat,
    Live,
    ProductCard
  },
  data() {
    return {
      liveIntroduction : "라이브 소개 입니다.",
      liveBenefits : ["혜택1", "혜택2"],
      notices : ["공지1", "공지2"],
      faqs : [
          {question: "질문 1", answer: "답변 1"},
          {question: "질문 2", answer: "답변 2"}
      ],
      productList : [
        {productName: "가지가지나뭇가지", price : 10000, discountRate : 30}
      ]
    }
  }
};
</script>

<style scoped>
.live-container {
  display: flex;
  height: 100vh;
}

.live-section {
  flex: 1;
  min-width: 0;
}

.tab {
  @apply py-2 px-4 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none;
}

.tab-active {
  @apply text-blue-500 border-b-2 border-blue-500;
}

.tab-panel {
  @apply p-4 bg-gray-50;
  flex: 1; /* 내용의 높이에 맞게 유동적으로 조절 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤이 가능하도록 설정 */
  min-height: 60%;
  max-height: calc(100% - 40px); /* 최대 높이를 부모 요소의 높이에서 헤더의 높이를 뺀 값으로 설정 */
}

.exit-button {
  @apply bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600;
}

.tab-group {
  @apply flex-1 min-h-0;
}

.tab-panel {
  @apply p-4 bg-gray-50;
  min-height: 30vh;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 상품 카드 사이의 간격을 설정합니다. */
}
</style>
