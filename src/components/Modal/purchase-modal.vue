<template>
  <div class="modal-content w-[100%] h-[100%] bg-white">
    <div class="purchase-wrap">
      <div class="modal-handle-area w-full h-[1rem] flex justify-center items-center" @click="close">
        <span class="modal-handle"></span>
      </div>
      <div class="purchase-info">
        <div>
        동구밭 중건성 헤어케어 5종 기획세트
        </div>
        <div class="w-full flex justify-between items-center">
          <div class="quantity-controls h-[30px]">
            <button @click="decreaseQuantity" class="btn-control h-full">-</button>
            <input type="text" v-model="quantity" class="input-number h-full" readonly/>
            <button @click="increaseQuantity" class="btn-control h-full">+</button>
          </div>
          <div class="items-right">33,000원</div>
        </div>
        <div class="address-input w-full flex justify-between items-center">
          <label for="address">서울특별시 관악구 관악로12길 16-37</label>
          <button>변경</button>
        </div>
      </div>
    </div>
    <div class="w-full p-[20px]">
      <button class="order-button w-full">눌러서 구매하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['update:isOpen']);
const close = () => {
  emit('update:isOpen', false);
};

const props = defineProps({
  isOpen: Boolean
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

</script>

<style scoped>

.modal-content {
  border-radius: 16px 16px 0 0;
}

.modal-handle {
  display: block;
  width: 40px;
  height: 6px;
  background-color: #999;
  border-radius: 3px;
}

.purchase-info {
  padding: 20px 15px;
}

.number-input {
  display: flex;
  align-items: center;
  border: 1px solid #333;
  border-radius: 0;
  color: black;
}

.btn-control {
  border: 1px solid #333;
  cursor: pointer;
  user-select: none;
  border-radius: 0; /* 각진 버튼 디자인 */
  transition: background-color 0.3s ease;
}

.btn-control:hover {
  background-color: #ccc;
}

.input-number {
  text-align: center;
  border: none;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  font-size: 15px;
  background-color: white;
  color: black;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
}

.quantity-controls input {
  text-align: center;
  width: 50px;
}

.address-input {
  margin-top: 10px;
}

.order-button {
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  height: 2.5rem;
}

</style>
