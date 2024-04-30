<template>
    <div class="scroll-top-btn" v-show="showScrollBtn" @click="scrollToTop">
      <span>↑</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ScrollTopButton',
    data() {
      return {
        showScrollBtn: false,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        this.showScrollBtn = window.pageYOffset > 200;
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .scroll-top-btn {
    position: fixed;
    bottom: 40px;
    right: 120px;
    width: 48px;
    height: 48px;
    background-color: #1C6D16;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  
  .scroll-top-btn:hover {
    opacity: 1;
    background-color : #134010;
  }
  </style>