<template>
    <div style="background-color: white;">
        <TabGroup>
            <TabList class="tab-list">
                <Tab v-for="(item, i) in buttons" :key="i" v-slot="{ selected }">
                    <button :class="[
                        selected ? 'text-primary-500 before:w-full' : 'text-slate-500 before:w-0 dark:text-slate-300',
                        'text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 focus:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2 flex-1'
                    ]" class="flex-1">
                        {{ item.title }}
                    </button>
                </Tab>
            </TabList>

            <TabPanel>
                <broadcasthistory v-for="(item, index) in broadcasthistoryData" :key="index"
                    :broadcastTitle="item.broadcastTitle" :thumbimageSrc="item.thumbimageSrc"
                    :productimageSrc="item.productimageSrc" :productName="item.productName"
                    :productPrice="item.productPrice" />
            </TabPanel>

            <TabPanel style="padding-left: 6px;">
                <div class="header">
                    <div class="header-item">상품이미지</div>
                    <div class="header-item">상품명</div>
                    <div class="header-item">브랜드</div>
                    <div class="header-item" style="padding-right: 2.2rem;">가격 정보</div>
                </div>
                <producthistory v-for="(item, index) in producthistoryData" :key="index"
                    :productimageSrc="item.productimageSrc" :productname="item.productname"
                    :productbrand="item.productbrand" :productprice="item.productprice"
                    :productdiscountprice="item.productdiscountprice" />
            </TabPanel>
        </TabGroup>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { TabGroup, TabList, Tab, TabPanel } from '@headlessui/vue'
import Button from '@/components/Button/index.vue'
import broadcasthistory from '@/components/Card/broadcast-historyCard.vue';
import producthistory from '@/components/Card/product-historyCard.vue';

const buttons = ref([
    { title: "최근 본 방송" },
    { title: "최근 본 상품" }
]);

const broadcasthistoryData = ref([
    {
        broadcastTitle: "방송제목1",
        thumbimageSrc: "http://via.placeholder.com/100x130",
        productimageSrc: "http://via.placeholder.com/50x50",
        productName: "테스트상품1",
        productPrice: 42000
    },
    {
        broadcastTitle: "방송제목1",
        thumbimageSrc: "http://via.placeholder.com/100x130",
        productimageSrc: "http://via.placeholder.com/50x50",
        productName: "테스트상품1",
        productPrice: 42000
    },
    {
        broadcastTitle: "방송제목1",
        thumbimageSrc: "http://via.placeholder.com/100x130",
        productimageSrc: "http://via.placeholder.com/50x50",
        productName: "테스트상품2",
        productPrice: 42000
    },
    {
        broadcastTitle: "방송제목1",
        thumbimageSrc: "http://via.placeholder.com/100x130",
        productimageSrc: "http://via.placeholder.com/50x50",
        productName: "테스트상품3",
        productPrice: 42000
    },
    {
        broadcastTitle: "방송제목1",
        thumbimageSrc: "http://via.placeholder.com/100x130",
        productimageSrc: "http://via.placeholder.com/50x50",
        productName: "테스트상품4",
        productPrice: 42000
    },
    {
        broadcastTitle: "방송제목1",
        thumbimageSrc: "http://via.placeholder.com/100x130",
        productimageSrc: "http://via.placeholder.com/50x50",
        productName: "테스트상품5",
        productPrice: 42000
    },
])

const producthistoryData = ref([
    {
        productimageSrc: "http://via.placeholder.com/100x100",
        productname: "테스트상품 1",
        productbrand: "테크브루",
        productprice: 40000,
        productdiscountprice: 20000,
    },
    {
        productimageSrc: "http://via.placeholder.com/100x100",
        productname: "테스트상품 1",
        productbrand: "테크브루",
        productprice: 40000,
        productdiscountprice: 20000,
    },
    {
        productimageSrc: "http://via.placeholder.com/100x100",
        productname: "테스트상품 1",
        productbrand: "테크브루",
        productprice: 40000,
        productdiscountprice: 20000,
    },
    {
        productimageSrc: "http://via.placeholder.com/100x100",
        productname: "테스트상품 1",
        productbrand: "테크브루",
        productprice: 40000,
        productdiscountprice: 20000,
    },
    {
        productimageSrc: "http://via.placeholder.com/100x100",
        productname: "테스트상품 1",
        productbrand: "테크브루",
        productprice: 40000,
        productdiscountprice: 20000,
    },
    {
        productimageSrc: "http://via.placeholder.com/100x100",
        productname: "테스트상품 1",
        productbrand: "테크브루",
        productprice: 40000,
        productdiscountprice: 20000,
    },
])

</script>

<style scoped>
.tab-list {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: 100%;
    list-style: none;
    padding: 0;
    background-color: white;
}

.tab-list button {
    flex-grow: 1;
    text-align: center;
    border: none;
    outline: none;
    padding: 10px 0;
    margin: 0;
    background-color: white;
    transition: all 0.3s ease;
}

.tab-list button.selected {
    background-color: #e2e8f0;
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
</style>