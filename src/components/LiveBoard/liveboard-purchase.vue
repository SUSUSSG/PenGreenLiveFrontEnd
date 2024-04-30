<template>
    <div class="h-full">
      <Card
        img="src/assets/images/all-img/product-sample.jpg"
        noborder
      >
        <div>동구밭</div>
        <div>동구밭 중건성 헤어케어 5종 기획세트</div>
        <p class="pb-4">
            <span class="text-slate-900 dark:text-slate-300 text-base font-medium mt-2 ltr:mr-2 rtl:mr-2 text-red-500">30%</span>
            <del class="text-slate-500 dark:text-slate-500 font-normal text-base">47,500</del>
        </p>
        <div>33,000원</div>
        <div>
            <TabGroup>
                <TabList class="lg:space-x-8 md:space-x-4 space-x-0">
                    <Tab
                        v-slot="{ selected }"
                        as="template"
                        v-for="(item, i) in buttons"
                        :key="i"
                    >
                        <button
                        :class="[
                            selected
                            ? 'text-primary-500 before:w-full'
                            : 'text-slate-500 before:w-0 dark:text-slate-300',
                        ]"
                        class="text-sm w-[50%] font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2"
                        >
                        {{ item.title }}
                        </button>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                            <img src="src/assets/images/all-img/product-explain-sample.jpg">
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                            <div>
                                <p>AI에 의해 요약된 리뷰입니다!</p>
                                <h6>가성비가 뛰어나고 생각보다 배송이 빠르게 옵니다.</h6>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
      </Card>
    </div>
</template>


<script>
    import Card from "@/components/Card";
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
    
    export default {
        components: {
            Card,
            TabGroup, 
            TabList, 
            Tab, 
            TabPanels, 
            TabPanel
        },
        data() {
            return {
                activeTab: 'description',
                buttons: [
                    {
                        title: '상품정보',
                    },
                    {
                        title: '리뷰',
                    },
                ]
            };
        }
    };
</script>

<style>
.tab-titles button {
    width: full;
    padding: 10px;
    margin-right: 5px;
    border-bottom: solid 1px #ccc;
}

.tab-titles button.active[data-type="A"] {
    border-bottom: solid 2px #222222;
}
.tab-content {
  padding: 20px;
  border-radius: 5px;
}

</style>