<template>
  <div class="wrapper block">
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
  import { ref, onMounted } from 'vue';
  import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
  import "@/components/Pay/style.css";
  import { nanoid } from "nanoid";
  
  const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
  const customerKey = nanoid();
  const amount = ref(50000);
  const paymentWidget = ref(null);
  const paymentMethodWidget = ref(null);
  const inputEnabled = ref(false);
  
  async function requestPayment() {
    try {
      const orderId = nanoid();
      // 서버에 orderId와 amount 저장 로직 필요
      await paymentWidget.value.requestPayment({
        orderId: "20240508",
        orderName: "토스 티셔츠 외 2건",
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
  
  function updateAmount(newAmount) {
    amount.value = newAmount;
    paymentMethodWidget.value.updateAmount(amount.value);
  }
  
  onMounted(async () => {
    paymentWidget.value = await loadPaymentWidget(clientKey, ANONYMOUS);
    paymentMethodWidget.value = paymentWidget.value.renderPaymentMethods("#payment-method", { value: amount.value }, { variantKey: "DEFAULT" });
    paymentWidget.value.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodWidget.value.on("ready", () => {
      inputEnabled.value = true;
    });
  });

</script>