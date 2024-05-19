<template>
  <div ref="lottieContainer" class="lottie-container"></div>
</template>

<script>
import lottie from "lottie-web";

export default {
  name: "LottieAnimation",
  props: {
    animationPath: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.loadAnimation();
  },
  methods: {
    loadAnimation() {
      lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: this.animationPath,
      });
    },
  },
};
</script>

<style scoped>
.lottie-container {
  width: 100%;
  height: 100%;
}
</style>
