<template>
  <div id="content">
    <div id="search"></div>
    <div id="result" class="grid">
      <card v-for="(cardData, index) in cardDataList" :key="index" :icon="cardData.icon"
        :analyticsTitle="cardData.analyticsTitle" :analyticsResult="cardData.analyticsResult" :fontSize="cardData.fontSize"/>
    </div>
  </div>
</template>

<script>
import card from "@/components/Card/analytics-card.vue";
export default {
  components: {
    card,
  },
  data() {
    return {
      cardDataList: [
        {
          icon: "heroicons:clock",
          analyticsTitle: "평균 방송 진행 시간",
          analyticsResult: "01시간 42분 36초",
          fontSize: "27px"
        },
        {
          icon: "heroicons:user-group",
          analyticsTitle: "평균 시청자 수",
          analyticsResult: "233명",
        },
        {
          icon: "heroicons:archive-box",
          analyticsTitle: "평균 구매 개수",
          analyticsResult: "1.3개",
        },
        {
          icon: "heroicons:cursor-arrow-rays",
          analyticsTitle: "평균 상품 클릭수",
          analyticsResult: "2.7번",
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
        }
      ]
    }
  }
};
</script>

<style>
#result.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px; 
}
</style>
