<template>
  <div class="wrapper block">
    <div class="modal-handle-area w-full h-[2rem] flex justify-center items-center" @click="triggerTossPay">
        <span class="modal-handle">
          <img src="/src/assets/images/svg/down.svg"/>
        </span>
    </div>
    <div class="box_section">
      <!-- 결제 UI -->
      <div id="payment-method">
        
      </div>
      <!-- 이용약관 UI -->
      <div id="agreement"></div>
      <!-- 결제하기 버튼 -->
      <button :disabled="!inputEnabled" @click="requestPayment" class="button" id="payment-button" style="margin-top: 30px">결제하기</button>
    </div>
  </div>
</template>
  
<script setup>
  import { ref, onMounted, defineProps } from 'vue';
  import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
  import "@/components/Pay/style.css";
  import { nanoid } from "nanoid";
  
  const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
  const customerKey = nanoid();
  const paymentWidget = ref(null);
  const paymentMethodWidget = ref(null);
  const inputEnabled = ref(false);
  const emit = defineEmits(['openTossPay']);

  function triggerTossPay() {
    emit('openTossPay'); 
  }

  const props = defineProps({
    productName: String,
    totalPrice: String,
  });
  
  async function requestPayment() {
    try {
      await paymentWidget.value.requestPayment({
        orderId: nanoid(),
        orderName: props.productName,
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        customerMobilePhone: "01012341234",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  onMounted(async () => {
    paymentWidget.value = await loadPaymentWidget(clientKey, ANONYMOUS);
    paymentMethodWidget.value = paymentWidget.value.renderPaymentMethods("#payment-method", { value: props.totalPrice }, { variantKey: "DEFAULT" });
    paymentWidget.value.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodWidget.value.on("ready", () => {
      inputEnabled.value = true;
    });
  });

</script>