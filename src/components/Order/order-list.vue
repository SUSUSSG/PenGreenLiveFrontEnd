<template>
    <div style="background-color: white;">
                <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    <div class="group flex items-center" style="display: flex !important">
                        <div class="flex-row-wrapper w-full pl-6 pr-6 pt-3 pb-3">
                            <h6 class="deliveryStatus mb-2">{{ deliveryStatus }}</h6>
                            <div class="content-wrapper flex w-full justify-end">
                                <img class="productImgUrl" :src="productImgUrl" alt="Image" />
                                <div class="ml-4 product-wrapper flex-shrink">
                                    <div class="orderdate">{{ orderDate }}</div>
                                    <div class="productname mb-2">{{ productName }}</div>
                                    <div class="price">{{ price }}</div>
                                </div>
                                <div class="ml-auto">

                                    <Modal title="리뷰작성" label="리뷰작성"
                                        labelClass="btn inline-flex justify-center btn-outline-dark btn-sm"
                                        ref="modal1">
                                        <div class="text-base text-slate-600 dark:text-slate-300">
                                            <div class="content-wrapper flex w-full mb-3">
                                                <img class="productImgUrl" :src="productImgUrl" alt="Image" />
                                                <div class="ml-4 product-wrapper flex-shrink">
                                                    <div class="orderdate">{{ orderDate }}</div>
                                                    <div class="productname mb-2">{{ productName }}</div>
                                                    <div class="price">{{ price }}</div>
                                                </div>
                                            </div>
                                            <div data-v-e1812f16="" class="card-text h-full">
                                                <div class="space-y-3">
                                                    <div class="fromGroup relative"><label
                                                            class="ltr:inline-block rtl:block  input-label"
                                                            for="pn4">내용</label>
                                                        <div class="relative"><textarea name="pn4"
                                                                placeholder="리뷰를 작성해주세요"
                                                                class="classinput input-control block w-full focus:outline-none pt-3"
                                                                id="pn4" rows="3"></textarea>
                                                            <div
                                                                class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <template v-slot:footer>
                                            <Button text="등록" btnClass="btn-outline-dark btn-sm"
                                                @click="$refs.modal1.closeModal()" />
                                            <Button text="닫기" btnClass="btn-dark btn-sm"
                                                @click="$refs.modal1.closeModal()" />
                                        </template>

                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanel } from "@headlessui/vue";
import { withDefaults, defineProps, ref } from 'vue';
import Modal from "../Modal/Modal.vue";
import Button from "@/components/Button/index.vue"

const props = withDefaults(defineProps < {
    deliveryStatus: string;
    productImgUrl: string;
    orderDate: string; 
    productName: string;
    price: number;
} > (), {
    deliveryStatus: 'default-status',
    productImgUrl: 'default-img-url',
    orderDate: new Date().toISOString(), 
    productName: 'default-product',
    price: 0,
});
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
  