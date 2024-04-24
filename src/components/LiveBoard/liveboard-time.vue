<template>
  <div v-if="isBraodcasting">
    <Button v-on:click="toggleBroadcase()">방송 종료</Button>
    <Button text="danger" btnClass="btn-outline-danger rounded-[999px]">방송 중</Button>
  </div>
  <div v-else>
    <Button v-on:click="toggleBroadcase()" text="Dark" btnClass="btn-dark">방송 시작</Button>
    <Button text="dark" btnClass="btn-outline-dark rounded-[999px]">방송 대기</Button>
  </div>
  <div class="row">
    <div v-for="(item, i) in statistics" v-on:key="i">
      <Card>
        <div>
          <div></div>
          <div>
            <div class="">
              {{ item.title }}
            </div>
            <div class="">
              {{ item.time }}
            </div>
          </div>
        </div>
      </Card>
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
          text: "text-white",
          icon: "clock",
        },
        {
          name: "time2",
          title: "경과시간",
          time: "00:00:00",
          text: "text-white",
          icon: "clock",
        },
        {
          name: "time3",
          title: "남은시간",
          time: "00:00:00",
          text: "text-white",
          icon: "clock",
        }
      ],
      isBraodcasting: false,
    }
  },
  computed: {
    broadcastAction() {
      return this.isBraodcasting ? "방송종료" : "방송시작";
    },
    broadcastStatus() {
      return this.isBraodcasting ? "방송중" : "방송대기";
    }
  },
  methods: {
    toggleBroadcase() {
      this.isBraodcasting = !this.isBraodcasting;
      //console.log("isBraodcasting 상태:", this.isBraodcasting);
    }
  }
};
</script>

<style></style>
