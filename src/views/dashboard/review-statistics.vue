<template>
  <div class="content-wrapper">
    <!-- 채널 전체 상품과 상품 상세 정보 -->
    <div class="flex-row">
      <div class="card-content">
        <span class="card-title">채널 전체 상품</span>
        <productlist :headers="['상품 코드', '상품 이름']" :data="[
          ['P001', '제품1'],
          ['P002', '제품2'],
          ['P003', '제품3'],
          ['P004', '제품4'],
          ['P005', '제품5'],
          ['P006', '제품6'],
          ['P007', '제품7'],
          ['P008', '제품8'],
          ['P009', '제품9'],
          ['P010', '제품10'],
          ['P011', '제품11'],
          ['P012', '제품12'],
          ['P013', '제품13'],
        ]" />
      </div>
      <div class="card-content">
        <span class="card-title">상품 상세 정보</span>
        <productdetail v-bind="productdetailData" />
      </div>

      <div class="card-content">
        <span class="card-title">리뷰 내용 요약</span>

      </div>

    </div>


    <reviewchart></reviewchart>
  </div>
</template>

<script>
import productlist from "@/components/Table/statistics-default-table.vue";
import productdetail from "@/components/Card/review-statistics-card.vue";
import reviewchart from "@/components/reivew/reviewchart.vue";

export default {
  components: {
    productlist,
    productdetail,
    reviewchart
  },
  data() {
    return {
      productdetailData: {
        imageUrl: "https://placehold.co/80x80",
        productCode: "ABC123",
        greenCode: "GR001",
        certificationImages: [
          "https://placehold.co/50x50",
          "https://placehold.co/50x50",
        ],
        certificationReason: "This product meets our environmental standards.",
        productPrice: "$29.99",
        brand: "Brand X",
        category: "Electronics",
      },
    }
  }
};
</script>

<style scoped>

.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; 
  align-items: stretch; 
  width: 100%;
  gap: 1.5rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 1.5rem;
  width: 32%; 
  height: 400px; 
  margin: 10px; 
}


.flex-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}


.card-content:first-child {
  flex: 1;  
}

.card-content:nth-child(2), 
.card-content:nth-child(3) {
  flex: 1;  
}

.table-container td {
  padding: 4px 8px; 
}

th, td {
  text-align: center;
}
</style>
