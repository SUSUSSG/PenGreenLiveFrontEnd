<template>
  <div class="content-wrapper">
    <!-- 채널 전체 상품과 상품 상세 정보 -->
    <div class="flex-row">
      <div class="card-content">
        <span class="card-title">채널 전체 상품</span>
        <productlist
          :headers="['상품 코드', '상품 이름']"
          :data="[
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
            ['P014', '제품14'],
            ['P015', '제품15'],
            ['P016', '제품16'],
            ['P017', '제품17'],
            ['P018', '제품18'],
            ['P019', '제품19'],
            ['P020', '제품20'],
          ]"
        />
      </div>
      <div class="card-content">
        <span class="card-title">상품 상세 정보</span>
        <productdetail v-bind="productdetailData" />
      </div>
    </div>
    
    <!-- 바 차트 컴포넌트 -->
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
        imageUrl: "https://placehold.co/200x200",
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
.flex-row {
  display: flex;
  flex-direction: row;
  width:100%;
  justify-content: space-between;
  gap:1.5rem;
}

.content-wrapper {
  width: 100%;
  height: 100%;
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
}
.card-title{
  font-size: 24px;
  font-weight: bold;
}

.card-content{
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 1.5rem;
  width:100%;
}

.card-content:first-child {
  flex: 0 0 40%;  /* 채널 전체 상품 카드 */
}

.table-container td {
  padding: 4px 8px; /* 상하 4px, 좌우 8px로 조정 */
}

th, td{
  text-align: center;
}
</style>
