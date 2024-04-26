<template>
    <div class="page-content   page-min-height  ">
        <div class="container-fluid">
            <div id="root" class="h-full">
                <main class="App  relative">
                    <div class="Toastify"></div>
                    <div class="loginwrapper">
                        <div class="lg-inner-column">
                            <div class="right-column relative">
                                <div class="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                                    <div class="auth-box h-full flex flex-col justify-center">
                                        <div class="mobile-logo text-center mb-6 lg:hidden block">
                                            <a href="/">
                                                <img src="/assets/logo.60c41eaa.svg" alt="" class="mx-auto">
                                            </a>
                                        </div>
                                        <div class="text-left 2xl:mb-10 mb-4">
                                            <h4 class="font-medium">PenGreenLive 로그인</h4>
                                            <div class="text-slate-500 dark:text-slate-400 text-base">Sign in to your account to start using Dashcode</div>
                                        </div>
                                        <form class="space-y-4 ">
                                            <div class="fromGroup       ">
                                                <div class="relative ">
                                                    <input type="email" name="email" class="  form-control py-2 h-[48px]  " placeholder="아이디">
                                                    <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse"></div>
                                                </div>
                                                <label class="block capitalize form-label  ">아이디를 입력하세요</label>
                                            </div>
                                            <div class="fromGroup       ">
                                                <div class="relative ">
                                                    <input type="password" name="password" class="  form-control py-2 h-[48px]  " placeholder="비밀번호">
                                                    <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse"></div>
                                                </div>
                                                <label class="block capitalize form-label  ">비밀번호를 입력하세요</label>
                                            </div>
                                            <div class="flex justify-between">
                                                <label class="flex items-center cursor-pointer">
                                                    <Checkbox/>
                                                    <span class="text-slate-500 dark:text-slate-400 text-sm leading-6 capitalize">내 정보 기억하기</span>
                                                </label>
                                                <a class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium" href="/forgot-password">비밀번호를 잊으셨나요?</a>
                                            </div>
                                            <button type="submit" class="btn btn inline-flex justify-center btn btn-dark block w-full text-center ">
                                                <span class="flex items-center">
                                                    <span>로그인</span>
                                                </span>
                                            </button>
                                        </form>
                                        <div class=" relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                                            <div class=" absolute inline-block  bg-white dark:bg-slate-800 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm  text-slate-500  dark:text-slate-400font-normal ">SNS계정으로 간편 로그인/회원가입</div>
                                        </div>
                                        <div class="mx-auto mt-8 w-full">
                                            <ul class="flex space-x-3" >
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
                                        <div class="md:max-w-[345px] mt-6 mx-auto font-normal text-slate-500 dark:text-slate-400mt-12 uppercase text-sm">아직 회원이 아니신가요?
                                            <a class="text-slate-900 dark:text-white font-medium hover:underline" href="/register">회원가입하기</a>
                                        </div>
                                    </div>
                                    <div class="auth-footer text-center">©  susussg, Co., Ltd.. All Rights Reserved</div>
                                </div>
                            </div>
                            <div class="left-column bg-cover bg-no-repeat bg-center " style="background-image: url(&quot;/assets/login-bg.4b614fc6.png&quot;);">
                                <div class="flex flex-col h-full justify-center">
                                    <div class="flex-1 flex flex-col justify-center items-center">
                                        <a href="/">
                                            <img src="/assets/logo-white.5e389a51.svg" alt="" class="mb-10">
                                        </a>
                                    </div>
                                    <div>
                                        <div class="black-500-title max-w-[525px] mx-auto pb-20 text-center">Unlock your Project
                                            <span class="text-white font-bold">performance</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <svg id="SvgjsSvg1335" width="2" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev" style="overflow: hidden; top: -100%; left: -100%; position: absolute; opacity: 0;"><defs id="SvgjsDefs1336"></defs><polyline id="SvgjsPolyline1337" points="0,0"></polyline><path id="SvgjsPath1338" d="M-1 88L-1 88C-1 88 6.857142857142857 88 6.857142857142857 88C6.857142857142857 88 13.714285714285714 88 13.714285714285714 88C13.714285714285714 88 20.57142857142857 88 20.57142857142857 88C20.57142857142857 88 27.428571428571427 88 27.428571428571427 88C27.428571428571427 88 34.285714285714285 88 34.285714285714285 88C34.285714285714285 88 41.14285714285714 88 41.14285714285714 88C41.14285714285714 88 48 88 48 88C48 88 48 88 48 88 "></path></svg>
    </div>
</template>

<script setup>    
    import Button from "@/components/Button";
    import Checkbox from "@/components/Checkbox";
    import Textarea from "@/components/Textarea";

</script>

<style scoped>

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

.kakao img{
    height:0.9rem;
    margin-right: 0.7em;
    margin-left: 0.2em;
}

.kakao span {
    flex-grow: 1; 
    text-align: center;
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

.naver img{
    height:0.9rem;
    margin-right: 0.7em;
    margin-left: 0.2em;
}

.naver span {
    flex-grow: 1; 
    text-align: center;
}
</style>
  
