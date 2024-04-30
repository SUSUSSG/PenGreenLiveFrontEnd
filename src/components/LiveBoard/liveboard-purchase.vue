<template>
  <div>
        <img src="src/assets/images/all-img/product-sample.jpg"/>
   
        <div>동구밭</div>
        <div>동구밭 중건성 헤어케어 5종 기획세트</div>
        <p class="pb-4">
            <span class="text-slate-900 dark:text-slate-300 text-base font-medium mt-2 ltr:mr-2 rtl:mr-2 text-red-500">30%</span>
            <del class="text-slate-500 dark:text-slate-500 font-normal text-base">47,500</del>
        </p>
        <div>33,000원</div>
        <div>
            <TabGroup>
                <TabList class="lg:space-x-8 md:space-x-4 space-x-0">
                    <Tab
                        v-slot="{ selected }"
                        as="template"
                        v-for="(item, i) in buttons"
                        :key="i">
                        <button
                        :class="[
                            selected
                            ? 'text-primary-500 before:w-full'
                            : 'text-slate-500 before:w-0 dark:text-slate-300',
                        ]"
                        class="text-sm w-[50%] font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2"
                        >
                        {{ item.title }}
                        </button>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div class="text-slate-600 dark:text-slate-400 text-sm font-normal mb-[2rem]">
                            <img src="src/assets/images/all-img/product-explain-sample.jpg">
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                            <div class="my-[1rem]">
                                        <div data-v-dc744160="" class="card-text h-full">
                                            <div class="flex space-x-3 rtl:space-x-reverse">
                                                <div class="flex-none">
                                                    <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl bg-[#E5F9FF] dark:bg-slate-900 text-info-500">
                                                        <img src="/src/assets/images/logo/logo-gpt.png">
                                                    </div>
                                                </div>
                                                <div class="flex-1">
                                                    <div class="text-slate-600 dark:text-slate-400 text-sm mb-1 font-medium">AI에 의해 요약된 리뷰입니다!</div>
                                                    <div class="text-slate-900 dark:text-slate-300 text-lg font-medium">가성비가 뛰어나고 생각보다 배송이 빠르게 옵니다.</div>
                                                </div>
                                            </div>
                                        </div>
                            </div>
                            <div class="flex flex-col ">
                                <div v-for="review in reviews" :key="review.id" class="rounded-md bg-white dark:bg-slate-800 shadow-base mb-[0.5rem]">
                                    <div class="h-full ">
                                        <div class="w-full p-8 dark:bg-slate-700 rounded-lg">
                                            <div class="flex items-start justify-between">
                                                <div class="flex flex-row">
                                                    <div class="w-12 h-12">
                                                        <img class="rounded-full w-full h-full object-cover" :src="review.image" alt="customer image">
                                                    </div>
                                                    <div class="px-[1rem]">
                                                        <h4 class="font-Inter text-slate-900 dark:text-slate-50 text-xl">{{ review.name }}</h4>
                                                        <span class="font-Inter text-slate-400 dark:text-slate-300 text-sm font-normal">{{ review.date }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pt-[1rem]">
                                                <p class="font-Inter text-slate-500 dark:text-slate-300 text-base font-normal">{{ review.comment }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>


<script>
    import Card from "@/components/Card";
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
    
    export default {
        components: {
            Card,
            TabGroup, 
            TabList, 
            Tab, 
            TabPanels, 
            TabPanel
        },
        data() {
            return {
                activeTab: 'description',
                buttons: [
                    {
                        title: '상품정보',
                    },
                    {
                        title: '리뷰',
                    },
                ],
                reviews: [
                    {
                        id: 1,
                        name: "Hello",
                        date: "2024-04-30",
                        image: "src/assets/images/all-img/cus-2.png",
                        comment: "거품이 잘 나요. 너무 마음에 듭니다. 이제 미용실 안가도 돼요."
                    },
                    {
                        id: 2,
                        name: "world",
                        date: "2024-04-30",
                        image: "src/assets/images/all-img/cus-1.png",
                        comment: "좋은 제품을 구매해서 기쁩니다."
                    },
                ]
            };
        }
    };
</script>

<style>

</style>