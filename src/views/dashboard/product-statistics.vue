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
          :data="topProducts"
          @product-click="fetchProductDetails"
        />
      </div>
      <div class="card-content">
        <span class="card-title">채널 전체 상품</span>
        <StatsTable
          :headers="['상품 코드', '상품 이름', '누적 매출액']"
          :data="allProducts"
          @product-click="fetchProductDetails"
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
import axios from 'axios';
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
          result: "0원",
        },
        {
          id: 2,
          icon: "uil-money-bill",
          title: "누적 판매 건수",
          result: "0건",
        },
        {
          id: 3,
          icon: "uil-bag",
          title: "판매 상품 평균 단가",
          result: "0원",
        },
        {
          id: 4,
          icon: "uil-user",
          title: "상품 평균 구매자 수",
          result: "0명",
        },
        {
          id: 5,
          icon: "uil-shopping-cart",
          title: "상품 평균 판매 수량",
          result: "0개",
        },
      ],
      topProducts: [],
      allProducts: [],
      productData: {
        imageUrl: "",
        productCode: "",
        greenCode: "",
        certificationImages: [],
        certificationReason: "",
        productPrice: "",
        brand: "",
        category: "",
      },
    };
  },
  async mounted() {
    await this.fetchAnalyticsData();
    await this.fetchTopProducts();
    await this.fetchAllProducts();

    // 첫 번째 상품 상세 정보 조회
    if (this.allProducts.length > 0) {
      this.fetchProductDetails(this.allProducts[0][0]);
    }
  },
  methods: {
    async fetchAnalyticsData() {
      try {
        const response = await axios.get('http://localhost:8090/products/statistics/sales-data', {
          params: { channelSeq: 1 }
        });
        const data = response.data;
        this.analyticsCards[0].result = `${data.totalSales}원`;
        this.analyticsCards[1].result = `${data.totalOrders}건`;
        this.analyticsCards[2].result = `${data.avgUnitPrice}원`;
        this.analyticsCards[3].result = `${data.avgBuyersPerProduct}명`;
        this.analyticsCards[4].result = `${data.avgQuantityPerProduct}개`;
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    },
    async fetchTopProducts() {
      try {
        const response = await axios.get('http://localhost:8090/products/statistics/top-products', {
          params: { channelSeq: 1 }
        });
        this.topProducts = response.data.map((product, index) => [
          `${index + 1}위`,
          product.productNm,
          product.totalSales,
        ]);
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    },
    async fetchAllProducts() {
      try {
        const response = await axios.get('http://localhost:8090/products/statistics/all-products', {
          params: { channelSeq: 1 }
        });
        this.allProducts = response.data.map((product) => [
          product.productCd,
          product.productNm,
          product.totalSales,
        ]);
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    },
    async fetchProductDetails(productCd) {
      try {
        const response = await axios.get('http://localhost:8090/products/statistics/product-details', {
          params: { productCd }
        });
        const product = response.data;
        this.productData = {
          imageUrl: product.productImage,
          productCode: product.productCd,
          greenCode: product.greenProductId,
          certificationImages: product.labels.map(label => label.labelImage),
          certificationReason: product.labels.map(label => label.certificationReason).join(', '),
          productPrice: `${product.listPrice}원`,
          brand: product.brand,
          category: product.categoryNm,
        };
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
  },
};
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 1.5rem;
}

.content-wrapper {
  width: 100%;
  height: 100%;
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1.5rem;
  width: 100%;
}
</style>
