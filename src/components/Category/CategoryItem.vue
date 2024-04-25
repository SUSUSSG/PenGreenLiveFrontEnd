<template>
    <div style="display:flex; flex-direction:column; justify-content: center; align-items: center;">
      <img :src="imgSrc" class="mb-1" alt="Description" style="width: 64px; height: 64px; border-radius: 50%" />
      <span>{{ name }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imgSrc: String,
      name: String
    }
  }
  </script>
  