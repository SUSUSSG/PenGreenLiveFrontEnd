<template>
  <MenuHeaderNav />
  <hr/>
  <div class="content-wrapper">
    대충 환경이야기
    우리 펭귄 집 없어요...
  </div>
</template>

<script>
import MenuHeaderNav from "@/components/HeaderMain/menu-header-nav.vue";
export default {
  components: {
    MenuHeaderNav,
  },
};
</script>
<style scoped>
.content-wrapper {
  width: 77%;
  height: 100vh;
  margin: auto;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
}

hr {
  width: 100%;
}
</style>
