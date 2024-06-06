<template>
  <div class="brandpay-pv0zzq">
    <button type="button" aria-label="이전 결제수단으로" class="brandpay-1975zxp">
      <span class="m-icon svg-icon-wrapper m-icon--type-default">
        <img class="svg-icon-fallback" role="presentation" src="https://static.toss.im/icons/svg/icon-arrow-left-small.svg">
      </span>
    </button>
    <div class="brandpay-1b7215l">
      <div class="brandpay-12j0t1">
        <ul class="brandpay-wxffyt">
          <li 
            v-for="(item, index) in cards" 
            :key="index" 
            :class="{'brandpay-37ztg0': true, 'selected': selectedIndex === index}"
            @click="selectCard(index)"
          >
            <PaymentMethodItem :cardItem="item" :index="index" />
          </li>
        </ul>
      </div>
    </div>
    <button type="button" aria-label="다음 결제수단으로" class="brandpay-f14cnb">
      <span class="m-icon svg-icon-wrapper m-icon--type-default">
        <img class="svg-icon-fallback" role="presentation" src="https://static.toss.im/icons/svg/icon-arrow-right-small.svg">
      </span>
    </button>
  </div>
</template>
  
<script setup>
import { ref, onMounted, defineProps, defineEmits, computed} from 'vue';
import axios from "@/axios";
import { nanoid } from "nanoid"; 
import { useStore } from 'vuex';
import PaymentMethodItem from "@/components/Pay/payment-method-item";

const store = useStore();
const clientKey = "test_ck_vZnjEJeQVxangqX9pAnMrPmOoBN0";
const customerKey = computed(() => store.getters['auth/userUUID']);
const cards = ref([]);

let brandpay = ref(null);
const product = computed(()=> (store.getters.selectedProduct)).value;
const order = computed(()=> (store.getters.orderForm)).value;
const totalAmount =ref(0);

const selectedIndex = ref(null);
const selectCard = (index) => {
  selectedIndex.value = index;
};

const emit = defineEmits(['paymentRequested']);

onMounted(async () => {
  try {
    await loadTossPaymentsSDK();

    brandpay.value = window.BrandPay(clientKey, customerKey.value, {
      redirectUrl: `${import.meta.env.VITE_API_BASE_URL}/brandpay/callback-auth`,
    });
    
    getBrandPayMethods();
    totalAmount.value = order.orderPayedPrice ? order.orderPayedPrice : 1;
  } catch (error) {
    console.error('BrandPay 라이브러리 로드 실패', error);
  }
});

function loadTossPaymentsSDK() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/brandpay';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function getBrandPayMethods() {
    try {
      const result = await brandpay.value.getPaymentMethods();
      const cardsData = result.cards; 
      if (cardsData && cardsData.length > 0) {
        cards.value = cardsData;
      } else {
        console.error('카드 정보가 없습니다.');
      }
    } catch (error) {
      console.error('BrandPay 메서드를 가져오는 중 오류 발생:', error);
    }
  }


// 결제 하기
async function handleSubmit() {
    const orderId=  computed(()=> (store.getters.orderForm.orderId)).value;
    const widgetPaymentParams = {"amount": totalAmount.value, "methodId": cards.value[selectedIndex.value].id, "useCardPoint": false};
    localStorage.setItem(orderId, JSON.stringify(order));

    await brandpay.value.requestPayment({
        orderId: orderId,
        orderName: product.productName,
        successUrl: window.location.origin + '/brandpay/success',
        failUrl: window.location.origin + '/brandpay/fail',
        ...widgetPaymentParams,
    });
    emit('paymentRequested');
}

defineExpose({
    handleSubmit
});

</script>

<style scoped>
.brandpay-pv0zzq {
    position: relative;
    padding-top: 16px;
    padding-bottom: 8px;
}

.brandpay-1975zxp {
    background: none;
    border: 0px;
    outline: none;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    padding: 8px;
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
    z-index: 50;
    cursor: pointer;
    width: calc(50% - 138px);
}

.brandpay-f14cnb {
    background: none;
    border: 0px;
    outline: none;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 100%;
    padding: 8px;
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    align-items: center;
    z-index: 50;
    cursor: pointer;
    width: calc(50% - 138px);
}

[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
    cursor: pointer;
}

.svg-icon-wrapper {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
}

.brandpay-37ztg0 {
    min-width: 260px;
    width: 260px;
    padding: 0px;
    margin-right: 8px;
    margin-left: 8px;
}

.brandpay-wxffyt {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    transform: translateX(0px);
    transition: transform 0.3s ease 0s;
    margin: 0px;
    margin-block: 0px;
    padding-inline-start: 0px;
    padding-left: 0px;
    list-style: none;
}

.brandpay-12j0t1 {
    width: 276px;
    margin: 0px auto;
    opacity: 1;
    transition: opacity 0.3s ease 0s;
}

.brandpay-1b7215l {
    max-width: 814px;
    margin: 0px auto;
    overflow: hidden;
}
</style>