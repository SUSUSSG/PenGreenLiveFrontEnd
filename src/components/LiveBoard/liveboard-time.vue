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
    <div v-for="(item, i) in statistics" :key="i" class="inline-flex ml-3">
      <div class="inline-flex  bg-white rounded pt-3 px-4 mt-4 pl-0">
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
          time: '',
        },
        {
          name: "time2",
          title: "경과시간",
          time: '00:00:00',
        },
        {
          name: "time3",
          title: "남은시간",
          time: "01:00:00",
        }
      ],
      isBroadcasting: false,
      //초 단위
      elapsedTime: 0,
      remainingTime: 3600
    }
  },
  mounted() {
    this.getCurrentTime();
    setInterval(this.getCurrentTime, 1000);
    setInterval(this.updateTimes, 1000);
  },
  methods: {
    toggleBroadcast() {
      this.isBroadcasting = !this.isBroadcasting;
    },
    getCurrentTime() {
      let now = new Date();
      this.statistics[0].time = this.addZero(now.getHours()) + ":" + this.addZero(now.getMinutes()) + ":" + this.addZero(now.getSeconds());
    },
    updateTimes() {
      if (this.isBroadcasting == true) {
        this.elapsedTime++;

        this.remainingTime = 3600 - this.elapsedTime;

        this.statistics[1].time = this.formatTime(this.elapsedTime);
        this.statistics[2].time = this.formatTime(this.remainingTime);
      }
    },
    formatTime(time) {
      let seconds = time % 60;
      let minutes = Math.floor(time / 60) % 60;
      let hours = Math.floor(time / 3600);
      return `${this.addZero(hours)}:${this.addZero(minutes)}:${this.addZero(seconds)}`;
    },
    addZero(number) {
      return number < 10 ? "0" + number : number;
    },
  }
};
</script>

<style></style>
