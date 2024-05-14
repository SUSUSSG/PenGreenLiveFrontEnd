<template>
  <div>
    <ScrollTopButton />
    <div class="border-container">
      <MenuHeaderNav />
      <hr />
      <DataTab @date-selected="handleDateSelect" />
      <hr />
      <div style="position: sticky; top: 5.5rem; z-index: 10; background-color: white;">
        <Categories @category-selected="handleCategorySelect" style="padding-bottom: 1rem" />
        <hr />
      </div>
      <div class="content-wrapper">
        <template v-if="loading">
          <SkeletonCard v-for="n in 5" :key="n" />
        </template>
        <template v-else>
          <CardSchedule
            v-for="(item, index) in liveData"
            :key="index"
            :broadcastScheduledTime="item.broadcastScheduledTime"
            :broadcastImage="item.broadcastImage"
            :broadcastTitle="item.broadcastTitle"
            :benefitContent="item.benefitContent"
            :productNm="item.productNm"
            :productImage="item.productImage"
            :discountRate="item.discountRate"
            :discountPrice="item.discountPrice"
            :listPrice="item.listPrice"
            :channelNm="item.channelNm"
            :channelImage="item.channelImage"
            :channelSeq="item.channelSeq"
            :broadcastSeq="item.broadcastSeq"
          />
        </template>
        <hr class="mt-6" />
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Categories from "@/components/Category/Categories.vue";
import CardSchedule from "@/components/Card/schedule-card.vue";
import MenuHeaderNav from "@/components/HeaderMain/menu-header-nav.vue";
import DataTab from "@/components/HeaderMain/date-tab.vue";
import ScrollTopButton from "@/components/Button/ScrollTopButton.vue";
import SkeletonCard from "@/components/Skeleton/Schedule-skeleton.vue"; // SkeletonCard 컴포넌트 추가

export default {
  components: {
    Categories,
    CardSchedule,
    MenuHeaderNav,
    DataTab,
    ScrollTopButton,
    SkeletonCard, // SkeletonCard 컴포넌트 등록
  },
  data() {
    return {
      liveData: [],
      selectedDate: null,
      selectedCategory: null,
      loading: true, // 로딩 상태 추가
    };
  },
  created() {
    this.fetchLiveData();
  },
  methods: {
    handleDateSelect(date) {
      this.selectedDate = date;
      this.fetchLiveData();
    },
    handleCategorySelect(categoryCd) {
      this.selectedCategory = categoryCd;
      this.fetchLiveData();
    },
    async fetchLiveData() {
      this.loading = true; // 데이터 요청 전 로딩 상태 true
      try {
        const response = await axios.get("http://localhost:8090/schedule", {
          params: {
            scheduledDate: this.selectedDate,
            categoryCd: this.selectedCategory,
          },
        });
        if (Array.isArray(response.data)) {
          this.liveData = response.data.map(item => ({
            ...item,
          }));
        }
      } catch (error) {
        console.error("Error fetching live data:", error);
      } finally {
        this.loading = false; // 데이터 요청 후 로딩 상태 false
      }
    },
    arrayBufferToBase64(buffer) {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    },
  },
};
</script>

<style scoped>
.border-container {
  width: 74%;
  margin: auto;
  border: 1px solid rgb(224, 224, 224);
  border-top: none;
}
.content-wrapper {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.under-category-section::-webkit-scrollbar {
  display: none;
}
</style>
