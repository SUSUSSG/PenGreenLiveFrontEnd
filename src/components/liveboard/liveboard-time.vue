<template>
  <div class="inline-flex pt-5 ml-5" id="header">
    <img src="/src/assets/images/logo/pengreenlive-logo-white.png" id="logo">

    <div class="result-display" :class="[isBroadcasting ? 'red-style' : 'black-style']">{{ resultDispalyText }}
    </div>
    <div class="ml-3">
      <div class="broadcast-title">{{ broadcastTitle }}</div>
      <div class="broadcast-time">{{ "라이브 일시 : " + formattedLiveDateTime.current + " ~ " +
        formattedLiveDateTime.oneHourLater }}</div>
    </div>

    <div class="right-content">
      <div class="ml-10" id="times">
        <div v-for="(item, i) in statistics" :key="i" class="inline-flex ml-3">
          <div class="time-card">
            <div>
              <Icon :icon="`heroicons:clock`" class="icon-style" />
            </div>
            <div>
              <div class="item-title"> {{ item.title }} </div>
              <div class="item-time"> {{ item.time }} </div>
            </div>
          </div>
        </div>
      </div>
      <div class="broadcast-controll-button">
        <Button v-on:click="toggleBroadcast()" :text="isBroadcasting ? '라이브 종료' : '라이브 시작'"
          :btnClass="isBroadcasting ? 'btn-green h-12' : 'btn-light h-12'" id="broadcastControllButton" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon/index.vue";
import Button from "@/components/Button";

import axios from "@/axios";

export default {
  components: {
    Card,
    Icon,
    Button
  },
  props: {
    broadcastTitle: String,
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
      const action = this.isBroadcasting ? 'end' : 'start';

      // 시간
      const date = new Date();
      const offset = date.getTimezoneOffset() * 60000; // 밀리초 단위로 변환
      const localDate = new Date(date.getTime() - offset);
      const time = localDate.toISOString().slice(0, 19);

      const requestData = {
        broadcastSeq: this.$route.params.broadcastId,
        time: time,
        action: action
      };


      axios.patch('/update/broadcast-time', requestData)
        .then((response) => {


          // 방송 종료 이벤트 전송 요청
          if (this.isBroadcasting) {
            axios.get(`/broadcast-end/${this.$route.params.broadcastId}`)
              .then(() => {

              })
              .catch(error => {

              });
          }

          if (this.isBroadcasting) {
            this.$emit('stop-broadcast', this.elapsedTime);
          } else {
            this.$emit('start-broadcast');
          }
          this.isBroadcasting = !this.isBroadcasting;
          this.updateResultDisplayText();
        })
        .catch(error => {

        });
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

      const year = serverLiveTime.getFullYear();
      const month = ('0' + (serverLiveTime.getMonth() + 1)).slice(-2);
      const day = ('0' + serverLiveTime.getDate()).slice(-2);
      const hours = ('0' + serverLiveTime.getHours()).slice(-2);
      const minutes = ('0' + serverLiveTime.getMinutes()).slice(-2);

      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;

      // 한 시간 뒤의 시간 계산
      const oneHourLater = new Date(serverLiveTime);
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

.time-card {
  width: 170px;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
  display: inline-flex;
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding-top: 0.75rem;
  padding: 0.5rem;
}

.result-display {
  width: 80px;
  height: 30px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 5px;
  margin-top: 15px;
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

.right-content {
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
}

.broadcast-controll-button {
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2rem;
}

.icon-style {
  height: 3rem;
  width: 3rem;
  border-radius: 9999px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.item-title {
  font-size: 0.875rem;
  color: #475569;
  margin-bottom: 5px;
  margin-top: 3px;
}

.item-time {
  font-size: 1.125rem;
  color: #0f172a;
  font-weight: 500;
  margin-bottom: 6px;
}
</style>
