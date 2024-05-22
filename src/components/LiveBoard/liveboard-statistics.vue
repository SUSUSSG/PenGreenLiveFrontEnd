<template>
  <div class="bg-white rounded pt-4 pb-4" id="statisticsCard">
    <div class="text-base">
      실시간 통계
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 10px; padding: 0 10px;">
      <!-- Individual cards for each statistic -->
      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:user-16-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">실시간 접속자</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ liveViewers }}</div>
        </div>
      </div>
      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:users-16-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">누적 접속자</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ totalViewers }}</div>
        </div>
      </div>
      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:hand-thumb-up-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">좋아요</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ totalLikes }}</div>
        </div>
      </div>
      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:chart-bar-square-16-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">누적 주문 건수</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ totalOrders }}</div>
        </div>
      </div>
      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:currency-dollar-20-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">누적 주문 금액</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ totalOrderAmount }}</div>
        </div>
      </div>
      <div class="inline-flex bg-white rounded pt-2 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:building-storefront-16-solid" class="text-primary"/>
        </div>
        <div>
          <div class="channel-name">{{ channelNm }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import axios from "axios";

export default {
  components: {
    Card,
    Icon,
    Button,
  },
  props: {
    sessionId: String,
    startCheck: {
      type: Boolean,
      default: false
    },
    channelNm: String
  },
  data() {
    return {
      liveViewers: 0,
      totalViewers: null,
      totalLikes: null,
      totalOrders: null,
      totalOrderAmount: null,
      viewersHistory: [],
      maxViewers: 0,
      averageViewers: 0,
    }
  },
  watch: {
    startCheck(newVal) {
      console.log("Watcher triggered:", {newVal});
      this.updateStatistics();
      if (newVal) {
        this.interval = setInterval(() => {
          this.updateViewer()
          this.updateStatistics();
        }, 15000);
        console.log("Interval set");
      } else if (this.interval) {
        clearInterval(this.interval);
        console.log("Interval cleared");
      }
    }
  },
  methods: {
    // 현재 시청자 수를 가져옴
    getViewers(sessionId) {
      console.log(sessionId);
      return axios.get(`http://localhost:8090/api/sessions/${sessionId}/connections/count`)
          .then(response => {
            console.log('현재 시청자 수:', response.data);
            return response.data;
          })
          .catch(error => {
            console.error('시청자 수를 가져오지 못했습니다.', error);
            throw error;
          });
    },
    // 방송 통계 정보를 가져오는 메서드 추가
    getStatistics(broadcastSeq) {
      return axios.get(`http://localhost:8090/broadcasts/statistics/${broadcastSeq}`)
          .then(response => {
            console.log('방송 통계:', response.data);
            return response.data;
          })
          .catch(error => {
            console.error('통계를 가져오지 못했습니다.', error);
            throw error;
          });
    },
    async updateViewer() {
      try {
        const viewerCount = await this.getViewers(this.sessionId);
        this.liveViewers = viewerCount - 1;
        this.viewersHistory.push(this.liveViewers);
        this.maxViewers = Math.max(...this.viewersHistory);
        this.averageViewers = (this.viewersHistory.reduce((a, b) => a + b, 0) / this.viewersHistory.length).toFixed(2);
        console.log('Updated viewers:', {
          liveViewers: this.liveViewers,
          maxViewers: this.maxViewers,
          averageViewers: this.averageViewers,
        });
        this.emitStatistics(); // Call emitStatistics here to ensure data is up-to-date
      } catch (error) {
        console.error("Error updating viewers:", error);
      }
    },
    async updateStatistics() {
      try {
        const statistics = await this.getStatistics(this.sessionId);
        this.totalViewers = statistics.viewsCount;
        this.totalLikes = statistics.likesCount;
        this.totalOrders = statistics.totalSalesQty;
        this.totalOrderAmount = statistics.totalSalesAmount;
        console.log('Updated statistics:', {
          totalViewers: this.totalViewers,
          totalLikes: this.totalLikes,
          totalOrders: this.totalOrders,
          totalOrderAmount: this.totalOrderAmount,
        });
      } catch (error) {
        console.error("Error updating statistics:", error);
      }
    },
    emitStatistics() {
      console.log('Emitting statistics:', {
        maxViewers: this.maxViewers,
        averageViewers: this.averageViewers,
      });
      this.$emit('update-statistics', { maxViewers: this.maxViewers, averageViewers: this.averageViewers });
    }
  }
};
</script>

<style>
#statisticsCard {
  width: 820px;
  height: 250px;
  max-width: 100%;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

#basicCard {
  width: 200px;
  border: 0.5px solid #134010;
  margin: 10px auto;
}

.text-primary {
  color: darkgreen;
}

.channel-name {
  font-size: 1rem; 
  line-height: 1.75rem; 
  color: #1e293b;
  font-weight: 500;
  margin-bottom: 6px;
}
</style>
