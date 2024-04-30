<template>
  <div class="content-wrapper">
    <div class="flex-row p-4" style="gap: 10px">
      <AnalyticsCard
        v-for="card in analyticsCards"
        :key="card.id"
        :icon="card.icon"
        :analyticsTitle="card.title"
        :analyticsResult="card.result"
        style="width: 100%"
      />
    </div>
  </div>
</template>

<script>
import AnalyticsCard from "@/components/Card/analytics-card.vue";

export default {
  components: {
    AnalyticsCard,
  },
  data() {
    return {
      analyticsCards: [
        {
          id: 1,
          icon: "uil-money-withdrawal",
          title: "누적 거래액",
          result: "92600000원",
        },
        {
          id: 2,
          icon: "uil-money-bill",
          title: "상품 평균 주문 수",
          result: "58600건",
        },
        {
          id: 3,
          icon: "uil-bag",
          title: "상품 평균 판매 금액",
          result: "49054980원",
        },
        {
          id: 4,
          icon: "uil-user",
          title: "상품 평균 구매자 수",
          result: "4908명",
        },
        {
          id: 5,
          icon: "uil-shopping-cart",
          title: "상품 평균 구매 개수",
          result: "5215개",
        },
      ],
    };
  },
};
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
}

.content-wrapper {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>