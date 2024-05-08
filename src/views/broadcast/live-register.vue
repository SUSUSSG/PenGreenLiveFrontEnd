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
            : 'text-slate-500 dark:text-slate-300 dark:text-opacity-40'
            ">
          <p class="w-max">{{ item.title }}</p>
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
                <img :src="imageSrc" alt="대표 이미지 미리보기" style="width: 100px; height: 100px" />
              </div>
              <div style="margin-left: 20px;">
                <p>최대 용량 : 1mb</p>
                <p>권장 사이즈 : 400 x 400</p>
                <input type="file" id="imageUpload" @change="handleImageUpload"
                  accept="image/jpeg, image/png, image/gif" class="mb-2" />
              </div>
            </div>
            <br>
            <Textinput label="라이브 예정일/시간" type="datetime-local" name="liveDateTime" v-model="liveDateTime" />
            <div>
              <select-component :options="categories" v-model="selectedCategoryValue" placeholder="카테고리를 선택하세요"
                label="카테고리" class="mt-7"/>
              <div v-if="selectedCategoryLabel" class="selected-category-display">
                선택된 카테고리: {{ selectedCategoryLabel }}
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
                <Modal title="상품등록" label="상품 등록" labelClass="btn-dark btn-sm" ref="modal1">
                  <h4 class="font-medium text-lg mb-3 text-slate-900">Lorem ipsum dolor sit.</h4>
                  <div class="text-base text-slate-600 dark:text-slate-300">상품 검색해서 집어넣으세요</div>
                  <template v-slot:footer>
                    <Button text="등록하기" btnClass="btn-primary btn-sm" @click="$refs.modal1.closeModal()" />
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
                      <th class="px-6 py-3">상품 이름</th>
                      <th class="px-6 py-3">상품 코드</th>
                      <th class="px-6 py-3">기본 가격</th>
                      <th class="px-6 py-3">할인률 (%)</th>
                      <th class="px-6 py-3">할인된 가격</th>
                      <th class="px-10 py-3">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in productsToRegister" :key="index" class="border-b">
                      <td class="px-6 py-4">{{ product.name }}</td>
                      <td class="px-6 py-4">{{ product.code }}</td>
                      <td class="px-6 py-4">{{ formatCurrency(product.price) }}</td>
                      <td class="px-6 py-4">
                        <input type="number" v-model.number="product.discountRate" class="input-control">
                      </td>
                      <td class="px-6 py-4">{{ formatCurrency(product.discountedPrice) }}</td>
                      <td class="px-6 py-4">
                        <Button @click="registerProduct(index)" :class="{ 'btn-outline-dark': !isLoading}" btnClass="btn inline-flex justify-center btn-sm ml-2 mt-5" type="button" text="추가" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <br>
            <!-- 등록된 상품 목록 -->
            <label>상품 목록</label>
            <div class="card rounded-md bg-white dark:bg-slate-800">
              <div class="card-body flex flex-col p-6 overflow-auto">
                <!-- <hr class="section-divider"> 구분선 추가 -->
                <table class="min-w-full">
                  <thead>
                    <tr class="text-left">
                      <th class="px-6 py-3">상품 이름</th>
                      <th class="px-6 py-3">상품 코드</th>
                      <th class="px-6 py-3">할인가</th>
                      <th class="px-10 py-3">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(registered, idx) in registeredProducts" :key="idx" class="border-b">
                      <td class="px-6 py-4">{{ registered.name }}</td>
                      <td class="px-6 py-4">{{ registered.code }}</td>
                      <td class="px-6 py-4">{{ formatCurrency(registered.discountedPrice) }}</td>
                      <td class="px-6 py-4">
                        <Button @click="deleteRegisteredProduct(idx)" :class="{ 'btn-outline-dark': !isLoading}" btnClass="btn inline-flex justify-center btn-sm ml-2 mt-5" type="button" text="삭제" />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                <Button :disabled="!canAddNotice" @click="addNotice"
                  :class="{ 'btn-outline-dark': !isLoading, 'loading': isLoading }"
                  btnClass="btn-primary inline-flex justify-center btn-sm ml-2 mt-5" text="추가"></Button>
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
                <Button :disabled="!canAddBenefit" @click="addBenefit"
                  :class="{ 'btn-outline-dark': !isLoading, 'loading': isLoading }"
                  btnClass="btn inline-flex justify-center btn-sm ml-2 mt-5" text="추가"></Button>
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
                  <Button :disabled="!canAddAnswer" @click="addAnswer"
                    :class="{ 'btn-outline-dark': !isLoading, 'loading': isLoading }"
                    btnClass="btn inline-flex justify-center btn-sm justify-between" text="추가"></Button>
                </div>
              </div>
              <dl>
                <div v-for="(item, index) in qa" :key="index" class="faq-item mt-1">
                  <div class="bg-gray-100 p-2 rounded">
                    <Icon icon="heroicons:x-mark-20-solid" @click="deleteQA(index)" style="float: right;"
                      class="bg-red-500 hover:bg-red-600 text-white rounded p-1" />
                    <dt class="question">{{ item.question }}</dt>
                    <dd class="answer">{{ item.answer }}</dd>
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
            <Button @click.prevent="save()" text="등록" btnClass="btn-dark" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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

    const submit = () => {
      let totalSteps = steps.length;
      const isLastStep = stepNumber.value === totalSteps - 1;
      if (isLastStep) {
        stepNumber = totalSteps - 1;
        toast.success("Form Submitted", {
          timeout: 2000,
        });
      } else {
        stepNumber.value++;
      }
    };

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

    const save = () => {
      toast.success("Form Saved", {
        timeout: 2000,
      });
    };

    return {
      submit,
      prev,
      next,
      save,
      steps,
      stepNumber,
    };
  },
  data() {
    return {
      // step1
      liveTitle: '',
      liveSummary: '',
      liveDateTime: '',
      imageFile: null,
      imageSrc: "https://via.placeholder.com/90x160",
      selectedCategory: '',
      selectedCategoryValue: '',
      categories: [
        { value: 'beauty', label: '뷰티' },
        { value: 'food', label: '식품' },
        { value: 'household', label: '생활용품' },
        { value: 'children', label: '유아동' },
        { value: 'electronics', label: '전자제품' },
        { value: 'fashion', label: '패션' },
      ],

      //step2
      productIds: '',
      productsToRegister: [
        // Example products (this would normally come from a server)
        { name: 'Product A', code: 'A001', price: 10000, discountRate: 0, discountedPrice: 10000 },
        { name: 'Product B', code: 'B001', price: 20000, discountRate: 0, discountedPrice: 20000 }
      ],
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
  computed: {
    canSubmit() {
      return this.liveTitle && this.liveSummary && this.liveDateTime && this.productIds && this.imageSrc;
    },
    canAddProduct() {
      // Checks if all required fields are filled and products array has less than 8 entries
      return this.newProduct.name && this.newProduct.code && this.newProduct.price && this.products.length < 8;
    },
    selectedCategoryLabel() {
      const category = this.categories.find(cat => cat.value === this.selectedCategoryValue);
      return category ? category.label : '';
    },
    canAddNotice() {
      // 'newNotice' 입력란이 비어있지 않으면 '추가하기' 버튼을 활성화합니다.
      return this.newNotice.trim() !== '';
    },
    canAddBenefit() {
      // 'newNotice' 입력란이 비어있지 않으면 '추가하기' 버튼을 활성화합니다.
      return this.newBenefit.trim() !== '';
    },
    canAddAnswer() {
      return this.newQuestion.trim() !== '' && this.newAnswer.trim() != '';
    },
  },
  watch: {
    'newProduct.discountRate': function (newRate) {
      if (newRate) {
        const discount = (this.newProduct.price * newRate) / 100;
        this.newProduct.discountedPrice = this.newProduct.price - discount;
      } else {
        this.newProduct.discountedPrice = this.newProduct.price;
      }
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file.type.includes('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');  // Notify user if the file is not an image
        event.target.value = '';  // Reset the file input to clear the invalid file
        return;
      }
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = e => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    formatCurrency(value) {
      if (!value) return '';
      return `${parseInt(value).toLocaleString('ko-KR')}원`;
    },
    addProduct() {
      if (this.canAddProduct) {
        this.products.push({ ...this.newProduct });
        // Reset newProduct for the next entry
        this.newProduct = {
          name: '',
          code: '',
          price: 0,
          discountRate: 0,
          discountedPrice: 0,
        };
      }
    },
    registerProduct(index) {
      const product = this.productsToRegister[index];
      product.discountedPrice = product.price - (product.price * product.discountRate / 100);
      this.registeredProducts.push(product);
      this.productsToRegister.splice(index, 1); // Optionally remove from to-register list
    },
    deleteRegisteredProduct(index) {
      this.registeredProducts.splice(index, 1);
    },
    submitForm() {
      if (!this.canSubmit) return;
      this.isLoading = true;
      // Form submission logic would go here
      setTimeout(() => {
        this.isLoading = false;
        alert('Form submitted successfully!');
      }, 2000);
      this.save();
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
        this.qa.push({ question: this.newQuestion, answer: this.newAnswer }); // Add as an object
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

// label {
//   font-weight: bold;
// }
</style>
