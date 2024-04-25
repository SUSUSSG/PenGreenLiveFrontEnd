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
    height: 250px;
}
</style>