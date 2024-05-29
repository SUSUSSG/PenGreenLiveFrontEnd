<template>
  <div>
    <Card title="상품목록" noborder>
      <div class="buttons-container">
        <!-- 상품등록 모달 -->
        <Modal title="상품등록" label="상품등록" labelClass="btn inline-flex justify-center btn-dark btn-sm mr-3" ref="modal1"
          @closed="resetModalData">
          <div class="text-base text-slate-600 dark:text-slate-300">
            <Textinput label="상품코드" type="text" name="productCd" v-model="addModalData.productCd" placeholder="P001"
              class="mb-2" />
            <div class="flex items-center">
              <Textinput label="녹색제품 통합ID" type="text" name="greenProductId" v-model="addModalData.greenProductId"
                placeholder="KR232148" class="mb-2 flex-grow" />
              <button class="btn inline-flex justify-center btn-outline-dark btn-sm ml-2 mt-5"
                @click="authenticateProduct('add')"><span>인증하기</span></button>
            </div>
            <Textinput label="상품명" type="text" name="productNm" v-model="addModalData.productNm"
              placeholder="상품명을 입력하세요" class="mb-2" />
            <label type="text" class="ltr:inline-block rtl:block input-label">카테고리</label><br>
            <select v-model="addModalData.categoryCd" class="form-control mb-2">
              <option disabled value="">카테고리 선택</option>
              <option v-for="category in categories" :key="category.value" :value="category.value">
                {{ category.label }}
              </option>
            </select>
            <Textinput label="정가" type="number" name="listPrice" v-model="addModalData.listPrice"
              placeholder="상품의 정가를 입력하세요." class="mb-2" />
            <Textinput label="재고" type="number" name="productStock" v-model="addModalData.productStock"
              placeholder="재고를 입력하세요." class="mb-2" />
            <Textinput label="브랜드" type="text" name="brand" v-model="addModalData.brand" placeholder="브랜드를 입력하세요"
              class="mb-2" />
            <label class="ltr:inline-block rtl:block input-label">상품이미지</label><br>
            <input type="file" id="imageUpload" @change="handleAddImageUpload" accept="image/jpeg, image/png, image/gif"
              class="mt-2 text-base text-slate-600 dark:text-slate-300" />
            <img v-if="addModalData.previewImage" :src="addModalData.previewImage" alt="대표 이미지 미리보기"
              style="max-width: 100px">
          </div>
          <template v-slot:footer>
            <Button text="등록" btnClass="btn-dark btn-sm" @click="registerProduct" />
            <Button text="닫기" btnClass="btn-outline-dark btn-sm" @click="$refs.modal1.closeModal(); resetAddModalData();" />
          </template>
        </Modal>

        <!-- 상품삭제 버튼 -->
        <button class="btn inline-flex justify-center btn-outline-dark btn-sm"
          @click="deleteSelectedProducts"><span>상품삭제</span></button>

        <!-- 상품 정보 수정 모달 -->
        <Modal title="상품 정보 수정" ref="editModal" :showButtons="false" @closed="resetEditModalData">
          <div class="text-base text-slate-600 dark:text-slate-300">
            <Textinput label="상품코드" type="text" name="editproductcode" v-model="editModalData.productCd" class="mb-2" />
            <div class="flex items-center">
              <Textinput label="녹색제품 통합ID" type="text" name="greenProductId" v-model="editModalData.greenProductId"
                class="mb-2 flex-grow" />
              <button class="btn inline-flex justify-center btn-outline-dark btn-sm ml-2 mt-5"
                @click="authenticateProduct('edit')">
                <span>인증하기</span></button>
            </div>
            <Textinput label="상품명" type="text" name="editproductname" v-model="editModalData.productNm" class="mb-2" />
            <label type="text" class="ltr:inline-block rtl:block input-label">카테고리</label><br>
            <select v-model="editModalData.categoryCd" class="form-control mb-2">
              <option disabled value="">카테고리 선택</option>
              <option v-for="category in categories" :key="category.value" :value="category.value">
                {{ category.label }}
              </option>
            </select>
            <Textinput label="정가" type="text" v-model="formattedListPrice" name="editlistprice" class="mb-2" />
            <Textinput label="재고" type="number" name="editproductstock" v-model="editModalData.productStock"
              class="mb-2" />
            <Textinput label="브랜드" type="text" name="brand" v-model="editModalData.brand" class="mb-2" />
            <label class="ltr:inline-block rtl:block input-label">상품이미지</label><br>
            <input type="file" id="imageUpload" @change="handleEditImageUpload"
              accept="image/jpeg, image/png, image/gif" class="mt-2 text-base text-slate-600 dark:text-slate-300" />
            <img v-if="editModalData.previewImage" :src="decodeBase64(editModalData.previewImage)" alt="대표 이미지 미리보기"
              style="max-width: 100px;">
          </div>
          <template v-slot:footer>
            <Button text="닫기" btnClass="btn-outline-dark btn-sm" @click="closeEditModal" />
            <Button text="저장" btnClass="btn-dark btn-sm" @click="updateProductDetails" />
          </template>
        </Modal>
      </div>
      <div class="-mx-6">
        <vue-good-table :columns="columns" styleClass="vgt-table centered lesspadding2 table-head" :rows="products"
          :pagination-options="{ enabled: true, perPage: perpage }" :sort-options="{ enabled: false }">
          <template v-slot:table-row="props">
            <span v-if="props.column.field === 'checkbox'">
              <input type="checkbox" v-model="selectedProducts" :value="props.row.productSeq" />
            </span>
            <span v-if="props.column.field === 'productCd'" @click="openEditModal(props.row)" class="cursor-pointer">
              {{ props.row.productCd }}
            </span>
            <span v-if="props.column.field === 'greenProductId'">
              {{ props.row.greenProductId }}
            </span>
            <span v-if="props.column.field === 'productNm'" class="ellipsis">
              {{ props.row.productNm }}
            </span>
            <span v-if="props.column.field === 'categoryCd'">
              {{ props.row.categoryCd }}
            </span>
            <span v-if="props.column.field === 'listPrice'">
              {{ formatNumber(props.row.listPrice) }}
            </span>
            <span v-if="props.column.field === 'productStock'">
              {{ props.row.productStock }}
            </span>
            <span v-if="props.column.field === 'brand'">
              {{ props.row.brand }}
            </span>
            <span v-if="props.column.field === 'labels'" class="flex">
              <img v-for="label in props.row.labels" :key="label.labelIdSeq" :src="label.labelImage"
                :alt="label.labelNm" class="object-cover w-6 h-6 rounded-full mr-2" />
            </span>
          </template>
          <template #pagination-bottom="props">
            <div class="py-4 px-3 flex justify-center">
              <Pagination :total="50" :current="current" :per-page="perpage" :pageRange="pageRange"
                @page-changed="current = $event" :pageChanged="props.pageChanged"
                :perPageChanged="props.perPageChanged">
              </Pagination>
            </div>
          </template>
        </vue-good-table>
      </div>
    </Card>
  </div>
</template>

<script>
import axios from "@/axios";
import Card from "@/components/Card";
import Icon from "@/components/Icon/index.vue";
import Tooltip from "@/components/Tooltip";
import Pagination from "@/components/Pagination";
import { advancedTable } from "../../constant/basic-tablle-data";
import Modal from "../Modal/Modal.vue";
import Textinput from "@/components/Textinput/index.vue"
import Button from "@/components/Button/index.vue"

export default {
  components: {
    Pagination,
    Icon,
    Tooltip,
    Card,
    Modal,
    Textinput,
    Button,
  },
  data() {
    return {
      products: [],
      addModalData: {
        productCd: '',
        greenProductId: '',
        productNm: '',
        categoryCd: '',
        listPrice: null,
        productStock: null,
        brand: '',
        imageSrc: null,
        previewImage: null,
        categories: [],
        selectedCategory: '',
        labelIdSeq: 0,
        certificationReason: '',
        certificationExpirationDate: ''
      },
      editModalData: {
        productSeq: null,
        productCd: '',
        productNm: '',
        categoryCd: '',
        listPrice: 0,
        productStock: '',
        brand: '',
        greenProductId: '',
        imageSrc: null,
        productImage: null,
        previewImage: null,
        initialGreenProductId: ''
       
      },
      advancedTable,
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",
      customer: [],
      selectedProducts: [],
      options: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "5",
          label: "5",
        },
      ],
      columns: [
        {
          label: "",
          field: "checkbox",
          width: '50px',
        },
        {
          label: "상품 코드",
          field: "productCd",
        },
        {
          label: "녹색제품 통합ID",
          field: "greenProductId",
        },
        {
          label: "상품명",
          field: "productNm",
          width: "200px"
        },
        {
          label: "카테고리",
          field: "categoryCd",
        },
        {
          label: "정가",
          field: "listPrice",
        },
        {
          label: "재고",
          field: "productStock",
        },
        {
          label: "브랜드",
          field: "brand",
        },
        {
          label: "인증",
          field: "labels",
          width: '130px',
        },
      ],
      prodRsstValid: false,
    };
  },
  computed: {
    formattedListPrice: {
      get() {
        return this.editModalData.listPrice.toLocaleString();
      },
      set(value) {
        this.editModalData.listPrice = parseFloat(value.replace(/,/g, ''));
      }
    }
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchProducts() {
      axios.get(`/product-list-label`)
        .then(response => {
          this.products = response.data;
          console.log("products@@@", JSON.stringify(this.products, null, 2));
          console.log("Vendor-specific products loaded", this.products);
        })
        .catch(error => {
          console.error("Error loading vendor-specific products:", error.response.data);
        });
    },
    fetchCategories() {
      const url = `/categorycodes`;
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
          console.error("카테고리 목록 가져오는 동안 에러 발생 : ", error);
        });
    },
    handleCategoryChange() {
      console.log(this.selectedCategory);
    },
    formatNumber(value) {
      console.log('Formatting number:', value);
      if (!value) return '0';
      return value.toLocaleString();
    },
    updateListPrice(value) {
      this.editModalData.listPrice = parseFloat(value.replace(/,/g, ''));
    },
    displayFormattedPrice(value) {
      if (!value) return '0';
      return parseFloat(value).toLocaleString();
    },
    handleAddImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.addModalData.previewImage = e.target.result;
          console.log("Loaded Image Data:", this.addModalData.previewImage);
          const base64String = e.target.result.split(',')[1];
          this.addModalData.imageSrc = base64String;
        };
        reader.readAsDataURL(file);
      } else {
        this.addModalData.previewImage = null;
        this.addModalData.imageSrc = null;
      }
    },
    handleEditImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editModalData.previewImage = e.target.result;
          console.log("Loaded Image Data for Edit:", this.editModalData.previewImage);
          const base64String = e.target.result.split(',')[1];
          this.editModalData.imageSrc = base64String;
        };
        reader.readAsDataURL(file);
      } else {
        this.editModalData.previewImage = this.editModalData.productImage;
        console.log("No new image selected for edit, using existing image.");
        this.editModalData.imageSrc = null;
      }
    },
    decodeBase64(encodedString) {
      try {
        return atob(encodedString);
      } catch (e) {
        console.error("Failed to decode Base64 string:", e);
        return encodedString; // fallback to original string
      }
    },
    openEditModal(row) {
      this.editModalData = {
        productSeq: row.productSeq,
        productCd: row.productCd,
        greenProductId: row.greenProductId,
        productNm: row.productNm,
        categoryCd: row.categoryCd,
        listPrice: row.listPrice,
        productStock: row.productStock,
        brand: row.brand,
        previewImage: row.productImage, // 이미지 URL이 있으면 사용, 없으면 null
        productImage: row.productImage, // 참조를 할당
        imageSrc: null, // 새로운 이미지 업로드 시 사용될 변수
        labelIdSeq: row.labelIdSeq,
        certificationReason: row.certificationReason,
        certificationExpirationDate: row.certificationExpirationDate,
        initialGreenProductId: row.greenProductId,
        certificationCode: row.certificationCode
      };
      this.prodRsstValid = row.brand === "01";
      console.log("Edit modal opened for product with image data: ", this.editModalData.previewImage);
      this.$refs.editModal.openModal();
    },
    closeEditModal() {
      this.$refs.editModal.closeModal();
    },
    addImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.customer.push({ image: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    },
    removeImage(index) {
      this.customer.splice(index, 1);
    },
    updateProductDetails() {
      if (this.editModalData.greenProductId !== this.editModalData.initialGreenProductId && !this.prodRsstValid) {
        alert("녹색제품 통합ID 인증이 필요합니다.");
        return;
      }

      const url = `/product/${this.editModalData.productSeq}`;

      const productData = {
        productCd: this.editModalData.productCd,
        greenProductId: this.editModalData.greenProductId,
        productNm: this.editModalData.productNm,
        categoryCd: this.editModalData.categoryCd,
        listPrice: this.editModalData.listPrice,
        productStock: this.editModalData.productStock,
        brand: this.editModalData.brand,
        labelIdSeq: this.editModalData.labelIdSeq,
        certificationReason: this.editModalData.certificationReason,
        certificationExpirationDate: this.editModalData.certificationExpirationDate,
        productImage: this.editModalData.productImage
      };

      if (this.editModalData.imageSrc) {
        // 이미지가 수정된 경우 base64 인코딩된 이미지 전송
        productData.base64Image = this.editModalData.imageSrc;
      } else {
        // 이미지가 수정되지 않은 경우 productImage 필드를 추가하지 않음
        delete productData.base64Image;
      }

      axios.put(url, productData)
        .then(response => {
          alert("상품 정보가 수정되었습니다.");
          this.$refs.editModal.closeModal();
        })
        .catch(error => {
          console.error("Failed to update product:", error.response.data);
          alert("Failed to update product: " + error.response.data.message);
        });
    },

    deleteSelectedProducts() {
      this.selectedProducts.forEach(productSeq => {
        axios.delete(`/product/${productSeq}`)
          .then(response => {
            alert("Product successfully deleted");
          })
          .catch(error => {
            console.error("Failed to delete product:", error.response.data);
            alert("Failed to delete product: " + error.response.data.message);
          });
      });
    },
    registerProduct() {
      console.log("녹색인증 : " + this.prodRsstValid);

      if (this.prodRsstValid === false) {
        console.log("녹색인증 : " + this.prodRsstValid);
        alert("녹색제품 통합ID 인증이 필요합니다.");
        return;
      }

      const url = `/products`;

      const productData = {
        productCd: this.addModalData.productCd,
        greenProductId: this.addModalData.greenProductId,
        productNm: this.addModalData.productNm,
        categoryCd: this.addModalData.categoryCd,
        listPrice: this.addModalData.listPrice,
        productStock: this.addModalData.productStock,
        brand: this.addModalData.brand,
        base64Image: this.addModalData.imageSrc,
        labelIdSeq: this.addModalData.labelIdSeq,
        certificationReason: this.addModalData.certificationReason,
        certificationExpirationDate: this.addModalData.certificationExpirationDate
      };

      console.log("Sending product data to server:", productData);

      axios.post(url, productData)
        .then(response => {
          alert("상품이 등록되었습니다.");
          this.$refs.modal1.closeModal();
        })
        .catch(error => {
          console.error("Failed to register product:", error.response.data);
          alert("Failed to register product: " + error.response.data.message);
        });
    },
    authenticateProduct(modalType) {
      const greenProductId = modalType === 'add' ? this.addModalData.greenProductId : this.editModalData.greenProductId;
      console.log("Authenticating product with ID:", greenProductId);
      axios.get(`/green-product?prodIxid=${greenProductId}`)
        .then(response => {
          console.log("Product authentication response:", response.data);
          const productInfo = response.data.productInfo; // productInfo 객체로 변경

          if (productInfo.prodRsst !== "01") {
            alert("인증할 수 없는 제품입니다.");
            this.prodRsstValid = false;
            console.log("녹색인증 : " + this.prodRsstValid);

            return;
          }

          this.prodRsstValid = true;
          console.log("녹색인증 : " + this.prodRsstValid);

          if (modalType === 'add') {
            this.addModalData.productNm = productInfo.prodPrnm;
            this.addModalData.previewImage = `data:image/jpeg;base64,${response.data.productImage}`;
            this.addModalData.imageSrc = response.data.productImage;
            this.addModalData.labelIdSeq = productInfo.prodCfgb;
            this.addModalData.certificationReason = productInfo.prodInrs;
            this.addModalData.certificationExpirationDate = productInfo.prodRedt;

          } else {
            this.editModalData.productNm = productInfo.prodPrnm;
            this.editModalData.previewImage = `data:image/jpeg;base64,${response.data.productImage}`;
            this.editModalData.imageSrc = response.data.productImage;
            this.editModalData.labelIdSeq = productInfo.prodCfgb;
            this.editModalData.certificationReason = productInfo.prodInrs;
            this.editModalData.certificationExpirationDate = productInfo.prodRedt;
            this.editModalData.certificationCode = productInfo.prodRsst;

          }
        })
        .catch(error => {
          console.error("Error during product authentication:", error);
          alert("Failed to authenticate product: " + error.response.data.message);
        });
    },
    resetAddModalData() {
    this.addModalData = {
      productCd: '',
      greenProductId: '',
      productNm: '',
      categoryCd: '',
      listPrice: null,
      productStock: null,
      brand: '',
      imageSrc: null,
      previewImage: null,
      categories: [],
      selectedCategory: '',
      labelIdSeq: 0,
      certificationReason: '',
      certificationExpirationDate: ''
    };
  }
  }
};
</script>

<style lang="scss" scoped>
.action-btn {
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}

.btn-primary {
  @apply ltr:border-r ltr:border-r-white rtl:border-l rtl:border-l-white ltr:border-opacity-10 rtl:border-opacity-10 last:border-r-0 hover:ring-0 hover:ring-offset-0 bg-opacity-90;

  &.active {
    @apply bg-opacity-100;
  }
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
</style>
