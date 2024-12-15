<template>
    <div>
      <h3>브랜드페이 미동의 약관</h3>
      <ul>
        <li v-for="term in unagreedTerms" :key="term.id">
            <a :href="term.url" target="_blank" rel="noopener noreferrer">
            {{ term.title }}
            </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from '@/axios'; 
  
  const unagreedTerms = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get('/brandpay/unagreed-terms');
      
      unagreedTerms.value = response.data; 
      console.log('Unagreed Terms:', unagreedTerms.value);
    } catch (error) {
      console.error('Error fetching unagreed terms:', error);
    }
  });
  </script>
  