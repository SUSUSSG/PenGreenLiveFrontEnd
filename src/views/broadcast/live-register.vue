<template>
  <div>
    <div class="flex z-[5] items-center relative justify-center md:mx-8">
      <div class="relative z-[1] items-center item flex flex-start flex-1 last:flex-none group"
        v-for="(item, i) in steps" :key="i">
        <div :class="`   ${stepNumber >= i
          ? 'bg-slate-900 text-white ring-slate-900 ring-offset-2 dark:ring-offset-slate-500 dark:bg-slate-900 dark:ring-slate-900'
          : 'bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 dark:bg-slate-600 dark:ring-slate-600 text-opacity-70'
          }`"
          class="transition duration-150 icon-box md:h-12 md:w-12 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium">
          <span id="span" v-if="stepNumber <= i"> {{ i + 1 }}</span>
          <span id="span" v-else class="text-3xl">
            <Icon icon="bx:check-double" />
          </span>
        </div>

        <div class="absolute top-1/2 h-[2px] w-full" :class="stepNumber > i
          ? 'bg-slate-900 dark:bg-slate-900'
          : 'bg-[#E0EAFF] dark:bg-slate-700'
          "></div>
        <div
          class="absolute top-full text-base md:leading-6 mt-3 transition duration-150 md:opacity-100 opacity-0 group-hover:opacity-100"
          :class="stepNumber >= i
            ? ' text-slate-900 dark:text-slate-300'
            : 'text-slate-500 dark:text-slate-300 dark:text-opacity-40'" style="left: -25px;">
          <!-- left 값을 조정하여 좌측으로 이동 -->
          <div class="w-max">{{ item.title }}</div>
        </div>
      </div>
    </div>

    <div class="conten-box mt-14 border-t border-slate-100 dark:border-slate-700 -mx-6 px-6 pt-6">
      <form @submit.prevent="submit">
        <div v-for="(step, index) in steps" :key="index">
          <div v-if="stepNumber === index">
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              <div class="lg:col-span-3 md:col-span-2 col-span-1">
                <h4 class="text-base text-slate-800 dark:text-slate-300 mb-6">
                  {{ step.title }}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <!-- Step1 -->
        <div v-if="stepNumber === 0">
          <Card>
            <Textinput label="라이브 제목" placeholder="라이브 제목을 입력하세요" name="liveTitle" v-model="liveTitle" />
            <br>
            <Textinput label="라이브 한줄 요약" placeholder="라이브 한줄 요약을 입력하세요" name="liveSummary" v-model="liveSummary" />
            <br>

            <label>대표 이미지 등록</label>
            <div style="display: flex; align-items: center;">
              <div style="flex-shrink: 0;">
                <img :src="previewImage" alt="previewImage" style="width: 180px; height: 320px" />
              </div>
              <div style="margin-left: 20px;">
                <p>최대 용량 : 1mb</p>
                <p>권장 사이즈 : 720 x 1280</p>
                <input type="file" id="imageUpload" @change="handleImageUpload"
                  accept="image/jpeg, image/png, image/gif" class="mb-2" />
              </div>
            </div>
            <br>

            <Textinput label="라이브 예정일/시간" type="datetime-local" name="liveDateTime" v-model="liveDateTime" />
            <div class="mt-5">
              <label>방송 카테고리 선택</label>
              <div class="mt-2">
                <select v-model="selectedCategory" @change="handleCategoryChange">
                  <option value="" disabled selected hidden>선택하기</option>
                  <option v-for="category in categories" :key="category.value" :value="category.value">{{
                    category.label }}</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        <!-- Step2 -->
        <div v-if="stepNumber === 1">
          <Card>
            <!-- 라이브에 사용할 상품 등록 -->
            <div class="box">
              <div class="left-content">
                <label>상품 등록</label>
              </div>
              <div class="right-content">
                <!-- 모달 -->
                <Modal title="상품등록" label="상품 등록" labelClass="btn-dark btn-sm" ref="salesProductModal">
                  <table>
                    <thead>
                      <tr>
                        <th class="px-4">선택</th>
                        <!-- <th class="px-3">상품 이미지</th> -->
                        <th class="px-6">상품 이름</th>
                        <th class="px-5">상품 코드</th>
                        <th class="px-8 py-2">원가</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(product, index) in channelSalesProduct" :key="index">
                        <td class="px-6"><input type="checkbox" v-model="selectedRows" :value="product"></td>
                        <!-- <td class="px-7"><img :src="'data:image/png;base64,' + product.productImg"></td> -->
                        <td class="px-6">{{ product.productName }}</td>
                        <td class="px-6">{{ product.productCode }}</td>
                        <td class="px-6">{{ formatCurrency(product.originalPrice) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <template v-slot:footer>
                    <Button text="상품 등록" btnClass="btn-primary btn-sm" @click="addSelectedProductsToTable" />
                  </template>
                </Modal>
              </div>
            </div>
            <div class="card rounded-md bg-white dark:bg-slate-800">
              <div class="card-body flex flex-col p-6 overflow-auto">
                <!-- <p>판매 상품 등록</p> -->
                <!-- <hr class="section-divider"> -->
                <table class="min-w-full">
                  <thead>
                    <tr class="text-left">
                      <th class="px-6">상품 이름</th>
                      <th class="px-6">상품 코드</th>
                      <th class="px-9">정가</th>
                      <th class="px-20">할인율 (%)</th>
                      <th class="px-6">할인된 가격</th>
                      <th class="px-10 py-3">추가</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in productsToRegister" :key="index">
                      <td class="px-6 py-4">{{ product.name }}</td>
                      <td class="px-6 py-4">{{ product.code }}</td>
                      <td class="px-6 py-4">{{ formatCurrency(product.originalPrice) }}</td>
                      <td class="px-6 py-4">
                        <input type="number" v-model.number="product.discountRate" class="input-control" max="100">
                        <Button @click="applyDiscount(index)"
                          :disabled="product.discountRate > 100 || product.discountRate <= 0"
                          btnClass="btn inline-flex justify-center btn-sm ml-2 mt-5 btn-outline-dark" type="button"
                          text="적용" />
                      </td>
                      <td class="px-6 py-4">{{ formatCurrency(product.discountPrice) }}</td>
                      <td class="px-6 py-4">
                        <Button @click="registerProduct(index)"
                          :disabled="product.discountRate > 100 || product.discountRate <= 0"
                          btnClass="btn inline-flex justify-center btn-sm ml-2 mt-5  btn-outline-dark" type="button"
                          text="등록" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br>
                <ul>
                  <li v-for="(registered, idx) in registeredProducts" :key="idx"
                    class="list-item flex items-center justify-between mt-1">
                    <div class="bg-gray-100 p-2 rounded">
                      <span class="registered-name">{{ registered.name }}</span>
                      <span class="registered-code">({{ registered.code }})</span>
                      방송 판매가 : <span class="registered-price"> {{ formatCurrency(registered.discountPrice) }}</span>
                      <Icon icon="heroicons:x-mark-20-solid" @click="deleteProduct(idx)" style="float: right;"
                        class="bg-red-500 hover:bg-red-600 text-white rounded p-1" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <!-- Step3 -->
        <div v-if="stepNumber === 2">
          <Card>
            <!-- 공지 사항 섹션 -->
            <div class="section">
              <div class="flex items-center justify-between">
                <Textinput label="공지 사항" type="text" name="newNotice" v-model="newNotice" placeholder="공지사항 입력"
                  class="mb-2 flex-grow" />
                <Button @click="addNotice" type="button"
                  btnClass="btn-primary inline-flex justify-center btn-sm ml-2 mt-5 btn-outline-dark"
                  text="추가"></Button>
              </div>
              <ul>
                <li v-for="(notice, index) in notices" :key="index"
                  class="list-item flex items-center justify-between mt-1">
                  <div class="bg-gray-100 p-2 rounded">
                    <span>{{ notice }}</span>
                    <Icon icon="heroicons:x-mark-20-solid" @click="deleteNotice(index)" style="float: right;"
                      class="bg-red-500 hover:bg-red-600 text-white rounded p-1" />
                  </div>
                </li>
              </ul>
            </div>
            <!-- 라이브 혜택 섹션 -->
            <div class="section mt-7">
              <div class="flex items-center justify-between">
                <Textinput label="라이브 혜택" type="text" name="newBenefit" v-model="newBenefit" placeholder="라이브 혜택 입력"
                  class="mb-2 flex-grow" />
                <Button @click="addBenefit" type="button"
                  btnClass="btn inline-flex justify-center btn-sm ml-2 mt-5 btn-outline-dark" text="추가"></Button>
              </div>
              <ul>
                <li v-for="(item, index) in benefits" :key="index"
                  class="list-item flex items-center justify-between mt-1">
                  <div class="bg-gray-100 p-2 rounded">
                    <span>{{ item }}</span>
                    <Icon icon="heroicons:x-mark-20-solid" @click="deleteBenefit(index)" style="float: right;"
                      class="bg-red-500 hover:bg-red-600 text-white rounded p-1" />
                  </div>
                </li>
              </ul>
            </div>
            <!-- FAQs 섹션 -->
            <div class="section mt-7">
              <div class="mb-4">
                <div class="mb-2"> <!-- 질문 -->
                  <Textinput label="질문" type="text" v-model="newQuestion" placeholder="질문을 입력해주세요" />
                </div>
                <div class="mb-2"> <!-- 답변 -->
                  <Textarea label="답변" name="pn4" placeholder="답변을 입력해주세요" v-model="newAnswer" />
                </div>
                <div class="text-center mb-2"> <!-- 추가하기 버튼을 오른쪽 중간에 위치시키기 위해 text-center 추가 -->
                  <Button @click="addAnswer" type="button"
                    btnClass="btn inline-flex justify-center btn-sm justify-between btn-outline-dark"
                    text="추가"></Button>
                </div>
              </div>
              <dl>
                <div v-for="(item, index) in qa" :key="index" class="faq-item mt-1">
                  <div class="bg-gray-100 p-2 rounded">
                    <Icon icon="heroicons:x-mark-20-solid" @click="deleteQA(index)" style="float: right;"
                      class="bg-red-500 hover:bg-red-600 text-white rounded p-1" />
                    <dt class="question">{{ item.questionTitle }}</dt>
                    <dd class="answer">{{ item.questionAnswer }}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </Card>
        </div>




        <!-- 하단 버튼 모음 -->
        <div class="mt-10 flex justify-between items-center">
          <div v-if="stepNumber > 0">
            <Button @click.prevent="prev()" text="이전" btnClass="btn-dark" />
          </div>
          <div v-if="stepNumber < steps.length - 1" class="flex justify-end w-full">
            <Button @click.prevent="next()" text="다음" btnClass="btn-dark" />
          </div>
          <div v-else class="flex justify-end w-full">
            <Button @click="saveBroadcast()" text="등록" btnClass="btn-dark" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import Card from "@/components/Card";
import Textinput from '@/components/Textinput';
import Dropdown from "@/components/Dropdown/index.vue";
import Textarea from "@/components/Textarea";
import SelectComponent from "@/components/Select/index.vue";
import Modal from "@/components/Modal/Modal.vue";


export default {
  components: {
    Button,
    Icon,
    Card,
    Textinput,
    Dropdown,
    Textarea,
    SelectComponent,
    Modal
  },

  setup() {
    const loading = ref(false);

    let steps = [
      {
        id: 1,
        title: "라이브 정보 등록",
      },
      {
        id: 2,
        title: "상품 정보 등록",
      },
      {
        id: 3,
        title: "공지사항 등록",
      },
    ];
    const toast = useToast();
    let stepNumber = ref(0);

    const prev = () => {
      if (stepNumber.value > 0) {
        stepNumber.value--;
      }
    };

    const next = () => {
      if (stepNumber.value < steps.length - 1) {
        stepNumber.value++;
      }
    };
    return {
      prev,
      next,
      steps,
      stepNumber,
      loading
    };
  },
  data() {
    return {
      // step1
      liveTitle: '',
      liveSummary: '',
      liveDateTime: '',
      imageFile: null,
      previewImage: "https://via.placeholder.com/90x160",
      categories: [], // 카테고리 목록을 담을 배열
      selectedCategory: '', //선택된 카테고리

      //step2
      channelSalesProduct: [
        {
          productSeq: '',
          productImg: '',
          productName: '',
          productCode: '', //상품번호 추가
          originalPrice: ''
        }],
      selectedRows: [], //모달에서 선택된 상품
      productsToRegister: [], //모달에서 선택된 상품 목록만틈 다음 테이블에서 보여줌
      registeredProducts: [], // 할인율이 적용된 상품들

      //step3
      notices: [],
      qa: [],
      benefits: [],
      newQuestion: '',
      newAnswer: '',
      newNotice: '',
      newBenefit: '',
    }
  },
  created() {
    this.loadCategories(); // 카테고리 목록 가져오기
    this.loadChannelSalesProduct(); // 판매자가 판매하는 제품 목록 가져오기
  },
  methods: {
    // 카테고리 목록을 가져오는 API
    loadCategories() {
      const url = `http://localhost:8090/broadcast-category`;

      axios.get(url)
        .then(response => {
          this.categories = response.data.map(category => {
            return {
              value: category.categoryCd,
              label: category.categoryNm
            };
          });
        })
        .catch(error => {
          console.error('카테고리 목록 가져오는 동안 에러 발생 : ', error);
        });
    },
    handleCategoryChange() {
      console.log(this.selectedCategory); //확인용
    },

    // 판매자 판매 상품 목록을 가져오는 API
    loadChannelSalesProduct() {
      const url = `http://localhost:8090/channel-sales-product`;

      axios.get(url)
        .then(response => {
          console.log(response.data);
          this.channelSalesProduct = response.data.map(product => ({
            productSeq: product.productSeq,
            productImg: product.productImage,
            productName: product.productNm,
            productCode: product.productCd,
            originalPrice: product.listPrice
          }));
        })
        .catch(error => {
          console.error('판매자 판매 상품 목록 가져올 때 에러 발생 : ', error)
        })
    },

    // 모달에 있는 상품 등록
    addSelectedProductsToTable() {
      this.modalOpen = true;

      this.selectedRows.forEach(product => {
        // 이미 productsToRegister 배열에 존재하는지 확인
        const isDuplicateInProductsToRegister = this.productsToRegister.some(item => item.code === product.productCode);
        // 이미 registeredProducts 배열에 존재하는지 확인
        const isDuplicateInRegisteredProducts = this.registeredProducts.some(item => item.code === product.productCode);
        if (!isDuplicateInProductsToRegister && !isDuplicateInRegisteredProducts) {
          // productsToRegister 배열에 추가
          this.productsToRegister.push({
            productSeq: product.productSeq,
            name: product.productName,
            code: product.productCode,
            originalPrice: product.originalPrice
          });
        }
      });

      // 선택된 결과를 콘솔에 출력
      console.log('선택된 상품 목록:', this.productsToRegister);

      this.isOpen = true;
      this.$refs.salesProductModal.openModal();
    },

    applyDiscount(index) {
      const product = this.productsToRegister[index];
      const discount = (product.originalPrice * product.discountRate) / 100;
      product.discountPrice = product.originalPrice - discount;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 1048576) {
          alert('이미지 파일 크기는 1MB 이하여야 합니다.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
          const base64String = e.target.result.split(',')[1];
          this.imageSrc = base64String;
        };
        reader.readAsDataURL(file);
      } else {
        this.previewImage = null;
        this.imageSrc = null;
      }
    },
    formatCurrency(value) {
      if (!value) return '';
      return `${parseInt(value).toLocaleString('ko-KR')}원`;
    },
    registerProduct(index) {
      const product = this.productsToRegister[index];
      product.discountPrice = product.originalPrice - (product.originalPrice * product.discountRate / 100);
      this.registeredProducts.push(product);
      this.productsToRegister.splice(index, 1); // Optionally remove from to-register list
    },
    deleteRegisteredProduct(index) {
      this.registeredProducts.splice(index, 1);
    },
    addNotice() {
      if (this.newNotice.trim()) {
        this.notices.push(this.newNotice);
        this.newNotice = ''; // 입력란 초기화
      }
    },
    addBenefit() {
      if (this.newBenefit.trim()) {
        this.benefits.push(this.newBenefit);
        this.newBenefit = ''; // 입력란 초기화
      }
    },
    addAnswer() {
      if (this.newQuestion.trim() && this.newAnswer.trim()) {
        this.qa.push({ questionTitle: this.newQuestion, questionAnswer: this.newAnswer }); // Add as an object
        this.newQuestion = '';
        this.newAnswer = '';
      }
    },
    deleteNotice(index) {
      this.notices.splice(index, 1);
    },

    deleteBenefit(index) {
      this.benefits.splice(index, 1);
    },
    deleteQA(index) {
      this.qa.splice(index, 1);
    },
    deleteProduct(idx) {
      this.registeredProducts.splice(idx, 1);
    },
    saveBroadcast() {
      const toast = useToast();

      toast.clear();
      this.loading = true;
      toast.info("방송 정보를 저장 중입니다");

      // JSON 형식의 데이터 구성
      const requestData = {
        broadcastTitle: this.liveTitle,
        broadcastSummary: this.liveSummary,
        broadcastScheduledTime: this.liveDateTime,
        categoryCd: this.selectedCategory,
        registeredProducts: this.registeredProducts, // registeredProducts는 배열
        notices: this.notices, // notices는 배열
        qa: this.qa, // qa는 배열
        benefits: this.benefits, // benefits는 배열
        image: this.imageSrc
      };

      // JSON 형식의 데이터를 백엔드로 전송
      axios.post('http://localhost:8090/register-broadcast', requestData)
        .then(response => {
          this.loading = false;
          toast.success("방송 정보가 등록되었습니다.", {
            timeout: 1000,
          });
          setTimeout(() => {
            this.$router.push({ name: '실시간 라이브 준비' });
          }, 2000);
        })
        .catch(error => {
          console.error("등록 실패 : ", error);
          toast.error("방송 등록에 실패했습니다.", {
            timeout: 2000,
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#span {
  color: black;
}

.box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.question {
  font-weight: bold;
}

.registered-code,
.registered-price {
  margin-right: 30px;
}

.registered-name {
  margin-right: 5px;
  font-weight: bold;
  color: #134010;
}

.registered-price {
  font-weight: bold;
}

thead {
  margin-bottom: 20px;
}

label {
  color: black;
}
</style>