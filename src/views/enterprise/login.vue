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
                                            <h4 class="font-medium">PenGreenLive 판매자 로그인</h4>
                                            <div class="text-slate-500 dark:text-slate-400 text-base">로그인 후 대시보드를 이용할 수 있습니다.</div>
                                        </div>
                                        <form class="space-y-4 "  @submit.prevent="handleLogin">
                                            <div class="fromGroup       ">
                                                <div class="relative">
                                                    <div class="flex items-center space-x-2">
                                                        <input 
                                                            class="form-control py-2 h-[48px]"
                                                            placeholder="사업자번호1"
                                                            type="text"
                                                            v-model="businessNumber.partOne"
                                                            @input="moveFocus($event, 3, 'inputTwo')"
                                                            maxlength="3">
                                                        <input 
                                                            class="form-control py-2 h-[48px]"
                                                            placeholder="사업자번호2"
                                                            type="text"
                                                            v-model="businessNumber.partTwo"
                                                            @input="moveFocus($event, 2, 'inputThree')"
                                                            maxlength="2"
                                                            ref="inputTwo">
                                                        <input 
                                                            class="form-control py-2 h-[48px]"
                                                            placeholder="사업자번호3"
                                                            type="text"
                                                            v-model="businessNumber.partThree"
                                                            maxlength="5"
                                                            ref="inputThree">
                                                    </div>
                                                </div>
                                                <label class="block capitalize form-label  ">사업자번호를 입력하세요</label>
                                            </div>
                                            <div class="fromGroup       ">
                                                <div class="relative ">
                                                    <input v-model="password" type="password" name="password" class="form-control py-2 h-[48px]  " placeholder="비밀번호">
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
                                            <a class="text-slate-900 dark:text-white font-medium hover:underline" href="/enterprise/join">회원가입하기</a>
                                        </div>

                                        <div class="font-normal text-slate-500 dark:text-slate-400 mt-12 text-sm text-right">
                                            <a class="text-slate-900 dark:text-white font-medium hover:underline" href="/member/login">일반 회원 로그인</a>
                                        </div>
                                    </div>
                        
                                    <div class="auth-footer text-center">©  susussg, Co., Ltd.. All Rights Reserved</div>
                                </div>
                            </div>
                            <!--<<div class="left-column bg-cover bg-no-repeat bg-center " style="background-image: url();"><div class="flex flex-col h-full justify-center"><div class="flex-1 flex flex-col justify-center items-center"><a href="/"><img src="/assets/logo-white.5e389a51.svg" alt="" class="mb-10"></a></div><div></div></div></div> -->
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup> 
    import { ref, reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import axios from '@/axios'
    import Button from "@/components/Button";
    import Checkbox from "@/components/Checkbox";
    import creditCard from "@/components/InputGroup";

    const router = useRouter();
    const store = useStore();
    
    const password = ref(null);

    const businessNumber = reactive({
        partOne: '',
        partTwo: '',
        partThree: ''
    });

    const inputTwo = ref(null);
    const inputThree = ref(null);

    function moveFocus(event, maxLength, nextInputRef) {
        if (event.target.value.length >= maxLength) {
            if (nextInputRef === 'inputTwo') {
                inputTwo.value.focus();
            } else if (nextInputRef === 'inputThree') {
                inputThree.value.focus();
            }
        }
    }

    function loginValidate() {
        return username.value && password.value;
    }

    async function handleLogin() {

        if (!loginValidate()) {
            alert("아이디 또는 비밀번호를 입력해주세요.");
            return;
        }
        
        const username = `${businessNumber.partOne}${businessNumber.partTwo}${businessNumber.partThree}`;

        console.log("username ", username, password);

        try {
            console.log(username, password.value);
            await store.dispatch('auth/loginVendor', { username, password: password.value });
            router.push("/");
            alert("로그인 성공.");
        } catch (error) {
            console.error('login error', error);
            if (error.response && error.response.status === 401) {
                console.error('Authentication failed:', error.response.data);
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
  
