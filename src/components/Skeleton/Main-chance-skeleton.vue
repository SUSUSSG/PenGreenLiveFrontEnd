<template>
  <div class="item-container">
    <div class="skeleton-card">
      <div class="skeleton-img" />
      <div class="skeleton-txt" />
      <div class="row">
        <div class="skeleton-product-img" />
        <div class="col">
          <div class="skeleton-product-txt" />
          <div class="skeleton-product-txt" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.item-container {
  display: flex;
  flex-direction: row;
  width: 200px;
}

.skeleton-card {
  width: 200px;
  height: 332px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
}

.skeleton-img,
.skeleton-txt,
.skeleton-product-txt,
.skeleton-product-img {
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;
}

.skeleton-img {
  width: 100%;
  height: 266px;
}

.skeleton-txt {
  width: 100%;
  height: 20px;
  margin-top: 4px;
}

.skeleton-product-txt {
  width: 116px;
  height: 20px;
  margin-top: 4px;
  margin-left: 10px;
}

.skeleton-product-img {
  width: 44px;
  height: 44px;
  margin-top: 4px;
}

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.col {
  display: flex;
  flex-direction: column;
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
