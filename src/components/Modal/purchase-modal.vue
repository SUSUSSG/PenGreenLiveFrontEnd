<template>
  <div class="purchase-modal-content w-[100%] h-[100%] bg-white">
    <div class="purchase-wrap px-[20px]">
      <div class="modal-handle-area w-full h-[2.5rem] flex justify-center items-center" @click="close">
        <span class="modal-handle mt-[1rem]">
          <img src="/src/assets/images/svg/down.svg"/>
        </span>
      </div>
      <div id="option-view" class="buy-options__view">
          <div class="buy-options__item-area">
            <div class="buy-options__goods-item">
              <div class="goods-item__head">
                  <span class="goods-item__title" id="product-name">
                    {{product.productName}}
                  </span>
              </div>
            <div class="goods-item__contents">
                <div class="count-group">
                    <button class="btn-count minus" @click="decreaseQuantity">
                        <span class="oyblind">수량감소</span>
                    </button>
                    <input type="text" class="input-num" v-model="quantity">
                    <button class="btn-count plus" @click="increaseQuantity">
                        <span class="oyblind">수량증가</span>
                    </button>
                </div>
                <span class="price" id="discounted-price">
                  <span>{{ formattedDiscountedPrice }}</span><span class="unit">원</span>
                </span>
            </div>
            </div>
          </div>
        </div>
      <div class="total-summary">
        <span class="total-summary__goods-sum">
          구매수량<span id="total-count" class="count">{{ quantity }}</span>개
        </span>
          <span class="total-summary__price-sum">
          총<span id="total-price" class="price">{{ formattedTotalPrice }}</span>원
        </span>
      </div>
      <div id="today-delivery" class="today-delivery is-checked" style="display: block;">
        <div id="today-delivery-address-box" class="today-delivery__address-box">
            <div class="address-info">
                <p class="address-info__head">
                    <span class="flag">기본배송지</span>
                </p>
                <p class="address-info__contents" id="address" >{{ address }}</p>
            </div>
            <button type="button" class="btn-text">변경</button>
        </div>
      </div>
    </div>
    <div class="w-full p-[20px]">
      <Button class="order-button w-full" @click="triggerTossPay">눌러서 구매하기</Button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, defineProps, defineEmits } from 'vue';
import Button from "@/components/Button";
import { useStore } from 'vuex';
import axios from '@/axios';

onMounted(() => {
    getAddress();
});

const store = useStore();
const emit = defineEmits(['update:isOpen', 'openTossPay']);
const product = computed(() => store.getters.selectedProduct || {});

const address = ref(null);

async function getAddress() {
  try {
    const response = await axios.get(`/user/address`);
    if (response.data) {
      address.value = response.data;
    } else {
      address.value = null;
    } 
  } catch(error) {

  }
}

const close = () => {
  emit('update:isOpen', false);
};

function triggerTossPay() {
  store.commit('updateQuantity', quantity.value);
  store.commit('updateTotalAmount', totalPrice.value);

  emit('openTossPay'); 
}

const props = defineProps({
  isOpen: Boolean,
  activatePayPopup: Boolean,
});

const quantity = ref(1);
const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const formattedDiscountedPrice = computed(() => store.getters.discountedPrice.toLocaleString());
const totalPrice = computed(() => (store.getters.discountedPrice * quantity.value));
const formattedTotalPrice = computed(() => totalPrice.value.toLocaleString());

</script>

<style scoped>

.purchase-modal-content {
  border-radius: 16px 16px 0 0;
}

.modal-handle {
  display: block;
  width: 40px;
  height: 6px;
  background-color: #fff;  
  border-radius: 3px;

  /* display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 30px;
  
  border-radius: 18px 18px 0 0; */
}

/* 구매 정보 */
.buy-options__view {
    overflow-y: auto;
    overscroll-behavior: contain;
    max-height: 303px;
    margin-top: -10px;
}

.buy-options__view .buy-options__item-area .buy-options__goods-item:first-child {
    margin-top: 5px;
    border-top: 0;
}

.buy-options__view .buy-options__item-area .buy-options__goods-item {
    padding: 20px 0;
    border-top: 1px solid #f0f1f4;
}

.buy-options__view .goods-item__head {
    position: relative;
    margin-top: -1px;
    margin-bottom: 11px;
    padding-right: 24px;
    line-height: 0;
    letter-spacing: 0;
    word-spacing: 0;
}

.buy-options__view .goods-item__head .goods-item__title {
    color: #131518;
    font-size: 14px;
    line-height: 17px;
}

.buy-options__view .goods-item__contents {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.count-group {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
}

.count-group .btn-count.minus {
    border-radius: 4px 0 0 4px;
}

.count-group .btn-count:before {
    position: absolute;
    left: 11px;
    top: 13px;
    width: 9px;
    height: 1px;
    background-color: #50585f;
    content: "";
}

.oyblind {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    clip: rect(0 0 0 0);
    width: 0;
    height: 0;
    margin: -1px;
    padding: 0;
    border: 0;
}

.count-group .input-num {
    flex: 0 0 32px;
    width: 34px;
    height: 30px;
    margin: 0 -1px;
    padding: 0 4px;
    border: 1px solid #e5e7ea;
    border-radius: 0;
    font-size: 11px;
    text-align: center;
    line-height: 28px;
}

.count-group .btn-count.plus {
    border-radius: 0 4px 4px 0;
}

.count-group .btn-count {
    flex: 0 0 32px;
    position: relative;
    width: 32px;
    height: 30px;
    background: #fff;
    border: 1px solid #e5e7ea;
}

.count-group .btn-count.plus:after {
    position: absolute;
    left: 15px;
    top: 9px;
    width: 1px;
    height: 9px;
    background-color: #50585f;
    content: "";
}

.buy-options__view .goods-item__contents .price {
    flex: 0 0 auto;
    margin-right: 2px;
    color: #131518;
    line-height: 0;
}

.buy-options__view .goods-item__contents .price span:not(.unit) {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: .5px;
}

.buy-options__view .goods-item__contents .price span {
    line-height: 17px;
}

.buy-options__view .goods-item__contents .price span {
    line-height: 17px;
}

/* 총 구매 */
.total-summary {
    display: flex;
    justify-content: space-between;
    min-height: 61px;
    padding: 20.5px 0;
    border-top: 1px solid #f0f1f4;
}

.total-summary .total-summary__goods-sum {
    margin-top: 1px;
    color: #131518;
    font-size: 14px;
    line-height: 17px;
}

.total-summary .total-summary__goods-sum .count {
    display: inline-block;
    margin-left: 5px;
    font-weight: 600;
}

.total-summary .total-summary__price-sum {
    color: #131518;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
}

.total-summary .total-summary__price-sum .price {
    display: inline-block;
    margin-left: 5px;
    font-weight: 600;
}

/* 배송지 구역 */

.today-delivery .today-delivery__address-box {
    display: flex;
    align-items: flex-start;
    position: relative;
    padding-top: 5px;
    border-top: 1px solid #f0f1f4;
}

.today-delivery .today-delivery__address-box .address-info {
    flex-shrink: 1;
    padding-top: 10px;
    padding-right: 5px;
    width: 100%;
    color: #131518;
}

.today-delivery .today-delivery__address-box .address-info .address-info__head {
    display: flex;
    align-items: center;
}

.today-delivery .today-delivery__address-box .address-info .address-info__head .flag {
    height: 18px;
    padding: 1px 6px 0;
    font-size: 11px;
    line-height: 17px;
    letter-spacing: -.3px;
}

.flag:not(ul) {
  display: inline-block;
  overflow: hidden;
  height: 17px;
  margin-right: 4px;
  padding: 1px 4px 0;
  background-color: #f0f1f4;
  border-radius: 2px;
  color: #757d86;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  line-height: 16px;
  letter-spacing: .1px;
}

.today-delivery .today-delivery__address-box .btn-text {
    flex: 0 0 auto;
    padding: 10px 5px 10px 10px;
    background-color: transparent;
    color: #757d86;
    font-size: 13px;
    line-height: 16px;
}

.today-delivery .today-delivery__address-box .address-info .address-info__contents {
    display: -webkit-box;
    overflow: hidden;
    height: 16px;
    margin-top: 8px;
    font-size: 13px;
    line-height: 16px;
    white-space: normal;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    word-break: break-all;
}

</style>
