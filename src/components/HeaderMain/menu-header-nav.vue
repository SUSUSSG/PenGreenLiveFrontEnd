<template>
  <div class="menu-wrapper">
    <div class="menu-item">
      <router-link to="/" :class="{ 'active': $route.path === '/' }">
        <Icon icon="ic:baseline-home" class="text-xl" />
        <span>홈</span>
      </router-link>
    </div>

    <div class="menu-item">
      <router-link to="/schedule" :class="{ 'active': $route.path === '/schedule' }">
        <Icon icon="ic:baseline-calendar-today" class="text-xl" />
        <span>일정표</span>
      </router-link>
    </div>

    <div class="menu-item">
      <router-link to="/environment" :class="{ 'active': $route.path === '/environment' }">
        <Icon icon="ic:baseline-eco" class="text-xl" />
        <span>환경 이야기</span>
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
  methods: {},
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 4rem;
  justify-content: center;
  align-items: center;
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
    color: #D4B886;

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