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
    async loadAnimation() {
      try {
        const response = await fetch(this.animationPath);
        const animationData = await response.json();

        lottie.loadAnimation({
          container: this.$refs.lottieContainer,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animationData,
        });
      } catch (error) {

      }
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
