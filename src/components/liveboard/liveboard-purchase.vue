<template>
  <div>
        <div class="w-[100%] h-[100%] p-[1rem] flex justify-center">
            <img class="product-img" :src="product.productImg"/>
        </div>
        <div class="product-header">
            <div class="brand-name">{{ product.brand }}</div>
                <div class="product-name">{{ product.productName }}</div>  
                <p class="pt-5 pb-2">
                    <span class="discount-rate text-slate-900 dark:text-slate-300 text-base font-medium mt-2 ltr:mr-2 rtl:mr-2 text-red-500">{{product.discountRate}}%</span>
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
                            <div class="mb-[2rem] flex items-center justify-center">
                                <div data-v-dc744160="" class="w-[99%] card-text h-full">
                                    <div class="flex space-x-3 rtl:space-x-reverse p-5">
                                        <div class="flex-none">
                                            <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl dark:bg-slate-900">
                                                🌟
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="text-slate-600 dark:text-slate-400 text-sm mb-1 font-medium">AI에 의해 요약된 리뷰입니다!</div>
                                            <div class="text-slate-800 dark:text-slate-300 text-lg">{{ reviewSummary }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <div v-for="review in reviews" :key="review.userUuid" class="w-[99%] rounded-md dark:bg-slate-800 shadow-base mb-[0.5rem]">
                                    <div class="h-full">
                                        <div class="p-5 dark:bg-slate-700 rounded-lg">
                                            <div class="flex items-start justify-between">
                                                <div class="flex flex-row">
                                                    <div>
                                                        <h4 class="font-Inter text-slate-900 dark:text-slate-50 text-xl">{{ review.userNm }}</h4>
                                                        <span class="font-Inter text-slate-400 dark:text-slate-300 text-sm font-normal">{{ review.reviewTime }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pt-[1rem]">
                                                <p class="font-Inter text-slate-500 dark:text-slate-300 text-base font-normal">{{ review.reviewContent }}</p>
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

        <div class="sticky bottom-0 mb-[1.5rem]">
          <Button class="w-full order-button" text="구매하기" @click="openModal"/>
        </div>
        
        <div class="modal flex justify-between items-center modal-adjust z-30" v-show="isOpen">
          <PurchaseModal 
            @update:isOpen="updateModal"     
            @openTossPay="handleOpenTossPay"/>
        </div>

        <div v-if="showTossPay" class="toss-modal flex justify-between modal-adjust z-50">
            <div class="scroll">
                <TossPay @openTossPay="close"></TossPay>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, defineProps, onMounted, defineEmits } from 'vue';
    import Button from "@/components/Button";
    import PurchaseModal from "@/components/Modal/purchase-modal.vue";
    import TossPay from "@/components/Pay/tosspayments-module.vue";
    import "@/components/Pay/style.css";
    import {useRoute, useRouter} from 'vue-router';
    import { useStore } from 'vuex';

    const route = useRoute();
    const store = useStore();
    const userState = store.getters['auth/isAuthenticated'];
    const product = computed(() => store.getters.selectedProduct || {});
    const formattedPrice = computed(() => product.value.price ? product.value.price.toLocaleString() : '');
    const formattedDiscountedPrice = computed(() => store.getters.discountedPrice ? store.getters.discountedPrice.toLocaleString() : '');

    const emit = defineEmits(['openPurchaseModal']);

    const isOpen = ref(false);
    const openModal = () => {
        if (!userState) {
            alert("로그인 후 이용할 수 있습니다.");
            return;
        }
        isOpen.value = true;
        emit('openPurchaseModal', isOpen.value);
    };

    const updateModal = (value) => {
        isOpen.value = value;
        emit('openPurchaseModal', isOpen.value);
    };

    const showTossPay = ref(false);

    function handleOpenTossPay() {
        showTossPay.value = true; 
    }

    function close() {
        showTossPay.value = false; 
    }

    const quantity = ref(1);
    const reviews = ref([]);
    const reviewSummary = ref("");

    const formatDate = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleDateString();
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/broadcast/review`, {
                params: {
                    productSeq: product.value.productSeq 
                }
            });
            reviews.value = response.data.map(review => ({
                ...review,
                reviewTime: formatDate(review.reviewTime)
            })); 

        } catch (error) {

        }
    };

    const fetchReviewSummary = async (productSeq) => {
        try {
            const response = await axios.post(
                "/review/summarize",
                null,
                {
                    params: { productSeq: productSeq },
                }
            );
            reviewSummary.value = response.data;
        } catch (error) {

            reviewSummary.value = "리뷰가 없습니다";
        }
    };


    onMounted(() => {
        if (!product.value || !product.value.price) {

            return;
        }

        fetchReviews();
        fetchReviewSummary(product.value.productSeq);
    });

</script>

<script>
    import Card from "@/components/Card";
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
    import axios from "@/axios";
    
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
                        title: '리뷰',
                    },
                ],
                reviews: {
                    userNm: '',
                    reviewTime: '',
                    productSeq: 0,
                    userUuid:''
                }
          
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
    word-break: break-all;
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
    display: flex; 
    flex-direction: column;
    max-height: 100%; 
    overflow-y: auto; 
}

.toss-modal {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex; 
    flex-direction: column;
    max-height: 100%; 
    overflow-y: auto;
    background: white;
    overflow-x: hidden;
    width: 100%
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

.product-img {
    width: 70%;
    height: auto;
}
</style>