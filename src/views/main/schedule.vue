<template>
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
    <div class="content-wrapper" style="padding-top:2rem;">
      <CardSchedule
        v-for="(item, index) in liveData"
        :key="index"
        :broadcastScheduledTime="item.broadcastScheduledTime"
        :broadcastImage="item.broadcastImage"
        :broadcastTitle="item.broadcastTitle"
        :benefitContent="item.benefitContent"
        :productNm="item.productNm"
        :productImage="item.productImage"
        :discountRate ="item.discountRate"
        :discountPrice="item.discountPrice"
        :listPrice="item.listPrice"
        :channelNm="item.channelNm"
        :channelImage="item.channelImage"
        :channelSeq="item.channelSeq"
        :broadcastSeq="item.broadcastSeq"
      />
      <hr class="mt-6" />
      <hr />
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

export default {
  components: {
    Categories,
    CardSchedule,
    MenuHeaderNav,
    DataTab,
    ScrollTopButton,
  },
  data() {
    return {
      liveData: [],
      selectedDate: null,
      selectedCategory: null,
    };
  },
  created(){
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
        try {
          const response = await axios.get("http://localhost:8090/schedule", {
            params: {
              scheduledDate: this.selectedDate,
              categoryCd: this.selectedCategory,
            },
          });
          console.log(response.data);  // 응답 데이터 출력
          if (Array.isArray(response.data)) {
            this.liveData = response.data.map(item => ({
              ...item,
            }));
          } else {
            console.error("Expected an array but got", typeof response.data);
          }
        } catch (error) {
          console.error("Error fetching live data:", error);
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
  gap:4rem;
}

.under-category-section::-webkit-scrollbar {
  display: none;
}
</style>
