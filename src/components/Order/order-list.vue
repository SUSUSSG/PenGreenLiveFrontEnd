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
                                            <Button text="닫기" btnClass="btn-outline-dark btn-sm"
                                                @click="$refs.modal1.closeModal()" />
                                            <Button text="등록" btnClass="btn-dark btn-sm"
                                                @click="$refs.modal1.closeModal()" />
                                        </template>

                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    <div class="group flex items-center" style="display: flex !important">
                        <div class="flex-row-wrapper w-full p-10">
                            <h6 class="deliveryStatus mb-2">{{ deliveryStatus }}</h6>
                            <div class="content-wrapper flex w-full justify-end">
                                <img class="productImgUrl" :src="productImgUrl" alt="Image" />
                                <div class="ml-4 product-wrapper flex-shrink">
                                    <div class="orderdate">{{ orderDate }}</div>
                                    <div class="productname mb-2">{{ productName }}</div>
                                    <div class="price">{{ price }}</div>
                                </div>
                                <div class="ml-auto">
                                    <Modal title="리뷰확인" label="리뷰확인"
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
                                                        <div class="relative">
                                                            <textarea name="pn4" 
                                                                class="classinput input-control block w-full focus:outline-none pt-3"
                                                                id="pn4" rows="3" :value="reviewContent" 
                                                                readonly></textarea>
                                                            <div
                                                                class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <template v-slot:footer>
                                            <Button text="삭제" btnClass="btn-outline-dark btn-sm"
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
            </TabPanel>
        </TabGroup>
    </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanel } from "@headlessui/vue";
import { withDefaults, defineProps, ref } from 'vue';
import Modal from "../Modal/Modal.vue";
import Button from "@/components/Button/index.vue"

// Props 정의와 기본값 설정
const props = withDefaults(defineProps < {
    deliveryStatus: string;
    productImgUrl: string;
    orderDate: string; 
    productName: string;
    price: number;
    reviewContent: string;
} > (), {
    deliveryStatus: 'default-status',
    productImgUrl: 'default-img-url',
    orderDate: new Date().toISOString(), 
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

.textarea-readonly {
    background-color: white !important; /* 배경색을 원하는 색상으로 설정 */
    color: black; /* 글자색 설정 */
}

.textarea-readonly::placeholder {
    color: #ccc; /* 플레이스홀더 텍스트 색상 설정 */
}
</style>