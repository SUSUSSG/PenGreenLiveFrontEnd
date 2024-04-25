<template>
    <div class="bg-white rounded pt-3 px-4 mt-4 ml-5" id="chatCard">
        <div class="d-flex justify-content-between align-items-center">
            <div class="text-base">
                채팅
            </div>
            <div class="text-end">
                <Button icon="fluent:add-48-filled"
                    btnClass="btn-dark rounded-[999px] p-0 h-8 w-8 flex items-center justify-center rounded-full">
                </Button>
            </div>
        </div>
        <div class="mt-3">
            <Alert type="primary-light" dismissible>
                채팅 공지가 올라온다~
            </Alert>
        </div>
    </div>
</template>
  
<script>
import Card from "@/components/Card";
import Alert from "@/components/Alert";
import Button from "@/components/Button"
import {
    alertType4
} from "@/constant/data";
export default {
    components: {
        Card,
        Alert,
        Button
    },
    data() {
        return {
            alertType4
        }
    }
}
</script>
  
<style>
#chatCard {
    width: 400px;
    height: 500px;
}
</style>
  