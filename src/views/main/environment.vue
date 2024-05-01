<template>
  <ScrollTopButton/>
  <MenuHeaderNav  style="width: 77%; margin: auto; border: 1px solid #e6e7eb" />
  <div class="content-wrapper">
    <environmentVue/>
  </div>
</template>

<script>
import MenuHeaderNav from "@/components/HeaderMain/menu-header-nav.vue";
import ScrollTopButton from "@/components/Button/ScrollTopButton.vue";
import environmentVue from "@/components/Landing/environment.vue";

export default {
  components: {
    MenuHeaderNav,
    ScrollTopButton,
    environmentVue,
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
