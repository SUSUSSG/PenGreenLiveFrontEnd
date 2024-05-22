<template>
  <div class="content-wrapper">
    <div class="flex-row">
      <div class="card-content">
        <span class="card-title">채널 전체 상품</span>
        <productlist
          :headers="['자체 코드', '품명', '매출액', '코드']"
          :data="allProducts"
          @product-click="handleProductClick"
        />
      </div>
      <div class="card-content">
        <span class="card-title">상품 상세 정보</span>
        <productdetail v-bind="productData" class="productdetail" />
      </div>
      <div class="card-content">
        <div class="review-summary-content">
          <span class="card-title">리뷰 내용 요약</span>
          <div class="review-summary">
            <p class="summary-title">🌟AI에 의해 요약된 리뷰입니다.</p>
            <p class="summary-content" v-if="reviewSummary">
              {{ reviewSummary }}
            </p>
          </div>
          <div v-if="reviewsList.length" class="review-table">
            <table>
              <thead>
                <tr>
                  <th>리뷰 내용</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(review, index) in reviewsList" :key="index">
                  <td>{{ review }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p style="margin-top: 15px">리뷰가 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
    <reviewchart
      :dailySentiments="dailySentiments"
      :reviewImage="reviewImage"
      :loading="loading"
    ></reviewchart>
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
      reviewImage: "",
      loading: false,
      reviewSummary: "",
      reviewsList: [],
      dailySentiments: {}, // 일별 감정 분석 결과를 저장하는 데이터
    };
  },
  async mounted() {
    await this.fetchAllProducts();

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
          product.totalSales,
          product.productSeq,
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
        this.reviewImage = null;
      } finally {
        this.loading = false;
      }
    },

    async handleProductClick(productCd, productSeq) {
      console.log(
        `Product Clicked - productCd: ${productCd}, productSeq: ${productSeq}`
      );
      this.loading = true;
      this.reviewImage = null;

      await this.fetchProductDetails(productCd);
      if (productSeq) {
        console.log("상품 코드 있음: " + productSeq);
        await this.fetchReviewImage(productSeq);
        await this.fetchReviewSummary(productSeq);
        await this.fetchReviewsList(productSeq);
        await this.fetchDailySentiments(productSeq); // 일별 감정 분석 결과를 가져오는 메서드 호출
      } else {
        console.log("상품 코드 없음: " + productSeq);
        this.loading = false;
        this.reviewImage = null;
        this.reviewsList = [];
      }
    },
    async fetchReviewSummary(productSeq) {
      try {
        const response = await axios.post(
          "http://localhost:8090/review/summarize",
          null,
          {
            params: { productSeq: productSeq },
          }
        );
        this.reviewSummary = response.data;
      } catch (error) {
        console.error("Error fetching review summary:", error);
        this.reviewSummary = "리뷰가 없습니다";
      }
    },
    async fetchReviewsList(productSeq) {
      try {
        const response = await axios.get("http://localhost:8090/reviewlist", {
          params: { productSeq: productSeq },
        });
        this.reviewsList = response.data;
      } catch (error) {
        console.error("Error fetching reviews list:", error);
        this.reviewsList = [];
      }
    },
    async fetchDailySentiments(productSeq) {
      try {
        const response = await axios.get(
          "http://localhost:8090/review/sentiment/daily",
          {
            params: { productSeq: productSeq },
          }
        );
        this.dailySentiments = response.data;
      } catch (error) {
        console.error("Error fetching daily sentiments:", error);
        this.dailySentiments = {};
      }
    },
  },
};
</script>

<style scoped>
.summary-title {
  margin-bottom: 1rem !important;
  font-size: 0.8rem !important;
  font-weight: 700;
  color: #676767 !important;
}
.summary-content {
  font-weight: 600;
  font-size: 1.1rem !important;
}
.productdetail {
  overflow-y: scroll;
}
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  width: 100%;
  gap: 1rem;
}
.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1rem;
  width: 32%;
  height: 400px;
}
.flex-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  gap:1rem;
}
.card-title {
  font-size: 1.25rem;
  font-weight:500;
  color:#0f172A;
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
.review-summary-content {
  overflow-y: auto;
  height: 100%;
}
.review-summary {
  background-color: #ffffff;
  padding: 0.2rem 1rem 0.2rem 1rem;
  margin-top: 10px;
  border-left: 3px solid rgb(231, 93, 228);
}
.review-summary p {
  margin: 0;
  font-size: 1rem;
  color: #333;
}
.review-table {
  margin-top: 10px;
}
.review-table table {
  width: 100%;
  border-collapse: collapse;
}
.review-table th,
.review-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.review-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center;
}
.review-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
.review-table tr:hover {
  background-color: #f1f1f1;
}
</style>
