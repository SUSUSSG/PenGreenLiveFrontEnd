<template>
    <div>
        <Card title="상품목록" noborder>
            <div class="buttons-container">
                <button class="btn inline-flex justify-center btn-dark btn-sm mr-3"><span>상품등록</span></button>
                <button class="btn inline-flex justify-center btn-outline-dark btn-sm "><span>상품삭제</span></button>
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
                        <span v-if="props.column.field == 'productCode'">
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
export default {
    components: {
        Pagination,
        Icon,
        Tooltip,
        Card,
    },
    data() {
        return {
            advancedTable,
            current: 1,
            perpage: 10,
            pageRange: 5,
            searchTerm: "",
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
                    width : '130px',
                },
            ],
        };
    },
};
</script>
<style lang="scss" scoped>
.action-btn {
    @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
.btn-primary
{
    @apply ltr:border-r ltr:border-r-white rtl:border-l rtl:border-l-white ltr:border-opacity-10 rtl:border-opacity-10  last:border-r-0 hover:ring-0 hover:ring-offset-0 bg-opacity-90;
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