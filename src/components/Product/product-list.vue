<template>
    <div>
        <Card title="상품목록" noborder>
            <div class="buttons-container">
                <!-- 상품등록 모달 -->
                <Modal title="상품등록" label="상품등록" labelClass="btn inline-flex justify-center btn-dark btn-sm mr-3"
                       ref="modal1" @closed="resetModalData">
                    <div class="text-base text-slate-600 dark:text-slate-300">
                        <Textinput label="상품코드" type="text" name="productCd" v-model="addModalData.productCd"
                                   placeholder="P001" class="mb-2"/>
                        <div class="flex items-center">
                            <Textinput label="녹색제품 통합ID" type="text" name="greenProductCd"
                                       v-model="addModalData.greenProductCd" placeholder="KR232148" class="mb-2 flex-grow"/>
                            <button class="btn inline-flex justify-center btn-outline-dark btn-sm ml-2 mt-5"><span>인증하기</span>
                            </button>
                        </div>
                        <Textinput label="상품명" type="text" name="productNm" v-model="addModalData.productNm"
                                   placeholder="상품명을 입력하세요" class="mb-2"/>
                        <label type="text" class="ltr:inline-block rtl:block input-label">카테고리</label><br>
                        <select v-model="addModalData.categoryCd" class="form-control mb-2">
                            <option disabled value="">카테고리 선택</option>
                            <option v-for="category in categories" :key="category.value" :value="category.value">
                                {{ category.label }}
                            </option>
                        </select>
                        <Textinput label="정가" type="number" name="listPrice" v-model="addModalData.listPrice"
                                   placeholder="상품의 정가를 입력하세요." class="mb-2"/>
                        <Textinput label="재고" type="number" name="productStock" v-model="addModalData.productStock"
                                   placeholder="재고를 입력하세요." class="mb-2"/>
                        <Textinput label="브랜드" type="text" name="brand" v-model="addModalData.brand"
                                   placeholder="브랜드를 입력하세요" class="mb-2"/>
                        <label class="ltr:inline-block rtl:block input-label">상품이미지</label><br>
                        <input type="file" id="imageUpload" @change="handleAddImageUpload"
                               accept="image/jpeg, image/png, image/gif"
                               class="mt-2 text-base text-slate-600 dark:text-slate-300"/>
                        <img v-if="addModalData.previewImage" :src="addModalData.previewImage" alt="대표 이미지 미리보기"
                             style="max-width: 100px">
                    </div>
                    <template v-slot:footer>
                        <Button text="등록" btnClass="btn-dark btn-sm" @click="registerProduct"/>
                        <Button text="닫기" btnClass="btn-outline-dark btn-sm" @click="$refs.modal1.closeModal()"/>
                    </template>
                </Modal>
                <!-- 상품삭제 버튼 -->
                <button class="btn inline-flex justify-center btn-outline-dark btn-sm "><span>상품삭제</span></button>
                <!-- 상품 정보 수정 모달 -->
                <Modal title="상품 정보 수정" ref="editModal" :showButtons="false" @closed="resetEditModalData">
                    <div class="text-base text-slate-600 dark:text-slate-300">
                        <Textinput label="상품코드" type="text" name="editproductcode" v-model="editModalData.productCd"
                                   class="mb-2"/>
                        <div class="flex items-center">
                            <Textinput label="녹색제품 통합ID" type="text" name="greenProductCd"
                                       v-model="editModalData.greenProductCd" class="mb-2 flex-grow"/>
                            <button class="btn inline-flex justify-center btn-outline-dark btn-sm ml-2 mt-5">
                                <span>인증하기</span></button>
                        </div>
                        <Textinput label="상품명" type="text" name="editproductname" v-model="editModalData.productNm"
                                   class="mb-2"/>
                        <label type="text" class="ltr:inline-block rtl:block input-label">카테고리</label><br>
                        <select v-model="editModalData.categoryCd" class="form-control mb-2">
                            <option disabled value="">카테고리 선택</option>
                            <option v-for="category in categories" :key="category.value" :value="category.value">
                                {{ category.label }}
                            </option>
                        </select>
                        <Textinput label="정가" type="text" v-model="formattedListPrice" name="editlistprice"
                                   class="mb-2"/>
                        <Textinput label="재고" type="number" name="editproductstock" v-model="editModalData.productStock"
                                   class="mb-2"/>
                        <Textinput label="브랜드" type="text" name="brand" v-model="editModalData.brand" class="mb-2"/>
                        <label class="ltr:inline-block rtl:block input-label">상품이미지</label><br>
                        <input type="file" id="imageUpload" @change="handleEditImageUpload"
                               accept="image/jpeg, image/png, image/gif"
                               class="mt-2 text-base text-slate-600 dark:text-slate-300"/>
                        <img v-if="editModalData.previewImage" :src="editModalData.previewImage" alt="대표 이미지 미리보기"
                             style="max-width: 100px">
                    </div>
                    <template v-slot:footer>
                        <Button text="닫기" btnClass="btn-outline-dark btn-sm" @click="closeEditModal"/>
                        <Button text="저장" btnClass="btn-dark btn-sm" @click="updateProductDetails"/>
                    </template>
                </Modal>
            </div>
            <div class="-mx-6">
                <vue-good-table :columns="columns" styleClass="vgt-table centered lesspadding2 table-head"
                                :rows="products" :pagination-options="{ enabled: true, perPage: perpage }"
                                :sort-options="{ enabled: false }">
                    <template v-slot:table-row="props">
                        <span v-if="props.column.field === 'productCd'" @click="openEditModal(props.row)"
                              class="cursor-pointer">
                            {{ props.row.productCd }}
                        </span>
                        <span v-if="props.column.field === 'greenProductCd'">
                            {{ props.row.greenProductCd }}
                        </span>
                        <span v-if="props.column.field === 'productNm'">
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
                        <span v-if="props.column.field === 'customer'" class="flex">
                            <img v-for="entry in props.row.customer" :key="entry.name" :src="entry.image"
                                 :alt="entry.name" class="object-cover w-full h-full rounded-full"
                                 style="width: 24px; margin-right: 5px;"/>
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
import axios from 'axios';
import Card from "@/components/Card";
import Icon from "@/components/Icon";
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
                greenProductCd: '',
                productNm: '',
                categoryCd: '',
                listPrice: null,
                productStock: null,
                brand: '',
                imageSrc: null,
                previewImage: null,
                vendorSeq: 1,
                channelSeq: 1,
                categories: [],
                selectedCategory: ''
            },
            editModalData: {
                productSeq: null,
                productCd: '',
                productNm: '',
                categoryCd: '',
                listPrice: 0,
                productStock: '',
                brand: '',
                greenProductCd: '',
                imageSrc: null,
                previewImage: null,
            },
            advancedTable,
            current: 1,
            perpage: 10,
            pageRange: 5,
            searchTerm: "",
            customer: [],
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
                    label: "상품 코드",
                    field: "productCd",
                },
                {
                    label: "녹색제품 통합ID",
                    field: "greenProductCd",
                },
                {
                    label: "상품명",
                    field: "productNm",
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
                    field: "customer",
                    width: '130px',
                },
            ],
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
        this.fetchProductsByVendorSeq();
        this.fetchCategories();
    },
    methods: {
        fetchProductsByVendorSeq() {
            const vendorSeq = 1;
            if (vendorSeq) {
                this.fetchProducts(vendorSeq);
            } else {
                console.error("No vendor sequence found in session");
            }
        },
        fetchProducts(vendorSeq) {
            axios.get(`http://localhost:8090/product-list/${vendorSeq}`)
                .then(response => {
                    this.products = response.data;
                    console.log("Vendor-specific products loaded", this.products);
                })
                .catch(error => {
                    console.error("Error loading vendor-specific products:", error.response.data);
                });
        },
        fetchCategories() {
            const url = `http://localhost:8090/categorycodes`;
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
        getVendorSeqFromSession() {
            // 세션에서 vendor_seq 읽어오는 로직 구현
            return sessionStorage.getItem('vendorSeq');
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
                    const base64String = e.target.result.split(',')[1];
                    this.editModalData.imageSrc = base64String;
                };
                reader.readAsDataURL(file);
            } else {
                this.editModalData.previewImage = null;
                this.editModalData.imageSrc = null;
            }
        },
        openEditModal(row) {
            this.editModalData = {
                productSeq: row.productSeq,
                productCd: row.productCd,
                greenProductCd: row.greenProductCd,
                productNm: row.productNm,
                categoryCd: row.categoryCd,
                listPrice: row.listPrice,
                productStock: row.productStock,
                brand: row.brand,
                imageSrc: row.productImage ? row.productImage : null,
                previewImage: row.productImage ? `data:image/png;base64,${row.productImage}` : null,
            };
            console.log(this.editModalData.productSeq);  
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
            const url = `http://localhost:8090/${this.editModalData.productSeq}`;
            const productData = {
                productCd: this.editModalData.productCd,
                greenProductCd: this.editModalData.greenProductCd,
                productNm: this.editModalData.productNm,
                categoryCd: this.editModalData.categoryCd,
                listPrice: this.editModalData.listPrice,
                productStock: this.editModalData.productStock,
                brand: this.editModalData.brand,
                base64Image: this.editModalData.imageSrc, 
            };

            axios.put(url, productData)
                .then(response => {
                    alert("Product successfully updated");
                    this.$refs.editModal.closeModal();
                    this.fetchProductsByVendorSeq();
                })
                .catch(error => {
                    console.error("Failed to update product:", error.response.data);
                    alert("Failed to update product: " + error.response.data.message);
                });
        },
        registerProduct() {
            const url = `http://localhost:8090/products?vendorSeq=${this.addModalData.vendorSeq}&channelSeq=${this.addModalData.channelSeq}`;
            const productData = {
                productCd: this.addModalData.productCd,
                greenProductCd: this.addModalData.greenProductCd,
                productNm: this.addModalData.productNm,
                categoryCd: this.addModalData.categoryCd,
                listPrice: this.addModalData.listPrice,
                productStock: this.addModalData.productStock,
                brand: this.addModalData.brand,
                productImage: this.addModalData.imageSrc, 
            };

            console.log("Sending product data to server:", productData);

            axios.post(url, productData)
                .then(response => {
                    alert("Product successfully registered");
                    this.$refs.modal1.closeModal();
                    this.fetchProducts(this.addModalData.vendorSeq);
                })
                .catch(error => {
                    console.error("Failed to register product:", error.response.data);
                    alert("Failed to register product: " + error.response.data.message);
                });
        },
        formatNumber(value) {
            if (!value) return '0';
            return value.toLocaleString();
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
