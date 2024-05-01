<template>
  <div id="content" class="flex flex-col items-center">
    <div id="search-container" class="w-full flex justify-center">
      <div id="search" class="inline-flex items-center gap-4 max-w-[900px] w-full">
        <div class="card-title mr-7" id="searchTitle">선택</div>
        <SplitDropdown classMenuItems="left-0 w-[220px] top-[110%]" label="방송 제목" labelClass="btn-outline-primary"
          :items="broadcastOptions" />
        <div class="flex gap-4 ml-5 w-full">
          <div class="input-wrapper">
            <label for="startDate">시작일:</label>
            <input type="date" id="startDate" v-model="startDate">
          </div>
          <div class="input-wrapper">
            <label for="endDate">종료일:</label>
            <input type="date" id="endDate" v-model="endDate">
          </div>
          <Button type="submit"
            class="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white rounded px-4 py-2 transition-colors duration-150">검색</button>
        </div>
      </div>
    </div>
    <div id="result-container" class="w-full flex justify-center">
      <div id="result" class="grid max-w-[1550px] w-full">
        <div v-for="(cardData, index) in cardDataList" :key="'title_' + index">
          <div v-if="index < 4">
            <div class="card-title mb-5">{{ cardData.cardTitle }}</div>
          </div>
          <Card :icon="cardData.icon" :analyticsTitle="cardData.analyticsTitle" :analyticsResult="cardData.analyticsResult"
            :fontSize="cardData.fontSize" />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import Card from "@/components/Card/analytics-card.vue";
import Button from "@/components/Button";
import SplitDropdown from '@/components/Dropdown/SplitDropdown';

export default {
  components: {
    Card,
    Button,
    SplitDropdown
  },
  data() {
    return {
      broadcastOptions: [
        { value: "1번", label: "number1" },
        { value: "2번", label: "number2" },
      ],
      startDate: '',
      endDate: '',
      cardDataList: [
        { icon: "heroicons:clock", analyticsTitle: "평균 방송 진행 시간", analyticsResult: "01시간 42분 36초", fontSize: "27px", cardTitle: "시간" },
        { icon: "heroicons:user-group", analyticsTitle: "평균 시청자 수", analyticsResult: "233명", cardTitle: "고객" },
        { icon: "heroicons:archive-box", analyticsTitle: "평균 구매 개수", analyticsResult: "1.3개", cardTitle: "구매" },
        { icon: "heroicons:cursor-arrow-rays", analyticsTitle: "평균 상품 클릭수", analyticsResult: "2.7번", cardTitle: "상품" },
        { icon: "heroicons:clock", analyticsTitle: "평균 방송 시청 시간", analyticsResult: "00시간 28분 12초", fontSize: "27px" },
        { icon: "heroicons:hand-thumb-up", analyticsTitle: "평균 좋아요 수", analyticsResult: "5603명" },
        { icon: "heroicons:circle-stack", analyticsTitle: "평균 구매 금액", analyticsResult: "13,200개" },
      ]
    }
  }
};
</script>

<style>
#content {
  width: 100%;
}

#search-container, #result-container {
  padding: 20px;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

#result.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
}

#result {
  margin-bottom: 300px;
}

#searchTitle {
  width: 100px;
}
.card-title {
  font-weight: bold;
  font-size: 20px;
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