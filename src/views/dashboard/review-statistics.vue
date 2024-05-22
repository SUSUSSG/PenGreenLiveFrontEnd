<template>
  <div class="content-wrapper">
    <div class="flex-row">
      <div class="card-content">
        <span class="card-title">채널 전체 상품</span>
        <productlist
          :headers="['상품코드', '상품명', '총 판매량', '관리용 번호']"
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
      </div>
    </div>
    <reviewchart :reviewImage="reviewImage" :loading="loading"></reviewchart>
  </div>
</template>

<script>
import axios from "axios";
import productlist from "@/components/Table/statistics-review-product-table.vue";
import productdetail from "@/components/Card/product-statistics-card.vue";
import reviewchart from "@/components/reivew/reviewchart.vue";

export default {
  components: {
    productlist,
    productdetail,
    reviewchart,
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
      reviewImage: "", // 리뷰 이미지 데이터를 관리
      loading: false, // 이미지 로딩 상태를 관리
    };
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
        const response = await axios.get(
          "http://localhost:8090/products/statistics/all-products",
          {
            params: { channelSeq: 1 }, // TODO : 로그인 상태 채널 시퀀스 받아오도록 교체
          }
        );
        this.allProducts = response.data.map((product) => [
          product.productCd,
          product.productNm,
          product.totalSales, // 총 판매량 추가
          product.productSeq, // productSeq 추가
        ]);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    },
    async fetchProductDetails(productCd) {
      try {
        const response = await axios.get(
          "http://localhost:8090/products/statistics/product-details",
          {
            params: { productCd },
          }
        );
        const product = response.data;
        this.productData = {
          imageUrl: product.productImage,
          productCode: product.productCd,
          productSeq: product.productSeq,
          greenCode: product.greenProductId,
          certificationImages: product.labels.map((label) => label.labelImage),
          certificationReason: product.labels
            .map((label) => label.certificationReason)
            .join(", "),
          productPrice: `${product.listPrice}원`,
          brand: product.brand,
          category: product.categoryNm,
        };
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },
    async fetchReviewImage(productSeq) {
      try {
        const response = await axios.post(
          "http://223.130.147.232:8090/api/review-semantic",
          null,
          {
            params: { productSeq: productSeq },
          }
        );
        const imageData = `data:image/png;base64,${response.data.image}`;
        if (
          imageData.includes("undefined") ||
          imageData.includes("null") ||
          !response.data.image
        ) {
          throw new Error("Invalid image data");
        }
        this.reviewImage = imageData;
      } catch (error) {
        console.error("Error fetching review image:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        this.reviewImage = null; // 오류가 발생하면 null로 설정
      } finally {
        this.loading = false; // 로딩 종료
      }
    },

    async handleProductClick(productCd, productSeq) {
      console.log(
        `Product Clicked - productCd: ${productCd}, productSeq: ${productSeq}`
      );
      this.loading = true; // 상품 클릭 시 로딩 상태로 설정
      this.reviewImage = null; // 이전 이미지를 초기화
      await this.fetchProductDetails(productCd);
      if (productSeq) {
        console.log("상품 코드 있음: " + productSeq);
        await this.fetchReviewImage(productSeq);
      } else {
        console.log("상품 코드 없음: " + productSeq);
        this.loading = false;
        this.reviewImage = null; // productSeq가 없으면 null로 설정
      }
    },
  },
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
  border: 1px solid #e5e7eb;
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

th,
td {
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
