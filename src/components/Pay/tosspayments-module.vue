<template>
    <div class="consumer-cache-1cchlll w-full">
    <div class="consumer-cache-8z48kx">
        <section class="consumer-cache-bd75t9">
            <div class="p-grid consumer-cache-67e79o">
                <div class="p-grid-col p-grid-col12">
                    <h4 class="typography typography--h6 typography--bold color--grey700 consumer-cache-1cmoblx">결제 방법</h4>
                </div>
            </div>
            <div class="p-grid consumer-cache-67e79o">
                <!-- Payment method buttons -->
                <template v-for="method in paymentMethods" :paymentMethods="paymentMethods">
                    <div class="p-grid-col p-grid-col6">
                        <button :class="['p-button p-button--default p-button--block p-button--fill p-button--large p-button--has-icon padding--l consumer-cache-1jf8qw4', 
                            {selected: selectedPayment.key === method.key}]" 
                            @click="selectMethod(method)">
                            <span v-if="method.icon" class="icon p-icon p-button__icon" aria-hidden="false" role="presentation" style="height: 42px; width: 80px; min-width: 22px; padding: 2px 0px;">
                                <img :src="method.icon" />
                            </span>
                            {{ method.label }}
                        </button>
                    </div>
                </template>
                <div class="p-grid-col p-grid-col12" v-if="addBtn">
                    <button @click="showAllPayment" class="p-button p-button--default p-button--block p-button--fill p-button--large p-button--has-icon padding--l consumer-cache-sgh3ys" type="button" aria-disabled="false">
                        <span class="more-payment-methods">더보기</span>
                        <span class="icon p-icon more-payment-methods" aria-hidden="false" role="presentation" style="height: 20px; width: 20px; min-width: 20px;">
                            <img src="/src/assets//images/svg/arrow-bottom.svg"/>
                        </span>
                    </button>
                </div>
            </div>
            <div class="p-grid consumer-cache-67e79o"  v-if="selectedPayment.key==='credit'">
                <div class="p-grid-col p-grid-col3" v-for="(cardCompany, index) in cardCompanys" :key="index">
                    <button :class="['p-button p-button--default p-button--block p-button--fill p-button--large p-button--has-icon padding--l with-icon consumer-cache-ykbrbs', {selected: selectedCardCompany === cardCompany.name}]"  @click="selectCardCompany(cardCompany.name)" type="button" aria-disabled="false">
                        <div class="consumer-cache-1bd0tgn">
                            <span class="icon p-icon p-button__icon" aria-hidden="false" role="presentation" :style="{height: '28px', width: '52px', minWidth: '22px', padding: '2px 0px'}">
                                <img :src="cardCompany.icon"/>
                            </span>
                            <span class="typography typography--small typography--regular color--grey700" :style="{color: 'rgb(25, 31, 40)'}">{{ cardCompany.name }}</span>
                        </div>
                    </button>
                </div>
            </div>

            <div class="consumer-cache-ymq71h" v-if="selectedPayment.key==='credit'">
                <div class="consumer-cache-105f3td">
                    <div class="input radius--m p-select input--medium p-select--medium">
                        <span class="input__field p-select__field"><span class="p-select__field-title">{{selectedText }}</span></span>
                        <select class="p-select__native" aria-invalid="false" aria-label="할부 선택" v-model="selected">
                            <option class="" disabled="" value="">할부 선택</option>
                            <option value="0">일시불</option><option value="2">2개월</option>
                            <option value="3">3개월</option><option value="4">4개월</option>
                            <option value="5">5개월</option><option value="6">6개월</option>
                            <option value="7">7개월</option><option value="8">8개월</option>
                            <option value="9">9개월</option><option value="10">10개월</option>
                            <option value="11">11개월</option><option value="12">12개월</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- 신용카드 무이자 할부 안내 -->
            <div class="consumer-cache-tlrnqy"></div>
            <div class="p-grid consumer-cache-pypvcf">
                <div class="p-grid-col p-grid-col12">
                    <div class="consumer-cache-1emeqpj">
                        <span class="typography typography--p typography--regular color--grey700 consumer-cache-128nlh6"></span>
                        <button class="reset-button radius--s typography--p typography--medium p-text-button p-text-button--grey p-text-button--normal consumer-cache-128nlh6" type="button" @click="showInterestFreeInstallmentInfo">
                            <span class="typography typography--p typography--regular color--grey700 consumer-cache-128nlh6">신용카드 무이자 할부 안내 ></span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 결제 약관 -->
            <div class="p-grid consumer-cache-pypvcf ">
                <div class="p-grid-col p-grid-col12">
                    <div class="consumer-cache-0">
                        <div class="m-agreement-v3-agreement-wrapper">
                            <div class="m-agreement-v3-agreement-container">
                                <div class="m-agreement-v3-agreement m-agreement-v3-agreement--medium m-agreement-v3-agreement--have-checkbox m-agreement-v3-agreement--with-arrow">
                                    <div class="m-agreement-v3-layout__row">
                                        <div></div>
                                        <div class="m-agreement-v3-field__checkbox consumer-cache-uzd4c2" >
                                            <input id="1val-checkbox" type="checkbox" aria-label="[필수]  결제 서비스 이용 약관, 개인정보 처리 동의" class="consumer-cache-9mopdq">
                                            <label for="1val-checkbox" class="consumer-cache-2tkdon">
                                                <img class="check-box z-10" @click="checkAgreement" :src="checked ? 'src/assets/images/svg/check.svg' : 'src/assets/images/svg/check-before.svg'"  />
                                            </label>
                                        </div>
                                        <div class="m-agreement-v3-layout__animation z-10" @click="toggleAgreement" style="opacity: 1; transform: none;">                                      
                                            <div class="m-agreement-v3-field" >
                                                <div class="m-agreement-v3-field__text" role="button" tabindex="0" aria-label="[필수]  결제 서비스 이용 약관, 개인정보 처리 동의 자세히 보기">
                                                    <span role="text" class="text adaptive-grey700-text text--word-break typography-t6 text--font-weight-regular text--display-inline-block" style="color: #4e5968;">[필수]  결제 서비스 이용 약관, 개인정보 처리 동의</span>
                                                </div>
                                            </div>
                                            <span
                                            :class="['m-icon svg-icon-wrapper m-icon--type-default m-agreement-v3-layout__arrow', { 'm-agreement-v3-layout__arrow--open': isOpen }]"
                                            role="button"
                                            data-logging-label="icon-arrow-right-mono">                                                
                                                <span
                                                    class="m-icon__inner svg-icon adaptive-grey600-text m-icon__inner--colored"
                                                    aria-label="[필수] 결제 서비스 이용 약관, 개인정보 처리 동의 자세히 보기"
                                                    role="img"
                                                    :style="{ color: isOpen ? 'var(--adaptiveGrey600)' : 'var(--adaptiveGrey400)' }">                                                    
                                                    <img src="src/assets/images/svg/arrow-right.svg">
                                                </span>
                                                <img class="svg-icon-fallback" role="presentation" src="https://static.toss.im/icons/svg/icon-arrow-right-mono.svg">
                                            </span>
                                            <div class="m-agreement-v3-layout__right-pad" style="width: 16px;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="m-agreement-v3-layout__overlay" aria-hidden="true" style="display: flex; align-items: stretch;">
                                    <label for="1val-checkbox" class="m-agreement-v3-layout__overlay-checkbox" aria-hidden="true" style="flex-grow: 0; flex-shrink: 0;"></label>
                                    <label class="m-agreement-v3-layout__overlay-action" aria-hidden="true" style="flex: 1 1 0px;"></label>
                                </div>
                            </div>
                        </div>
                        <Transition name="slide">
                            <!-- 세부 이용약관 -->
                            <div class="m-collapsible content" v-show="isOpen">
                                <div>
                                    <div class="m-agreement-v3-agreement-wrapper">
                                        <div class="m-agreement-v3-agreement-container">
                                            <div class="m-agreement-v3-agreement m-agreement-v3-agreement--medium m-agreement-v3-agreement--have-checkbox m-agreement-v3-agreement--with-arrow">
                                                <div class="m-agreement-v3-layout__row">
                                                    <div style="width: 24px;"></div>
                                                    <div class="m-agreement-v3-field__checkbox consumer-cache-uzd4c2">
                                                        <input id="2val-checkbox" type="checkbox" aria-label="서비스 이용약관" class="consumer-cache-9mopdq">
                                                        <label for="2val-checkbox" class="consumer-cache-2tkdon">
                                                            <img :src="checked ? 'src/assets/images/svg/check.svg' : 'src/assets/images/svg/check-before.svg'" class="check-box" />
                                                        </label>
                                                    </div>
                                                    <div class="m-agreement-v3-layout__animation" style="opacity: 1; transform: none;">
                                                        <div class="m-agreement-v3-field">
                                                            <div class="m-agreement-v3-field__text" role="button" tabindex="0" aria-label="서비스 이용약관 자세히 보기">
                                                                <span role="text" class="text adaptive-grey700-text text--word-break typography-t6 text--font-weight-regular text--display-inline-block" style="color: var(--adaptiveGrey700);"> 서비스 이용약관</span>
                                                            </div>
                                                        </div>
                                                        <span class="m-icon svg-icon-wrapper m-icon--type-default m-agreement-v3-layout__arrow" role="button" data-logging-label="icon-arrow-right-mono">
                                                            <span class="m-icon__inner svg-icon adaptive-grey400-text m-icon__inner--colored" aria-label="서비스 이용약관 자세히 보기" role="img" style="color: var(--adaptiveGrey400);">
                                                                <img src="src/assets/images/svg/arrow-right.svg">
                                                            </span>
                                                            <img class="svg-icon-fallback" role="presentation" src="https://static.toss.im/icons/svg/icon-arrow-right-mono.svg">
                                                        </span>
                                                        <div class="m-agreement-v3-layout__right-pad" style="width: 16px;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="m-agreement-v3-layout__overlay" aria-hidden="true" style="display: flex; align-items: stretch;">
                                                <label for="2val-checkbox" class="m-agreement-v3-layout__overlay-checkbox" aria-hidden="true" style="flex: 0 0 88px;"></label>
                                                <label class="m-agreement-v3-layout__overlay-action" aria-hidden="true" style="flex: 1 1 0px;"></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="m-agreement-v3-agreement-wrapper">
                                        <div class="m-agreement-v3-agreement-container">
                                            <div class="m-agreement-v3-agreement m-agreement-v3-agreement--medium m-agreement-v3-agreement--have-checkbox m-agreement-v3-agreement--with-arrow">
                                                <div class="m-agreement-v3-layout__row">
                                                    <div style="width: 24px;"></div>
                                                    <div class="m-agreement-v3-field__checkbox consumer-cache-uzd4c2">
                                                        <input id="3val-checkbox" type="checkbox" aria-label="개인정보 수집 및 이용 동의 (토스페이먼츠)" class="consumer-cache-9mopdq">
                                                        <label for="3val-checkbox" class="consumer-cache-2tkdon">
                                                            <img :src="checked ? 'src/assets/images/svg/check.svg' : 'src/assets/images/svg/check-before.svg'" class="check-box" />
                                                        </label>
                                                    </div>
                                                    <div class="m-agreement-v3-layout__animation" style="opacity: 1; transform: none;">
                                                        <div class="m-agreement-v3-field">
                                                            <div class="m-agreement-v3-field__text" role="button" tabindex="0" aria-label="개인정보 수집 및 이용 동의 (토스페이먼츠) 자세히 보기">
                                                                <span role="text" class="text adaptive-grey700-text text--word-break typography-t6 text--font-weight-regular text--display-inline-block" style="color: var(--adaptiveGrey700);"> 개인정보 수집 및 이용 동의 (토스페이먼츠)</span>
                                                            </div>
                                                        </div>
                                                        <span class="m-icon svg-icon-wrapper m-icon--type-default m-agreement-v3-layout__arrow" role="button" data-logging-label="icon-arrow-right-mono">
                                                            <span class="m-icon__inner svg-icon adaptive-grey400-text m-icon__inner--colored" aria-label="개인정보 수집 및 이용 동의 (토스페이먼츠) 자세히 보기" role="img" style="color: var(--adaptiveGrey400);">
                                                                <img src="src/assets/images/svg/arrow-right.svg">
                                                            </span>
                                                            <img class="svg-icon-fallback" role="presentation" src="https://static.toss.im/icons/svg/icon-arrow-right-mono.svg">
                                                        </span>
                                                        <div class="m-agreement-v3-layout__right-pad" style="width: 16px;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="m-agreement-v3-layout__overlay" aria-hidden="true" style="display: flex; align-items: stretch;">
                                                <label for="3val-checkbox" class="m-agreement-v3-layout__overlay-checkbox" aria-hidden="true" style="flex: 0 0 88px;"></label>
                                                <label class="m-agreement-v3-layout__overlay-action" aria-hidden="true" style="flex: 1 1 0px;"></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="m-agreement-v3-agreement-wrapper">
                                        <div class="m-agreement-v3-agreement-container">
                                            <div class="m-agreement-v3-agreement m-agreement-v3-agreement--medium m-agreement-v3-agreement--have-checkbox m-agreement-v3-agreement--with-arrow">
                                                <div class="m-agreement-v3-layout__row">
                                                    <div style="width: 24px;"></div>
                                                    <div class="m-agreement-v3-field__checkbox consumer-cache-uzd4c2">
                                                        <input id="4val-checkbox" type="checkbox" aria-label="개인정보 제공 안내" class="consumer-cache-9mopdq">
                                                        <label for="4val-checkbox" class="consumer-cache-2tkdon">
                                                            <img :src="checked ? 'src/assets/images/svg/check.svg' : 'src/assets/images/svg/check-before.svg'" class="check-box" />
                                                        </label>
                                                    </div>
                                                    <div class="m-agreement-v3-layout__animation" style="opacity: 1; transform: none;">
                                                        <div class="m-agreement-v3-field">
                                                            <div class="m-agreement-v3-field__text" role="button" tabindex="0" aria-label="개인정보 제공 안내 자세히 보기">
                                                                <span role="text" class="text adaptive-grey700-text text--word-break typography-t6 text--font-weight-regular text--display-inline-block" style="color: var(--adaptiveGrey700);"> 개인정보 제공 안내</span>
                                                            </div>
                                                        </div>
                                                        <span class="m-icon svg-icon-wrapper m-icon--type-default m-agreement-v3-layout__arrow" role="button" data-logging-label="icon-arrow-right-mono">
                                                            <span class="m-icon__inner svg-icon adaptive-grey400-text m-icon__inner--colored" aria-label="개인정보 제공 안내 자세히 보기" role="img" style="color: var(--adaptiveGrey400);">
                                                                <img src="src/assets/images/svg/arrow-right.svg">
                                                            </span>
                                                            <img class="svg-icon-fallback" role="presentation" src="https://static.toss.im/icons/svg/icon-arrow-right-mono.svg">
                                                        </span>
                                                        <div class="m-agreement-v3-layout__right-pad" style="width: 16px;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="m-agreement-v3-layout__overlay" aria-hidden="true" style="display: flex; align-items: stretch;">
                                                <label for="4val-checkbox" class="m-agreement-v3-layout__overlay-checkbox" aria-hidden="true" style="flex: 0 0 88px;"></label>
                                                <label class="m-agreement-v3-layout__overlay-action" aria-hidden="true" style="flex: 1 1 0px;"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>

                        <div style="flex: 0 0 auto; height: 10px;"></div>
                        <div class="consumer-cache-1vnjgb6">
                            <span role="text" class="text adaptive-grey500-text text--word-break typography-t7 text--font-weight-regular text--display-inline-block" style="color: var(--adaptiveGrey500);"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full flex items-center justify-center">
                <button @click="requestPayment" class="button w-full" id="payment-button">결제하기</button>
            </div>
        </section>
           
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted , computed} from 'vue';
import "@/components/Pay/style.css";


const props = defineProps({
    productName: String,
    totalPrice: String,
});

const clientKey = "test_ck_vZnjEJeQVxangqX9pAnMrPmOoBN0";
const selectedPayment = ref({key: 'credit'});
const selectedCardCompany = ref(null);
const isOpen = ref(false);
const checked = ref(false);
const selected=ref('0');
const addBtn = ref(true);

function checkAgreement() {
  checked.value = !checked.value;
}

function toggleAgreement() {
  isOpen.value = !isOpen.value; 
}

const selectedText = computed(() => {
    switch (selected.value) {
        case '0': return '일시불';
        case '2': return '2개월';
        case '3': return '3개월';
        case '4': return '4개월';
        case '5': return '5개월';
        case '6': return '6개월';
        case '7': return '7개월';
        case '8': return '8개월';
        case '9': return '9개월';
        case '10': return '10개월';
        case '11': return '11개월';
        case '12': return '12개월';
    }
});

const paymentMethods = ref([
  { key: 'credit', method:'카드', flowMode: 'DIRECT', label: '신용·체크카드' },
  { key: 'npay', method:'간편결제', flowMode: 'DIRECT', easyPay: '네이버페이', icon: '/src/assets/images/svg/pay/npay.svg'},
  { key: 'kakaopay', method:'간편결제', flowMode: 'DIRECT', easyPay: '카카오페이', icon: '/src/assets/images/svg/pay/kakaopay.svg'},
  { key: 'tosspay', method:'간편결제', flowMode: 'DIRECT', easyPay: '토스페이', icon: '/src/assets/images/svg/pay/tosspay.svg'},
  { key: 'samsungpay', method:'간편결제', flowMode: 'DIRECT', easyPay: '삼성페이', icon: '/src/assets/images/svg/pay/samsungpay.svg'},
  { key: 'ssgpay', method:'간편결제', flowMode: 'DIRECT', easyPay: 'SSG페이', icon: '/src/assets/images/svg/pay/ssgpay.svg'},
]);

const cardCompanys = [
        { name: '신한', icon: '/src/assets/images/svg/pay/shinhan.svg'},
        { name: '현대', icon: '/src/assets/images/svg/pay/hyundai.svg' },
        { name: '삼성', icon: '/src/assets/images/svg/pay/samsungcard.svg' },
        { name: '롯데', icon: '/src/assets/images/svg/pay/loca.svg' },
        { name: '토스뱅크', icon: '/src/assets/images/svg/pay/tossbank.svg' },
        { name: '하나', icon: '/src/assets/images/svg/pay/hana.svg' },
        { name: '국민', icon: '/src/assets/images/svg/pay/kb.svg' },
        { name: '비씨', icon: '/src/assets/images/svg/pay/bc.svg' },
        { name: '농협', icon: '/src/assets/images/svg/pay/nh.svg' },
        { name: '카카오뱅크', icon: '/src/assets/images/svg/pay/kakaobank.svg' },
        { name: '케이뱅크', icon: '/src/assets/images/svg/pay/kbank.svg' },
        { name: '더보기', icon: '/src/assets/images/svg/etc.svg' }
      ]

function showAllPayment() {
    paymentMethods.value.push({ key: 'account_transfer', method:'계좌이체', label: '계좌이체'});
    addBtn.value = !addBtn.value;
}

function selectMethod(method) {
    selectedPayment.value = method;
}

function selectCardCompany(cardCompany) {
    selectedCardCompany.value = cardCompany;
}
  
const tossPayments = ref(null);
onMounted(async() => {
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
    const defaultRequestPaymentData = ref({
        amount: props.totalPrice,
        orderId: "20240508",
        orderName: props.productName,
        customerName: "김토스",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
        flowMode: selectedPayment.value.flowMode,
    })

    if (selectedPayment.value.method === '간편결제') {
      defaultRequestPaymentData.value.easyPay = selectedPayment.value.easyPay;
    }

    if (selectedPayment.value.method === '카드') {
      defaultRequestPaymentData.value.cardCompany = selectedCardCompany.value;
    }

    await tossPayments.value.requestPayment('카드', {
        ...defaultRequestPaymentData.value,
    });

  } catch (error) {
    console.error('Payment request failed:', error);
  }
}

function showInterestFreeInstallmentInfo() {
  const url = "https://pgweb.tosspayments.com/tosspayments/MainPopUp.do";
  const windowFeatures = "width=600,height=600,scrollbars=yes,resizable=yes";
  window.open(url, "_blank", windowFeatures);
}
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

.consumer-cache-ykbrbs {
    position: relative;
    height: 64px;
    font-size: 13px;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 4px;
}

.consumer-cache-ykbrbs.selected {
    border: 1px solid rgb(51, 61, 75);
}

.typography--small {
    font-size: 13px;
}
.consumer-cache-1bd0tgn {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.consumer-cache-sgh3ys {
    position: relative;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(229, 232, 235);
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    color: rgb(51, 61, 75);
    padding: 6px 8px !important;
}

/* 할부창 */
.consumer-cache-ymq71h {
    -webkit-box-align: stretch;
    align-items: stretch;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    width: 100%;
    margin-right: 4px;
    margin-left: 4px;
    margin-top: 8px;
}

 .consumer-cache-105f3td > div.input {
    background-color: rgb(249, 250, 251);
    border-radius: 14px;
}

.p-select {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImxpbmUtaWNvbiI+PHBhdGggZD0iTTggMTEuMTVhLjg5Ny44OTcgMCAwMS0uNjM2LS4yNjRsLTQuNS00LjVhLjkuOSAwIDExMS4yNzItMS4yNzNMOCA4Ljk3N2wzLjg2NC0zLjg2NGEuOS45IDAgMTExLjI3MiAxLjI3M2wtNC41IDQuNUEuODk3Ljg5NyAwIDAxOCAxMS4xNSIgZmlsbD0iI0IwQjhDMSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
    background-position: right 18px top 14px;
    background-repeat: no-repeat;
    background-size: 20px;
    padding: 0 48px 0 0;
    cursor: pointer;
    text-align: left;
}


.input {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    margin: 1px auto 0;
    font-size: 15px;
    line-height: 20px;
    color: #333d4b;
    background-color: #fff;
    border: none;
    outline: none;
    box-shadow: inset 0 0 0 1px rgba(0, 27, 55, .1);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    overflow: hidden;
    transition: background .2s ease, color .1s ease, box-shadow .2s ease;
}


.radius--m {
    border-radius: 8px;
}

.p-select__field {
    line-height: 1.6;
    display: flex;
    align-items: center;
    padding-right: 6px;
}


.input__date-range-picker__input, .input__field, .input__file-field__input-label {
    flex-grow: 1;
    outline: 0;
    border: 0;
    background: none;
    line-height: 48px;
    font-size: inherit;
    padding: 0 18px;
    margin: 0;
    color: inherit;
}
.input__field {
    width: 100%;
    height: 100%;
    min-width: 0;
}

.p-select__field-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


button, select {
    text-transform: none;
}

.p-select__native {
    position: absolute; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
}

.p-select__field {
    line-height: 1.6;
    display: flex;
    align-items: center;
    padding-right: 6px;
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

/* 이용 약관 */
.m-agreement-v3-agreement-container {
    position: relative;
    cursor: pointer;
}

.m-agreement-v3-agreement {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
}

.m-agreement-v3-layout__row {
    display: -webkit-box;
    display: flex;
}
.consumer-cache-uzd4c2 {
    display: inline-block;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
}
.m-agreement-v3-field__checkbox {
    margin-right: 8px;
}

.consumer-cache-9mopdq {
    position: fixed;
    left: 0px;
    top: 0px;
    padding: 0px;
    margin: -1px;
    width: 1px;
    height: 1px;
    border: 0px;
    overflow: hidden;
    clip: rect(0px, 0px, 0px, 0px);
    white-space: nowrap;
    appearance: none;
}

.m-agreement-v3-field__checkbox label {
    -webkit-box-align: normal;
    align-items: normal;
}

.m-agreement-v3-agreement-container:is(label), .m-agreement-v3-agreement-container label {
    display: -webkit-box;
    display: flex;
    margin: 0;
    cursor: pointer;
}

.consumer-cache-2tkdon {
    width: 100%;
    height: 100%;
    cursor: pointer;
    user-select: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin: 0px;
}

.m-agreement-v3-agreement--medium-bold .m-agreement-v3-field__checkbox label svg, .m-agreement-v3-agreement--medium .m-agreement-v3-field__checkbox label svg {
    margin-top: 5px;
}

.consumer-cache-1ovurkh {
    flex: 0 0 auto;
}

.m-agreement-v3-layout__animation {
    display: -webkit-box;
    display: flex;
    -webkit-box-flex: 1;
    flex: 1;
}

.m-agreement-v3-agreement--medium-bold .m-agreement-v3-field, .m-agreement-v3-agreement--medium .m-agreement-v3-field {
    min-height: 34px;
}

.m-agreement-v3-agreement .m-agreement-v3-field {
    font-weight: unset !important;
}
.m-agreement-v3-field {
    line-height: 0;
    font-weight: unset !important;
    display: -webkit-box;
    display: flex;
    -webkit-box-flex: 1;
    flex: 1;
}

.m-agreement-v3-agreement--medium-bold .m-agreement-v3-field__text, .m-agreement-v3-agreement--medium .m-agreement-v3-field__text {
    margin: 6px 0;
}

.m-agreement-v3-field__text {
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    min-width: 0;
}

.text--word-break.text--display-block, .text--word-break.text--display-inline-block {
    max-width: 100%;
}
.text--display-inline-block {
    display: inline-block;
}
.text--font-weight-regular {
    font-weight: 400;
}
.text {
    color: #191f28;
}

.font-size--15, .typography-t6 {
    font-size: 15px;
    line-height: 1.5;
}
.adaptive-grey700-text {
    color: #4e5968;
}

.m-agreement-v3-agreement--medium-bold .m-agreement-v3-layout__arrow, .m-agreement-v3-agreement--medium .m-agreement-v3-layout__arrow {
    margin-top: 5px;
}
.svg-icon-wrapper {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
}

.m-agreement-v3-layout__arrow {
    -webkit-transition: -webkit-transform .2s ease-in-out;
    transition: -webkit-transform .2s ease-in-out;
    transition: transform .2s ease-in-out;
    transition: transform .2s ease-in-out, -webkit-transform .2s ease-in-out;
}

.svg-icon-wrapper>.svg-icon, .svg-icon-wrapper>.svg-icon-fallback {
    display: block;
    width: 100%;
    height: 100%;
}

.svg-icon img {
    display: block;
    width: 100%;
    height: 100%;
}

.m-agreement-v3-layout__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.m-agreement-v3-layout__overlay-action {
    outline: none;
}

.m-agreement-v3-agreement {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
}

.consumer-cache-uzd4c2 {
    display: inline-block;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
}

.m-agreement-v3-layout__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.m-agreement-v3-field__checkbox label {
    -webkit-box-align: normal;
    align-items: normal;
}

.m-agreement-v3-layout__arrow--open {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
}

.svg-icon-fallback {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -9999;
    visibility: hidden;
}

.check-box {
    width: 24px;
    height: 24px;
    margin-top: 5px;
}

</style>