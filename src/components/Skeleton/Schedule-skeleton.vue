<template>
    <div class="skeleton-card">
      <div class="skeleton-time"></div>
      <div class="skeleton-thumbnail"></div>
      <div class="skeleton-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-product">
          <div class="skeleton-product-image"></div>
          <div class="skeleton-product-text"></div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .skeleton-card {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 200%;
    animation: pulse-diagonal 1.5s infinite ease-in-out;
    align-content: center;
    align-items: center;
  }
  
  .skeleton-time {
    width: 60px;
    height: 30px;
    background: #e0e0e0;
    margin-left: 1rem;
    margin-right: 1rem;
    border-radius: 8px;
  }
  
  .skeleton-thumbnail {
    width: 180px;
    height: 240px;
    background: #e0e0e0;
    border-radius: 8px;
    margin-right: 16px;
  }
  
  .skeleton-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .skeleton-title {
    width: 50%;
    height: 20px;
    background: #e0e0e0;
    margin-bottom: 8px;
  }
  
  .skeleton-text {
    width: 80%;
    height: 16px;
    background: #e0e0e0;
    margin-bottom: 16px;
  }
  
  .skeleton-product {
    display: flex;
    align-items: center;
  }
  
  .skeleton-product-image {
    width: 60px;
    height: 60px;
    background: #e0e0e0;
    border-radius: 8px;
    margin-right: 16px;
  }
  
  .skeleton-product-text {
    width: 30%;
    height: 16px;
    background: #e0e0e0;
  }
  
  @keyframes pulse-diagonal {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  </style>
  