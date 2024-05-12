<template>
  <div :class="{'active-overlay': isOpen}">
        <div class="overlay" v-show="isOpen" :style="{ zIndex: isOpen ? 20 : -1 }"></div>
        <img :src="productImg"/>
        <div class="product-header">
            <div class="brand-name">{{ brand }}</div>
                <div class="product-name">{{ productName }}</div>  
                <p class="pt-5 pb-2">
                    <span class="discount-rate text-slate-900 dark:text-slate-300 text-base font-medium mt-2 ltr:mr-2 rtl:mr-2 text-red-500">{{discountRate}}%</span>
                    <del class="product-price text-slate-500 dark:text-slate-500 font-normal text-base">{{formattedPrice}}원</del>
                </p>
            <div class="discounted-price">{{ formattedDiscountedPrice }}원</div>
        </div>
        
        <div class="mt-[2rem]">
            <TabGroup>
                <TabList class="flex lg:space-x-8 md:space-x-4 space-x-0">
                    <Tab
                        v-slot="{ selected }"
                        as="template"
                        v-for="(item, i) in buttons"
                        :key="i">
                        <button
                        :class="[
                            selected ? 'text-primary-500 before:w-full' : 'text-slate-500 before:w-0 dark:text-slate-300',
                        ]"
                        class="flex-1 text-sm font-medium mb-7 capitalize dark:bg-slate-800 ring-0 focus:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2"
                        >
                        {{ item.title }}
                        </button>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                            <img src="/src/assets/images/all-img/product-explain-sample.jpg">
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                            <div class="mb-[2rem] flex items-center justify-center">
                                <div data-v-dc744160="" class="w-[99%] card-text h-full">
                                    <div class="flex space-x-3 rtl:space-x-reverse p-5">
                                        <div class="flex-none">
                                            <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl bg-[#E5F9FF] dark:bg-slate-900 text-info-500">
                                                <!-- <img src="/src/assets/images/logo/logo-gpt.png"> -->
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="text-slate-600 dark:text-slate-400 text-sm mb-1 font-medium">AI에 의해 요약된 리뷰입니다!</div>
                                            <div class="text-slate-800 dark:text-slate-300 text-lg">가성비가 뛰어나고 생각보다 배송이 빠르게 옵니다.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <div v-for="review in reviews" :key="review.id" class="w-[99%] rounded-md dark:bg-slate-800 shadow-base mb-[0.5rem]">
                                    <div class="h-full">
                                        <div class="p-5 dark:bg-slate-700 rounded-lg">
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

        <div class="sticky bottom-0 flex justify-between items-center pt-4">
          <Button class="w-full order-button" text="구매하기" @click="openModal"/>
        </div>
        
        <div class="modal flex justify-between items-center modal-adjust z-30" v-show="isOpen">
          <PurchaseModal @update:isOpen="updateModal"     
            :productName="productName"
            :price="price"
            :discountedPrice="discountedPrice"
            @openTossPay="handleOpenTossPay"
            @updateTotalPrice="handleTotalPrice"
            />
        </div>

        <div v-if="showTossPay" class="modal flex justify-between items-center modal-adjust z-50">
            <div class="scroll">
                <TossPay 
                :productName="productName"
                :totalPrice="updateTotalPrice"
                @openTossPay="close">
                </TossPay>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, defineProps } from 'vue';
    import Button from "@/components/Button";
    import PurchaseModal from "@/components/Modal/purchase-modal.vue";
    import TossPay from "@/components/Pay/tosspayments-module.vue";
    import "@/components/Pay/style.css";

    const props = defineProps({
        brand: String,
        productName: String,
        price: Number,
        discountRate: Number,
        discountedPrice: String,
        productImg: String,
    });

    const formattedPrice = computed(() => props.price.toLocaleString());
    const formattedDiscountedPrice = computed(() => props.discountedPrice.toLocaleString());
    const isOpen = ref(false);
    const openModal = () => {
        isOpen.value = true;
    };

    const updateModal = (value) => {
        isOpen.value = value;
    };

    const showTossPay = ref(false);

    function handleOpenTossPay() {
        showTossPay.value = true; 
    }

    function close() {
        showTossPay.value = false; 
    }

    let updateTotalPrice = ref(null);
    function handleTotalPrice(totalPrice) {
        updateTotalPrice = totalPrice;
    }

</script>

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
                        image: "/src/assets/images/all-img/cus-2.png",
                        comment: "거품이 잘 나요. 너무 마음에 듭니다. 이제 미용실 안가도 돼요."
                    },
                    {
                        id: 2,
                        name: "world",
                        date: "2024-04-30",
                        image: "/src/assets/images/all-img/cus-1.png",
                        comment: "좋은 제품을 구매해서 기쁩니다."
                    },
                ]
            };
        }
    };
</script>

<style>

.purchase-container .brand-name {
    /* color: #828c94; */
    font-weight: 500;
    display: block;
    margin: 19px 0 4px;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    color: #757575;
}

.purchase-container .product-name {
    display: block;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    color: #000;
    overflow-wrap: break-all;
}

.purchase-container .discounted-price {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    line-height: 1;
    font-size: 20px;
    font-weight: 700;
}

.modal {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex; /* Ensure it uses flexbox for proper child alignment */
    flex-direction: column; /* Stack children vertically */
    max-height: 100%; /* Limit the height to 80% of the viewport height */
    overflow-y: auto; /* Enable vertical scrolling */
}

.overlay {
  min-width: 0;
  border: 1px solid #ccc;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* display: none; */
}

.live-section.active-overlay {
  position: relative;
  z-index: 2; /* 오버레이가 필요할 때만 적용 */
}
.scroll {
    flex-grow: 1;
    overflow-y: auto;
    height: 100%;
}
</style>