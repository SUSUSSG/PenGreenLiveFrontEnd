<template>
  <div id="content">
    <div id="search">
      <div class="text-base">검색 옵션</div>
        <select v-model="selectedBroadcastTitleOption">
          <option value="" disabled hidden>방송 제목</option>
          <option v-for="option in broadcastOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
        <label for="startDate">시작일:</label>
        <input type="date" id="startDate" v-model="startDate">
        <label for="endDate">종료일:</label>
        <input type="date" id="endDate" v-model="endDate">
      <button type="submit"
        class="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white rounded px-4 py-2 transition-colors duration-150">검색</button>
    </div>
    <div id="result" class="grid">
      <div v-for="(cardData, index) in cardDataList" :key="'title_' + index">
        <div v-if="index < 4">
          <div class="card-title">{{ cardData.cardTitle }}</div>
        </div>
        <card :icon="cardData.icon" :analyticsTitle="cardData.analyticsTitle" :analyticsResult="cardData.analyticsResult"
          :fontSize="cardData.fontSize" />
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/components/Card/analytics-card.vue";
import Button from "@/components/Button"

export default {
  components: {
    card,
    Button
  },
  data() {
    return {
      selectedBroadcastTitleOption: '',
      startDate: '',
      endDate: '',
      cardDataList: [
        {
          icon: "heroicons:clock",
          analyticsTitle: "평균 방송 진행 시간",
          analyticsResult: "01시간 42분 36초",
          fontSize: "27px",
          cardTitle: "시간"
        },
        {
          icon: "heroicons:user-group",
          analyticsTitle: "평균 시청자 수",
          analyticsResult: "233명",
          cardTitle: "고객"
        },
        {
          icon: "heroicons:archive-box",
          analyticsTitle: "평균 구매 개수",
          analyticsResult: "1.3개",
          cardTitle: "구매"
        },
        {
          icon: "heroicons:cursor-arrow-rays",
          analyticsTitle: "평균 상품 클릭수",
          analyticsResult: "2.7번",
          cardTitle: "상품"
        },
        {
          icon: "heroicons:clock",
          analyticsTitle: "평균 방송 시청 시간",
          analyticsResult: "00시간 28분 12초",
          fontSize: "27px"
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
      broadcastOptions: [
        {
          value: "1번",
          label: "number1"
        },
        {
          value: "2번",
          label: "number2"
        },
      ]
    }
  }
};
</script>

<style>
#search {
  margin-top: 30px;
  padding: 20px;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

#result.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

#result {
  margin-top: 30px;
  padding: 20px;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 20px;
}

.card-title {
  display: flex;
  justify-content: center;
}
</style>
