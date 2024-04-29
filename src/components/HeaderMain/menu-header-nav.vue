<template>
  <div class="menu-wrapper">
    <div class="menu-item">
      <router-link to="/" :class="{ 'active': $route.path === '/' }">
        <Icon icon="ic:baseline-home" class="text-2xl" />
        <span>홈</span>
      </router-link>
    </div>

    <div class="menu-item">
      <router-link to="/schedule" :class="{ 'active': $route.path === '/schedule' }">
        <Icon icon="ic:baseline-calendar-today" class="text-2xl" />
        <span>일정표</span>
      </router-link>
    </div>

    <div class="menu-item">
      <router-link to="/environment" :class="{ 'active': $route.path === '/environment' }">
        <Icon icon="ic:baseline-eco" class="text-2xl" />
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
  justify-content: space-evenly;
  align-items: center;
}

.menu-item {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  font-size: 1.2rem;

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: lightgray;
  }

  a.active {
    color: #1C6D16;
  }
}
</style>