<template>
  <!-- 결제 성공 시 -->
  <section class="h-[80vh] flex flex-col justify-center" v-if="confirmed">
    <div class="box_section py-[10rem] flex flex-col " style="width: 550px">
      <div class="w-full pb-[1rem] flex justify-center items-stretchs">
        <img style="width: 75px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
      </div>
      <h6 class="w-full">결제를 완료했어요</h6>

      <div class="w-full flex flex-col">
        <div class="p-grid typography--p" style="margin-top: 50px">
          <div class="p-grid-col text--left"><b>구매상품</b></div>
          <div class="p-grid-col text--right" id="amount">{{ totalAmount }}원</div>
        </div>
        <div class="p-grid typography--p" style="margin-top: 10px">
          <div class="p-grid-col text--left"><b>주문번호</b></div>
          <div class="p-grid-col text--right" id="orderId">{{ jsonData.orderId }}</div>
        </div>
        </div>
      <div class="w-full mt-10">
        <Button @click="goBack">돌아가기</Button>
      </div>
    </div>
  </section>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Button from '@/components/Button';
import { format } from 'date-fns';

import "@/components/Pay/style.css";

const user = ref(null);
const route = useRoute();
const router = useRouter();
const confirmed = ref(false);
const jsonData = ref({});
const submittedData = ref(null);
const totalAmount = ref(null);

// 결제 검증
async function verifyPayment(requestData) {
  try {
    const response = await axios.post("/api/payments/verify", requestData);
    console.log("검증 결과 ", response.data);
    if (response.data === "denied") {
      router.push(`/fail?message=Payment verification failed&code=401`);
    }
    submittedData.value = response.data;
    return true;
  } catch (error) {
    console.error('Verification failed:', error);
    router.push(`/fail?message=${error.message}&code=${error.response.status}`);
    return false;
  }
}

// 결제 승인 요청
async function confirmPayment(requestData) {
  try {
    const response = await axios.post('/api/brandpay/confirm', requestData, {
      headers: { "Content-Type": "application/json",  }
    });
    if (response.status === 200) {
      confirmed.value = true;
      jsonData.value = response.data;
      totalAmount.value = response.data.totalAmount.toLocaleString();

      const approvedAt = new Date(response.data.approvedAt);
      const formattedApprovedAt = format(approvedAt, "yyyy-MM-dd'T'HH:mm:ss");
      const orderResponse = {
        orderDate: formattedApprovedAt,
        orderPayment: response.data.method,
      };

      let orderForm = JSON.parse(localStorage.getItem(response.data.orderId));
      orderForm = {...orderForm, ...orderResponse, ...{userUUID:user.value.uuid}};

      await saveOrder(orderForm);

      console.log('Payment confirmed:', jsonData.value);
    } else {
      console.log(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error('결제 승인 실패:', error);
    router.push(`/fail?message=${error.response.data.message}&code=${error.response.status}`);
  }
}

async function saveOrder(paymentData) {
  try {
    const orderResponse = await axios.post('/api/order', paymentData, {
      headers: { "Content-Type": "application/json" }
    });
    if (orderResponse.status === 200) {
      console.log('Order saved successfully:', orderResponse.data);
      localStorage.removeItem(paymentData.orderId);
    } else {
      console.log(`Unexpected status code: ${orderResponse.status}`);
    }
  } catch (error) {
    console.error('Order saving failed:', error);
    router.push(`/fail?message=${error.response.data.message}&code=${error.response.status}`);
  }
}

function goBack() {
  router.push('/');
};

onMounted(async () => {
  const storedUser = sessionStorage.getItem('user');
  let customerKey;

  if (storedUser) {
    user.value = JSON.parse(storedUser);
    customerKey = user.value.uuid;
  }
  const { orderId, amount, paymentKey } = route.query;

  if (!orderId || !amount || !paymentKey) {
    console.error('Missing query parameters:', { orderId, amount, paymentKey, customerKey });
    return;
  }
  
  const requestData = { orderId, amount, paymentKey, customerKey };
  console.log("brandpay success ", requestData);

  if (await verifyPayment(requestData)) {
    await confirmPayment(requestData);
  }
});
</script>
