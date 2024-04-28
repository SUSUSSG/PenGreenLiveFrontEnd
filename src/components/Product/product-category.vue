<template>
  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <Card bodyClass="p-0">
      <header class="px-4 pt-4 pb-3 mb-3">
        <h5 class="card-title mb-0">대분류 카테고리</h5>
      </header>
      <vue-good-table :columns="columns" :rows="firstTableData" styleClass=" vgt-table" :sort-options="{
        enabled: false,
      }" />
      <template v-slot:table-row="props">
        <span v-if="props.column.field == 'firstcategory'" class="cursor-pointer">
          {{ props.row.firstcategory }}
        </span>
      </template>
    </Card>

    <Card bodyClass="p-0">
      <header class="px-4 pt-4 pb-3 mb-3">
        <h5 class="card-title mb-0">중분류 카테고리</h5>
      </header>
      <vue-good-table :columns="secondcolumns" :rows="secondTableData" styleClass=" vgt-table" :sort-options="{
        enabled: false,
      }" />
      <template v-slot:table-row="props">
        <span v-if="props.column.field == 'secondcategory'" class="cursor-pointer">
          {{ props.row.secondcategory }}
        </span>
      </template>
    </Card>
  </div>

</template>

<script>
import Card from '@/components/Card';
import { firstTableData } from '@/constant/basic-tablle-data';
import { secondTableData } from '@/constant/basic-tablle-data';
export default {
  components: {
    Card,
  },
  data() {
    return {
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
  computed: {
    newtable: function () {
      return this.firstTableData.filter(function (item) {
        return Boolean(item.id < 8);
      });
    },
    newtable: function () {
      return this.secondTableData.filter(function (item) {
        return Boolean(item.id < 8);
      });
    },
  },
};
</script>
<style lang="scss">
.vgt-inner-wrap {
  @apply shadow-none;
}
</style>