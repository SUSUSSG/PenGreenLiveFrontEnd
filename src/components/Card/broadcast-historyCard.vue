<template>
  <div class="card-component">
    <div class="top-section">
      <img :src="broadcastImage" alt="Thumbnail Image" class="thumbnail-image">
      <div class="broadcast-info">
        <div class="broadcast-title">{{ broadcastTitle }}</div>
        <div class="product-section">
          <img :src="productImage" alt="Product Image" class="product-image">
          <div class="product-details">
            <div class="product-name">{{ productNm }}</div>
            <div class="product-price">{{ formatNumber(listPrice) }}</div>
            <div class="channel-name"><p>{{ channelNm }}</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

const props = withDefaults(defineProps<{
  broadcastTitle: string;
  broadcastImage: string;
  productImage: string;
  productNm: string;
  listPrice: number;
  userUUID: string;
  channelNm: string;
}>(), {
  broadcastTitle: 'default-status',
  broadcastImage: 'default-img-url',
  productImage: 'default-img-url',
  productNm: 'default-product',
  listPrice: 0,
  userUUID: '',
  channelNm:''
});

const formatNumber = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
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
  width: 66px;
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
  width: 50px; 
  height: auto;
  margin-right: 10px; 
}

.product-details {
  display: flex;
  flex-direction: column;
  align-items: start; 
}

.product-name {
  font-size: 14px;
  margin-bottom: 4px; 
}

.product-price {
  font-size: 14px;
  font-weight: bold;
}

.channel-name {
  text-align: right !important;
  flex-grow: 1 !important;
}
</style>
