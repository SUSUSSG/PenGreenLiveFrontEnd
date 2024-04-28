<template>
    <Card>
        <div>
            <p class="text-center 2xl:mb-10 mb-5">회원가입</p>
            <div class="relative border-b-[#000000] border-opacity-[100%] border-b pt-6"></div>
            <div class="text-center 2xl:mb-10 mb-5">
                <p>일반회원 가입</p>
                <p>PengreenLive에 오신 것을 환영합니다. 회원가입 하시면 다양한 구매 혜택을 드립니다.</p>
                <Button text="PengreenLive 회원가입" btnClass="btn-primary"/>
            </div>
            <div class="relative border-b-[#9AA2AF] border-opacity-[20%] border-b pt-6"></div>
            <div class="text-center 2xl:mb-10 mb-5">
                <p>SNS 간편 회원가입</p>
                <p>본인인증 없이 SNS 인증만으로 간편하게 회원가입 하실 수 있습니다.</p>
                <Button text="네이버 로그인" btnClass="btn-primary"/>
            </div>
        </div>
    </Card>
</template>

<script setup>
import Card from "@/components/Card";
import Button from "@/components/Button";
</script>