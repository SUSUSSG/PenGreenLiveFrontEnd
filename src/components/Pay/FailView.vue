<template>
  <div id="info" class="box_section" style="width: 600px">
    <img style="width: 100px" src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" />
    <h4>결제를 실패했어요</h4>

    <div class="p-grid typography--p" style="margin-top: 50px">
      <div class="p-grid-col text--left"><b>에러메시지</b></div>
      <div class="p-grid-col text--right" id="message">{{ this.$route.query.message }}</div>
    </div>
    <div class="p-grid typography--p" style="margin-top: 10px">
      <div class="p-grid-col text--left"><b>에러코드</b></div>
      <div class="p-grid-col text--right" id="code">{{ this.$route.query.code }}</div>
    </div>
  </div>
</template>

<script setup>
  import "@/components/Pay/style.css";
</script>