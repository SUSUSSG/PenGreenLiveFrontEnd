<template>
  <div class="2xl:col-span-9 lg:col-span-8 col-span-12">
    <div class="grid md:grid-cols-3 grid-cols-1 gap-4">
      <div v-for="(item, i) in statistics" :key="i">
        <Card bodyClass="pt-4 pb-3 px-4">
          <div class="flex space-x-3 rtl:space-x-reverse">
            <div class="flex-none">
              <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl"
                :class="`${item.bg} ${item.text}`">
                <Icon :icon="item.icon" />
              </div>
            </div>
            <div class="row">
              <div class="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                {{ item.title }}
              </div>
              <div class="text-slate-900 dark:text-white text-lg font-medium">
                {{ item.count }}
              </div>
            </div>
          </div>
          <!-- <div class="ltr:ml-auto rtl:mr-auto max-w-[124px]">
            <apexchart type="area" height="41" width="124" :options="item.name.chartOptions" :series="item.name.series" />
          </div> -->
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon";

export default {
  components: {
    Card,
    Icon,
  },
  data() {
    return {
      statistics: [
        {
          name: "time1",
          title: "현재시간",
          count: "00:00:00",
          text: "text-white",
          icon: "clock",
        },
        {
          name: "time2", // 중복 제거
          title: "경과시간",
          count: "00:00:00",
          text: "text-white",
          icon: "clock",
        },
        {
          name: "time3", // 고유한 값으로 수정
          title: "남은시간",
          count: "00:00:00",
          text: "text-white",
          icon: "clock",
        }
      ]
    }
  }
};
</script>

<style></style>
