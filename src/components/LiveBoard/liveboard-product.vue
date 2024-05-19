<template>
  <div class="bg-white rounded pt-3 px-4 mt-4" id="productCard">
    <div class="text-base mb-3">
      상품 목록
    </div>
    <div id="tableCard">
      <!-- <vue-good-table :columns="columns" :rows="products" styleClass="vgt-table centered lesspadding2 table-head" :pagination-options="{ enabled: false }" :sort-options="{ enabled: false }">
        <template v-slot:table-row="props">
          <span class="relative">
            <span v-if="props.column.field == 'productImg'" class="cursor-pointer"
              @click="openDetailProductModal(props.row)">
              <img :src="props.row.productImg" alt="Product Image" class=" w-18 h-18 object-cover" />
              <img v-if="props.row.showNowImg" :src="nowImg" alt="Now Image"
                class="w-15 h-10 absolute top-1 left-0 z-10" id="nowImg" />
            </span>
            <Modal title="상품 상세 정보" ref="showProductInfo" :showButtons="false">
              <div class="row items-center justify-center ml-7">
                <div class="max-w-md">
                  <div class="flex items-center mb-4">
                    <div class="text-sm text-slate-600 dark:text-slate-300 mr-4">이미지</div>
                    <img :src="selectedProduct.productImg" alt="Product Image" class="w-20 h-20 object-cover" />
                    <div class="text-sm text-slate-600 dark:text-slate-300 mx-4 ml-5">상품명</div>
                    <div class="text-lg text-slate-900 dark:text-white font-medium">{{
                      selectedProduct.productName }}</div>
                    <div class="text-sm text-slate-600 dark:text-slate-300 mx-4 ml-10">상품코드</div>
                    <div class="text-lg text-slate-900 dark:text-white font-medium">{{
                      selectedProduct.productCode }}</div>
                  </div>
                </div>
                <div>
                  <div
                    style="display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); gap: 10px;">
                    <div v-for="(product, i) in productStatistics" :key="i" class="inline-flex">
                      <div class="inline-flex bg-white rounded pt-3 px-4 mt-4 pl-5" id="basicCard">
                        <div>
                          <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-3xl pr-7">
                            <Icon :icon="product.icon" class="text-primary" />
                          </div>
                        </div>
                        <div>
                          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
                            {{ product.title }}
                          </div>
                          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">
                            {{ product.count }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </span>
          <span v-if="props.column.field == 'auth'" class="flex">
            <img v-for="entry in props.row.auth" :key="entry.name" :src="entry.image" :alt="entry.name"
              class="object-cover w-6 h-6 rounded-full mr-2" />
          </span>
          <span v-if="props.column.field == 'productName'" class="cursor-pointer">
            {{ props.row.productName }}
          </span>
          <span v-if="props.column.field == 'discountRate'">
            {{ props.row.discountRate }}%
          </span>
          <span v-if="props.column.field == 'discountPrice'">
            {{ props.row.discountPrice.toLocaleString() }}원
          </span>
          <span v-if="props.column.field == 'originalPrice'">
            {{ props.row.originalPrice.toLocaleString() }}원
          </span>
          <span v-if="props.column.field == 'switch'">
            <Switch :activeClass="`bg-primary-500`" class="mb-5" badge :active="props.row.switch"
              :prevIcon="`heroicons-outline:volume-on`" :nextIcon="`heroicons-outline:volume-off`"
              :class="['mb-5', switchClass]" v-on:click="toggleNowImage(props.row)" />
          </span>
        </template>
</vue-good-table> -->
      <div>
        <div class="table-header">
          <span class="header-cell">이미지</span>
          <span class="header-cell">이름</span>
          <span class="header-cell">원가</span>
          <span class="header-cell">할인율</span>
          <span class="header-cell">판매가</span>
          <span class="header-cell">판매상태</span>
        </div>
        <div v-for="(product, index) in products" :key="index" class="table-row cursor-pointer">
          <span class="cell">
            <div class="image-container">
              <img :src="product.productImage" alt="Product Image" class="product-image" />
              <img v-if="product.showNowImg" :src="nowImg" class="now-image"/>
            </div>
          </span>
          <span class="cell">{{ product.productNm }}</span>
          <span class="cell">{{ product.listPrice.toLocaleString() }}원</span>
          <span class="cell">{{ product.discountRate }}%</span>
          <span class="cell">{{ product.discountPrice.toLocaleString() }}원</span>
          <span class="cell">
            <Switch v-model="product.showNowImg" />
          </span>
        </div>
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
    }
  },
  methods: {
    showProductInfo() {
      this.isOpen = true;
    },
    openDetailProductModal(row) {
      this.$refs.showProductInfo.openModal();
      this.selectedProduct = {
        productImg: row.productImg,
        productName: row.productName,
        productCode: row.productCode
      };
      this.$refs.showProductInfo.open();
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

.image-container {
  position: relative;
  display: inline-block;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.now-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 30px;
}
</style>
