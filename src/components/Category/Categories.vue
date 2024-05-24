<template>
  <div class="container pt-4">
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
        :key="category.categoryCd"
        :imgSrc="category.imgSrc"
        :name="category.name"
        :isSelected="selectedCategory === category.categoryCd"
        :categoryCd="category.categoryCd"
        @category-selected="selectCategory"
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
        {
          imgSrc: "http://kr.object.ncloudstorage.com/susussg-img-bucket/category-icon/icon-all.png",
          name: "전체",
          categoryCd: null,
        },
        {
          imgSrc: "http://kr.object.ncloudstorage.com/susussg-img-bucket/category-icon/icon-cosmetic.png",
          name: "뷰티",
          categoryCd: "BCT-CTG-001",
        },
        {
          imgSrc:
            "http://kr.object.ncloudstorage.com/susussg-img-bucket/category-icon/icon-organic-food.png",
          name: "식품",
          categoryCd: "BCT-CTG-002",
        },
        {
          imgSrc: "http://kr.object.ncloudstorage.com/susussg-img-bucket/category-icon/icon-furniture.png",
          name: "생활용품",
          categoryCd: "BCT-CTG-003",
        },
        {
          imgSrc: "http://kr.object.ncloudstorage.com/susussg-img-bucket/category-icon/icon-kids.png",
          name: "유아동",
          categoryCd: "BCT-CTG-004",
        },
        {
          imgSrc: "http://kr.object.ncloudstorage.com/susussg-img-bucket/category-icon/icon-tech.png",
          name: "테크",
          categoryCd: "BCT-CTG-005",
        },
        {
          imgSrc: "http://kr.object.ncloudstorage.com/susussg-img-bucket/category-icon/icon-hoodie.png",
          name: "패션",
          categoryCd: "BCT-CTG-006",
        },
      ],
      selectedCategory: null,
            categoryCodes: {
        전체: null,
        뷰티: "BCT-CTG-001",
        식품: "BCT-CTG-002",
        생활용품: "BCT-CTG-003",
        유아동: "BCT-CTG-004",
        테크: "BCT-CTG-005",
        패션: "BCT-CTG-006",
      },
    };
  },
  methods: {
    handleSelect(name) {
      this.selectedCategory = name;
    },
    selectCategory(categoryCd) {
      this.$emit("category-selected", categoryCd);
    console.log("Selected Category Code: ", categoryCd);
    this.selectedCategory = categoryCd;

    },
  },
};
</script>
