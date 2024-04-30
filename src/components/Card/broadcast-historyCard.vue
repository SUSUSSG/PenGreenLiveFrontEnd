<template>
    <div class="card-component">
      <div class="top-section">
        <img :src="thumbimageSrc" alt="Thumbnail Image" class="thumbnail-image">
        <div class="broadcast-info">
          <div class="broadcast-title">{{ broadcastTitle }}</div>
          <div class="product-section">
            <img :src="productimageSrc" alt="Product Image" class="product-image">
            <div class="product-details">
              <div class="product-name">{{ productName }}</div>
              <div class="product-price">{{ productPrice }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanel } from "@headlessui/vue";
import { withDefaults, defineProps, ref } from 'vue';
import Modal from "../Modal/Modal.vue";
import Button from "@/components/Button/index.vue"

const props = withDefaults(defineProps < {
    broadcastTitle: string;
    thumbimageSrc: string;
    productimageSrc: string; 
    productName: string;
    productPrice: number;
} > (), {
    broadcastTitle: 'default-status',
    thumbimageSrc: 'default-img-url',
    productimageSrc: 'default-img-url',
    productName: 'default-product',
    productPrice: 0,
});
</script>

<style scoped>
.card-component {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  height: 120px;
  padding: 10px;

}

.top-section {
  display: flex;
  align-items: flex-start;
  height: 100%;
}

.thumbnail-image {
    width: auto;
    height: 100%;
    margin-right: 10px;
}

.broadcast-info {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    justify-content: space-between;
}

.broadcast-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
}

.product-section {
  display: flex;
  align-items: center;
}

.product-image {
  width: 50px; /* 상품 이미지 크기 조정 */
  height: auto;
  margin-right: 10px; /* 이미지와 상세 정보 간 간격 */
}

.product-details {
  display: flex;
  flex-direction: column;
  align-items: start; /* 왼쪽 정렬 */
}

.product-name {
  font-size: 14px;
  margin-bottom: 4px; /* 이름과 가격 사이 간격 */
}

.product-price {
  font-size: 14px;
  font-weight: bold;
}
</style>

  