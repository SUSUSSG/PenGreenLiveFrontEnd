<template>
  <div class="menu-wrapper">
    <div class="menu-item" v-for="date in dates" :key="date.date">
      <router-link :to="`/${padZero(date.year, 4)}${padZero(date.month, 2)}${padZero(date.day, 2)}`" :class="{ 'active': isCurrentDate(date) }">
      <span>{{ padZero(date.day, 2) }}</span>
      <span>{{ getWeekdayName(date.weekday) }}</span>
    </router-link>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      dates: [],
    };
  },
  created() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      this.dates.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        weekday: date.getDay(),
        date: date.toISOString().slice(0, 10),
      });
    }
  },
  methods: {
    isCurrentDate(date) {
      const today = new Date();
      return (
        date.year === today.getFullYear() &&
        date.month === today.getMonth() + 1 &&
        date.day === today.getDate()
      );
    },
    getWeekdayName(weekday) {
      const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];
      return weekdayNames[weekday];
    },
    padZero(value, length) {
      return String(value).padStart(length, '0');
    }
  },
};
</script>
<style lang="scss" scoped>
.menu-wrapper {
  display: flex;
  flex-direction: row;
  width: 77%;
  height: 4rem;
  justify-content: center;
  align-items: center;
  margin : 0 auto;
}

.menu-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  font-size: 1rem;
  width: 25.6%;
  height: 100%;
  position: relative;

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: lightgray;
    transition: color 0.3s;

    &:hover {
      color: #1C6D16;
    }
  }

  a.active {
    color: #1f1606;
    font-weight: 400;
    font-size: 1.7rem;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #D4B886;
    }
  }
}
</style>