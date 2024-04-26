<template>
    <div>
        <Card title="상품목록" noborder>
            <div class="buttons-container">
                <Modal title="상품등록" label="상품등록" labelClass="btn inline-flex justify-center btn-dark btn-sm mr-3"
                    ref="modal1">
                    <div class="text-base text-slate-600 dark:text-slate-300">
                        <Textinput label="상품코드" type="text" name="productcode" v-model="productcode" placeholder="P001"
                            class="mb-2" />
                        <div class="flex items-center"> <!-- flex 컨테이너 추가 -->
                            <Textinput label="녹색제품 통합ID" type="text" name="greenrpdouct" v-model="greenrpdouct"
                                placeholder="KR232148" class="mb-2 flex-grow" />
                            <button
                                class="btn inline-flex justify-center btn-outline-dark btn-sm ml-2 mt-5"><span>인증하기</span></button>
                        </div>
                        <Textinput label="상품명" type="text" name="productname" v-model="productname" placeholder="테스트상품1"
                            class="mb-2" />
                        <Textinput label="상품설명" type="text" name="productdescription" v-model="productdescription"
                            placeholder="테스트상품 설명" class="mb-2" />
                        <Textinput label="카테고리" type="text" name="categorycode" v-model="categorycode" placeholder="식품"
                            class="mb-2" />
                        <Textinput label="정가" type="number" name="listprice" v-model="listprice" placeholder="정가"
                            class="mb-2" />
                        <Textinput label="브랜드" type="text" name="brand" v-model="brand" placeholder="갯벌" class="mb-2" />
                        <label class="ltr:inline-block rtl:block input-label">상품이미지</label><br>
                        <input type="file" id="imageUpload" @change="handleImageUpload"
                            accept="image/jpeg, image/png, image/gif"
                            class="mt-2 text-base text-slate-600 dark:text-slate-300" />
                        <img v-if="imageSrc" :src="imageSrc" alt="대표 이미지 미리보기" style="max-width: 100px">
                    </div>
                    <template v-slot:footer>
                        <Button text="닫기" btnClass="btn-outline-dark btn-sm" @click="$refs.modal1.closeModal()" />
                        <Button text="등록" btnClass="btn-dark btn-sm" @click="$refs.modal1.closeModal()" />
                    </template>
                </Modal>

                <button class="btn inline-flex justify-center btn-outline-dark btn-sm "><span>상품삭제</span></button>

                <Modal title="상품 정보 수정" ref="editModal" :showButtons="false">
                    <div class="text-base text-slate-600 dark:text-slate-300">
                        <Textinput label="상품코드" type="text" name="editproductcode" v-model="productcode" class="mb-2" />
                        <Textinput label="상품명" type="text" name="editproductname" v-model="productname" class="mb-2" />
                        <Textinput label="카테고리" type="text" name="editcategorycode" v-model="categorycode"
                            class="mb-2" />
                        <Textinput label="정가" type="number" name="editlistprice" v-model="listprice" class="mb-2" />

                        <div>
                            <label class="ltr:inline-block rtl:block input-label">인증</label><br>
                            <div v-for="(entry, index) in customer" :key="index">
                                <img :src="entry.image" alt="인증 이미지" style="max-width: 100px">
                                <button @click="removeImage(index)">삭제</button>
                            </div>
                            <input type="file" @change="addImage" accept="image/jpeg, image/png, image/gif">
                        </div>
                    </div>
                    <template v-slot:footer>
                        <Button text="닫기" btnClass="btn-outline-dark btn-sm" @click="closeEditModal" />
                        <Button text="저장" btnClass="btn-dark btn-sm" @click="saveProductDetails" />
                    </template>
                </Modal>

            </div>

            <div class="-mx-6">
                <vue-good-table :columns="columns" styleClass=" vgt-table centered lesspadding2 table-head "
                    :rows="advancedTable" :pagination-options="{
                        enabled: true,
                        perPage: perpage,
                    }" :sort-options="{
                        enabled: false,
                    }" :select-options="{
                        enabled: true,
                        selectOnCheckboxOnly: true,
                        selectioninfoClass: 'custom-class',
                        selectionText: 'rows selected',
                        clearSelectionText: 'clear',
                        disableSelectinfo: true,
                        selectAllByGroup: true,
                    }">
                    <template v-slot:table-row="props">
                        <span v-if="props.column.field == 'productCode'" @click="openEditModal(props.row)"
                            class="cursor-pointer">
                            {{ props.row.productCode }}
                        </span>
                        <span v-if="props.column.field == 'productName'">
                            {{ props.row.productName }}
                        </span>
                        <span v-if="props.column.field == 'category'">
                            {{ props.row.category }}
                        </span>
                        <span v-if="props.column.field == 'price'">
                            {{ props.row.price }}
                        </span>
                        <span v-if="props.column.field == 'customer'" class="flex">
                            <img v-for="entry in props.row.customer" :key="entry.name" :src="entry.image"
                                :alt="entry.name" class="object-cover w-full h-full rounded-full"
                                style="width: 24px; margin-right: 5px;" />
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
            productcode: '',
            productname: '',
            categorycode: '',
            listprice: '',
            imageFile: null,
            imageSrc: null,
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
                    field: "productCode",
                },
                {
                    label: "상품명",
                    field: "productName",
                },
                {
                    label: "카테고리",
                    field: "category",
                },
                {
                    label: "판매 가격",
                    field: "price",
                },
                {
                    label: "인증",
                    field: "customer",
                    width: '130px',
                },
            ],
        };
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageSrc = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                this.imageSrc = null;
            }
        },
        openEditModal(row) {
            this.productcode = row.productCode;
            this.productname = row.productName;
            this.categorycode = row.category;
            this.listprice = row.price;
            this.customer = [...row.customer];

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
                    // 이미지 데이터를 배열에 추가
                    this.customer.push({ image: e.target.result });
                };
                reader.readAsDataURL(file);
            }
        },

        removeImage(index) {
            this.customer.splice(index, 1);
        },
        saveProductDetails() {

            const productToUpdate = this.advancedTable.find(product => product.productCode === this.productcode);
            if (productToUpdate) {
                productToUpdate.customer = this.customer;
            }

            this.$refs.editModal.closeModal();
        },
        openAddModal() {
            this.productcode = '';
            this.productname = '';
            this.categorycode = '';
            this.listprice = '';
            this.imageSrc = null;

            this.$refs.modal1.openModal();
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
    margin-bottom: 16px; // Adjust spacing as needed
}
</style>
