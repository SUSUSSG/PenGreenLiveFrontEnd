<template>
    <div style="background-color: white;">
        <TabGroup>
            <TabList class="lg:flex md:flex h-20 space-x-0 rtl:space-x-reverse ">
                <Tab v-slot="{ selected }" as="template" v-for="(item, i) in buttons" :key="i">
                    <button :class="[
                        selected
                            ? 'text-primary-500 before:w-full'
                            : 'text-slate-500 before:w-0 dark:text-slate-300',
                    ]"
                        class="text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2 flex-1">
                        {{ item.title }}
                    </button>
                </Tab>
            </TabList>
            <TabPanel>
                <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    <div class="group flex items-center" style="display: flex !important">
                        <div class="flex-row-wrapper w-full p-10">
                            <h6 class="live-time mb-2">{{ deliveryStatus }}</h6>
                            <div class="content-wrapper flex w-full justify-end">
                                <img class="live-thumbnail-image" :src="productImgUrl" alt="Image" />
                                <div class="ml-4 product-wrapper flex-shrink">
                                    <div class="orderdate">{{ orderDate }}</div>
                                    <div class="productname mb-2">{{ productName }}</div>
                                    <div class="price">{{ price }}</div>
                                </div>
                                <div class="ml-auto">
                                    <button
                                        class="btn inline-flex justify-center btn-outline-dark"><span>리뷰작성</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    <div class="group flex items-center ml-10" style="display: flex !important">
                        <div class="flex-row-wrapper">
                            <h6 class="live-time mb-2">작성한 리뷰</h6>
                            <div class="content-wrapper flex">
                                <!-- 작성한 리뷰 내용 추가 -->
                            </div>
                        </div>
                    </div>
                </div>
            </TabPanel>
        </TabGroup>
    </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanel } from "@headlessui/vue";
import { withDefaults, defineProps } from 'vue';

// Props 정의와 기본값 설정
const props = withDefaults(defineProps < {
    deliveryStatus: string;
    productImgUrl: string;
    orderDate: string; // 날짜는 ISO 문자열 형식으로 전달하는 것이 일반적입니다.
    productName: string;
    price: number;
} > (), {
    deliveryStatus: 'default-status',
    productImgUrl: 'default-img-url',
    orderDate: new Date().toISOString(), // ISO 문자열 형식으로 날짜를 기본값으로 설정합니다.
    productName: 'default-product',
    price: 0,
});


const buttons = [
    {
        title: "리뷰작성",
    },
    {
        title: "작성한 리뷰",
    },
];
</script>

<style scoped>
.productname {
    font-size: 20px;
    margin-bottom: 0.5rem;
}

.orderdate {
    margin-bottom: 0.5rem;
}
</style>