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
    <div class="skeleton-channel-image"></div>
    <div class="skeleton-channel-name"></div>
  </div>
</template>

<style scoped>
.skeleton-channel-image {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;
  margin-right: 20px;
}

.skeleton-channel-name {
  width: 90px;
  height: 24px;
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;
  margin-right: 80px;
}
.skeleton-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 16px;
  margin-bottom: 16px;
  align-content: center;
  align-items: center;
}

.skeleton-time {
  width: 60px;
  height: 30px;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;
}

.skeleton-thumbnail {
  width: 180px;
  height: 240px;
  border-radius: 8px;
  margin-right: 16px;
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;
}

.skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.skeleton-title {
  width: 50%;
  height: 20px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;
}

.skeleton-text {
  width: 80%;
  height: 16px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;
}

.skeleton-product {
  display: flex;
  align-items: center;
}

.skeleton-product-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 16px;
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;
}

.skeleton-product-text {
  width: 30%;
  height: 16px;
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;
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
