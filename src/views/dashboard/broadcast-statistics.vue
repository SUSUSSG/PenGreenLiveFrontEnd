<template>
  <div id="content" class="flex flex-col items-center">
    <div id="search-container" class="w-full flex justify-center">
      <div id="search" class="inline-flex items-center gap-4">
        <div v-if="!totalStats" class="card-title mr-7">
          <div id="searchTitle">방송 제목</div>
          <div class="flex gap-4 ml-5 w-full">
            {{ selectedBoradcastTitle }}
          </div>
        </div>
        <div v-else class="card-title mr-7">
          <div id="searchTitle" class="mt-2">날짜 선택</div>
          <div class="flex gap-4 ml-5 w-full">
            <div class="input-wrapper">
              <label for="startDate">시작일:</label>
              <input type="date" id="startDate" v-model="startDate" />
            </div>
            <div class="input-wrapper">
              <label for="endDate">종료일:</label>
              <input type="date" id="endDate" v-model="endDate" />
            </div>
            <Button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white rounded px-4 py-2 transition-colors duration-150"
            >
              검색
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div id="result-container" class="w-full flex flex-col items-center">
      <div>
        <div :id="resultId" class="mt-3">{{ resultTitle }}</div>
        <div id="result" class="grid mt-7">
          <div
            v-for="(cardData, index) in displayedCardData"
            :key="'title_' + index"
          >
            <div v-if="index < 4">
              <div class="card-title mb-5">{{ cardData.cardTitle }}</div>
            </div>
            <Card
              :icon="cardData.icon"
              :analyticsTitle="cardData.analyticsTitle"
              :analyticsResult="cardData.analyticsResult"
            />
          </div>
        </div>
        <div v-if="!totalStats"></div>
        <div v-else>
          <div class="inline-flex mt-10 inline-flex items-center gap-4">
            <div id="resultName" class="mr-5">방송 목록</div>
            <select v-model="selectedBroadcastTitleOption">
              <option :value="null">제목</option>
              <option
                v-for="option in broadcastOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <Button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white rounded px-4 py-2 transition-colors duration-150"
              @click="toggleResult"
            >
              상세조회
            </Button>
          </div>
        </div>
        <!-- 상세통계 -->
        <div v-if="!totalStats">
          <div id="detailResultName" class="mt-12">판매 상품</div>
          <div class="row inline-flex mt-5" id="product">
            <div
              v-for="(product, i) in products"
              :key="i"
              class="inline-flex ml-3"
            >
              <div class="inline-flex rounded pt-3 px-4 pl-0" id="productCard">
                <div class="flex items-center justify-center">
                  <img :src="product.img" alt="Product Image" />
                </div>
                <div class="ml-3 flex flex-col justify-center">
                  <div
                    class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]"
                  >
                    {{ product.name }}
                  </div>
                  <div
                    class="text-xl text-slate-900 dark:text-white font-bold mb-[6px]"
                  >
                    {{ product.price }} ({{ product.discountRate }})
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-7 text-center">
            <Button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white rounded px-4 py-2 transition-colors duration-150"
              @click="toggleResult"
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card/analytics-card.vue";
import Button from "@/components/Button";
// import SplitDropdown from "@/components/Dropdown/SplitDropdown";

export default {
  components: {
    Card,
    Button,
    // SplitDropdown,
  },
  data() {
    return {
      broadcastOptions: [
        { value: "1번", label: "방송제목1" },
        { value: "2번", label: "방송제목2" },
      ],
      selectedBroadcastTitleOption: null,
      startDate: "",
      endDate: "",
      selectedBoradcastTitle: "",
      cardDataList: [
        {
          icon: "heroicons:clock",
          analyticsTitle: "평균 방송 진행 시간",
          analyticsResult: "01시간 42분 36초",
          cardTitle: "시간",
        },
        {
          icon: "heroicons:user-group",
          analyticsTitle: "평균 시청자 수",
          analyticsResult: "233명",
          cardTitle: "고객",
        },
        {
          icon: "heroicons:archive-box",
          analyticsTitle: "평균 구매 개수",
          analyticsResult: "1.3개",
          cardTitle: "구매",
        },
        {
          icon: "heroicons:cursor-arrow-rays",
          analyticsTitle: "평균 상품 클릭수",
          analyticsResult: "2.7번",
          cardTitle: "상품",
        },
        {
          icon: "heroicons:clock",
          analyticsTitle: "평균 방송 시청 시간",
          analyticsResult: "00시간 28분 12초",
          fontSize: "27px",
        },
        {
          icon: "heroicons:hand-thumb-up",
          analyticsTitle: "평균 좋아요 수",
          analyticsResult: "5603명",
        },
        {
          icon: "heroicons:circle-stack",
          analyticsTitle: "평균 구매 금액",
          analyticsResult: "13,200개",
        },
      ],
      totalStats: true,
      resultId: "resultName",
      resultTitle: "전체 통계",
      selectedBroadcastOption: null,
      searchResultCardDataList: [
        {
          icon: "heroicons:clock",
          analyticsTitle: "평균 시청자 수",
          analyticsResult: "355명",
          cardTitle: "시청자",
        },
        {
          icon: "heroicons:user-group",
          analyticsTitle: "평균 시청 시간",
          analyticsResult: "0.5시간",
          cardTitle: "시간",
        },
        {
          icon: "heroicons:archive-box",
          analyticsTitle: "평균 구매 금액",
          analyticsResult: "1.3만원",
          cardTitle: "금액",
        },
        {
          icon: "heroicons:cursor-arrow-rays",
          analyticsTitle: "평균 상품 클릭수",
          analyticsResult: "2.7번",
          cardTitle: "기타",
        },
        {
          icon: "heroicons:cursor-arrow-rays",
          analyticsTitle: "최고 시청자 수",
          analyticsResult: "500명",
        },
        {
          icon: "heroicons:cursor-arrow-rays",
          analyticsTitle: "방송 진행 시간",
          analyticsResult: "2시간",
        },
        {
          icon: "heroicons:cursor-arrow-rays",
          analyticsTitle: "총 판매 금액/수량",
          analyticsResult: "3,333,000/15",
        },
        {
          icon: "heroicons:cursor-arrow-rays",
          analyticsTitle: "좋아요 수",
          analyticsResult: "90 개",
        },
      ],
      products: [
        {
          img: "https://via.placeholder.com/50x50",
          name: "상품이름1",
          price: "13,000",
          discountRate: "50%",
        },
        {
          img: "https://via.placeholder.com/50x50",
          name: "상품이름2",
          price: "14,000",
          discountRate: "70%",
        },
        {
          img: "https://via.placeholder.com/50x50",
          name: "상품이름3",
          price: "15,000",
          discountRate: "20%",
        },
      ],
    };
  },
  computed: {
    displayedCardData() {
      return this.totalStats
        ? this.cardDataList
        : this.searchResultCardDataList;
    },
  },
  methods: {
    toggleResult() {
      this.totalStats = !this.totalStats;
      this.resultId = this.totalStats ? "resultName" : "detailResultName";
      this.resultTitle = this.totalStats ? "전체 통계" : "상세 통계";
    },
    onBroadcastOptionSelect(option) {
      this.selectedBroadcastOption = option;
    },
  },
  watch: {
    selectedBroadcastTitleOption(newValue) {
      const selectedOption = this.broadcastOptions.find(
        option => option.value === newValue
      );
      if (selectedOption) {
        this.selectedBoradcastTitle = selectedOption.label;
      }
    },
  },
};
</script>

<style>
#content {
  width: 100%;
}

#search-container {
  padding: 10px;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

#result-container {
  padding: 10px 10px 30px 10px;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

#result.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}

#result {
  width: 100%;
  max-width: 1500px;
}

#resultName,
#detailResultName {
  font-size: 20px;
  /* margin-bottom: 30px;  */
  color: black;
}

#searchTitle {
  width: 150px;
}

#productCard {
  background: #fafafa;
  width: 250px;
  height: 100px;
  padding: 20px;
}

.card-title {
  font-weight: bold;
  font-size: 15px;
  display: flex;
  justify-content: center;
}

.input-wrapper {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.input-wrapper label {
  margin-right: 8px;
  color: black;
}

.text-base {
  color: black;
}
</style>