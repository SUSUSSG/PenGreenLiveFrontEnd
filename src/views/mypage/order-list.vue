<template>
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
            <orderlist v-for="(item, index) in orderData" :key="index" :deliveryStatus="item.deliveryStatus"
                :productImgUrl="item.productImgUrl" :orderDate="item.orderDate" :productName="item.productName"
                :price="item.price" class="mt-3" />
        </TabPanel>

        <TabPanel>
            <reviewlist v-for="(item, index) in orderData" :key="index" :deliveryStatus="item.deliveryStatus"
                :productImgUrl="item.productImgUrl" :orderDate="item.orderDate" :productName="item.productName"
                :price="item.price" :reviewContent="item.reviewContent" class="mt-3" />
        </TabPanel>
    </TabGroup>

</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { TabGroup, TabList, Tab, TabPanel } from '@headlessui/vue'
import orderlist from '@/components/Order/order-list.vue'
import reviewlist from '@/components/Order/review-list.vue'
import Button from '@/components/Button/index.vue'

const buttons = ref([
    { title: "리뷰작성" },
    { title: "작성한 리뷰" }
]);

const orderData = ref([
    {
        deliveryStatus: "배송완료",
        productImgUrl: "http://via.placeholder.com/100x100",
        orderDate: "2022-03-22",
        productName: "식품1",
        price: 25000,
        reviewContent: "너무 맛있어요!"
    },
    {
        deliveryStatus: "배송완료",
        productImgUrl: "http://via.placeholder.com/100x100",
        orderDate: "2022-04-01",
        productName: "유아동1",
        price: 50000,
        reviewContent: "아이가 너무 좋아하네요 ^^"
    },
    {
        deliveryStatus: "배송중",
        productImgUrl: "http://via.placeholder.com/100x100",
        orderDate: "2022-04-22",
        productName: "패션1",
        price: 41000
    }
]);
</script>

<style scoped>
.tab-list {
  display: flex; 
  justify-content: space-between; 
  align-items: stretch; 
  height: 100%; 
  list-style: none; 
  padding: 0; 
  margin-bottom: -15px; 
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

</style>