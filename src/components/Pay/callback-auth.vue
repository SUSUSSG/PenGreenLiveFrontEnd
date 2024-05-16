<template>
    <div>
      <p>결과: {{ submittedData }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const submittedData = ref(null);
  
  async function getAccessToken() {
    const headers = {
      'Authorization': 'Basic dGVzdF9za19Ma0tFeXBOQXJXZFpqbTZnbE1NUThsbWVheFlHOg==',
      'Content-Type': 'application/json'
    };
  
    const formData = {
      grantType: 'AuthorizationCode',
      customerKey: 'c6thB674j9vCU4XsvcPk',
      code: 'RnYX2w532omp6gDQgVNeyqAp'
    };
  
    try {
      const response = await axios.post(
        'https://api.tosspayments.com/v1/brandpay/authorizations/access-token',
        formData,
        { headers }
      );
      submittedData.value = response.data;
    } catch (error) {
      console.error('Error submitting form:', error);
      submittedData.value = `Error: ${error.message}`;
    }
  
    console.log('결제 요청전 검증', submittedData.value);
  }
  
  onMounted(() => {
    getAccessToken();
  });
  </script>
  