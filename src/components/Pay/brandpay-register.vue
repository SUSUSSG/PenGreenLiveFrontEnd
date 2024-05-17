<template>
    <div class="brandpay-wrap">
        <!-- <button @click="getBrandPayMethods" class="" style="color: rgb(107, 118, 132);">결제수단 관리</button> -->
        <div id="payment-methods-widget"></div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import "@/components/Pay/style.css";

const clientKey = "test_ck_vZnjEJeQVxangqX9pAnMrPmOoBN0";
const customerKey = 'CUSTOMER_KEY';
let brandpay = ref(null);

onMounted(async () => {
  try {
    await loadTossPaymentsSDK();
    brandpay.value = window.BrandPay(clientKey, customerKey, {
      redirectUrl: 'http://localhost:8090/api/brandpay/callback-auth',
    });

    const paymentMethodsWidget = brandpay.value.createPaymentMethodsWidget({ amount: 1 });

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
        installmentMinimumAmount: {
            visible: false,
        }
      },
    });
  } catch (error) {
    console.error('BrandPay 라이브러리 로드 실패', error);
  }
});

async function getBrandPayMethods() {
  const submittedData = ref(null);
  const ls = brandpay.value.BrandPayMethod(cards);

  console.log(ls);

  try {
    const response = await axios.get('/api/brandpay/access-token', {
      headers: header
    });
    submittedData.value = response.data;
    console.log('결과', submittedData.value);
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

</script>
