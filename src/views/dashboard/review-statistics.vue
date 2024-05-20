<template>
  <div class="content-wrapper">

    <div class="flex-row">
      <div class="card-content">
        <span class="card-title">채널 전체 상품</span>
        <productlist
          :headers="['상품코드', '상품명']"
          :data="allProducts"
          @product-click="fetchProductDetails"
        />
      </div>
      <div class="card-content">
        <span class="card-title">상품 상세 정보</span>
        <productdetail v-bind="productData" class="productdetail" />
      </div>

      <div class="card-content">
        <span class="card-title">리뷰 내용 요약</span>
      </div>

    </div>


    <reviewchart></reviewchart>
  </div>
</template>

<script>
import axios from 'axios';
import productlist from "@/components/Table/statistics-default-table.vue";
import productdetail from "@/components/Card/product-statistics-card.vue";
import reviewchart from "@/components/reivew/reviewchart.vue";

export default {
  components: {
    productlist,
    productdetail,
    reviewchart
  },
  data() {
    return {
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
    }
  },
  async mounted() {
    await this.fetchAllProducts();

    // 첫 번째 상품 상세 정보 조회
    if (this.allProducts.length > 0) {
      this.fetchProductDetails(this.allProducts[0][0]);
    }
  },
  methods: {
    async fetchAllProducts() {
      try {
        const response = await axios.get('http://localhost:8090/products/statistics/all-products', {
          params: { channelSeq: 1 }
        });
        this.allProducts = response.data.map((product) => [
          product.productCd,
          product.productNm,
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
    }
  }
};
</script>

<style scoped>

.productdetail{
  overflow-y: scroll;
}

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
