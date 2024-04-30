<template>
    <div class="h-full">
      <Card
        img="src/assets/images/all-img/product-sample.jpg"
        noborder
      >
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
                        <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                            <img src="src/assets/images/all-img/product-explain-sample.jpg">
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                            <div class="my-[1rem]">
                                <div data-v-dc744160="" class="card rounded-md bg-white dark:bg-slate-800 shadow-base">
                                    <div data-v-dc744160="" class="card-body flex flex-col pt-4 pb-3 px-4"><!----><!---->
                                        <div data-v-dc744160="" class="card-text h-full">
                                            <div class="flex space-x-3 rtl:space-x-reverse">
                                                <div class="flex-none">
                                                    <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl bg-[#E5F9FF] dark:bg-slate-900 text-info-500">
                                                        <span>
                                                            <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class=" iconify iconify--heroicons" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.137a60 60 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m12.75 0a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0"></path></svg> -->
                                                            <svg width="1em" height="1em" role="img" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>OpenAI</title><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="flex-1">
                                                    <div class="text-slate-600 dark:text-slate-400 text-sm mb-1 font-medium">AI에 의해 요약된 리뷰입니다!</div>
                                                    <div class="text-slate-900 dark:text-slate-300 text-lg font-medium">가성비가 뛰어나고 생각보다 배송이 빠르게 옵니다.</div>
                                                </div>
                                            </div>
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
      </Card>
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