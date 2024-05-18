<template>
  <div id="content" class="flex flex-col items-center">
    <div id="search-container" class="w-full flex justify-center">
      <div id="search" class="inline-flex items-center gap-4">
        <div v-if="!totalStats" class="card-title mr-7 p-2">
          <div class="flex gap-4 ml-5 w-full ">
            {{ selectedBroadcastTitle }}
          </div>
        </div>
        <div v-else class="card-title mr-7 p-2">
          <div id="searchTitle">날짜 선택</div>
          <div class="flex gap-4 ml-5 w-full">
            <div class="input-wrapper">
              <span for="startDate">시작일:</span>
              <input type="date" id="startDate" v-model="startDate" />
            </div>
            <div class="input-wrapper">
              <span for="endDate">종료일:</span>
              <input type="date" id="endDate" v-model="endDate" />
            </div>
            <Button btnClass="btn-primary btn-sm" @click="fetchStatisticsByDateRange">검색</Button>
          </div>
        </div>
      </div>
    </div>
    <div id="result-container" class="w-full flex flex-col items-center">
      <div>
        <div :id="resultId" class="mt-3">{{ resultTitle }}</div>
        <div id="result" class="grid mt-7">
          <div v-for="(cardData, index) in displayedCardData" :key="'title_' + index">
            <div v-if="index < 4">
              <div class="card-title mb-5">{{ cardData.cardTitle }}</div>
            </div>
            <Card :icon="cardData.icon" :analyticsTitle="cardData.analyticsTitle" :analyticsResult="cardData.analyticsResult" />
          </div>
        </div>
      </div>
    </div>
    <!-- 방송 이름별 상세 통계 -->
    <div id="detail-result-container" class="w-full p-5 flex flex-col items-center" v-if="!totalStats">
      <div id="detailResultName" class="ml-3">판매 상품</div>
      <div class="row inline-flex mt-5" id="product">
        <div v-for="(product, i) in products" :key="i" class="inline-flex ml-3">
          <div class="inline-flex rounded pt-3 px-4 pl-0" id="productCard">
            <div class="flex items-center justify-center">
              <img :src="product.img" alt="Product Image" />
            </div>
            <div class="ml-3 flex flex-col justify-center">
              <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ product.name }}</div>
              <div class="text-xl text-slate-900 dark:text-white font-bold mb-[6px]">{{ product.price }} ({{ product.discountRate }})</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-7 text-center">
        <Button btnClass="btn-primary btn-sm" @click="toggleResult">확인</Button>
      </div>
    </div>
    <!-- 방송 이름 선택 -->
    <div v-else>
      <div class="inline-flex inline-flex items-center gap-4">
        <div id="searchTitle" class="mr-5">방송 목록</div>
        <select v-model="selectedBroadcastTitleOption">
          <option :value="null">제목</option>
          <option v-for="option in broadcastOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
        <Button btnClass="btn-primary btn-sm" @click="fetchBroadcastDetails" :disabled="!selectedBroadcastTitleOption">상세조회</Button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Card from "@/components/Card/analytics-card.vue";
import Button from "@/components/Button";

export default {
  components: {
    Card,
    Button,
  },
  data() {
    return {
      broadcastOptions: [],
      selectedBroadcastTitleOption: null,
      startDate: "",
      endDate: "",
      selectedBroadcastTitle: "",
      cardDataList: [],
      totalStats: true,
      resultId: "resultName",
      resultTitle: "전체 통계",
      searchResultCardDataList: [],
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
      return this.totalStats ? this.cardDataList : this.searchResultCardDataList;
    },
  },
  methods: {
    toggleResult() {
      this.totalStats = !this.totalStats;
      this.resultId = this.totalStats ? "resultName" : "detailResultName";
      this.resultTitle = this.totalStats ? "전체 통계" : "상세 통계";
    },
    async fetchStatisticsByDateRange() {
      try {
        const vendorSeq = 3; // Replace with actual vendorSeq
        const startDate = this.startDate || "2000-01-01";
        const endDate = this.endDate || "2099-12-31";

        const avgBroadcastDurationResponse = await axios.get(`http://localhost:8090/broadcasts/statistics/average-broadcast-duration`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgViewerCountResponse = await axios.get(`http://localhost:8090/broadcasts/statistics/average-viewer-count`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgPurchaseQuantityResponse = await axios.get(`http://localhost:8090/broadcasts/statistics/average-purchase-quantity`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgProductClicksResponse = await axios.get(`http://localhost:8090/broadcasts/statistics/average-product-clicks`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgViewingTimeResponse = await axios.get(`http://localhost:8090/broadcasts/statistics/average-viewing-time`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgLikesCountResponse = await axios.get(`http://localhost:8090/broadcasts/statistics/average-likes-count`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgPurchaseAmountResponse = await axios.get(`http://localhost:8090/broadcasts/statistics/average-purchase-amount`, {
          params: { vendorSeq, startDate, endDate }
        });

        this.cardDataList = [
          {
            icon: "heroicons:clock",
            analyticsTitle: "평균 방송 진행 시간",
            analyticsResult: this.formatDuration(avgBroadcastDurationResponse.data),
            cardTitle: "시간",
          },
          {
            icon: "heroicons:user-group",
            analyticsTitle: "평균 시청자 수",
            analyticsResult: `${avgViewerCountResponse.data}명`,
            cardTitle: "고객",
          },
          {
            icon: "heroicons:archive-box",
            analyticsTitle: "평균 구매 개수",
            analyticsResult: `${avgPurchaseQuantityResponse.data}개`,
            cardTitle: "구매",
          },
          {
            icon: "heroicons:cursor-arrow-rays",
            analyticsTitle: "평균 상품 클릭수",
            analyticsResult: `${avgProductClicksResponse.data}번`,
            cardTitle: "상품",
          },
          {
            icon: "heroicons:clock",
            analyticsTitle: "평균 방송 시청 시간",
            analyticsResult: this.formatDuration(avgViewingTimeResponse.data),
            cardTitle: "시청 시간",
          },
          {
            icon: "heroicons:hand-thumb-up",
            analyticsTitle: "평균 좋아요 수",
            analyticsResult: `${avgLikesCountResponse.data}명`,
            cardTitle: "좋아요",
          },
          {
            icon: "heroicons:circle-stack",
            analyticsTitle: "평균 구매 금액",
            analyticsResult: `${avgPurchaseAmountResponse.data}원`,
            cardTitle: "구매 금액",
          },
        ];
      } catch (error) {
        console.error("Error fetching statistics by vendor and date range:", error);
      }
    },
    async fetchBroadcastOptions() {
      try {
        const vendorSeq = 3; // Replace with actual vendorSeq
        const startDate = this.startDate || "2000-01-01";
        const endDate = this.endDate || "2099-12-31";

        const response = await axios.get(`http://localhost:8090/vendor/${vendorSeq}/broadcasts`, {
          params: { startDate, endDate }
        });

        if (response.data.length === 0) {
          alert("해당 기간에 조회된 방송이 없습니다!");
          return;
        }

        this.broadcastOptions = response.data.map(broadcast => ({
          value: broadcast.broadcastSeq,
          label: broadcast.broadcastTitle,
        }));
      } catch (error) {
        console.error("Error fetching broadcast options:", error);
      }
    },
    async fetchBroadcastDetails() {
      if (!this.selectedBroadcastTitleOption) return;

      try {
        const broadcastSeq = this.selectedBroadcastTitleOption;

        const response = await axios.get(`http://localhost:8090/broadcasts/statistics/${broadcastSeq}`);
        const broadcastStatistics = response.data;

        this.searchResultCardDataList = [
          {
            icon: "heroicons:user-group",
            analyticsTitle: "평균 시청자 수",
            analyticsResult: `${broadcastStatistics.avgViewerCount}명`,
            cardTitle: "시청자",
          },
          {
            icon: "heroicons:clock",
            analyticsTitle: "평균 시청 시간",
            analyticsResult: this.formatDuration(broadcastStatistics.avgViewingTime),
            cardTitle: "시간",
          },
          {
            icon: "heroicons:circle-stack",
            analyticsTitle: "평균 구매 금액",
            analyticsResult: `${broadcastStatistics.avgPurchaseAmount}원`,
            cardTitle: "금액",
          },
          {
            icon: "heroicons:cursor-arrow-rays",
            analyticsTitle: "평균 상품 클릭수",
            analyticsResult: `${broadcastStatistics.avgProductClicks}번`,
            cardTitle: "기타",
          },
          {
            icon: "heroicons:user-group",
            analyticsTitle: "최고 시청자 수",
            analyticsResult: `${broadcastStatistics.maxViewerCount}명`,
          },
          {
            icon: "heroicons:clock",
            analyticsTitle: "방송 진행 시간",
            analyticsResult: this.formatDuration(broadcastStatistics.broadcastDuration),
          },
          {
            icon: "heroicons:circle-stack",
            analyticsTitle: "총 판매 금액/수량",
            analyticsResult: `${broadcastStatistics.totalSalesAmount}/${broadcastStatistics.totalSalesQty}`,
          },
          {
            icon: "heroicons:hand-thumb-up",
            analyticsTitle: "좋아요 수",
            analyticsResult: `${broadcastStatistics.likesCount} 개`,
          },
        ];

        this.toggleResult();
      } catch (error) {
        console.error("Error fetching broadcast details:", error);
      }
    },
    formatDuration(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours}시간 ${minutes}분 ${secs}초`;
    },
  },
  mounted() {
    this.fetchStatisticsByDateRange();
    this.fetchBroadcastOptions();
  },
  watch: {
    selectedBroadcastTitleOption(newValue) {
      const selectedOption = this.broadcastOptions.find(
          option => option.value === newValue
      );
      if (selectedOption) {
        this.selectedBroadcastTitle = selectedOption.label;
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
  height: auto;
}

#detail-result-container {
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  height: auto;
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
  color: #111111;
}

#searchTitle {
  font-weight: bold;
  width: 150px;
  margin: auto 0;
}

#productCard {
  background: #fafafa;
  width: 250px;
  height: 100px;
  padding: 20px;
}

.card-title {
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
  color: #111111;
}

.text-base {
  color: #111111;
}
</style>
