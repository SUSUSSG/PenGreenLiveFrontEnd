<template>
  <div class="payment-widget-cache-1dqiwch">
    <div class="payment-widget-cache-154m2av">
      <button class="reset-button radius--s typography--p typography--medium p-text-button p-text-button--grey p-text-button--normal payment-widget-cache-128nlh6" type="button">설정</button>
    </div>
    <div class="payment-widget-cache-1fzox64">
      <ul class="payment-widget-cache-h2p942">
        <li aria-label="결제 수단 카드" class="payment-widget-cache-bs60jk">
          <button @click="registerBrandpay" class="payment-widget-cache-z6jgjv">
            <span class="m-icon svg-icon-wrapper m-icon--type-default" style="width: 40px; height: 40px;">
              <span class="m-icon__inner svg-icon adaptive-grey800-text m-icon__inner--colored" aria-hidden="true" role="presentation" style="width: 40px; height: 40px; color: var(--adaptiveGrey800);">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="line-icon">
                  <path fill="#B0B8C1" d="M20.318 10.8h-7v-7a1.2 1.2 0 10-2.4 0v7h-7a1.2 1.2 0 100 2.4h7v7a1.2 1.2 0 102.4 0v-7h7a1.2 1.2 0 100-2.4" fill-rule="evenodd"></path>
                </svg>
              </span>
              <img class="svg-icon-fallback" role="presentation" src="https://static.toss.im/icons/svg/icon-plus-mono.svg">
            </span>
            <span role="text" class="text adaptive-grey900-text text--word-break typography-t5 text--font-weight-medium text--display-inline-block" style="color: #191f28;">카드·계좌 추가하기</span>
          </button>
        </li>
      </ul>
      <div class="payment-widget-cache-4vurri">
        <div class="payment-widget-cache-b6ggp1">
          <button class="text text--word-break typography-t6 text--display-inline-block text--as payment-widget-cache-1374t42" style="color: rgb(107, 118, 132);">결제수단 관리</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "@/components/Pay/style.css";


const message = ref('Initializing BrandPay...');
const clientKey = 'test_ck_vZnjEJeQVxangqX9pAnMrPmOoBN0'; // 테스트용 클라이언트 키
const customerKey = 'L3suza3pZXq8sx7QZod00'; // 고객의 고유 ID
let brandpay = ref(null);

onMounted(() => {
  loadTossPaymentsSDK().then(() => {
    brandpay = window.BrandPay(clientKey, customerKey, {
      redirectUrl: window.location.origin + '/callback-auth',
    });
    message.value = 'BrandPay Initialized';
    console.log('BrandPay 객체 생성 완료:', brandpay);
  }).catch((error) => {
    message.value = 'BrandPay 라이브러리를 로드할 수 없습니다.';
    console.error('BrandPay 라이브러리를 로드할 수 없습니다.', error);
  });
});

function registerBrandpay() {
  brandpay
  .addPaymentMethod()
  .then(function (methods) {
    // 성공 처리
  })
  .catch(function (error) {
    if (error.code === 'USER_CANCEL') {
      // 사용자가 결제창을 닫은 경우 에러 처리
    }
  });
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

<style scoped>
.payment-widget-cache-1dqiwch {
    -webkit-box-align: stretch;
    align-items: stretch;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    width: 100%;
}

.payment-widget-cache-154m2av {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    height: 52px;
}

.payment-widget-cache-epkrmh {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    flex: 1 1 0%;
}

.payment-widget-cache-1g4uhrk {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    padding-bottom: 4px;
    padding-top: 4px;
    margin-bottom: 0px;
    margin-top: 0px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
}

.payment-widget-cache-hp7hyj:checked {
    padding: 2px;
}
input[type=checkbox], input[type=radio] {
    box-sizing: border-box;
    padding: 0;
}

.payment-widget-cache-hp7hyj {
    appearance: none;
    min-width: 24px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    outline: none;
    box-shadow: rgb(230, 232, 235) 0px 0px 0px 2px inset;
    margin-right: 8px;
}

.payment-widget-cache-hp7hyj:checked::before {
    background: rgb(49, 130, 246);
}

.payment-widget-cache-hp7hyj::before {
    content: "";
    display: block;
    width: 70%;
    height: 70%;
    margin: 15% auto;
    border-radius: 50%;
}
*::after, *::before {
    box-sizing: border-box;
}

.payment-widget-cache-10vnukf {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin-bottom: 0px;
}

.payment-widget-cache-18j9daq {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
}

.payment-widget-cache-kq1vju {
    margin: 0px;
    padding: 0px;
    font-size: var(--tds-desktop-font-size);
    line-height: var(--tds-desktop-line-height);
    font-weight: 600;
    color: rgb(51, 61, 75);
}

[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
    cursor: pointer;
}
.payment-widget-cache-154m2av > :not(style) ~ :not(style) {
    margin-left: 24px;
}
.payment-widget-cache-128nlh6 {
    font-size: 13px;
}
[type=button], [type=reset], [type=submit], button {
    -webkit-appearance: button;
}
.p-text-button--grey {
    color: #6b7684;
}
.p-text-button {
    cursor: pointer;
    font-size: inherit;
    white-space: nowrap;
    text-decoration: none;
    display: inline-flex;
    -webkit-appearance: none;
    transition: background-color .2s ease;
}
.reset-button {
    background: none;
    border: 0;
    padding: 0;
    outline: none;
    cursor: pointer;
}
.typography--medium {
    font-weight: 500;
}
.typography--p {
    font-size: 15px;
}
.typography--h5, .typography--h6, .typography--h7, .typography--p, .typography--sm, .typography--small, .typography--xsmall {
    line-height: 1.6;
}
.radius--s {
    border-radius: 4px;
}

.payment-widget-cache-1fzox64 {
    width: 100%;
    margin-bottom: 16px;
}

.payment-widget-cache-h2p942 {
    margin: 0px;
    margin-block: 0px;
    padding-inline-start: 0px;
    padding-left: 0px;
    list-style: none;
    padding-top: 16px;
    padding-bottom: 8px;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
}

.payment-widget-cache-bs60jk {
    margin: 0px 8px;
    margin-block: 0px;
    padding-inline-start: 0px;
    list-style: none;
    min-width: 260px;
    width: 260px;
    padding: 0px;
}

.payment-widget-cache-z6jgjv {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    height: 166px;
    border: 1px solid #e5e8eb;
    border-radius: 8px;
    background-color: #f2f4f6;
}

.svg-icon.m-icon__inner--colored svg [fill]:not([fill=none]), .svg-icon.m-icon__inner--legacy-colored .line-icon [fill]:not([fill=none]) {
    fill: currentColor;
}

.payment-widget-cache-z6jgjv > :not(style) ~ :not(style) {
    margin-top: 12px;
}

.text--font-weight-medium {
    font-weight: 500;
}

.payment-widget-cache-4vurri {
    -webkit-box-align: stretch;
    align-items: stretch;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin: 0px auto;
    width: 260px;
    max-width: 260px;
}

.payment-widget-cache-b6ggp1 {
    -webkit-box-align: stretch;
    align-items: stretch;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: end;
    justify-content: end;
    margin-bottom: 12px;
}

.badge {
    font-weight: 700;
    border-radius: 10px;
    color: #fff;
    display: -webkit-inline-box;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}

.text {
    color: #191f28;
}

.payment-widget-cache-4vurri > :not(style) ~ :not(style) {
    margin-top: 0px;
}

.font-size--17, .typography-t5 {
    font-size: 17px;
    line-height: 1.5;
}

.text--word-break.text--display-block, .text--word-break.text--display-inline-block {
    max-width: 100%;
}

.text--display-inline-block {
    display: inline-block;
}

.text {
    color: #191f28;
}
.font-size--15, .typography-t6 {
    font-size: 15px;
    line-height: 1.5;
}
.adaptive-grey800-text {
    color: #333d4b;
}

.svg-icon {
    color: #191f28;
    display: inline-block;
}

.svg-icon img, .svg-icon svg {
    display: block;
    width: 100%;
    height: 100%;
}
svg {
    overflow: hidden;
}
img, svg {
    vertical-align: middle;
}


.svg-icon-fallback {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -9999;
    visibility: hidden;
}

.font-size--17, .typography-t5 {
    font-size: 17px;
    line-height: 1.5;
}


.font-size--16, .typography-st10 {
    font-size: 16px;
    line-height: 1.5;
}
</style>
