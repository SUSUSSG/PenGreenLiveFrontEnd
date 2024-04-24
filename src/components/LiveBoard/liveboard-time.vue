<template>
  <div class="btn inline-flex justify-center btn-outline-danger rounded-[999px]">
    {{ buttonText2 }}
  </div>
  <div>
    <Button text="Dark" btnClass="btn-dark">{{ buttonText }}</Button>
  </div>
  <div class="row">
    <div v-for="(item, i) in statistics" :key="i">
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
      buttonText2: "방송중",
      buttonText: "방송종료",
    }
  },
};
</script>

<style></style>
