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

    <div class="basic-card">
      <form @submit.prevent="submit">
        <!-- Step1 -->
        <div v-if="stepNumber === 0">
          <Card>
            <div class="form-group">
              <label>라이브 제목</label>
              <Textinput placeholder="여기에 입력하세요" name="liveTitle" v-model="liveTitle" class="wide-input" />
            </div>

            <div class="form-group">
              <label>라이브 한줄 소개</label>
              <Textinput placeholder="여기에 입력하세요" name="liveSummary" v-model="liveSummary" class="wide-input" />
            </div>

            <div class="form-group">
              <label for="liveDateTime">라이브 예정일/시간</label>
              <input type="datetime-local" id="liveDateTime" name="liveDateTime" v-model="liveDateTime"
                :min="minDateTime" />
            </div>

            <div class="form-group">
              <label>방송 카테고리 선택</label>
              <select v-model="selectedCategory" @change="handleCategoryChange">
                <option value="" disabled selected hidden>선택하기</option>
                <option v-for="category in categories" :key="category.value" :value="category.value">{{
                  category.label }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>대표 이미지 등록</label>
              <div style="display: flex; align-items: center;" class="mt-2">
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
            </div>
          </Card>
        </div>

        <!-- Step2 -->
        <div v-if="stepNumber === 1">
          <Card>
            <!-- 라이브에 사용할 상품 등록 -->
            <div class="box">
              <div class="right-content">
                <!-- 모달 -->
                <Modal title="상품등록" label="상품 등록" labelClass="btn-dark" ref="salesProductModal"
                  modal-class="modal-position" :sizeClass="'max-w-4xl'">
                  <div class="modal-content">
                    <table class="modal-table">
                      <thead>
                        <tr>
                          <th class="px-7">이미지</th>
                          <th class="row-img">상품 이름</th>
                          <th class="row-product">상품 코드</th>
                          <th class="row-list-price">정가</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(product, index) in channelSalesProduct" :key="index"
                          @click="toggleSelection(product)" :v-model="selectedRows"
                          :class="{ 'selected-row': isSelected(product) }" class="pointer">
                          <td><img :src="product.productImg" class="channel-sales-product-img"></td>
                          <td class="px-6">{{ product.productName }}</td>
                          <td class="px-6">{{ product.productCode }}</td>
                          <td class="px-6">{{ formatCurrency(product.originalPrice) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <template v-slot:footer>
                    <Button text="상품 등록" btnClass="btn-primary btn-sm" @click="addSelectedProductsToTable" />
                  </template>
                </Modal>
              </div>
            </div>
            <table class="min-w-full mt-7">
              <thead>
                <tr class="text-left">
                  <th class="column-code">상품 코드</th>
                  <th class="column-name">상품 이름</th>
                  <th class="column-original-price">정가</th>
                  <th class="column-discount-rate">할인율 (%)</th>
                  <th class="column-sale-price">판매가</th>
                  <th class="column-delete">삭제</th>
                </tr>
              </thead>
            </table>
            <br>
            <ul>
              <li v-for="(product, idx) in registeredProducts" :key="idx" class="registered-list">
                <a class="registered-code">[{{ product.code }}]</a>
                <a class="registered-name">{{ product.name }}</a>
                <a class="registered-code">{{ product.originalPrice.toLocaleString() }}원</a>
                <input type="number" v-model.number="product.discountRate" class="input-control"
                  @input="validateDiscountRate(product.discountRate)">
                <div class="discount-button" @click="applyDiscount(idx)">적용</div>
                <a class="registered-price"> {{ formatCurrency(product.discountPrice) }}</a>
                <Icon icon="heroicons:x-mark-20-solid" @click="deleteProduct(idx)" class="icon-delete" />
              </li>
            </ul>
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
                <Button @click="addNotice" type="button" btnClass="btn-sm ml-2 mt-5 btn-outline-dark" text="추가" />
              </div>
              <ul>
                <li v-for="(notice, index) in notices" :key="index"
                  class="list-item flex items-center justify-between mt-1">
                  <div class="bg-gray-100 p-2 rounded">
                    <span>{{ notice }}</span>
                    <Icon icon="heroicons:x-mark-20-solid" @click="deleteNotice(index)" class="list-icon-delete" />
                  </div>
                </li>
              </ul>
            </div>
            <!-- 라이브 혜택 섹션 -->
            <div class="section mt-7">
              <div class="flex items-center justify-between">
                <Textinput label="라이브 혜택" type="text" name="newBenefit" v-model="newBenefit" placeholder="라이브 혜택 입력"
                  class="mb-2 flex-grow" />
                <Button @click="addBenefit" type="button" btnClass="btn-sm ml-2 mt-5 btn-outline-dark" text="추가" />
              </div>
              <ul>
                <li v-for="(item, index) in benefits" :key="index"
                  class="list-item flex items-center justify-between mt-1">
                  <div class="bg-gray-100 p-2 rounded">
                    <span>{{ item }}</span>
                    <Icon icon="heroicons:x-mark-20-solid" @click="deleteBenefit(index)" class="list-icon-delete" />
                  </div>
                </li>
              </ul>
            </div>
            <!-- FAQs 섹션 -->
            <div class="section mt-7">
              <div class="mb-4">
                <div class="mb-2"> <!-- 질문 -->
                  <Textinput label="자주묻는 질문" type="text" v-model="newQuestion" placeholder="질문을 입력해주세요" />
                </div>
                <div class="mb-2"> <!-- 답변 -->
                  <Textarea label="자주묻는 답변" name="pn4" placeholder="답변을 입력해주세요" v-model="newAnswer" />
                </div>
                <div class="text-center mb-2">
                  <Button @click="addAnswer" type="button" btnClass="btn-sm ml-2 mt-5 btn-outline-dark" text="추가" />
                </div>
              </div>
              <dl>
                <div v-for="(item, index) in qa" :key="index" class="faq-item mt-1">
                  <div class="bg-gray-100 p-2 rounded">
                    <Icon icon="heroicons:x-mark-20-solid" @click="deleteQA(index)" class="list-icon-delete" />
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
            <Button @click="registerBroadcast()" text="등록" btnClass="btn-dark" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

import Button from "@/components/Button";
import Icon from "@/components/Icon/index.vue";
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
      minDateTime: '',
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
          productCode: '',
          originalPrice: ''
        }],
      selectedRows: [], //모달에서 선택된 상품
      registeredProducts: [],

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
    this.setMinDateTime();
  },
  methods: {
    // 카테고리 목록을 가져오는 API
    loadCategories() {
      const url = `/broadcast-category`;

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
    setMinDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      this.minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    },
    toggleSelection(product) {
      const index = this.selectedRows.indexOf(product);
      if (index === -1) {
        this.selectedRows.push(product);
      } else {
        this.selectedRows.splice(index, 1);
      }
    },

    isSelected(product) {
      return this.selectedRows.includes(product);
    },

    // 판매자 판매 상품 목록을 가져오는 API
    loadChannelSalesProduct() {
      const url = `/channel-sales-product`;

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
        const isDuplicateInRegisteredProducts = this.registeredProducts.some(item => item.code === product.productCode);
        if (!isDuplicateInRegisteredProducts) {
          this.registeredProducts.push({
            productSeq: product.productSeq,
            name: product.productName,
            code: product.productCode,
            originalPrice: product.originalPrice
          });
        }
      });
      console.log('선택된 상품 목록:', this.registeredProducts);
      this.isOpen = true;
      this.$refs.salesProductModal.openModal();
    },
    validateDiscountRate(rate) {
      if (rate < 1 || rate > 99) {
        alert("할인율은 1~99사이로 입력해주세요.")
      }
    },
    applyDiscount(index) {
      const product = this.registeredProducts[index];
      const discount = (product.originalPrice * product.discountRate) / 100;
      product.discountPrice = Math.round((product.originalPrice - discount) / 10) * 10;
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
          const base64String = e.target.result.split(',')[1]; // MIME 타입 정보 제거
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
    registerBroadcast() {
      const toast = useToast();

      // JSON 형식의 데이터 구성
      const requestData = {
        broadcastTitle: this.liveTitle,
        broadcastSummary: this.liveSummary,
        broadcastScheduledTime: this.liveDateTime,
        categoryCd: this.selectedCategory,
        registeredProducts: this.registeredProducts,
        notices: this.notices,
        qa: this.qa,
        benefits: this.benefits,
        image: this.imageSrc
      };

      // 필수 필드가 비어 있는지 확인
      const requiredFields = [
        'broadcastTitle',
        'broadcastSummary',
        'broadcastScheduledTime',
        'categoryCd',
        'registeredProducts',
        'notices',
        'qa',
        'benefits',
        'image'
      ];

      // 필드 이름과 한글 이름 매핑
      const fieldNamesInKorean = {
        broadcastTitle: '라이브 제목',
        broadcastSummary: '라이브 한줄 소개',
        broadcastScheduledTime: '라이브 예정 시간',
        categoryCd: '카테고리 ',
        registeredProducts: '판매할 상품',
        notices: '공지사항',
        qa: '자주묻는 질문과 답변',
        benefits: '라이브 혜택',
        image: '썸네일'
      };

      for (const field of requiredFields) {
        if (!requestData[field]) {
          this.loading = false;
          toast.info(`${fieldNamesInKorean[field]} 정보가 비어 있습니다.`, {
            timeout: 2000,
          });
          return;
        }
      }

      const infoToast = toast.info("방송 정보를 등록 중입니다...", {
        timeout: false,
      });

      console.log(requestData);

      // JSON 형식의 데이터를 백엔드로 전송
      axios.post('/register-broadcast', requestData)
        .then(response => {
          this.loading = false;
          toast.dismiss(infoToast);
          toast.success("방송 정보가 등록되었습니다.", {
            timeout: 1000,
          });
          setTimeout(() => {
            this.$router.push({ name: '실시간 라이브 준비' });
          }, 2000);
        })
        .catch(error => {
          this.loading = false;
          toast.dismiss(infoToast);
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
span {
  color: black;
}

label {
  color: black;
}

.basic-card {
  margin-top: 3.5rem;
  border-top: 1px solid #f1f5f9;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1.5rem;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
}

.box {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 2em;
}

.form-group label {
  margin-right: 12px;
  width: 200px;
}

.wide-input {
  width: 1000px;
}


.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.modal-table {
  border-collapse: separate;
  border-spacing: 0 15px;
}

.channel-sales-product-img {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  padding: 10px;
}

.selected-row {
  background-color: rgba(28, 109, 22, 0.3);
  color: black;
}

.selected-row td:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-bottom: 5px;
}

.selected-row td:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.pointer {
  cursor: pointer;
}

.row-img {
  padding-left: 130px;
}

.row-product {
  padding-left: 60px;
}

.row-list-price {
  padding-left: 40px;
}

.column-code {
  width: 130px;
  text-align: center;
  padding-right: 5rem;
}

.column-name {
  width: 200px;
  font-weight: bold;
  text-align: center;
  padding-left: 1.5rem;
  padding-right: 7rem;
}

.column-original-price {
  width: 130px;
  text-align: center;
  padding-left: 4rem;
  padding-right: 1.5rem;
}

.column-discount-rate {
  width: 130px;
  text-align: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.column-sale-price {
  width: 100px;
  text-align: right;
  font-weight: bold;
  padding-left: 6rem;
  // padding-right: 0.5rem;
}

.column-delete {
  width: 100px;
  text-align: center;
  padding-left: 3.5rem;
}

.registered-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
  background-color: #FAFAFA;
  padding: 1rem;
}

.registered-code {
  width: 130px;
  text-align: center;
}

.registered-name {
  font-weight: bold;
  width: 450px
}

.registered-price {
  width: 100px;
  text-align: right;
  font-weight: bold;
  padding-right: 2rem;
}

.discount-button {
  display: inline-flex;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25;
  background-color: #ECE6CC;
  color: #111111;
  width: 80px;
  height: 30px;
  border-radius: 0.45rem;
}

.icon-delete,
.list-icon-delete {
  float: right;
  background-color: #f56565;
  color: white;
  border-radius: 0.25rem;
  padding: 0.25rem;
  transition: background-color 0.2s;
  margin-right: 40px;
}

.list-icon-delete {
  margin: 0;
}

.question {
  font-weight: bold;
}
</style>