<template>
    <div class="stats-card">
      <div class="stats-header">
        <div class="stats-icon">
          <Icon :icon="icon" class="text-primary" scale="2" />
        </div>
        <div class="text-sm text-slate-600 dark:text-slate-300">
          {{ analyticsTitle }}
        </div>
      </div>
      <div class="stats-result">{{ formatNumber(analyticsResult) }}</div>
    </div>
  </template>
  
  <script>
  import Icon from "@/components/icon/index.vue";
  
  export default {
    components: {
      Icon,
    },
    props: {
      icon: {
        type: String,
        required: true,
      },
      analyticsTitle: {
        type: String,
        required: true,
      },
      analyticsResult: {
        type: String,
        required: true,
      },
    },
    methods: {
      formatNumber(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
  };
  </script>
  
  <style scoped>
  .stats-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    background-color: #ffffff;
    border: 1px solid black;
    border-radius: 10px;
  }
  
  .stats-header {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .stats-icon {
    margin-right: 10px;
  }
  
  .stats-result {
    font-size: 40px;
    font-weight: bold;
    color: black;
  }
  
  .text-primary {
    color: darkgreen;
  }
  </style>