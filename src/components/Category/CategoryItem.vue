<template>
  <div style="display:flex; flex-direction:column; justify-content: center; align-items: center;" @click="handleClick">
    <img :src="imgSrc" :class="{'rounded-img': isSelected}" alt="Description" style="width: 64px; height: 64px; border-radius:50%;" />
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: String,
    name: String,
    isSelected: Boolean
  },
  methods: {
    handleClick() {
      this.$emit('select', this.name);
    }
  }
}
</script>

<style>
.rounded-img {
  border: 3px solid greenyellow;
}
</style>
