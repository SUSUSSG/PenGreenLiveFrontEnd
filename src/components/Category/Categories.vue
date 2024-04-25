<template>
    <div class="container mt-8">
      <div class="d-flex justify-content-center my-2" style="display:flex;justify-content: space-evenly;">
        <CategoryItem
          v-for="category in categories"
          :key="category.name"
          :imgSrc="category.imgSrc"
          :name="category.name"
        />
      </div>
    </div>
  </template>
  
  <script>
  import CategoryItem from './CategoryItem.vue';
  
  export default {
    components: {
      CategoryItem
    },
    data() {
      return {
        categories: [
          { imgSrc: "http://via.placeholder.com/80x80", name: "전체" },
          { imgSrc: "http://via.placeholder.com/80x80", name: "뷰티" },
          { imgSrc: "http://via.placeholder.com/80x80", name: "식품" },
          { imgSrc: "http://via.placeholder.com/80x80", name: "패션" },
          { imgSrc: "http://via.placeholder.com/80x80", name: "라이프" },
          { imgSrc: "http://via.placeholder.com/80x80", name: "유아동" },
          { imgSrc: "http://via.placeholder.com/80x80", name: "테크" },

        ]
      };
    }
  };
  </script>
  