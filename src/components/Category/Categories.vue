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
import Icon from "../Icon";

export default {
  components: {
    CategoryItem,
    Icon,
  },
  data() {
    return {
      categories: [
        { imgSrc: "src/assets/images/all-img/category-icon/icon-all.png", name: "전체" },
        { imgSrc: "src/assets/images/all-img/category-icon/icon-cosmetic.png", name: "뷰티" },
        { imgSrc: "src/assets/images/all-img/category-icon/icon-organic-food.png", name: "식품" },
        { imgSrc: "src/assets/images/all-img/category-icon/icon-furniture.png", name: "생활용품" },
        { imgSrc: "src/assets/images/all-img/category-icon/icon-kids.png", name: "유아동" },
        { imgSrc: "src/assets/images/all-img/category-icon/icon-tech.png", name: "테크" },
        { imgSrc: "src/assets/images/all-img/category-icon/icon-hoodie.png", name: "패션" },
      ],
      selectedCategory: "전체",
    };
  },
  methods: {
    handleSelect(name) {
      this.selectedCategory = name;
    },
  },
};
</script>
