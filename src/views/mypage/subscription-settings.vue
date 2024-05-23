<template>
<div class="content-card">
  <div class="col">
    <p class="content-card-title">구독 중 채널</p>
    <div class="content-wrapper">
      <subscribe/>
    </div>
  </div>
</div>
</template>

<script setup>
import axios from 'axios';
import subscribe from '@/components/Subscription/subscription-channel.vue';


</script>

<style scoped>
.content-card{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 0.5px solid lightgray;
  background-color:white;
  border-radius:10px;
  padding:1rem;
}
.content-card-title{
  margin-bottom: 2rem;
}
.col{
  width:100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content: space-evenly;
}

.content-wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
