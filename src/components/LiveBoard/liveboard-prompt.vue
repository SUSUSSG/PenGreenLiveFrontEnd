<template>
    <div class="bg-white rounded pt-3 px-4 mt-4 ml-5" id="promptCard">
        <div class="text-base mb-3">
            프롬프터
        </div>
        <Textarea name="largesize" placeholder="여기에 작성해주세요" rows="8"></Textarea>
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

        }
    }
}
</script>
  
<style>
#promptCard {
    width: 800px;
    max-width: 100%;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}
</style>