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
    border-bottom: 1px solid #ddd;
    padding-left: 2.5rem;
    padding-bottom: 1rem;
    padding-top:1rem
}

.header {
    font-weight: bold;
    display: flex;
    justify-content: space-between; 
}

.header-item, .product-row div {
    flex: 1; 
    text-align: left; 
}

.product-image {
    flex: 0 0 80px; 
    height: 80px;
    margin-right: 10px;
}

.product-name, .product-brand {
    flex: 1; 
    text-align: left;
}

</style>






