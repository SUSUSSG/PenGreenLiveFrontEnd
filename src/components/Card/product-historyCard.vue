<template>
    <div class="card-component">

        <div class="product-row">
            <div>
                <img :src="productimageSrc" alt="Product Image" class="product-image">
            </div>
            <div class="product-name">{{ productname }}</div>
            <div class="product-brand">{{ productbrand }}</div>
                <div class="product-price">{{ formatNumber(productprice) }}</div>
        </div>
    </div>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanel } from "@headlessui/vue";
import { withDefaults, defineProps, ref } from 'vue';
import Modal from "../Modal/Modal.vue";
import Button from "@/components/Button/index.vue"

export default {
    props: {
        productimageSrc: String,
        productname: String,
        productbrand: String,
        productprice: Number,
    },
    methods: {
      formatNumber(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
};
</script>

<style scoped>
.card-component {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.header, .product-row {
    display: flex;
    align-items: center;
    /* padding: 10px 15px; */
    border-bottom: 1px solid #ddd;
    padding-left: 2.5rem;
    padding-bottom: 1rem;
    padding-top:1rem
}

.header {
    font-weight: bold;
    display: flex;
    justify-content: space-between; /* 헤더 아이템들을 고르게 분배 */
}

.header-item, .product-row div {
    flex: 1; /* 모든 열에 동일한 비율의 공간을 할당 */
    text-align: left; 
}

.product-image {
    flex: 0 0 80px; /* 이미지는 고정 너비를 가짐 */
    height: 80px;
    margin-right: 10px;
}

.product-name, .product-brand {
    flex: 1; /* 이름과 브랜드에 비례적 공간 할당 */
    text-align: left;
}

</style>






