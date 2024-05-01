<template>
    <div class="document">
        <div class="doc-member">
            <div class="fence mx-auto">
                <h1 class="text-center doc-title" data-type="A">회원가입</h1>
                
                <div class="member-join-type">
                    <div class="join-first-dv1 text-center">
                        <h2 class="stit">일반회원 가입</h2>
                        <p class="guide-txt">PengreenLive에 오신 것을 환영합니다. 회원가입 하시면 다양한 구매 혜택을 드립니다.</p>
                        <Button class="link-join mt-[0.7rem] w-[300px]" text="PengreenLive 회원가입" onclick="location.href='/join'"/>
                    </div>
                    <div class="join-first-dv2 text-center">
                        <h2 class="stit">SNS 간편 회원가입</h2>
                        <p class="guide-txt">본인인증 없이 SNS 인증만으로 간편하게 회원가입 하실 수 있습니다.</p>
                        <div class="mx-auto w-[300px]">
                            <ul class="flex flex-col" >
                                <li class="flex-1">
                                    <div id="kakao-login"></div>
                                    <button class="kakao h-[44px] w-full">
                                        <img src="/src/assets/images/logo/kakao-logo.png" alt="kakao">
                                        <span>카카오 로그인</span>
                                    </button>
                                </li>
                                <li class="flex-1">
                                    <div id="naver-login"></div>
                                    <button class="naver h-[44px] w-full">
                                        <img src="/src/assets/images/logo/naver-logo.png" alt="naver">
                                        <span>네이버 로그인</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Card from "@/components/Card";
import Button from "@/components/Button";


</script>

<style scoped>

.document .fence {
    width: 610px;
    margin-right: auto;
    margin-left: auto;
    padding-bottom: 90px;
}

.document {
    line-height: 1.25;
}

.doc-member .fence .doc-title {
    padding-bottom: 20px;
    text-align: center;
}

.doc-title {
    font-weight: normal;
    font-weight: bold;
    font-size: 26px;
    letter-spacing: -1px;
    padding-top: 57px;
}

.doc-title[data-type="A"] {
    border-bottom: solid 1px #222222;
}


.join-first-dv1 .stit, .join-first-dv2 .stit {
    font-size: 20px;
    font-weight: 400;
}

.join-first-dv1 .guide-txt, .join-first-dv2 .guide-txt {
    padding-bottom: 15px;
    color: #666;
}


.join-first-dv1 .link-join {
    display: inline-block;
    width: 200px;
    height: 50px;
    line-height: 47px;
    border: 1px solid transparent;
    border-color: #ff329b;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #ff329b;
    font-family: '맑은 고딕', 'Malgun Gothic', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
    letter-spacing: -1px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -ms-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

.join-first-dv1 .stit, .join-first-dv2 .stit {
    padding-bottom: 15px;
}

.join-first-dv1, .join-first-dv2{
    padding: 40px 0;
    text-align: center;
}

.join-first-dv2 {
    border-top: solid 1px #ddd;
}

.kakao {
    padding: 0.6em 1em;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    margin-top: 0.7em;
    display: flex;
    align-items: center;
    font-weight: 400;
    box-shadow: var(--shadow-1);
    background-color: #FEE500;
    color: black;
}

.naver {
    padding: 0.6em 1em;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    margin-top: 0.7em;
    display: flex;
    align-items: center;
    font-weight: 400;
    box-shadow: var(--shadow-1);
    background-color: #03C75A;
    color: white;
}

.kakao img, .naver img {
    height:0.9rem;
    margin-right: 0.7em;
    margin-left: 0.2em;
}

.kakao span, .naver span {
    flex-grow: 1; 
    text-align: center;
}


</style>
  