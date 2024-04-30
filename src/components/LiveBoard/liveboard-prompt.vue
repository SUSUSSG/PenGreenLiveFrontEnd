<template>
    <div class="bg-white rounded p-4" id="promptCard">
        <div class="text-base mb-3">
            프롬프터
        </div>
        <Textarea name="largesize" placeholder="여기에 작성해주세요" rows="8" v-model="promptText"></Textarea>
    </div>
</template>
  
<script>
import Textarea from "@/components/Textarea";

export default {
    components: {
        Textarea
    },
    data() {
        return {
            promptText: ''
        };
    },
    mounted() {
        // 페이지가 새로고침되었을 때 저장된 텍스트를 복원합니다.
        this.promptText = localStorage.getItem('promptText') || '';
    },
    watch: {
        // 텍스트가 변경될 때마다 로컬 스토리지에 저장합니다.
        promptText(value) {
            localStorage.setItem('promptText', value);
        }
    }
}
</script>
  
<style>
#promptCard {
    width: 100%;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    margin-top: 14px;
}
</style>
