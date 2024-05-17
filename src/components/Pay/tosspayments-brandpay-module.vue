<template>
    <!-- 결제위젯, 이용약관 영역 -->
    <div id="payment-method"></div>
    <div id="agreement"></div>

    <!-- 결제하기 버튼 -->
    <button @click="handlePayment">결제하기</button>
    <button @click="openSetting">브랜드페이 등록</button>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";

  function openSetting() {
    brandpay.openSettings();
  }

  const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
  const customerKey = 'CUSTOMER_KEY';
  const amount = ref(50000);
  
  let paymentWidget = ref(null);
  let paymentMethodWidget = ref(null)
  
  onMounted(async() => {
    paymentWidget = await loadPaymentWidget(clientKey, customerKey);
    
    PaymentWidget(clientKey, customerKey, {
      brandpay: {
        redirectUrl: 'http://localhost:8090/api/brandpay/callback-auth',
      },
    });

    paymentMethodWidget = paymentWidget.renderPaymentMethods('#payment-method', { value: amount.value }, { variantKey: 'BRANDPAY' });
    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });
  });
  
  
  const handlePayment = () => {
    paymentWidget.requestPayment({
      orderId: 'wtt2zb-and-MvvkgCKct2',
      orderName: '토스 티셔츠 외 2건',
      successUrl: window.location.origin + '/success',
      failUrl: window.location.origin + '/fail',
      customerEmail: 'customer123@gmail.com',
    });
  };
  </script>
  
  <style>
  /* 필요한 스타일을 추가할 수 있습니다 */
  </style>
  