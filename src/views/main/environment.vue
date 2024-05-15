<template>
  <ScrollTopButton />
  <MenuHeaderNav style="width: 74%; margin: auto; border: 1px solid #e6e7eb" />
  <div class="content-wrapper">
    <div style="display:flex; flex-direction:column; align-items: center;">
      <img
        src="@/assets/images/all-img/env-title.png"
        alt="Environment Title"
      />
      <img
        src="@/assets/images/all-img/env-label.png"
        alt="Environment Title"
      />
      <img src="@/assets/images/all-img/env-logo.png" alt="Environment Title" style="width:70%; margin-top: 10rem; margin-bottom:20rem;"/>
    </div>
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
  width: 74%;
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

img{
  width: 100%;
  height: auto;
}
</style>
