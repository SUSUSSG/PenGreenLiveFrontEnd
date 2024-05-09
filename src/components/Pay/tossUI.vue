<template>
    <div class="consumer-cache-1cchlll w-[375px]">
    <div class="consumer-cache-8z48kx">
        <section class="consumer-cache-bd75t9">
            <div class="p-grid consumer-cache-67e79o">
                <div class="p-grid-col p-grid-col12">
                    <h4 class="typography typography--h6 typography--bold color--grey700 consumer-cache-1cmoblx">결제 방법</h4>
                </div>
            </div>
            <div id="payment-method">
                <div class="p-grid consumer-cache-67e79o">
                    <template v-for="method in paymentMethods">
                        <div class="p-grid-col p-grid-col6">
                            <button :class="['p-button p-button--default p-button--block p-button--fill p-button--large p-button--has-icon padding--l consumer-cache-1jf8qw4', {selected: selectedMethod === method.key}]" @click="selectMethod(method.key)">
                                <span v-if="method.icon" class="icon p-icon p-button__icon" aria-hidden="false" role="presentation" style="height: 42px; width: 80px; min-width: 22px; padding: 2px 0px;">
                                    <img :src="method.icon" />
                                </span>
                                {{ method.label }}
                            </button>
                        </div>
                    </template>
                </div>
            </div>

            <div class="consumer-cache-tlrnqy"></div>
            <div class="p-grid consumer-cache-pypvcf">
                <div class="p-grid-col p-grid-col12">
                    <div class="consumer-cache-1emeqpj">
                        <span class="typography typography--p typography--regular color--grey700 consumer-cache-128nlh6"></span>
                        <button class="reset-button radius--s typography--p typography--medium p-text-button p-text-button--grey p-text-button--normal consumer-cache-128nlh6" type="button">
                            <span class="typography typography--p typography--regular color--grey700 consumer-cache-128nlh6">신용카드 무이자 할부 안내 ></span>
                        </button>
                    </div>
                </div>
            </div>
            <div id="agreement"></div>
            <button @click="requestPayment" class="button" id="payment-button" style="margin-top: 30px">결제하기</button>
            </section>
            <div id="tds-pc__portal-container">
                <div class="p-toast-container p-toast-container--top"></div>
                <div class="p-toast-container p-toast-container--bottom"></div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import "@/components/Pay/style.css";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid();
const amount = ref(50000);
const paymentWidget = ref(null);
const paymentMethodWidget = ref(null);
const inputEnabled = ref(false);
const selectedMethod = ref(null);
const paymentMethods = [
  { key: 'credit', method:'카드', label: '신용·체크카드' },
  { key: 'npay', method:'간편결제', provider: '네이버페이', icon: '/src/assets/images/svg/pay/npay.svg'},
  { key: 'kakaopay', method:'간편결제', provider: '카카오페이', icon: '/src/assets/images/svg/pay/kakaopay.svg'},
  { key: 'tosspay', method:'간편결제', provider: '토스페이', icon: '/src/assets/images/svg/pay/tosspay.svg'},
  { key: 'account_transfer', method:'계좌이체', label: '계좌이체'},
  { key: 'samsungpay', method:'간편결제', provider: '삼성페이', icon: '/src/assets/images/svg/pay/samsungpay.svg'},
  { key: 'ssgpay', method:'간편결제', provider: 'SSG페이', icon: '/src/assets/images/svg/pay/ssgpay.svg'}
];

function selectMethod(method) {
  selectedMethod.value = method;
}

const tossPayments = ref(null);
onMounted(() => {
  loadTossPaymentsSDK().then(() => {
    tossPayments.value = TossPayments(clientKey);
  });
});

function loadTossPaymentsSDK() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/payment';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function requestPayment() {
  try {
    let paymentData = {
      type: 'NORMAL',  // 기본적으로 NORMAL 타입을 사용
      method: selectedMethod.value.method,
    };

    if (selectedMethod.value.method === '간편결제' && selectedMethod.value.provider) {
      paymentData.easyPay = { provider: selectedMethod.value.provider };
    }

    paymentMethodWidget.value = paymentData;

    // 결제 요청
    await paymentWidget.value.requestPayment({
        amount:15000,
        orderId: "20240508",
        orderName: "토스 티셔츠 외 2건",
        customerName: "김토스",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
    });
  } catch (error) {
    console.error('Payment request failed:', error);
  }
}

onMounted(async () => {
  paymentWidget.value = await loadPaymentWidget(clientKey, ANONYMOUS);
  // paymentMethodWidget.value.on("ready", () => {
  //   inputEnabled.value = true;
  // });
});
</script>


<style scoped>
.consumer-cache-1cchlll {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    padding: 0px;
}

.consumer-cache-8z48kx {
    flex: 1 1 0%;
    background-color: white;
}

.consumer-cache-bd75t9 {
    -webkit-box-align: stretch;
    align-items: stretch;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    padding: 24px;
}

.consumer-cache-67e79o {
    margin: -4px;
    padding: 0px;
}

.p-grid {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-right: -24px;
    margin-right: calc(var(--pGridGutter)* -1);
}

.consumer-cache-67e79o > .p-grid-col {
    padding: 4px;
}

.p-grid-col12 {
    flex: 0 0 100%;
    max-width: 100%;
}

.consumer-cache-1cmoblx {
    font-size: 20px;
    font-weight: 700;
    color: rgb(51, 61, 75);
}

.consumer-cache-bd75t9 > :not(style) ~ :not(style) {
    margin-top: 8px;
}

.consumer-cache-67e79o {
    margin: -4px;
    padding: 0px;
}

.consumer-cache-67e79o > .p-grid-col {
    padding: 4px;
    height: 100%;
}

.consumer-cache-pypvcf {
    margin: -10px;
    padding: 0px;
}

.consumer-cache-pypvcf > .p-grid-col {
    padding: 10px;
}

.p-grid-col6 {
    flex: 0 0 50%;
    max-width: 50%;
}

.p-grid-col {
    flex-grow: 1;
    padding-right: 24px;
}

.consumer-cache-1jf8qw4.selected {
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(25, 31, 40);
    font-weight: 700;
    color: rgb(25, 31, 40);
}

.tds-pc.badge--large, .tds-pc.badge--medium {
    border-radius: 10px;
}

.tds-pc.badge--medium {
    padding: 3px 7px;
    font-size: 12px;
    line-height: 15px;
}

.tds-pc.badge {
    display: inline-block;
    font-weight: 700;
}

.consumer-cache-1icfadm {
    border: 1px solid rgb(240, 68, 82);
    position: absolute;
    top: -8px;
    left: -4px;
    color: rgb(255, 255, 255) !important;
    background-color: rgb(240, 68, 82) !important;
}

[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
    cursor: pointer;
}

.p-button--large.p-button--has-icon, .p-button--large.p-button--has-icon.p-button--has-loader, .p-button--large.p-button--has-right.p-button--has-loader {
    padding: 11px 22px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-button--large, .p-button--xlarge {
    --btn-addon-margin: 8px;
}

 .p-button--large {
    line-height: 26px;
}

.consumer-cache-1jf8qw4 {
    position: relative;
    height: 56px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(229, 232, 235);
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    color: rgb(51, 61, 75);
}

.p-button--large .p-button__icon:not(.p-button__left):not(.p-button__right) {
    margin: 0 -9px;
}

.p-button__icon:not(.p-button__left):not(.p-button__right) {
    margin: 0 -5px;
}

.icon.p-icon {
    font-size: inherit;
}
.p-button .p-button__icon {
    box-sizing: content-box;
    color: #8b95a1;
    color: var(--grey500);
}
.icon, .svg-icon {
    width: 24px;
    height: 24px;
}

.icon {
    font-size: 24px;
    display: -webkit-inline-box;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}
.p-icon {
    display: inline-block;
    line-height: 0;
}

.p-icon > img {
    width: 100%;
    height: 100%;
}
svg {
    overflow: hidden;
}
img, svg {
    vertical-align: middle;
}

*, :after, :before {
    box-sizing: border-box;
}

.consumer-cache-1emeqpj {
    -webkit-box-align: stretch;
    align-items: stretch;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
}

.consumer-cache-128nlh6 {
    font-size: 13px;
}

.typography--regular {
    font-weight: 400;
}

.payment-widget-cache-1wfyq9i {
    padding: -24px;
    padding-top: 24px;
}

</style>