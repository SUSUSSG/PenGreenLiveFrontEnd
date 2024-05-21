<template>
  <div>
      <VueDaumPostcode @complete="onComplete" @close="onClose"/>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { VueDaumPostcode } from 'vue-daum-postcode';

  const onComplete = (data) => {
    const addressData = {
        address: data.address,
        zonecode: data.zonecode,
        buildingName: data.buildingName,
    };
    
    window.opener.postMessage(addressData, window.location.origin);
    window.close();
  };

  const onClose = (state) => {
    window.close();
  };
</script>