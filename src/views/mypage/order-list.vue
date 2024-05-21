<template>
  <div style="background-color: white;">
    <TabGroup>
      <TabList class="tab-list">
        <Tab v-for="(item, i) in buttons" :key="i" v-slot="{ selected }">
          <button :class="[
            selected ? 'text-primary-500 before:w-full' : 'text-slate-500 before:w-0 dark:text-slate-300',
            'text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 focus:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2 flex-1'
          ]" class="flex-1">
            {{ item.title }}
          </button>
        </Tab>
      </TabList>

      <TabPanel>
        <orderlist v-for="(item, index) in unreviewedOrders" :key="index" :deliveryStatus="item.deliveryStatus"
                   :productImage="item.productImage" :orderDate="item.orderDate" :productNm="item.productNm"
                   :orderProductPrice="item.orderProductPrice" :productSeq="item.productSeq" :userUUID="userUUID" @review-submitted="handleReviewSubmitted" />
      </TabPanel>

      <TabPanel>
        <reviewlist v-for="(item, index) in reviewedOrders" :key="index" :deliveryStatus="item.deliveryStatus"
                    :productImage="item.productImage" :orderDate="item.orderDate" :productNm="item.productNm"
                    :orderProductPrice="item.orderProductPrice" :reviewContent="item.reviewContent"
                    :reviewSeq="item.reviewSeq" :userUUID="userUUID" @review-deleted="handleReviewDeleted"/>
      </TabPanel>
    </TabGroup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TabGroup, TabList, Tab, TabPanel } from '@headlessui/vue';
import axios from 'axios';
import orderlist from '@/components/Order/order-list.vue';
import reviewlist from '@/components/Order/review-list.vue';

const buttons = ref([
  { title: "리뷰작성" },
  { title: "작성한 리뷰" }
]);

const unreviewedOrders = ref([]);
const reviewedOrders = ref([]);
const userUUID = 'f23a72e0-1347-11ef-b085-f220affc9a21';

const fetchOrders = async (userUuid) => {
  try {
    const unreviewedResponse = await axios.get(`http://localhost:8090/unreviewed-orders/${userUuid}`);
    console.log('Unreviewed Orders:', unreviewedResponse.data); 
    unreviewedOrders.value = unreviewedResponse.data;

    const reviewedResponse = await axios.get(`http://localhost:8090/reviewed-orders/${userUuid}`);
    reviewedOrders.value = reviewedResponse.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const handleReviewSubmitted = (productSeq, reviewContent) => {
  const orderIndex = unreviewedOrders.value.findIndex(order => order.productSeq === productSeq);
  if (orderIndex !== -1) {
    const reviewedOrder = unreviewedOrders.value.splice(orderIndex, 1)[0];
    reviewedOrder.reviewYn = true;
    reviewedOrder.reviewContent = reviewContent; 
    reviewedOrders.value.push(reviewedOrder);
  }
  window.location.reload();
};

const handleReviewDeleted = (reviewSeq) => {
  const reviewIndex = reviewedOrders.value.findIndex(review => review.reviewSeq === reviewSeq);
  if (reviewIndex !== -1) {
    reviewedOrders.value.splice(reviewIndex, 1);
  }
};

onMounted(() => {
  fetchOrders(userUUID);
});
</script>

<style scoped>
.tab-list {
  display: flex; 
  justify-content: space-between; 
  align-items: stretch; 
  height: 100%; 
  list-style: none; 
  padding: 0; 
  background-color: white; 
}

.tab-list button {
  flex-grow: 1; 
  text-align: center; 
  border: none; 
  outline: none; 
  padding: 10px 0; 
  margin: 0; 
  background-color: white; 
  transition: all 0.3s ease; 
}

.tab-list button.selected {
  background-color: #e2e8f0; 
}
</style>
