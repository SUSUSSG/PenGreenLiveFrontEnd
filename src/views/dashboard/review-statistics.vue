<template>
  <div class="content-wrapper">
    <div class="flex-row">
      <div class="card-content">
        <span class="card-title">채널 전체 상품</span>
        <productlist
          :headers="['상품코드', '상품명', '총 판매량','관리용 번호']"
          :data="allProducts"
          @product-click="handleProductClick"
        />
      </div>
      <div class="card-content">
        <span class="card-title">상품 상세 정보</span>
        <productdetail v-bind="productData" class="productdetail" />
      </div>
      <div class="card-content">
        <span class="card-title">리뷰 내용 요약</span>
        <div v-if="reviewSummary" class="review-summary">
          <p>{{ reviewSummary }}</p>
        </div>
        <div v-else>
          <p>리뷰 요약을 불러오는 중...</p>
        </div>
      </div>
    </div>
    <reviewchart :reviewImage="reviewImage"></reviewchart>
  </div>
</template>

<script>
import axios from 'axios';
import productlist from "@/components/Table/statistics-review-product-table.vue";
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
        productSeq: null,
        imageUrl: "",
        productCode: "",
        greenCode: "",
        certificationImages: [],
        certificationReason: "",
        productPrice: "",
        brand: "",
        category: "",
      },
      reviewImage: "",
      reviewSummary: "", // 리뷰 요약 데이터를 관리
    }
  },
  async mounted() {
    await this.fetchAllProducts();

    // 첫 번째 상품 상세 정보 조회
    if (this.allProducts.length > 0) {
      this.handleProductClick(this.allProducts[0][0], this.allProducts[0][3]);
    }
  },
  methods: {
    async fetchAllProducts() {
      try {
        const response = await axios.get('http://localhost:8090/products/statistics/all-products', {
          params: { channelSeq: 1 } // TODO : 로그인 상태 채널 시퀀스 받아오도록 교체
        });
        this.allProducts = response.data.map((product) => [
          product.productCd,
          product.productNm,
          product.totalSales, // 총 판매량 추가
          product.productSeq,  // productSeq 추가
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
          productSeq: product.productSeq,
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
    async fetchReviewImage(productSeq) {
      try {
        const response = await axios.post('http://localhost:8090/api/review-semantic', null, {
          params: { productSeq: productSeq }
        });
        const imageData = `data:image/png;base64,${response.data.image}`;
        if (imageData.includes('undefined') || imageData.includes('null') || !response.data.image) {
          throw new Error("Invalid image data");
        }
        this.reviewImage = imageData;
      } catch (error) {
        console.error('Error fetching review image:', error);
        this.reviewImage = null; 
      }
    },
    async handleProductClick(productCd, productSeq) {
      console.log(`Product Clicked - productCd: ${productCd}, productSeq: ${productSeq}`);
      await this.fetchProductDetails(productCd);
      if (productSeq) {
        console.log("상품 코드 있음: " + productSeq);
        await this.fetchReviewImage(productSeq);
        await this.fetchReviewSummary(productSeq);
      } else {
        console.log("상품 코드 없음: " + productSeq);
        this.reviewImage = null; 
      }
    },
    async fetchReviewSummary(productSeq) {
      try {
        const response = await axios.post('http://localhost:8090/review/summarize', null, {
          params: { productSeq: productSeq }
        });
        this.reviewSummary = response.data;
      } catch (error) {
        console.error('Error fetching review summary:', error);
        this.reviewSummary = "리뷰가 없습니다";
      }
    },
  }
};
</script>

<style scoped>
.productdetail {
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

img {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.review-summary {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.review-summary p {
  margin: 0;
  font-size: 1rem;
  color: #333;
}
</style>
