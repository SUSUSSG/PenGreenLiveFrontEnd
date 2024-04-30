<template>
  <div class="flex-row">
    <AnalyticsCard
      v-for="card in analyticsCards"
      :key="card.id"
      :icon="card.icon"
      :analyticsTitle="card.title"
      :analyticsResult="card.result"
      style="width: 100%;"
    />
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
          icon: "uil-users",
          title: "Total Users",
          result: "92600",
        },
        {
          id: 2,
          icon: "uil-graph-bar",
          title: "Revenue",
          result: "58600",
        },
        {
          id: 3,
          icon: "uil-shopping-cart",
          title: "Orders",
          result: "14200",
        },
        {
          id: 4,
          icon: "uil-comments",
          title: "Comments",
          result: "8220",
        },
        {
          id: 5,
          icon: "uil-bag",
          title: "Products",
          result: "6785",
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
</style>
