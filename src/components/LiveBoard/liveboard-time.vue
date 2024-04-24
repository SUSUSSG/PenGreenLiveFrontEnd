<template>
  <div v-if="isBroadcasting">
    <Button v-on:click="toggleBroadcast()">라이브 종료</Button>
    <Button text="danger" btnClass="btn-outline-danger rounded-[999px]">라이브</Button>
  </div>
  <div v-else>
    <Button v-on:click="toggleBroadcast()" text="Dark" btnClass="btn-dark">라이브 시작</Button>
    <Button text="dark" btnClass="btn-outline-dark rounded-[999px]">대기</Button>
  </div>
  <div class="row">
    <div v-for="(item, i) in statistics" :key="i">
      <div class="inline-flex space-x-3 bg-white rounded pt-3 px-4 mt-4">
        <div class="flex-none">
          <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl"
            :class="`${item.bg} ${item.text}`">
            <Icon :icon="`heroicons:clock`" />
          </div>
        </div>
        <div class="flex-1">
          <div class="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
            {{ item.title }}
          </div>
          <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">
            {{ item.time }}
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
    Button
  },
  data() {
    return {
      statistics: [
        {
          name: "time1",
          title: "현재시간",
          time: "00:00:00",
        },
        {
          name: "time2",
          title: "경과시간",
          time: "00:00:00",
        },
        {
          name: "time3",
          title: "남은시간",
          time: "00:00:00",
        }
      ],
      isBroadcasting: false,
    }
  },
  methods: {
    toggleBroadcast() {
      this.isBroadcasting = !this.isBroadcasting;
    }
  }
};
</script>

<style></style>
