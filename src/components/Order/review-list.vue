<template>
  <div style="background-color: white;">
    <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
      <div class="group flex items-center" style="display: flex !important">
        <div class="flex-row-wrapper w-full pl-6 pr-6 pt-3 pb-3">
          <h6 class="deliveryStatus mb-2">{{ deliveryStatus }}</h6>
          <div class="content-wrapper flex w-full justify-end">
            <img class="productImgUrl" :src="productImage" alt="Image" />
            <div class="ml-4 product-wrapper flex-shrink">
              <div class="orderdate">{{ formatDate(orderDate) }}</div>
              <div class="productname mb-2">{{ productNm }}</div>
              <div class="price">{{ formatNumber(orderProductPrice) }}</div>
            </div>
            <div class="ml-auto">
              <Modal title="리뷰확인" label="리뷰확인" labelClass="btn inline-flex justify-center btn-outline-dark btn-sm"
                ref="modal1">
                <div class="text-base text-slate-600 dark:text-slate-300">
                  <div class="content-wrapper flex w-full mb-3">
                    <img class="productImgUrl" :src="productImage" alt="Image" />
                    <div class="ml-4 product-wrapper flex-shrink">
                      <div class="orderdate">{{ formatDate(orderDate) }}</div>
                      <div class="productname mb-2">{{ productNm }}</div>
                      <div class="price">{{ formatNumber(orderProductPrice) }}</div>
                    </div>
                  </div>
                  <div data-v-e1812f16="" class="card-text h-full">
                    <div class="space-y-3">
                      <div class="fromGroup relative"><label class="ltr:inline-block rtl:block  input-label"
                          for="pn4">내용</label>
                        <div class="relative">
                          <textarea name="pn4" class="classinput input-control block w-full focus:outline-none pt-3"
                            id="pn4" rows="3" :value="reviewContent" disabled></textarea>
                          <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <template v-slot:footer>
                  <Button text="삭제" btnClass="btn-dark btn-sm" @click="deleteReview"/>
                  <Button text="닫기" btnClass="btn-dark btn-sm" @click="$refs.modal1.closeModal()" />
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
import axios from "@/axios";
import { defineProps, withDefaults, defineEmits } from 'vue';
import Modal from "../Modal/Modal.vue";
import Button from "@/components/Button/index.vue";

const props = withDefaults(defineProps<{
  deliveryStatus: string;
  productImage: string;
  orderDate: string;
  productNm: string;
  orderProductPrice: number;
  reviewContent: string;
  reviewSeq: number;
  orderSeq: number;
  productSeq: number;
}>(), {
  deliveryStatus: 'default-status',
  productImage: 'default-img-url',
  orderDate: new Date().toISOString(),
  productNm: 'default-product',
  orderProductPrice: 0,
  reviewSeq: 0,
  orderSeq: 0,
  productSeq: 0,
});

const emit = defineEmits(['review-deleted']);

const formatNumber = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const deleteReview = async () => {
  try {

    if (props.reviewSeq === 0) {
      throw new Error('Invalid reviewSeq');
    }
    await axios.delete(`/reviews/${props.reviewSeq}`, {
      params: { productSeq: props.productSeq, orderSeq: props.orderSeq }
    });
    alert('리뷰 삭제가 완료되었습니다.');
    emit('review-deleted', props.reviewSeq);
  } catch (error) {
    alert('리뷰 삭제에 실패했습니다: ' + error.message);
  }
};

</script>

<style scoped>
.productname {
  font-size: 20px;
  margin-bottom: 0.5rem;
}

.orderdate {
  margin-bottom: 0.5rem;
}

.input-control[disabled] {
  background-color: white;
}

.productImgUrl {
  width: 150px;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>
