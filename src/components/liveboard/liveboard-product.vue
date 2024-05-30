<template>
  <div class="table-card">
    <div class="text-base mb-3 mt-3">
      상품 목록
    </div>

    <div class="table-header">
      <span class="header-cell">이미지</span>
      <span class="header-cell badge-cell">인증배지</span>
      <span class="header-cell name-cell">이름</span>
      <span class="header-cell">정가</span>
      <span class="header-cell">판매가</span>
    </div>
    <div v-for="(product, index) in products" :key="index" class="table-row cursor-pointer"
      @click="openDetailProductModal(index)">
      <span class="cell">
        <div class="image-container">
          <img :src="product.productImage" alt="Product Image" class="product-image" />
        </div>
      </span>
      <div class="badge-container cell badge-cell">
        <img v-for="(image, imgIndex) in getLabelImageArray(product.labelImages)" :key="imgIndex" :src="image"
          alt="label Image" class="label-image" />
      </div>
      <span class="cell name-cell">{{ product.productNm }}</span>
      <span class="cell price-cell">
        <div class="list-price">{{ product.listPrice.toLocaleString() }}원</div>
        <div class="discount-rate">{{ product.discountRate }}%</div>
      </span>
      <span class="cell discount-price">{{ product.discountPrice.toLocaleString() }}원</span>
    </div>
    <!-- 상품 상세정보 모달 -->
    <Modal title="상품 상세 정보" ref="showProductInfo" :showButtons="false">
      <div class="modal-content">
        <div class="product-info">
          <img :src="selectedProduct.productImg" alt="Product Image" class="product-image" />
          <div class="product-details">
            <div class="modal-title">{{ selectedProduct.productName }}</div>
            <p>상품 코드: {{ selectedProduct.productCode }}</p>
          </div>
        </div>
        <!-- 후에 추가 구현 -->
        <div class="real-time-info">
          <p>상품 재고: {{ selectedProduct.productStock }}개</p>
          <p>남은 재고: {{ remainingStock }}개</p>
          <p>주문 건수: {{ totalOrders }}건</p>
          <p>주문 금액: {{ totalOrderAmount.toLocaleString() }}원</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import nowImg from '@/assets/images/all-img/now.png';
import Modal from "../Modal/Modal.vue";
import Icon from "@/components/Icon/index.vue";
import axios from "@/axios";

export default {
  components: {
    Modal,
    Icon
  },
  props: {
    products: Array
  },
  data() {
    return {
      nowImg,
      selectedProduct: null,
      remainingStock: '',
      totalOrders: '',
      totalOrderAmount: '',
    };
  },
  methods: {
    getLabelImageArray(labelImages) {
      if (typeof labelImages === 'string') {
        return labelImages.split(',').map(image => image.trim());
      } else {
        return [];
      }
    },
    openDetailProductModal(index) {
      const selectedProduct = this.products[index];

      this.selectedProduct = {
        productImg: selectedProduct.productImage,
        productName: selectedProduct.productNm,
        productCode: selectedProduct.productCd,
        productStock: selectedProduct.productStock
      };

      const broadcastId = this.$route.params.broadcastId;

      axios.post(`/live-product-stats/${broadcastId}/${selectedProduct.productSeq}`)
        .then(response => {

          this.remainingStock = response.data.remainingStock;
          this.totalOrders = response.data.totalOrders;
          this.totalOrderAmount = response.data.totalOrderAmount;
          
          // 모달 열기
          this.$refs.showProductInfo.openModal();
        })
        .catch(error => {

        });
    }
  }
}
</script>

<style>
.table-card {
  width: 100%;
  height: 328px;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 1rem;
}

.text-primary {
  color: darkgreen;
}

.table-header {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  background-color: #FAFAFA;
}

/* header-cell */
.header-cell {
  flex: 1;
  text-align: center;
  font-weight: bold;
}

.header-cell.name-cell {
  flex: 2;
}

.header-cell.badge-cell {
  flex: 1.5;
}

.table-row {
  display: flex;
  border-top: 1px solid #ccc;
  padding: 10px 0;
}

/* cell */
.cell {
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.cell.name-cell {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell.badge-cell {
  flex: 1.5;
}

.cell.discount-price {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell.price-cell {
  margin-top: 19px;
  align-items: center;
  justify-content: center;
}

.image-container {
  position: relative;
  display: inline-block;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.now-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 30px;
}

.label-image {
  width: 30px;
  height: 30px;
}

.badge-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  margin-right: 10px;
}

.list-price {
  text-decoration: line-through;
}

.discount-rate {
  color: red;
}

/* 모달 디자인 */

.modal-title {
  font-weight: bold;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-info {
  display: flex;
  gap: 20px;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.real-time-info {
  background-color: #f7fafc;
  padding: 20px;
  border-radius: 8px;
}

.real-time-info h3 {
  margin-bottom: 10px;
}

.real-time-info p {
  margin: 5px 0;
}
</style>
