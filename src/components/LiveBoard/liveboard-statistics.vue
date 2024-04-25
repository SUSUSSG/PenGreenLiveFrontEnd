<template>
    <div class="bg-white rounded pt-3 px-4 mt-4 ml-5" id="statisticsCard">
        <div class="text-base">
            정보
        </div>
        <div
            style="background-color:blanchedalmond; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 10px;">
            <div v-for="(item, i) in statistics" :key="i" class="inline-flex">
                <div class="inline-flex justify-content-center rounded  mt-4 pl-0" id="basicCard">
                        <div class="d-flex justify-content-center">
                            <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
                                {{ item.title }}
                            </div>
                            <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">
                                {{ item.time }}
                            </div>
                        </div>
                        <div>
                            <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl">
                                <Icon :icon="`heroicons:clock`" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
</template>
  
<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Button from "@/components/Button";

export default {
    components: {
        Card,
        Icon,
        Button,
    },
    data() {
        return {
            statistics: [
                {
                    name: "statistics1",
                    title: "실시간 접속자",
                    time: "11",
                },
                {
                    name: "statistics2",
                    title: "누적 접속자",
                    time: "12,333",
                },
                {
                    name: "statistics3",
                    title: "좋아요",
                    time: "1,222,222",
                },
                {
                    name: "statistics4",
                    title: "실시간 접속자",
                    time: "11",
                },
                {
                    name: "statistics5",
                    title: "누적 접속자",
                    time: "12,333",
                },
                {
                    name: "statistics6",
                    title: "좋아요",
                    time: "1,222,222",
                }
            ],
        }
    },
    mounted() {

    },
    methods: {

    }
};
</script>
  
<style>
#statisticsCard {
    width: 800px;
    height: 250px;
}

#basicCard {
    width: 200px;
    border: 1px solid #134010;
}
</style>