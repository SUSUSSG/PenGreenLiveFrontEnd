<template>
  <div id="content" class="flex flex-col items-center">
    <!-- 검색 및 필터링 -->
    <div id="search-container" class="w-full flex justify-center">
      <div id="search" class="inline-flex items-center gap-4">
        <div v-if="!totalStats" class="card-title mr-7 p-2">
          <div class="flex gap-4 ml-5 w-full">
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

    <!-- 결과 표시 -->
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
    <div id="detail-result-container" class="w-full p-5 flex flex-col items-center" v-if="!totalStats">
      <apexchart type="line" :options="lineChartOptions" :series="lineChartData" width="1600px" height="600px"></apexchart>
    </div>

    <!-- 방송 이름별 상세 통계 -->
    <div id="detail-result-container" class="w-full p-5 flex flex-col items-center" v-if="!totalStats">
      <div id="detailResultName" class="ml-3">판매 상품</div>
      <div class="row inline-flex mt-5" id="product">
        <div v-for="(product, i) in products" :key="i" class="inline-flex ml-3">
          <div class="productCard inline-flex rounded p-3">
            <div class="flex items-center justify-center">
              <img :src="product.img" class="product-image" alt="Product Image" />
            </div>
            <div class="ml-3 flex flex-col justify-center">
              <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ product.nm }}</div>
              <div class="text-xl text-slate-900 dark:text-white font-bold mb-[6px]">{{ formatPrice(product.price) }}원 ({{ product.discountRate }}%)</div>
              <div class="text-xl text-slate-900 dark:text-white font-bold mb-[6px]">구매 전환률 : {{product.conversionRate}}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-7 text-center">
        <Button btnClass="btn-primary btn-sm" @click="toggleResult">확인</Button>
      </div>
    </div>

    <!-- 방송 이름 선택 -->
    <div id="broadcast-name-container" class="w-full flex justify-center mt-4" v-else>
      <div id="broadcast-name" class="inline-flex items-center gap-4 w-full p-2">
        <div id="searchTitle" class="mr-5">방송 목록</div>
        <select v-model="selectedBroadcastTitleOption" class="flex-grow">
          <option :value="null">제목</option>
          <option v-for="option in broadcastOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
        <Button btnClass="btn-primary btn-sm" @click="fetchBroadcastDetails" :disabled="!selectedBroadcastTitleOption">상세조회</Button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import Card from "@/components/Card/analytics-card.vue";
import Button from "@/components/Button";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    Card,
    Button,
    apexchart: VueApexCharts,
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
      products: [],
      lineChartData: [
        {
          name: '시청자 수',
          data: []
        }
      ],
      lineChartOptions: {
        chart: {
          type: 'line',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: '시청자 수',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: []
        }
      }
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
        const vendorSeq = 3;
        const startDate = this.startDate || "2000-01-01";
        const endDate = this.endDate || "2099-12-31";

        const avgBroadcastDurationResponse = await axios.get(`/broadcasts/statistics/average-broadcast-duration`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgViewerCountResponse = await axios.get(`/broadcasts/statistics/average-viewer-count`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgPurchaseQuantityResponse = await axios.get(`/broadcasts/statistics/average-purchase-quantity`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgProductClicksResponse = await axios.get(`/broadcasts/statistics/average-product-clicks`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgViewingTimeResponse = await axios.get(`/broadcasts/statistics/average-viewing-time`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgLikesCountResponse = await axios.get(`/broadcasts/statistics/average-likes-count`, {
          params: { vendorSeq, startDate, endDate }
        });
        const avgPurchaseAmountResponse = await axios.get(`/broadcasts/statistics/average-purchase-amount`, {
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
            analyticsResult: `${this.formatPrice(avgPurchaseAmountResponse.data)}원`,
            cardTitle: "구매 금액",
          },
        ];
      } catch (error) {
        console.error("Error fetching statistics by vendor and date range:", error);
      }
    },
    async fetchBroadcastOptions() {
      try {
        const vendorSeq = 3;
        const startDate = this.startDate || "2000-01-01";
        const endDate = this.endDate || "2099-12-31";

        const response = await axios.get(`/vendor/${vendorSeq}/broadcasts`, {
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

      await this.loadBroadcastProduct();
      try {
        const broadcastSeq = this.selectedBroadcastTitleOption;

        const response = await axios.get(`/broadcasts/statistics/${broadcastSeq}`);
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
            analyticsResult: `${this.formatPrice(broadcastStatistics.avgPurchaseAmount)}원`,
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
            analyticsResult: `${this.formatPrice(broadcastStatistics.totalSalesAmount)}/${broadcastStatistics.totalSalesQty}`,
          },
          {
            icon: "heroicons:hand-thumb-up",
            analyticsTitle: "좋아요 수",
            analyticsResult: `${broadcastStatistics.likesCount} 개`,
          },
          {
            icon: "heroicons:circle-stack",
            analyticsTitle: "구매 전환율",
            analyticsResult: `${broadcastStatistics.conversionRate}%`,
          }
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
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    async fetchViewerCountData() {
      if (!this.selectedBroadcastTitleOption) return;

      try {
        const broadcastSeq = this.selectedBroadcastTitleOption;
        const response = await axios.get(`/broadcast-viewer-count/${broadcastSeq}`);

        const viewerCountData = response.data;

        this.lineChartOptions.xaxis.categories = viewerCountData.map(data => new Date(data.recordTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
        this.lineChartData[0].data = viewerCountData.map(data => data.viewerCount);
      } catch (error) {
        console.error("Error fetching viewer count data:", error);
      }
    },
    async loadBroadcastProduct() {
      if (!this.selectedBroadcastTitleOption) return;
      const broadcastId = this.selectedBroadcastTitleOption;
      console.log("해당 방송 id : " + broadcastId);
      try {
        const response = await axios.get(`/live-broadcast-product/${broadcastId}`);
        console.log(response.data);
        this.products = response.data.map(product => {
          return {
            nm: product.productNm,
            price: product.listPrice,
            discountRate: product.discountRate,
            img: product.productImage,
            productSeq: product.productSeq,
            conversionRate: product.conversionRate
          };
        });
        console.log("product info data : ", this.products);
      } catch (error) {
        console.error('판매 상품 목록 load 실패 : ', error);
      }
    }
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
      this.fetchViewerCountData();
    },
  },
};
</script>

<style>

#content {
  width: 100%;
}

#search-container,
#broadcast-name-container {
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

.product-image{
  width: 50px;
  height: 50px;
}

.text-base {
  color: #111111;
}

#chart-container {
  width: 90%;
}
</style>
