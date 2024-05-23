<template>
    <div class="brandpay-wrap w-full h-full">
        <!-- <button @click="getBrandPayMethods" class="" style="color: rgb(107, 118, 132);">결제수단 관리</button> -->
        <div id="payment-methods-widget"></div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, defineEmits, computed} from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import "@/components/Pay/style.css";

const store = useStore();
const clientKey = "test_ck_vZnjEJeQVxangqX9pAnMrPmOoBN0";
let customerKey;
const user = ref(null);

function checkLoginStatus() {
  const storedUser = sessionStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
    customerKey = user.value.userUuid;
  }
}


let brandpay = ref(null);
let paymentMethodsWidget;
const product = computed(()=> (store.getters.selectedProduct)).value;
const order = computed(()=> (store.getters.orderForm)).value;

const emit = defineEmits(['paymentRequested']);

onMounted(async () => {
  try {
    checkLoginStatus();
    await loadTossPaymentsSDK();
    brandpay.value = window.BrandPay(clientKey, customerKey, {
      redirectUrl: 'http://localhost:8090/api/brandpay/callback-auth',
    });

    const totalAmount = order.orderPayedPrice ? order.orderPayedPrice : 1;
    paymentMethodsWidget = brandpay.value.createPaymentMethodsWidget({ amount: totalAmount});
    paymentMethodsWidget.render('#payment-methods-widget', {
      ui: {
        promotionSection: {
          summary: {
            visible: true,
          },
          description: {
            visible: true,
            defaultOpen: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('BrandPay 라이브러리 로드 실패', error);
  }
});

async function getBrandPayMethods() {
  const submittedData = ref(null);
  const ls = brandpay.value.BrandPayMethod(cards);

  try {
    const response = await axios.get('/api/brandpay/access-token', {
      headers: header
    });
    submittedData.value = response.data;
  } catch (error) {
    console.log(error);
  }
}

function loadTossPaymentsSDK() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/brandpay';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}


// 결제 하기
async function handleSubmit() {
    const orderId=  computed(()=> (store.getters.orderForm.orderId)).value;
    const widgetPaymentParams = paymentMethodsWidget.getPaymentParams();
    
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
