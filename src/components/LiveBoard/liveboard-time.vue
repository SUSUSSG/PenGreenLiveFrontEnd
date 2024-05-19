<template>
  <div class="inline-flex pt-5 ml-5" id="header">
    <img src="/src/assets/images/logo/pengreenlive-logo-white.png" id="logo">

    <div id="resultDisplay" :class="[isBroadcasting ? 'red-style' : 'black-style']" class="mr-4">{{ resultDispalyText }}
    </div>
    <div class="row">
      <div class="broadcast-title">{{ boradcastTitle }}</div>
      <div class="broadcast-time">{{ "라이브 일시 : " + formattedLiveDateTime.current + " ~ " + formattedLiveDateTime.oneHourLater }}</div>
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
          :btnClass="isBroadcasting ? 'btn-green h-12' : 'btn-light h-12'" id="broadcastControllButton" />
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
  props: {
    boradcastTitle: String,
    liveDateTime: String
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
      if (this.isBroadcasting) {
        this.$emit('stop-broadcast', this.elapsedTime);
      } else {
        this.$emit('start-broadcast');
      }
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
  },
  computed: {
    formattedLiveDateTime() {
      // 서버에서 받아온 방송 시작 시간
      const serverLiveTime = new Date(this.liveDateTime);

      // 클라이언트의 시간대와 UTC 시간대의 차이를 보정
      const offsetInMilliseconds = new Date().getTimezoneOffset() * 60000; // 밀리초 단위로 변환
      const adjustedServerLiveTime = new Date(serverLiveTime.getTime() + offsetInMilliseconds); // 클라이언트의 시간대에 맞게 조정

      const year = adjustedServerLiveTime.getFullYear();
      const month = ('0' + (adjustedServerLiveTime.getMonth() + 1)).slice(-2);
      const day = ('0' + adjustedServerLiveTime.getDate()).slice(-2);
      const hours = ('0' + adjustedServerLiveTime.getHours()).slice(-2);
      const minutes = ('0' + adjustedServerLiveTime.getMinutes()).slice(-2);

      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;

      // 한 시간 뒤의 시간 계산
      const oneHourLater = new Date(adjustedServerLiveTime);
      oneHourLater.setHours(oneHourLater.getHours() + 1);

      const laterHours = ('0' + oneHourLater.getHours()).slice(-2);
      const laterMinutes = ('0' + oneHourLater.getMinutes()).slice(-2);

      const oneHourLaterFormattedTime = `${laterHours}:${laterMinutes}`;

      return {
        current: formattedTime,
        oneHourLater: oneHourLaterFormattedTime
      };
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
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
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

.btn-light {
  background-color: #ECE6CC;
}

.btn-green {
  background-color: #134010;
}

.broadcast-title {
  margin-bottom: 6px;
  color: #111111;
  font-weight: bold;
  font-size: large;
}
</style>
