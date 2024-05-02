<template>
    <!-- 라이브 제목 입력 -->
    <Card>
      <Textinput
          label="라이브 제목"
          placeholder="라이브 제목을 입력하세요"
          name="liveTitle"
          v-model="liveTitle"
      />
      <br>

      <!-- 라이브 한줄 요약 입력 -->
      <Textinput
          label="라이브 한줄 요약"
          placeholder="라이브 한줄 요약을 입력하세요"
          name="liveSummary"
          v-model="liveSummary"
      />
      <br>
      <!-- 대표 이미지 등록 및 미리보기 -->
      <div class="flex flex-col md:flex-row items-start md:items-center">
        <label class="label-style">
          대표 이미지 등록
        </label>
      </div>
      <div style="display: flex; align-items: center;">
        <div style="flex-shrink: 0;">
          <img :src="imageSrc" alt="대표 이미지 미리보기" style="width: 100px; height: 100px"/>
        </div>
        <div style="margin-left: 20px;">
          <p>최대 용량 : 1mb</p>
          <p>권장 사이즈 : 400 x 400</p>
          <input
              type="file"
              id="imageUpload"
              @change="handleImageUpload"
              accept="image/jpeg, image/png, image/gif"
              class="mb-2"
          />
        </div>
      </div>
      <br>

      <!-- 라이브 예정일/시간 선택 -->
      <Textinput
          label="라이브 예정일/시간"
          type="datetime-local"
          name="liveDateTime"
          v-model="liveDateTime"
      />
    </Card>
  <br>
    <!-- 카테고리 설정 -->
    <Card>
      <div>
        <select-component
            :options="categories"
            v-model="selectedCategoryValue"
            placeholder="카테고리를 선택하세요"
            label="카테고리"
        />
        <div v-if="selectedCategoryLabel" class="selected-category-display">
          선택된 카테고리: {{ selectedCategoryLabel }}
        </div>
      </div>

      <!-- 라이브에 사용할 상품 등록 -->
      <label class="label-style">
        <br>상품 등록<br>
      </label>
      <Modal
          title="ProductRegister"
          label="상품 등록하기"
          labelClass="btn-outline-dark btn-sm"
          ref="modal1"
      >
        <h4 class="font-medium text-lg mb-3 text-slate-900">
          Lorem ipsum dolor sit.
        </h4>
        <div class="text-base text-slate-600 dark:text-slate-300">
          상품 검색해서 집어넣으세요
        </div>
        <template v-slot:footer>
          <Button
              text="등록하기"
              btnClass="btn-dark "
              @click="$refs.modal1.closeModal()"
          />
        </template>
      </Modal>
      <div class="card rounded-md bg-white dark:bg-slate-800">
        <div class="card-body flex flex-col p-6 overflow-auto">
          <p>판매 상품 등록</p>
          <hr class="section-divider"> <!-- 구분선 추가 -->
          <table class="min-w-full">
            <thead>
            <tr class="text-left">
              <th class="px-6 py-3">상품 이름</th>
              <th class="px-6 py-3">상품 코드</th>
              <th class="px-6 py-3">기본 가격</th>
              <th class="px-6 py-3">할인률 (%)</th>
              <th class="px-6 py-3">할인된 가격</th>
              <th class="px-6 py-3">작업</th>
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
                <Button class="btn-sm" @click="registerProduct(index)">등록하기</Button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br>

      <!-- 등록된 상품 목록 -->
      <div class="card rounded-md bg-white dark:bg-slate-800">
        <div class="card-body flex flex-col p-6 overflow-auto">
          <p>등록된 상품 목록</p>
          <hr class="section-divider"> <!-- 구분선 추가 -->
          <table class="min-w-full">
            <thead>
            <tr class="text-left">
              <th class="px-6 py-3">상품 이름</th>
              <th class="px-6 py-3">상품 코드</th>
              <th class="px-6 py-3">할인가</th>
              <th class="px-6 py-3">작업</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(registered, idx) in registeredProducts" :key="idx" class="border-b">
              <td class="px-6 py-4">{{ registered.name }}</td>
              <td class="px-6 py-4">{{ registered.code }}</td>
              <td class="px-6 py-4">{{ formatCurrency(registered.discountedPrice) }}</td>
              <td class="px-6 py-4">
                <Button class="btn-sm" @click="deleteRegisteredProduct(idx)">삭제</Button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
<br>
    <Card>
      <!-- 공지 사항 섹션 -->
      <div class="section">
        <div class="flex items-center">
          <Textinput label="공지 사항" type="text" name="newNotice" v-model="newNotice" placeholder="공지사항 입력" class="mb-2 flex-grow" />
          <Button :disabled="!canAddNotice" @click="addNotice" :class="{'btn-outline-dark': !isLoading, 'loading': isLoading}" class="btn inline-flex justify-center btn-sm ml-2 mt-5"><span>추가하기</span></Button>
        </div>
        <ul>
          <li v-for="(notice, index) in notices" :key="index" class="list-item">
            <Icon icon="heroicons:x-mark-20-solid" @click="deleteNotice(index)" class="flex-shrink-0"></Icon>{{ notice }}
          </li>
        </ul>
      </div>

      <!-- 라이브 혜택 섹션 -->
      <div class="section">
        <div class="flex items-center">
          <Textinput label="라이브 혜택" type="text" name="newBenefit" v-model="newBenefit" placeholder="라이브 혜택 입력" class="mb-2 flex-grow" />
          <Button :disabled="!canAddBenefit" @click="addBenefit" :class="{'btn-outline-dark': !isLoading, 'loading': isLoading}" class="btn inline-flex justify-center btn-sm ml-2 mt-5"><span>추가하기</span></Button>
        </div>
        <ul>
          <li v-for="(item, index) in benefits" :key="index" class="list-item">
            <Icon icon="heroicons:x-mark-20-solid" @click="deleteBenefit(index)" class="flex-shrink-0"></Icon>{{ item }}
          </li>
        </ul>
      </div>

      <!-- FAQs 섹션 -->
      <div class="section">
        <div class="mb-4">
          <Textinput label="질문" type="text" v-model="newQuestion" placeholder="질문을 입력해주세요" class="mb-2"/>
          <Textarea label="답변" name="pn4" placeholder="답변을 입력해주세요" v-model="newAnswer"/>
          <br>
          <Button :isDisabled="!canAddAnswer" text="추가하기" @click="addAnswer" :isLoading="isLoading" class="btn-sm"/>
        </div>
        <dl>
          <div v-for="(item, index) in qa" :key="index" class="faq-item">
            <Icon icon="heroicons:x-mark-20-solid" @click="deleteQA(index)" class="delete-icon"></Icon>
            <dt class="question">{{ item.question }}</dt>
            <dd class="answer">&nbsp;&nbsp;{{ item.answer }}</dd>
          </div>
        </dl>
      </div>
    </Card>
    <br>
    <!-- 저장 버튼 -->
  <div class="flex justify-end">
    <Button
        :isDisabled="!canSubmit"
        text="저장하기"
        @click="submitForm"
        :isLoading="isLoading"
    />
  </div>
</template>


<script>
import Icon from '@/components/Icon/index.vue'
import Textinput from '@/components/Textinput';
import Button from '@/components/Button';
import noImage from '@/assets/images/all-img/no-image.png';
import Dropdown from "@/components/Dropdown/index.vue";
import Textarea from "@/components/Textarea";
import Modal from "@/components/Modal/Modal.vue";
import Card from "@/components/Card/index.vue";
import SelectComponent from '@/components/select/index.vue';

export default {
  components: {
    Textarea,
    Textinput,
    Button,
    Dropdown,
    Modal,
    Card,
    SelectComponent,
    Icon
  },
  data() {
    return {
      liveTitle: '',
      liveSummary: '',
      liveDateTime: '',
      productIds: '',
      notices: [], // 공지사항 목록
      qa: [],
      benefits: [],
      productsToRegister: [
        // Example products (this would normally come from a server)
        {name: 'Product A', code: 'A001', price: 10000, discountRate: 0, discountedPrice: 10000},
        {name: 'Product B', code: 'B001', price: 20000, discountRate: 0, discountedPrice: 20000}
      ],
      registeredProducts: [],
      newQuestion: '',
      newAnswer: '',
      newNotice: '', // 새로운 공지사항 입력값
      newBenefit: '',
      imageFile: null,
      imageSrc: noImage,
      isLoading: false,
      selectedCategory: '',
      selectedCategoryValue: '',
      categories: [
        {value: 'beauty', label: '뷰티'},
        {value: 'food', label: '식품'},
        {value: 'household', label: '생활용품'},
        {value: 'children', label: '유아동'},
        {value: 'electronics', label: '전자제품'},
        {value: 'fashion', label: '패션'},
      ],
    };
  },
  computed: {
    canSubmit() {
      return this.liveTitle && this.liveSummary && this.liveDateTime && this.productIds && this.imageSrc;
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
    canAddProduct() {
      // Checks if all required fields are filled and products array has less than 8 entries
      return this.newProduct.name && this.newProduct.code && this.newProduct.price && this.products.length < 8;
    },
    selectedCategoryLabel() {
      const category = this.categories.find(cat => cat.value === this.selectedCategoryValue);
      return category ? category.label : '';
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
    formatCurrency(value) {
      if (!value) return '';
      return `${parseInt(value).toLocaleString('ko-KR')}원`;
    },
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
    submitForm() {
      if (!this.canSubmit) return;
      this.isLoading = true;
      // Form submission logic would go here
      setTimeout(() => {
        this.isLoading = false;
        alert('Form submitted successfully!');
      }, 2000);
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
        this.qa.push({question: this.newQuestion, answer: this.newAnswer}); // Add as an object
        this.newQuestion = '';
        this.newAnswer = '';
      }
    },
    addProduct() {
      if (this.canAddProduct) {
        this.products.push({...this.newProduct});
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
    deleteNotice(index) {
      this.notices.splice(index, 1);
    },

    deleteBenefit(index) {
      this.benefits.splice(index, 1);
    },

    deleteQA(index) {
      this.qa.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.live-info{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.card-body {
  height: 100%;
  overflow-y: auto; /* Enables scrolling */
}

.card-container {
  gap : 20px;
}

.label-style {
  @apply mb-2 text-slate-600 dark:text-slate-300 text-sm leading-6 capitalize cursor-pointer font-medium rtl:text-right rtl:block;
}

.product-section,
.registered-products-section {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.product-item,
.registered-item {
  border-bottom: 1px solid #eee;
  padding: 10px;
}

.product-item:last-child,
.registered-item:last-child {
  border-bottom: none;
}

.button {
  background-color: #007BFF;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

.card {
  background-color: white;
  border-radius: 0.375rem;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.input-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.btn {
  margin-top: 10px;
  padding: 10px 15px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.list-item, .faq-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  gap: 8px; /* 추가: 아이콘과 텍스트 사이 간격 */
}
.icon {
  cursor: pointer;
  margin-right: 8px; /* 아이콘과 텍스트 사이 간격 */
}

.btn-delete {
  position: absolute;
  right: 0;
  top: 0;
  min-width: 75px;
  padding: 5px 10px;
  font-size: 0.875rem;
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #d32f2f;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 0.875rem;
  background-color: #007bff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-sm:hover {
  background-color: #0056b3;
}

.section {
  margin-top: 20px;
}

.faq-item {
  display: flex;
  flex-direction: column; /* 요소를 수직으로 배열 */
  align-items: flex-start; /* 왼쪽 정렬 */
  padding: 10px 0;
}

.question {
  font-weight: bold;
  margin-bottom: 4px; /* 질문과 답변 사이의 간격 조정 */
}

.answer {
  white-space: pre-line; /* 답변 내 공백 유지 */
}

.delete-icon {
  align-self: flex-start; /* 아이콘을 항상 왼쪽에 배치 */
  margin-bottom: 8px; /* 아이콘과 질문 사이 간격 조정 */
  cursor: pointer;
}

.icon {
  cursor: pointer; /* 삭제 아이콘의 커서 스타일 */
}

.selected-category-display {
  margin-top: 10px;
  font-size: 16px;
}

.label-style {
  margin-bottom: 10px;
}

.section-divider {
  border: none;  /* 기존의 테두리를 제거 */
  height: 2px;  /* 선의 두께 */
  background-color: #ccc;  /* 선의 색상 */
  margin: 8px 0 16px;  /* 상하 여백 설정 */
}
</style>
