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
    <div class="content-wrapper">
      <CardSchedule
        v-for="(item, index) in liveData"
        :key="index"
        :liveTime="item.liveTime"
        :thumbnailUrl="item.thumbnailUrl"
        :liveTitle="item.broadcastTitle"
        :liveBenefitTitle="item.benefitContent"
        :productName="item.broadcastTitle"
        :productImgUrl="item.productImgUrl"
        :productDescription="item.productDescription"
        :productPrice="item.discountPrice"
        :shopName="item.channelNm"
        :shopThumbnailUrl="item.shopThumbnailUrl"
        :channelSeq="item.channelSeq"
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
              thumbnailUrl: `data:image/jpeg;base64,${this.arrayBufferToBase64(item.broadcastImage)}`,
              productImgUrl: `data:image/jpeg;base64,${this.arrayBufferToBase64(item.broadcastImage)}`,
              shopThumbnailUrl: `data:image/jpeg;base64,${this.arrayBufferToBase64(item.channelImage)}`
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
}

.under-category-section::-webkit-scrollbar {
  display: none;
}
</style>
