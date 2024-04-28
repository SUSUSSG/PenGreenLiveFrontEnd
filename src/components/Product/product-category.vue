<template>
  <div class="text-right mb-3">
    <Modal title="카테고리 추가" label="추가" labelClass="btn inline-flex justify-center btn-dark btn-sm mr-3" ref="modal1"
      @closed="resetModalData">
      <div class="text-base text-slate-600 dark:text-slate-300">
        <Textinput label="카테고리 " type="text" name="productcategory" v-model="productcategory"
          placeholder="추가 원하는 카테고리명을 입력하세요" class="mb-2" />

      </div>
      <template v-slot:footer>
        <Button text="등록" btnClass="btn-dark btn-sm" @click="$refs.modal1.closeModal(); resetModalData()" />
        <Button text="닫기" btnClass="btn-outline-dark btn-sm" @click="$refs.modal1.closeModal()" />
      </template>
    </Modal>

    <button class="btn inline-flex justify-center btn-sm  btn-dark"><span>삭제</span></button>
  </div>

  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <Card bodyClass="p-0">
      <header class="px-4 pt-4 pb-3 mb-3">
        <h5 class="card-title mb-0">대분류 카테고리</h5>
      </header>
      <vue-good-table :columns="columns" :rows="firstTableData" styleClass="vgt-table"
        :sort-options="{ enabled: false }" :row-style-class="rowStyleClass" id="categorytable">
        <template v-slot:table-row="props">
          <div>
            <span v-if="props.column.field == 'firstcategory'"
              :class="{ 'selected-category': selectedCategory === props.row.firstcategory }"
              @click="selectCategory(props.row.firstcategory)">
              {{ props.row.firstcategory }}
            </span>
          </div>
        </template>
      </vue-good-table>
    </Card>

    <Card bodyClass="p-0">
      <header class="px-4 pt-4 pb-3 mb-3">
        <h5 class="card-title mb-0">중분류 카테고리</h5>
      </header>
      <vue-good-table :columns="secondcolumns" :rows="secondTableData" styleClass=" vgt-table" :sort-options="{
        enabled: false, }" id="categorytable"/>
      <template v-slot:table-row="props">
        <span v-if="props.column.field == 'secondcategory'" class="cursor-pointer">
          {{ props.row.secondcategory }}
        </span>
      </template>
    </Card>
  </div>

  <div class="text-right">
    <button class="btn inline-flex justify-center btn-sm btn-dark mr-3 mt-3"><span>저장</span></button>
    <button class="btn inline-flex justify-center btn-sm  btn-dark" @click="resetForm"><span>취소</span></button>
  </div>

</template>

<script>
import Card from '@/components/Card';
import { firstTableData } from '@/constant/basic-tablle-data';
import { secondTableData } from '@/constant/basic-tablle-data';
import Modal from "../Modal/Modal.vue";
import Textinput from "@/components/Textinput/index.vue"
import Button from "@/components/Button";
export default {
  components: {
    Card,
    Modal,
    Textinput,
    Button
  },
  data() {
    return {
      selectedCategory: null,
      firstTableData,
      columns: [
        {
          label: '대분류 카테고리',
          field: 'firstcategory',
        },
      ],

      secondTableData,
      secondcolumns: [
        {
          label: '중분류 카테고리',
          field: 'secondcategory'
        }
      ]
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.$forceUpdate();
    }
  },
  computed: {
    filteredFirstTableData() {
      return this.firstTableData.filter(item => item.id < 8);
    },
    filteredSecondTableData() {
      return this.secondTableData.filter(item => item.id < 8);
    },
  },
  rowStyleClass(row) { if (this.selectedCategory === row.firstcategory) { return 'selected-category'; } return ''; }
};
</script>
<style lang="scss">
.vgt-inner-wrap {
  @apply shadow-none;
}

.selected-category td {
  background-color: #b97f7f; // 원하는 색상으로 변경하세요
}

#categorytable thead{
  display : none;
}
</style>