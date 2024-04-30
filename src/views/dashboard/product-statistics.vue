<template>
  <div class="content-wrapper">
    <div class="flex-row" style="gap: 1.5rem;">
      <AnalyticsCard
        v-for="card in analyticsCards"
        :key="card.id"
        :icon="card.icon"
        :analyticsTitle="card.title"
        :analyticsResult="card.result"
        style="width: 100%"
      />
    </div>
    <div class="flex-row">
      <div class="card-content">
        <span class="card-title">인기 TOP 10 상품</span>
        <StatsTable
          :headers="['판매 랭킹', '상품 이름', '매출액']"
          :data="[
            ['1위', '제품1', 30345000],
            ['2위', '제품2', 20345350],
            ['3위', '제품3', 10945000],
            ['4위', '제품4', 10500900],
            ['5위', '제품5', 9345000],
            ['6위', '제품6', 8345000],
            ['7위', '제품7', 7345350],
            ['8위', '제품8', 6945000],
            ['9위', '제품9', 5500900],
            ['10위', '제품10', 4045000],
          ]"
        />
      </div>
      <div class="card-content">
        <span class="card-title">채널 전체 상품</span>
        <StatsTable
          :headers="['상품 코드', '상품 이름', '누적 매출액']"
          :data="[
            ['P001', '제품1', 20345000],
            ['P002', '제품2', 4309030],
            ['P003', '제품3', 1200300],
            ['P004', '제품4', 8765432],
            ['P005', '제품5', 3456789],
            ['P006', '제품6', 7890123],
            ['P007', '제품7', 2345678],
            ['P008', '제품8', 9876543],
            ['P009', '제품9', 5432109],
            ['P010', '제품10', 6789012],
            ['P011', '제품11', 1234567],
            ['P012', '제품12', 8901234],
            ['P013', '제품13', 5678901],
            ['P014', '제품14', 2345678],
            ['P015', '제품15', 9012345],
            ['P016', '제품16', 6789012],
            ['P017', '제품17', 3456789],
            ['P018', '제품18', 7890123],
            ['P019', '제품19', 4567890],
            ['P020', '제품20', 1234567],
          ]"
        />
      </div>
      <div class="card-content">
        <span class="card-title">상품 상세 정보</span>
        <ProductCard v-bind="productData" />
      </div>
    </div>
  </div>
</template>

<script>
import AnalyticsCard from "@/components/Card/analytics-card.vue";
import StatsTable from "@/components/Table/statistics-default-table.vue";
import ProductCard from "@/components/Card/product-statistics-card.vue";
export default {
  components: {
    AnalyticsCard,
    StatsTable,
    ProductCard,
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
      productData: {
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
    };
  },
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
</style>
