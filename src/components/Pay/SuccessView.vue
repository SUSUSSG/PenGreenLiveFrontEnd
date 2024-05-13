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
          <div class="p-grid-col text--left"><b>결제금액</b></div>
          <div class="p-grid-col text--right" id="amount">{{ totalPrice }}원</div>
        </div>
        <div class="p-grid typography--p" style="margin-top: 10px">
          <div class="p-grid-col text--left"><b>주문번호</b></div>
          <div class="p-grid-col text--right" id="orderId">{{ jsonData.orderId }}</div>
        </div>
        </div>
      <div class="w-full mt-10">
        <Button>돌아가기</Button>
      </div>
    </div>
  </section>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Button from '@/components/Button';
import "@/components/Pay/style.css";


const route = useRoute();
const router = useRouter();
const confirmed = ref(false);
const jsonData = ref({ orderId: null });
const totalPrice = ref(null);
const submittedData = ref(null);

onMounted(async () => {
  const { orderId, amount, paymentKey } = route.query;

  if (!orderId || !amount || !paymentKey) {
    console.error('Missing query parameters:', { orderId, amount, paymentKey });
    return;
  }

  const requestData = { orderId, amount, paymentKey };
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  try {
    const response = await axios.post('http://localhost:8090/api/payments/confirm', requestData, config);
    if (response.status === 200) {
      confirmed.value = true;
      jsonData.value = response.data;
      totalPrice.value = response.data.totalAmount.toLocaleString();
      console.log('Payment confirmed:', jsonData.value);
    } else {
      console.log(`Received unexpected status code: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error('Payment confirmation failed:', error.response.data);
      router.push(`/fail?message=${error.response.data.message}&code=${error.response.status}`);
    } else {
      console.error('Error sending request:', error.message);
    }
  }
});
</script>
