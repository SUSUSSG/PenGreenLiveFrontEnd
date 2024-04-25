<template>
  <div class="p-4 space-y-4">
    <!-- 라이브 제목 입력 -->
    <Textinput
        label="라이브 제목"
        placeholder="라이브 제목을 입력하세요"
        name="liveTitle"
        v-model="liveTitle"
    />

    <!-- 라이브 한줄 요약 입력 -->
    <Textinput
        label="라이브 한줄 요약"
        placeholder="라이브 한줄 요약을 입력하세요"
        name="liveSummary"
        v-model="liveSummary"
    />

    <!-- 대표 이미지 등록 및 미리보기 -->
    <div class="flex flex-col md:flex-row items-start md:items-center">
      <label for="imageUpload" class="block text-gray-700 text-sm font-bold mb-2">
        대표 이미지 등록
      </label>
    </div>
    <div style="display: flex; align-items: center;">
      <div style="flex-shrink: 0;">
        <img :src="imageSrc" alt="대표 이미지 미리보기" style="max-width: 400px;"/>
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

    <!-- 라이브 예정일/시간 선택 -->
    <Textinput
        label="라이브 예정일/시간"
        type="datetime-local"
        name="liveDateTime"
        v-model="liveDateTime"
    />

    <!-- 카테고리 설정 -->
    <div>
      카테고리 선택
      <br>
      <Dropdown>
        <Button
            text="카테고리 선택"
            btnClass="btn-outline-success"
            icon="heroicons-outline:chevron-down"
            iconPosition="right"
            iconClass="text-lg"
        />
      </Dropdown>
    </div>

    <!-- 라이브에 사용할 상품 등록 -->
    <div>
      상품 등록
    </div>
    <Modal
        title="ProductRegister"
        label="상품 등록하기"
        labelClass="btn-outline-dark"
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
    <div>
      <h3 class="text-lg font-bold mb-2">상품 등록</h3>
      <div v-for="(product, index) in productsToRegister" :key="`product-${index}`" class="mb-4">
        <div class="flex justify-between items-center">
          <div>
            <p>상품 이름: {{ product.name }}</p>
            <p>상품 코드: {{ product.code }}</p>
            <p>기본 가격: {{ product.price }}</p>
          </div>
          <div>
            <Textinput label="할인률 (%)" v-model.number="product.discountRate" type="number" placeholder="할인률 입력"/>
            <Button text="등록하기" @click="registerProduct(index)" class="ml-2"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Display registered products -->
    <div>
      <h3 class="text-lg font-bold">등록된 상품 목록</h3>
      <ul>
        <li v-for="(registered, idx) in registeredProducts" :key="`registered-${idx}`">
          상품 이름: {{ registered.name }}, 코드: {{ registered.code }}, 할인가: {{ registered.discountedPrice }}
          <Button text="삭제" @click="deleteRegisteredProduct(idx)" class="ml-4"/>
        </li>
      </ul>
    </div>

    <!-- Modified Live Benefits Section -->
    <div class="mb-4">
      <Textinput label="라이브 혜택" type="text" v-model="newBenefit" placeholder="라이브 혜택 입력"/>
      <Button :isDisabled="!canAddBenefit" text="추가하기" @click="addBenefit" :isLoading="isLoading" class="mt-2"/>
      <div class="mt-4">
        <ul>
          <li v-for="(item, index) in benefits" :key="index" class="my-2 flex justify-between">
            {{ item }}
            <Button text="삭제" @click="deleteBenefit(index)" class="ml-4"/>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modified Notices Section -->
    <div class="mb-4">
      <Textinput label="공지 사항" type="text" v-model="newNotice" placeholder="공지사항 입력"/>
      <Button :isDisabled="!canAddNotice" text="추가하기" @click="addNotice" :isLoading="isLoading" class="mt-2"/>
      <div class="mt-4">
        <ul>
          <li v-for="(notice, index) in notices" :key="index" class="my-2 flex justify-between">
            <span class="font-semibold">공지:</span> {{ notice }}
            <Button text="삭제" @click="deleteNotice(index)" class="ml-4"/>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modified FAQs Section -->
    <div class="mb-4">
      <Textinput label="자주 묻는 질문" type="text" v-model="newQuestion" placeholder="질문을 입력해주세요" class="mb-2"/>
      <Textarea label="답변" name="pn4" placeholder="답변을 입력해주세요" v-model="newAnswer"/>
      <Button :isDisabled="!canAddAnswer" text="추가하기" @click="addAnswer" :isLoading="isLoading" class="mt-2"/>
      <div class="mt-4">
        <dl>
          <div v-for="(item, index) in qa" :key="index" class="my-4 flex justify-between">
            <dt class="font-semibold">Q: {{ item.question }}</dt>
            <dd class="ml-4">A: {{ item.answer }}</dd>
            <Button text="삭제" @click="deleteQA(index)" class="ml-4"/>
          </div>
        </dl>
      </div>
    </div>

    <!-- 저장 버튼 -->
    <Button
        :isDisabled="!canSubmit"
        text="저장하기"
        @click="submitForm"
        :isLoading="isLoading"
    />
  </div>
</template>


<script>
import Textinput from '@/components/Textinput';
import Button from '@/components/Button';
import noImage from '@/assets/images/all-img/no-image.png';
import Dropdown from "@/components/Dropdown/index.vue";
import Textarea from "@/components/Textarea";
import Modal from "@/components/Modal/Modal.vue";

export default {
  components: {
    Textarea,
    Textinput,
    Button,
    Dropdown,
    Modal
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
        { name: 'Product A', code: 'A001', price: 10000, discountRate: 0, discountedPrice: 10000 },
        { name: 'Product B', code: 'B001', price: 20000, discountRate: 0, discountedPrice: 20000 }
      ],
      registeredProducts: [],
      newQuestion: '',
      newAnswer: '',
      newNotice: '', // 새로운 공지사항 입력값
      newBenefit: '',
      imageFile: null,
      imageSrc: noImage,
      isLoading: false
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
    }
  },
  watch:{
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
        this.qa.push({ question: this.newQuestion, answer: this.newAnswer }); // Add as an object
        this.newQuestion = '';
        this.newAnswer = '';
      }
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
