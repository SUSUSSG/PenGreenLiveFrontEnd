<template>
    <div class="brandpay-wrap w-full h-full">
      <div class="flex justify-end">
        <!-- <Button @click="settingBrandpay">결제 수단 관리</Button> -->
        <Button @click="settingBrandpay">설정</Button>
      </div>
      <ul class="card-wrap">
        <li class="brandpay-37ztg0">
          <div class="brandpay-1enn31n" @click="addPaymentMethod">
            <span class="m-icon svg-icon-wrapper m-icon--type-default" style="width: 40px; height: 40px;">
              <span class="m-icon__inner svg-icon adaptive-grey800-text m-icon__inner--colored" aria-hidden="true" role="presentation" style="width: 40px; height: 40px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="line-icon">
                  <path fill="#B0B8C1" d="M20.318 10.8h-7v-7a1.2 1.2 0 10-2.4 0v7h-7a1.2 1.2 0 100 2.4h7v7a1.2 1.2 0 102.4 0v-7h7a1.2 1.2 0 100-2.4" fill-rule="evenodd"></path>
                </svg>
              </span>
              <img class="svg-icon-fallback" role="presentation" src="https://static.toss.im/icons/svg/icon-plus-mono.svg">
            </span>
            <span role="text" class="text adaptive-grey900-text text--word-break typography-t5 text--font-weight-medium text--display-inline-block" style="color: #191f28;">카드·계좌 추가하기</span>
          </div>
        </li>
      
        <li v-for="(item, index) in cards" class="brandpay-37ztg0">
            <PaymentMethodItem :cardItem="item" />
        </li>
      </ul>
    </div>
  </template>
  
<script setup>
import { ref, onMounted, defineProps, defineEmits, computed} from 'vue';
import axios from "@/axios";
import { useStore } from 'vuex';
import Button from "@/components/Button";
import { useToast } from "vue-toastification";
import PaymentMethodItem from "@/components/Pay/payment-method-item";

const toast = useToast();


const store = useStore();
const clientKey = "test_ck_vZnjEJeQVxangqX9pAnMrPmOoBN0";
const customerKey = computed(() => store.getters['auth/userUUID']);
let brandpay = ref(null);
let paymentMethodsWidget;
const cards = ref([]);

onMounted(async () => {
try {
    await loadTossPaymentsSDK();
    brandpay.value = window.BrandPay(clientKey, customerKey.value, {
    redirectUrl: `${import.meta.env.VITE_API_BASE_URL}/brandpay/callback-auth`,
    });
    await getBrandPayMethods();
} catch (error) {
    console.error('BrandPay 라이브러리 로드 실패', error);
}
});

async function addPaymentMethod() {
brandpay.value.addPaymentMethod()
.then(function (methods) {
    toast.success("카드가 등록되었습니다.");
    window.location.reload();
})
.catch(function (error) {
    if (error.code === 'USER_CANCEL') {
        console.log("카드 등록 취소");
    }
})
}

function setupOneTouchPay() {
brandpay.value.setupOneTouchPay();
}

async function getBrandPayMethods() {
try {
    const result = await brandpay.value.getPaymentMethods();
    const cardsData = result.cards; 
    if (cardsData && cardsData.length > 0) {
    cards.value = cardsData;
    console.log(cardsData);
    } else {
    console.error('카드 정보가 없습니다.');
    }
} catch (error) {
    console.error('BrandPay 메서드를 가져오는 중 오류 발생:', error);
}
}

function settingBrandpay() {
brandpay.value.openSettings();
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

.brandpay-37ztg0 {
    min-width: 300px;
    width: 300px;
    padding: 0px;
    margin-right: 8px;
    margin-left: 8px;
}

.brandpay-37ztg0 > div {
    min-height: 170px;
}

.brandpay-1enn31n {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    height: 170px;
    border: 1px solid #d1d6db;
    border-radius: 8px;
    background-color: #e5e8eb;
    cursor: pointer;
}

.svg-icon-fallback {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -9999;
    visibility: hidden;
}

.adaptive-grey800-text {
    color: #333d4b;
}

.card-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
}

  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .card-icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  
  .susussg-logo {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
  }
  
  .susussg-logo img {
    width: 50px;
  }
  
  
  .card-number {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-details {
    margin-top: 10px;
  }

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

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
  