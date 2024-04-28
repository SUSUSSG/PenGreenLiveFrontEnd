<template>
    <div class="bg-white rounded pt-3 px-4 mt-4 ml-5" id="productCard">
        <div class="text-base">
            상품 목록
        </div>
        <div class="-mx-6 ml-1 mt-3" id="tableCard">
            <vue-good-table :columns="columns" styleClass="vgt-table centered lesspadding2 table-head"
                :rows="liveProductTable" :pagination-options="{ enabled: false }" :sort-options="{ enabled: false }">
                <template v-slot:table-row="props">
                    <span v-if="props.column.field == 'productImg'" class="cursor-pointer relative">
                        <img :src="props.row.productImg" alt="Product Image" class="w-20 h-20 object-cover" />
                        <img v-if="props.row.showNowImg" :src="nowImg" alt="Now Image"
                            class="w-10 h-10 absolute top-0 left-0 z-10" id="nowImg" />
                    </span>
                    <span v-if="props.column.field == 'auth'" class="flex">
                        <img v-for="entry in props.row.auth" :key="entry.name" :src="entry.image" :alt="entry.name"
                            class="object-cover w-6 h-6 rounded-full mr-2" />
                    </span>
                    <span v-if="props.column.field == 'productName'" class="cursor-pointer">
                        {{ props.row.productName }}
                    </span>
                    <span v-if="props.column.field == 'discountRate'">
                        {{ props.row.discountRate }}%
                    </span>
                    <span v-if="props.column.field == 'discountPrice'">
                        {{ props.row.discountPrice.toLocaleString() }}원
                    </span>
                    <span v-if="props.column.field == 'originalPrice'">
                        {{ props.row.originalPrice.toLocaleString() }}원
                    </span>
                    <span v-if="props.column.field == 'switch'">
                        <Switch :activeClass="`bg-primary-500`" class="mb-5" badge :active="props.row.switch"
                            :prevIcon="`heroicons-outline:volume-on`" :nextIcon="`heroicons-outline:volume-off`"
                            :class="['mb-5', switchClass]" v-on:click="toggleNowImage(props.row)" />
                    </span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>

<script>
import { liveProductTable } from "@/constant/live-product-data";
import Switch from '@/components/Switch';
import nowImg from '@/assets/images/all-img/now.png'

export default {
    components: {
        Switch,
    },
    data() {
        return {
            liveProductTable,
            nowImg,
            columns: [
                {
                    label: "이미지",
                    field: "productImg",
                },
                {
                    label: "배지",
                    field: "auth",
                },
                {
                    label: "상품명",
                    field: "productName",
                },
                {
                    label: "할인율",
                    field: "discountRate",
                },
                {
                    label: "할인가",
                    field: "discountPrice",
                },
                {
                    label: "판매가",
                    field: "originalPrice",
                },
                {
                    label: "소개 설정",
                    field: "switch",
                    width: "15px"
                }
            ],
        }
    },
    methods: {
        toggleNowImage(row) {
            row.showNowImg = !row.showNowImg;
        }
    }
}
</script>

<style>
#productCard {
    width: 800px;
    max-width: 100%;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}
#tableCard {
    width: 760px;
}
#nowImg {
    widows: 70px;
    height: 20px;
}
.relative {
    position: relative;
}

.absolute {
    position: absolute;
}

.top-0 {
    top: 0;
}

.left-0 {
    left: 0;
}

.z-10 {
    z-index: 10;
}
.vgt-table {
  width: 750px;
  max-width: 100%;
}
</style>
