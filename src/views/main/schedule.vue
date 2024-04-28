<template>
  <div class="ml-4 mr-4">
    <CardSchedule/>
  </div>
  <Categories />
  <hr class="mt-6" />
  
  <hr />
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
    return {
      
    };
  },
};
</script>
<style scoped>

.under-category-section {
  border-left: 1px solid #e6e7eb;
  border-right: 1px solid #e6e7eb;
}
.under-category-section::-webkit-scrollbar {
  display: none;
}
</style>
