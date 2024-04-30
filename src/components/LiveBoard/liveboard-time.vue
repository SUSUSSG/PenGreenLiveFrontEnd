<template>
  <div class="inline-flex pt-5 ml-5" id="header">
    <img src="/src/assets/images/logo/pengreenlive-logo-white.png" id="logo">

    <div id="resultDisplay" :class="[isBroadcasting ? 'red-style' : 'black-style']" class="mr-4"> {{ resultDispalyText }}
    </div>
    <div class="row">
      <div class="text-lg text-slate-900 dark:text-white font-medium mb-[6px]"> {{ boradcastTitle }}</div>
      <div> {{ "라이브 일시 " + boradcastDate }}</div>
    </div>

    <div class="inline-flex flex-grow items-center justify-end">
      <div class="row ml-10" id="times">
        <div v-for="(item, i) in statistics" :key="i" class="inline-flex ml-3">
          <div class="inline-flex bg-white rounded pt-3 px-4 pl-0" id="timeCard">
            <div>
              <div class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl">
                <Icon :icon="`heroicons:clock`" />
              </div>
            </div>
            <div>
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
      <div class="inline-flex flex-grow items-center justify-end mr-8">
        <Button v-on:click="toggleBroadcast()" :text="isBroadcasting ? '라이브 종료' : '라이브 시작'"
          :btnClass="isBroadcasting ? 'btn-primary h-12' : 'btn-dark h-12'" id="broadcastControllButton" />
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
      remainingTime: 3600,
      boradcastTitle: "어린이날 맞이 깜짝 라이브 이벤트!! 독도 토너~",
      boradcastDate: "2024-03-24 14:30 ~ 15:30",
      resultDispalyText: '대기',
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
      this.updateResultDisplayText();
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
    updateResultDisplayText() {
      this.resultDispalyText = this.isBroadcasting ? '라이브' : '대기';
    }
  }
};
</script>

<style>
#header {
  width: 100%;
  height: 100px;
}

#timeCard {
  width: 150px;
}

#resultDisplay {
  width: 80px;
  height: 30px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.red-style {
  color: red;
  border: 1px solid red;
}

.black-style {
  color: black;
  border: 1px solid black;
}

#logo {
  width: 150px;
  height: 50px;
  margin-right: 20px;
}
</style>
