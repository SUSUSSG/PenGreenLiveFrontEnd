<template>
  <div style="display: flex; flex-direction: row; justify-content:center; width:100%;">
    <div class="skeleton-side-card" />
    <div class="skeleton-card" />
    <div class="skeleton-side-card" />
  </div>
</template>

<style scoped>
.skeleton-card {
  width: 700px !important;
  height: 400px;
  
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: pulse-diagonal 1.5s infinite ease-in-out;

}
.skeleton-side-card {
  min-width: calc((100% - 700px) / 2);
  height: 400px;
 
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
