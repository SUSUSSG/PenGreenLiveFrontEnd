<template>
    <div class="container-fluid  w-[800px] m-auto">
        <div style="opacity: 1; transform: none;">
            <div class="card bg-white custom-class">
                <main class="card-body p-6">
                    <header class="px-4 pt-4 pb-3 mb-3">
                        <p class="card-title mb-0 text-center">일반회원가입</p>
                    </header>
                    <form class="vgt-inner-wrap" @submit.prevent="handleSubmit">
                        <div class="vgt-fixed-header"></div>
                        <div class="vgt-responsive">
                            <table id="vgt-table" class="vgt-table">
                                <colgroup>
                                    <col id="col-0">
                                    <col id="col-1">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td class="vgt-left-align">
                                            <span>이름</span>
                                        </td>
                                        <td class="vgt-right-align">
                                            <div class="flex">
                                                <input v-model="form.userNm" type="text" name="pn" placeholder="이름" class="flex-grow-7 classinput input-control w-full block focus:outline-none h-[40px]" id="username">
                                                <div class="flex-grow-3"></div>
                                            </div>                                    
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td class="vgt-left-align">
                                            <span>휴대폰 번호</span>
                                        </td>
                                        <td class="vgt-right-align">
                                            <div class="mb-5">
                                                <div class="flex items-center">                                                        
                                                    <div class="flex items-center flex-grow-7">
                                                        <input type="text" value="010" class=" w-[20%] mr-2 input-control focus:outline-none h-[40px]" readonly="" disabled="">
                                                        <input v-model="form.userTel" type="text" placeholder="휴대폰번호 (-없이 입력)" class="w-full input-control focus:outline-none h-[40px]"
                                                        >
                                                    </div>
                                                    <div class="w-[163px]">
                                                        <Button type="button" text="인증번호 받기" class="w-full"/>
                                                    </div>
                                                </div>                                    
                                            </div>
                                            <div class="grid-cols-1 grid mb-5 last:mb-0">
                                                <div class="flex items-center"> 
                                                    <input v-model="inputAuthCode" type="text" placeholder="인증번호 6자리 입력" class="flex-grow-7 input-control focus:outline-none h-[40px]">
                                                    <div class="flex-grow-3">
                                                        <Button type="button" text="인증번호 확인" class="w-full"/>
                                                    </div>
                                                </div> 
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td class="vgt-left-align">
                                            <span>아이디</span>
                                        </td>
                                        <td class="vgt-right-align">
                                            <div class="grid-cols-1 grid mb-5 last:mb-0">
                                                <div class="flex items-center">
                                                    <input v-model="form.userId" type="text" name="pn" placeholder="아이디 (5~12자 영문+숫자)" class="flex-grow-7 classinput input-control block focus:outline-none h-[40px]">
                                                    <div class="flex-grow-3">
                                                        <Button @click="checkDuplicateUserId" type="button" text="중복체크" class="w-full"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td class="vgt-left-align">
                                            <span>비밀번호</span>
                                        </td>
                                        <td class="vgt-right-align">
                                            <div class="flex">
                                                <input v-model="form.userPw" type="password" placeholder="비밀번호 (8~20자 영문+숫자)" class="flex-grow-7 classinput input-control w-full block focus:outline-none h-[40px]">
                                                <div class="flex-grow-3"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td class="vgt-left-align">
                                            <span>비밀번호 확인</span>
                                        </td>
                                        <td class="vgt-right-align">
                                            <div class="flex">
                                                <input v-model="confirmPassword" type="password" placeholder="비밀번호 확인 (8~20자 영문+숫자)" class="flex-grow-7 classinput input-control block focus:outline-none h-[40px]">
                                                <div class="flex-grow-3"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td class="vgt-left-align">
                                            <span>성별</span>
                                        </td>
                                        <td class="vgt-right-align">
                                            <div data-v-33d05f57="" class="flex">
                                                <select v-model="form.userGender" data-v-33d05f57="" class="flex-grow-7 classinput input-control block focus:outline-none min-h-[40px]" formatter="a=>a">
                                                    <option data-v-33d05f57="" value="">응답 안함</option>
                                                    <option data-v-33d05f57="" value="">여성</option>
                                                    <option data-v-33d05f57="" value="">남성</option>
                                                </select>
                                                <div class="flex-grow-3"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td class="vgt-left-align">
                                            <span>이메일</span>
                                        </td>
                                        <td class="vgt-right-align">
                                            <div class="flex">
                                                <input v-model="form.userEmail" type="email" placeholder="이메일 입력" class="flex-grow-7 classinput input-control w-full block focus:outline-none h-[40px]">
                                                <div class="flex-grow-3"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td class="vgt-left-align">
                                            <span>주소</span>
                                        </td>
                                        <td class="vgt-right-align">
                                            <div class="mb-5">
                                                <div class="flex items-center">                                                        
                                                    <div class="flex items-center flex-grow-7">
                                                        <input v-model="addressForm.zonecode" type="text" placeholder="우편번호" class=" w-[40%] mr-2 input-control focus:outline-none h-[40px]">
                                                        <input v-model="addressForm.address" type="text" placeholder="주소" class="w-full input-control focus:outline-none h-[40px]">
                                                    </div>
                                                    <div class="w-[163px]">
                                                    </div>
                                                </div>                                    
                                            </div>
                                            <div class="grid-cols-1 grid mb-5 last:mb-0">
                                                <div class="flex items-center"> 
                                                    <input v-model="addressForm.detailAddress" type="text" placeholder="상세주소" class="flex-grow-7 input-control focus:outline-none h-[40px]">
                                                    <div class="flex-grow-3">
                                                        <Button @click="openAddressPopup" type="button" text="우편번호 찾기" class="w-full"/>
                                                    </div>
                                                </div> 
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="py-10 px-1" >
                                <div class="py-3">
                                    <Checkbox
                                        v-model="agreement"
                                        label="필수약관에 모두 동의합니다."
                                        name="tc" value="1" :checked="false" />
                                </div>
                                <div class="relative flex-1">
                                    <Checkbox
                                        label="이용약관 (필수)"
                                        name="tc" value="1" :checked="false" />
                                    <textarea class="form-control py-2 h-[100px] my-3" name="pd" readonly>제1조(목적)
본 약관은 주식회사 SUSUSSG(이하 "회사"라 합니다)가 운영하는 "PenGreenLive"의 커머스 서비스 및 이와 유사한 서비스의 이용에 있어 회사와 고객의 권리, 의무 및 책임사항을 규정함에 그 목적이 있습니다. ※ 모바일, VoIP, IPTV, 데이터방송 등을 이용하는 전자거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.</textarea>
                                </div>
                                <div class="relative flex-1" >
                                    <Checkbox
                                    label="개인정보 수집 및 이용 동의 (필수)"
                                    name="tc"
                                    value="1"
                                    :checked="false"
                                />
                                    <textarea class="form-control py-2 h-[100px] my-3" name="pd" readonly>당사는 다음과 같이 개인정보를 수집하고 있습니다.
· 수집항목 : (필수) 이름, 휴대폰번호, 아이디, 비밀번호, 이메일
· 이용목적 : 신세계쇼핑 서비스 제공 (물품 배송, 구매계약 이행)
· 보유 및 이용기간 : 회원 탈퇴 및 제명 후 30일 또는 법정 의무 보유기간까지

※ 귀하는 위와 같은 개인정보 수집에 대한 동의를 거부할 권리가 있으나, 필수정보 수집에 대한 동의를 거부할 경우 당사의 서비스 이용을 위한 회원가입이 어렵습니다.
                                        </textarea>
                                </div>
                                <div class="relative flex-1" >
                                    <Checkbox
                                        v-model="form.optionalAgreementYn"
                                        label="마케팅 목적의 개인정보 수집 및 이용 동의 (선택)"
                                        name="tc" value="1" :checked="false" />
                                    <textarea class="form-control py-2 my-3 h-[100px]" name="pd" readonly>당사는 고객의 동의 하에 다음과 같이 개인정보를 수집, 이용할 수 있습니다.
    · 수집항목 : 성별, 생년월일, 관심분야, 구매내역
    · 수집 및 이용목적 : 신제품 및 이벤트 정보 제공, 맞춤형 광고 전송, 설문조사 등 마케팅 활용 
    · 보유 및 이용기간 : 회원 탈퇴 시까지

    고객님께서는 마케팅 목적의 개인정보 수집, 이용에 대한 동의를 거부하실 수 있습니다. 다만, 이 경우 라이브 소식, 이벤트 정보, 맞춤형 혜택 등의 정보를 제공받지 못할 수 있습니다.
                                        </Textarea>
                                </div>

                                <div class="text-center my-10">
                                    <Button type="submit" class="px-20" text="가입하기" btnClass="btn-primary"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>    
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';
    import Button from "@/components/Button";
    import Checkbox from "@/components/Checkbox";
    import Textarea from "@/components/Textarea";
    import Map from "@/components/Map/map.vue";
    import { NIL } from 'uuid';

    const router = useRouter();

    const form = ref({
        userUuid : null,
        userNm: null,
        userGender: null,
        userBirthDt: null,
        userTel: null,
        userEmail: null,
        userAddress: null,
        optionalAgreementYn: null,
        accountActive: null,
        createAccountDt: null,
        userProfileImg: null,
        userId: null,
        userPw: null,
    });

    let agreement = ref(false);
    let confirmPassword = ref(null);
    let inputAuthCode = ref(null);


    // 휴대폰 번호 인증
    async function requestPhoneAuthCode() {
        const phoneNumber = form.value.userTel;
        try {
            const response = await axios.post(`/api/request-authcode`, {phoneNumber});
        } catch (error) {
            console.error('Error checking username:', error);
        }
    }

    function verifyPhoneNumber(authCode) {
        if (authCode===inputAuthCode.value) {
            console.log("인증번호 일치");
        } else {
            console.log("인증번호 미일치");
        }
    }

    // 아이디 중복 체크
    async function checkDuplicateUserId() {
        const id = form.value.userId;

        try {
            const response = await axios.post(`/api/check-id`, {id});
            if (response.data==='available') alert("사용 가능한 아이디입니다.");
            else alert("이미 사용 중인 아이디입니다.");
        } catch (error) {
            console.error('Error checking id:', error);
        }
    }

    // 비밀번호 일치 체크
    function checkPasswordsMatch() {
        if (form.value.userPw !== confirmPassword.value) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
        return true;
    }

    // 우편번호 찾기
    const showMapModal =ref(false); 
    const postalCode = ref('');
    const addressForm = ref({
        address: null,
        zonecode: null,
        detailAddress: null,
    });

    function openAddressPopup(data) {
        const popup = window.open('/daum-map', 'popup', 'width=500px,height=505px');
    
        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) return;

            const { address, zonecode, buildingName } = event.data;
            form.value.userAddress = `${address} ${buildingName} ${zonecode}`;
            addressForm.value.address = address;
            addressForm.value.zonecode = zonecode;
            addressForm.value.detailAddress = `(${buildingName}) `;
        });
    };


    // 회원가입 정보 전송
    async function handleSubmit() {

        // checkPasswordsMatch();

        console.log("form ", form);
        try {
        const response = await axios.post('/api/signup', form.value);
        
        // if (response.data === 'success')
        //     router.push('/'); 
      } catch (error) {
        console.error('Submission failed:', error);
      }
    }

</script>
  
<style scoped>

.card-title {
    font-size: 30px;
    color: black;
}

.flex-grow-3 {
    flex: 3;

}

.flex-grow-7 {
    flex: 7;
    margin-right: 0.75rem;
}

.vgt-left-align, .vgt-right-align {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.vgt-left-align {
    /* border-right: 1px solid #ddd; */
    background : #f5f5f5;
}

</style>