<template>
    <div class="card" :style="{ backgroundColor: cardItem.color.background, color: cardItem.color.text }">
        <div class="brandpay-qk9vun"></div>
        <div class="card-header">
            <div class="card-logo">
                <img :src="cardItem.icons.square.url" :alt="cardItem.name" class="brandpay-131r0q4">
                <span v-if="cardItem.alias !== ''" class="text-shadow">{{ cardItem.alias }}</span>
                <span v-else class="text-shadow">{{ cardItem.cardName }}</span>
            </div>
            <div class="susussg-logo">
            <img src="@/assets/images/logo/pengreenlive-logo.png" alt="Susussg Logo">
            </div>
        </div>
        <div class="card-number text-shadow">{{ cardItem.cardNumber }}</div>
    </div>
  </template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        cardItem: Object,
    });
</script>
  
<style scoped>
.brandpay-37ztg0 > div {
    min-height: 166px;
}

.brandpay-qk9vun {
    position: absolute;
    display: inline-block;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    z-index: -1;
    background-color: rgb(204, 229, 243);
    color: rgb(255, 255, 255);
}

.brandpay-131r0q4 {
    height: 64px;
    width: 64px;
}

.brandpay-37ztg0 {
    min-width: 300px;
    width: 300px;
    padding: 0px;
    margin-right: 8px;
    margin-left: 8px;
}

.brandpay-1enn31n {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    height: 170px;
    border: 1px solid #d1d6db;
    border-radius: 8px;
    background-color: #e5e8eb;
    cursor: pointer;
}

.svg-icon-fallback {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -9999;
    visibility: hidden;
}

.adaptive-grey800-text {
    color: #333d4b;
}

.card-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
  
.card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    margin-top: 0.5rem;
    min-height: 166px;
}

.card-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.card-number {
    position: fixed;
    bottom: 0;
    margin: 1rem;
}

.card-icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.susussg-logo {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
}

.susussg-logo img {
    width: 50px;
}

.card-number {
display: flex;
justify-content: space-between;
align-items: center;
}

.card-details {
margin-top: 10px;
}

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
</style>
  