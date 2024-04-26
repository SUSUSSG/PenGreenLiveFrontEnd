<template>
  <div class="container mt-8">
    <div
      class="d-flex justify-content-center my-2"
      style="
        display: flex;
        justify-content: space-evenly;
        width: 70%;
        margin: auto;
      "
    >
      <CategoryItem
        v-for="category in categories"
        :key="category.name"
        :imgSrc="category.imgSrc"
        :name="category.name"
        :isSelected="selectedCategory === category.name"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem.vue";

export default {
  components: {
    CategoryItem,
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
        // 다른 카테고리들...
      ],
      selectedCategory: "전체", // 선택된 카테고리의 이름을 저장
    };
  },
  methods: {
    handleSelect(name) {
      this.selectedCategory = name; // 선택된 카테고리 업데이트
    },
  },
};
</script>
