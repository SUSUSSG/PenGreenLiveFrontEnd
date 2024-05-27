<template>
  <div class="card-component">
    <div class="top-section">
      <img :src="broadcastImage" alt="Thumbnail Image" class="thumbnail-image">
      <div class="broadcast-info">
        <div class="viewed-time">{{ formattedViewedDate  }}</div>
        <div class="broadcast-title">{{ broadcastTitle }}</div>
        <div class="product-section">
          <img :src="productImage" alt="Product Image" class="product-image">
          <div class="product-details">
            <div class="product-name">{{ productNm }}</div>
            <div class="product-price">{{ formatNumber(listPrice) }}</div>
          </div>
        </div>
        
      </div>
      
      <div class="channel-name"><img :src="channelImage" class="channel-image"> {{ channelNm }} </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue';

const props = withDefaults(defineProps<{
  broadcastTitle: string;
  broadcastImage: string;
  productImage: string;
  productNm: string;
  listPrice: number;
  channelNm: string;
  viewedDate: Date;
  channelImage: string;
}>(), {
  broadcastTitle: 'default-status',
  broadcastImage: 'default-img-url',
  productImage: 'default-img-url',
  productNm: 'default-product',
  listPrice: 0,
  channelNm:'',
  channelImage:''
});

const formatNumber = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formattedViewedDate = computed(() => {
  const date = new Date(props.viewedDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
  align-items: center;
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
  display: flex;
  align-items: center;
  margin-left: auto;
  text-align: right;
  margin-right: 10px;
}

.viewed-time {
  font-size: 12px;
  color: gray;
}

.channel-image {
  width: 40px; 
  height: 40px; 
  margin-right: 8px;
  border-radius: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border: 0.5px solid gray;
}
</style>
