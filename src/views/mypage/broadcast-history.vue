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
                <BroadcastHistory v-for="(item, index) in broadcasthistoryData" :key="index"
                    :broadcast-title="item.broadcastTitle" :broadcast-image="item.broadcastImage"
                    :product-image="item.productImage" :product-nm="item.productNm" :list-price="item.listPrice"
                    :user-uuid="item.userUUID" :channelNm="item.channelNm" :viewedDate="item.viewedDate" 
                    :channelImage="item.channelImage"/>
            </TabPanel>

            
        </TabGroup>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { TabGroup, TabList, Tab, TabPanel } from '@headlessui/vue'
import BroadcastHistory from '@/components/Card/broadcast-historyCard.vue';


let userUUID = null;

onMounted(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
        userUUID = JSON.parse(storedUser).userUuid;
        console.log("uuid ", userUUID);
    }
    fetchRecentBroadcasts(userUUID);
});


const buttons = ref([
    { title: "최근 본 방송" },
]);

const broadcasthistoryData = ref([]);
const producthistoryData = ref([]);

const fetchRecentBroadcasts = async (userUUID) => {
    try {
        const recentlyViewedResponse = await axios.get(`http://localhost:8090/recently-viewed/broadcasts`, {
            params: { userUUID: userUUID }
        });
        console.log('Recently Viewed Broadcasts:', recentlyViewedResponse.data);
        broadcasthistoryData.value = recentlyViewedResponse.data;

    } catch (error) {
        console.error('Error fetching broadcasts:', error);
    }
};



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

.header,
.product-row {
    display: flex;
    align-items: center;
    padding-top: 2.5rem;
    padding-left: 2.5rem;
    padding-bottom: 1.5rem;
    ;
    border-bottom: 1px solid #ddd;
}

.header,
.header-item {
    font-weight: bold;
}

.header-item,
.product-row div {
    flex: 1;
    text-align: left;
}
</style>