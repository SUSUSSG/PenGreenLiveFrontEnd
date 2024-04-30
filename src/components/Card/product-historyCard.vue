<template>
    <div class="card-component">

        <div class="product-row">
            <div>
                <img :src="productimageSrc" alt="Product Image" class="product-image">
            </div>
            <div class="product-name">{{ productname }}</div>
            <div class="product-brand">{{ productbrand }}</div>
            <div class="price-container">
                <div class="product-price">{{ productprice }}</div>
                <div class="product-discount-price">{{ productdiscountprice }}</div>
            </div>
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
        productdiscountprice: Number,
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
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
}

.header, .header-item {
    font-weight: bold;
}

.header-item:last-child, .price-container {
    text-align: right; 
    flex: none; 
    width: 200px; 
}

.header-item, .product-row div {
    flex: 1;
    text-align: left; 
}

.product-price{
    text-decoration: line-through;
    text-align: right !important;
    padding-right: 50px;
}

.product-discount-price{
    text-align: right !important;
    padding-right: 50px;
    font-weight: bold;
    color: red;
}

.price-container {
    align-items: center;
    justify-content: flex-end; 
    flex: 1.5; 
}

</style>





