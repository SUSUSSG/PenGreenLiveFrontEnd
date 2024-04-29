<template>


    <orderlist v-for="(item, index) in orderData" 
    :key="index" 
    :deliveryStatus="item.deliveryStatus"
    :productImgUrl="item.productImgUrl"
    :orderDate="item.orderDate" 
    :productName="item.productName" 
    :price="item.price" class="mt-3" />

</template>
<script>
import orderlist from '@/components/Order/order-list.vue';
import reviewtab from '@/components/Order/review-tab.vue';
export default {
    components: {
        orderlist,
        reviewtab
    },
    data() {
        return {
            orderData: [
                {
                    deliveryStatus: "배송완료",
                    productImgUrl: "http://via.placeholder.com/100x100",
                    orderDate: "2022-03-22",
                    productName: "식품1",
                    price: 25000

                },
                {
                    deliveryStatus: "배송미완료",
                    productImgUrl: "http://via.placeholder.com/100x100",
                    orderDate: "2022-04-01",
                    productName: "유아동1",
                    price: 50000

                },
                {
                    deliveryStatus: "배송중",
                    productImgUrl: "http://via.placeholder.com/100x100",
                    orderDate: "2022-04-22",
                    productName: "패션1",
                    price: 41000

                },
            ]
        };
    }
};
</script>
<style lang=""></style>