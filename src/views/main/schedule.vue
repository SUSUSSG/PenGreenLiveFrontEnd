<template>
  <div class="content-wrapper">
    <CardSchedule />
    <Categories />
    <hr class="mt-6" />

    <hr />
  </div>
</template>

<script>
import Categories from "@/components/Category/Categories.vue";
import CardSchedule from "@/components/Card/schedule-card.vue";

export default {
  components: {
    Categories,
    CardSchedule,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.content-wrapper {
  width: 100%;
  padding-left:11.5%;
  padding-right:11.5%;
  display:flex!important;
  flex-direction:column;
  justify-content: center;
  align-items: center;
}
.under-category-section {
  border-left: 1px solid #e6e7eb;
  border-right: 1px solid #e6e7eb;
}
.under-category-section::-webkit-scrollbar {
  display: none;
}
</style>
