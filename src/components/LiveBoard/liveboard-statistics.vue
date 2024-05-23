<template>
  <div class="all-card">
    <div class="text-base ml-3">
      실시간 통계
    </div>
    <div class="statistics-card">
      <!-- Individual cards for each statistic -->
      <div class="basic-card">
        <Icon icon="heroicons:user-16-solid" class="icon-style" />
        <div>
          <div class="title">실시간 접속자</div>
          <div class="result">{{ liveViewers }} 명</div>
        </div>
      </div>
      <div class="basic-card">
        <Icon icon="heroicons:chart-bar-square-16-solid" class="icon-style" />
        <div>
          <div class="title">누적 주문 건수</div>
          <div class="result">{{ totalOrders }} 건</div>
        </div>
      </div>
      <div class="basic-long-card">
        <Icon icon="heroicons:currency-dollar-20-solid" class="icon-style" />
        <div>
          <div class="title">누적 주문 금액</div>
          <div class="result">{{ totalOrderAmount.toLocaleString() }} 원</div>
        </div>
      </div>
      <div class="basic-card">
        <Icon icon="heroicons:users-16-solid" class="icon-style" />
        <div>
          <div class="title">누적 접속자</div>
          <div class="result">{{ totalViewers }} 명</div>
        </div>
      </div>
      <div class="basic-card">
        <Icon icon="heroicons:heart-16-solid" class="icon-style" />
        <div>
          <div class="title">좋아요</div>
          <div class="result">{{ totalLikes }}</div>
        </div>
      </div>
      <div class="basic-long-card">
        <Icon icon="heroicons:building-storefront-16-solid" class="icon-style" />
        <div>
          <div class="title">채널이름</div>
          <div class="result">{{ channelNm }}</div>
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
      totalViewers: 0,
      totalLikes: 0,
      totalOrders: 0,
      totalOrderAmount: 0,
      viewersHistory: [],
      maxViewers: 0,
      averageViewers: 0,
    }
  },
  watch: {
    startCheck(newVal) {
      console.log("Watcher triggered:", { newVal });
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
.all-card {
  width: 820px;
  height: 230px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  padding-top: 0.5rem;
  padding-bottom: 1rem;
}

.statistics-card {
  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr); */
  margin: auto 15px;
  
}

.basic-card,
.basic-long-card {
  width: 200px;
  border: 0.5px solid #134010;
  margin: 10px auto;
  display: inline-flex;
  background-color: white;
  border-radius: 0.375rem;
  padding-top: 0.5rem;
  padding-left: 1.25rem;
  padding-right: 1rem;
  margin-bottom: 1rem;
  margin-left: 25px;
}

.basic-long-card {
  width: 280px;
}

.icon-style {
  height: 3rem;
  width: 3rem;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.875rem;
  padding-right: 0.75rem;
  color: #1C6D16;
  margin-top: 5px;
}

.title {
  font-size: 0.875rem;
  color: #475569;
  margin-bottom: 6px;
}

.result {
  font-size: 1.25rem;
  color: #1f2937;
  font-weight: 500;
  margin-bottom: 6px;
}
</style>
