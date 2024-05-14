<template>
  <div class="bg-white rounded px-4 pt-4 pb-4" id="statisticsCard">
    <div class="text-base">
      실시간 통계
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 10px; padding: 0 10px;">
      <!-- Individual cards for each statistic -->
      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:user-16-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">실시간 접속자</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ liveViewers }}</div>
        </div>
      </div>

      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:users-16-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">누적 접속자</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ totalViewers }}</div>
        </div>
      </div>

      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:hand-thumb-up-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">좋아요</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ totalLikes }}</div>
        </div>
      </div>

      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:chart-bar-square-16-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">누적 주문 건수</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ totalOrders }}</div>
        </div>
      </div>

      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:currency-dollar-20-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">누적 주문 금액</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ totalOrderAmount }}</div>
        </div>
      </div>

      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
        <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-3xl pr-3">
          <Icon icon="heroicons:building-storefront-16-solid" class="text-primary"/>
        </div>
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">카테고리</div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">{{ category }}</div>
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
      type : Boolean,
      default : false
    }
  },
  data() {
    return {
      liveViewers: "null",
      totalViewers: "null",
      totalLikes: "null",
      totalOrders: "null",
      totalOrderAmount: "null",
      category: "채널이름",
    }
  },
  watch: {
    startCheck(newVal) {
      console.log("Watcher triggered:", { newVal });
      if (newVal) {
        this.interval = setInterval(() => this.updateViewer(), 15000);
        console.log("Interval set");
      } else if (this.interval) {
        clearInterval(this.interval);
        console.log("Interval cleared");
      }
    }
  },
  methods: {
    //현재 시청자수를 컨트롤러에게 비동기 요청합니다.
    getViewers(sessionId) {
      console.log(sessionId);
      return axios.get(`http://localhost:8090/api/sessions/${sessionId}/connections/count`)
          .then(response => {
            console.log('현재 시청자 수:', response.data);
            return response.data;
          })
          .catch(error => {
            console.error('시청자수를 가져오지 못했습니다.', error);
            throw error;
          });
    },
    async updateViewer() {
      console.log("실행됨");
      try {
        const viewerCount = await this.getViewers(this.sessionId);
        // Vue.set을 사용하여 반응성을 유지하면서 statistics 배열의 첫 번째 요소 업데이트
        // Vue 3에서의 사용 예시
        this.liveViewers = viewerCount;
      } catch (error) {
        console.error("Error updating viewers:", error);
      }
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
</style>