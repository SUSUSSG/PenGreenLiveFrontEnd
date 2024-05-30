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
                                                <img src="@/assets/images/all-img/heart.png" alt="" class="mx-auto">
                                            </a>
                                        </div>
                                        <div class="text-left 2xl:mb-10 mb-4">
                                            <h4 class="font-medium">PenGreenLive 로그인</h4>
                                            <div class="text-slate-500 dark:text-slate-400 text-base">로그인 후 다양한 서비스를 이용해보세요!</div>
                                        </div>
                                        <form class="space-y-4" @submit.prevent="handleLogin">
                                            <div class="fromGroup       ">
                                                <div class="relative ">
                                                    <input v-model="username" type="text" name="username" id="username" class="  form-control py-2 h-[48px]  " placeholder="아이디">
                                                    <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse"></div>
                                                </div>
                                                <label class="block capitalize form-label  ">아이디를 입력하세요</label>
                                            </div>
                                            <div class="fromGroup       ">
                                                <div class="relative ">
                                                    <input v-model="password" type="password" name="password" id="password" class="  form-control py-2 h-[48px]  " placeholder="비밀번호">
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
            
                                        <div class="md:max-w-[345px] mt-6 mx-auto font-normal text-slate-500 dark:text-slate-400mt-12 uppercase text-sm">아직 회원이 아니신가요?
                                            <a class="text-slate-900 dark:text-white font-medium hover:underline" href="/join">회원가입하기</a>
                                        </div>
                                        <div class="font-normal text-slate-500 dark:text-slate-400 mt-12 text-sm text-right">
                                            <a class="text-slate-900 dark:text-white font-medium hover:underline" href="/login">판매자 로그인</a>
                                        </div>
                                    </div>
                        
                                    <div class="auth-footer text-center">©  susussg, Co., Ltd.. All Rights Reserved</div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <!-- <svg id="SvgjsSvg1335" width="2" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev" style="overflow: hidden; top: -100%; left: -100%; position: absolute; opacity: 0;"><defs id="SvgjsDefs1336"></defs><polyline id="SvgjsPolyline1337" points="0,0"></polyline><path id="SvgjsPath1338" d="M-1 88L-1 88C-1 88 6.857142857142857 88 6.857142857142857 88C6.857142857142857 88 13.714285714285714 88 13.714285714285714 88C13.714285714285714 88 20.57142857142857 88 20.57142857142857 88C20.57142857142857 88 27.428571428571427 88 27.428571428571427 88C27.428571428571427 88 34.285714285714285 88 34.285714285714285 88C34.285714285714285 88 41.14285714285714 88 41.14285714285714 88C41.14285714285714 88 48 88 48 88C48 88 48 88 48 88 "></path></svg> -->
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import Button from "@/components/Button";
    import Checkbox from "@/components/Checkbox";
    import { useToast } from "vue-toastification";

    const toast = useToast();

    const router = useRouter();
    const store = useStore();

    const username = ref(null);
    const password = ref(null);
  
    function loginValidate() {
        return username.value && password.value;
    }

    async function handleLogin() {
        if (!loginValidate()) {
            alert("아이디 또는 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const result = await store.dispatch('auth/login', { username: username.value, password: password.value });

            if (result) {
                await router.push("/");
                toast.success('로그인 되었습니다.');
            } else {
                toast.error('아이디 또는 비밀번호가 잘못되었습니다.');
            }

        } catch (error) {

            if (error.response && error.response.status === 401) {

                alert("아이디 또는 비밀번호가 잘못되었습니다.");
            } else {
                alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    }

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
  
