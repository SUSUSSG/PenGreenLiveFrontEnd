<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
    @click="handleClick"
  >
    <img
      :src="imgSrc"
      :class="{ 'rounded-img': isSelected }"
      alt="Description"
      style="
        width: 80px;
        height: 80px;
        border-radius: 50%;
        padding: 0.5rem;
        background-color: #f0f0f0;
      "
      @mouseover="scaleUp"
      @mouseout="scaleDown"
    />
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: String,
    name: String,
    isSelected: Boolean,
  },
  methods: {
    handleClick() {
      this.$emit("select", this.name);
    },
    scaleUp(event) {
      event.target.style.transform = "scale(1.1)";
    },
    scaleDown(event) {
      event.target.style.transform = "scale(1)";
    },
  },
};
</script>

<style scoped>
.rounded-img {
  border: 2px solid #1c6d16;
  transition: transform 0.2s ease;
}

img {
  transition: transform 0.2s ease;
  border: 2px solid #f0f0f0;
}

img:hover {
  transition: transform 0.2s ease;
  transform: scale(1.1);
  border: 2px solid #ECE6CC;
}
</style>