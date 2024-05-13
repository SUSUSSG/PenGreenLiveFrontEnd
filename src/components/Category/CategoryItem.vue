<template>
  <div
    @click="handleClick"
    style="display: flex; flex-direction: column; align-items: center;"
  >
    <img :src="imgSrc" alt="Description"  :class="{ 'selected-img-border': isSelected }" style="
        width: 64px;
        height: 64px;
        border-radius: 50%;
        padding: 0.5rem;
        background-color: #f0f0f0;
      "
      @mouseover="scaleUp"
      @mouseout="scaleDown"/>
    <span>{{ name }}</span>
  </div>
</template>
<script>
export default {
  props: {
    imgSrc: String,
    name: String,
    isSelected: Boolean,
    categoryCd: String,
  },
  methods: {
    handleClick() {
      this.$emit('category-selected', this.categoryCd);
    },
  },
};
</script>

<style scoped>

.category-name {
  font-size: 12px;
  margin-top: 8px;
}
.rounded-img {
  border: 2px solid #1c6d16!important;
  transition: transform 0.2s ease;
}
.selected-border {
  border: 2px solid green!important;
}

img {
  transition: transform 0.2s ease;
  border: 2px solid #f0f0f0;
}
.selected-img-border {
  border: 2px solid green!important;
}
img:hover {
  transition: transform 0.2s ease;
  transform: scale(1.1);
  border: 2px solid #ECE6CC;
}
</style>
