<template>
  <div class="bg-white rounded pt-3 px-4 mt-4" id="productCard">
    <div class="text-base mb-3">
      상품 목록
    </div>
    <div id="tableCard">
      <div>
        <div class="table-header">
          <span class="header-cell">이미지</span>
          <span class="header-cell">인증배지</span>
          <span class="header-cell name-cell">이름</span>
          <span class="header-cell">원가</span>
          <span class="header-cell">판매가</span>
          <span class="header-cell">판매상태</span>
        </div>
        <div v-for="(product, index) in products" :key="index" class="table-row cursor-pointer"
          @click="openDetailProductModal(index)">
          <span class="cell">
            <div class="image-container">
              <img :src="product.productImage" alt="Product Image" class="product-image" />
              <img v-if="product.showNowImg" :src="nowImg" class="now-image" />
            </div>
          </span>
          <div class="badge-container">
            <img v-for="(image, imgIndex) in getLabelImageArray(product.labelImages)" :key="imgIndex" :src="image"
              alt="label Image" class="label-image" />
          </div>
          <span class="cell name-cell">{{ product.productNm }}</span>
          <span class="cell">
            <div class="list-price">{{ product.listPrice.toLocaleString() }}원</div>
            <div class="discount-Rate">{{ product.discountRate }}%</div>
          </span>
          <span class="cell">{{ product.discountPrice.toLocaleString() }}원</span>
          <span class="cell">
            <Switch v-model="product.showNowImg" :activeClass="`bg-primary-500`"/>
          </span>
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
              <p>상품 재고: {{ selectedProduct.productStock }}</p>
              <p>남은 재고: {{ realTimeStock }}</p>
              <p>주문 건수: {{ orderCount }}</p>
              <p>주문 금액: {{ orderAmount }}</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import Switch from '@/components/Switch';
import nowImg from '@/assets/images/all-img/now.png';
import Modal from "../Modal/Modal.vue";
import Icon from "@/components/Icon";

export default {
  components: {
    Switch,
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
    }
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

      this.$refs.showProductInfo.openModal();
      this.$refs.showProductInfo.open();
    },
    showProductInfo() {
      this.isOpen = true;
    }
  }
}
</script>

<style>
#productCard {
  width: 100%;
  max-height: 328px;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  overflow-y: auto;
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

.header-cell {
  flex: 1;
  text-align: center;
  font-weight: bold;
}

.header-cell.name-cell {
  flex: 2;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.cell {
  flex: 1;
  text-align: center;
  position: relative;
}

.cell.name-cell {
  flex: 2;
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

.discount-Rate {
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

/* 스위치 색상 */
.on-color {
  background-color: #134010;
}
</style>
