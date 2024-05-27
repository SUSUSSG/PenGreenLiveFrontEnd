<template>
    <div class="container-fluid  w-[800px] m-auto">
        <div style="opacity: 1; transform: none;">
            <div class="card bg-white custom-class">
                <main class="card-body p-6">
                    <div class="vgt-inner-wrap">
                        <div class="vgt-fixed-header"></div>
                        <div class="vgt-responsive">
                            <table id="vgt-table" class="vgt-table">
                                <colgroup>
                                    <col id="col-0">
                                    <col id="col-1">
                                </colgroup>
                                <tbody>
                                    <tr class="">
                                        <td class="vgt-left-align">
                                            <span>아이디</span>
                                        </td>
                                        <td class="vgt-right-align">
                                            <div class="grid-cols-1 grid mb-5 last:mb-0">
                                                <div class="flex items-center">
                                                    <input v-model="user.userId" type="text" name="pn" class="flex-grow-7 classinput input-control block focus:outline-none h-[40px]" readonly="" disabled="">
                                                    <div class="flex-grow-3">
                                                    </div>
                                                </div>
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
                                                        <input type="text" value="010" class=" w-[20%] mr-2 input-control focus:outline-none h-[40px]" id="pn3" readonly="" disabled="">
                                                        <input type="text" placeholder="휴대폰번호 (-없이 입력)" class="w-full input-control focus:outline-none h-[40px]" id="pn">
                                                    </div>
                                                    <div class="w-[163px]">
                                                        <Button text="인증번호 받기" class="w-full"/>
                                                    </div>
                                                </div>                                    
                                            </div>
                                            <div class="grid-cols-1 grid mb-5 last:mb-0">
                                                <div class="flex items-center"> 
                                                    <input type="text" name="pn" placeholder="인증번호 6자리 입력" class="flex-grow-7 input-control focus:outline-none h-[40px]" id="pn">
                                                    <div class="flex-grow-3">
                                                        <Button text="인증번호 확인" class="w-full"/>
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
                                                <input type="password" name="pn" placeholder="비밀번호 (8~20자 영문+숫자)" class="flex-grow-7 classinput input-control w-full block focus:outline-none h-[40px]" id="pn">
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
                                                <input type="password" name="pn" placeholder="비밀번호 확인 (8~20자 영문+숫자)" class="flex-grow-7 classinput input-control block focus:outline-none h-[40px]" id="pn">
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
                                                <input v-model="user.userEmail" type="email" placeholder="이메일 입력" class="flex-grow-7 classinput input-control w-full block focus:outline-none h-[40px]" id="pn">
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
                                <div class="text-center mt-10">
                                    <Button type="button" @click="updateUserProfile" class="px-20" text="수정하기" btnClass="btn-primary"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>    
    import Button from "@/components/Button";
    import Checkbox from "@/components/Checkbox";
    import Textarea from "@/components/Textarea";
    import axios from "@/axios";
    import { onMounted, ref } from 'vue';
    import Map from "@/components/Map/map.vue";
import { add } from "@amcharts/amcharts5/.internal/core/util/Time";

    onMounted(() =>{
        getUserInfo();
    });

    
    const form = ref({
        userBirthDt: null,
        userTel: "",
        userEmail: "",
        userAddress: "",
        userPw: "",
    });

    
    
    const user = ref({});

    async function getUserInfo() {
        try {
            const response = await axios.get(`/user`);
            if (response.data) {
                user.value = response.data;
                console.log("유저 정보 ", response.data );
            } else {
                address.value = null;
            } 
        } catch(error) {
            console.error("회원정보 변경 실패", error);
        }
    }


    // 우편번호 찾기
    const showMapModal =ref(false);
    const postalCode = ref('');
    const addressForm = ref({
        address: null,
        zonecode: null,
        detailAddress: null,
    });


    async function updateUserProfile() {
        console.log(addressForm.value);
        console.log(form.value.userAddress);

        try {
            const response = await axios.patch(`/user/address`, {
                form
            });
            if (response.data) {
            address.value = response.data;
            } else {
            address.value = null;
            } 
        } catch(error) {
            console.error("회원정보 변경 실패", error);
        }
    }

    function openAddressPopup(data) {
        const popup = window.open('/daum-map', 'popup', 'width=500px,height=505px');

        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) return;

            const { address, zonecode, buildingName } = event.data;
            addressForm.value.address = address;
            addressForm.value.zonecode = zonecode;
            addressForm.value.detailAddress = `(${buildingName}) `;
            form.value.userAddress = ` ${zonecode} ${address} ${addressForm.value.detailAddress}`;

        });
    };

    function splitAddress(fullAddress) {
        // 주소를 3개의 부분으로 나누는 정규 표현식

        console.log("주소 ", fullAddress);
        const regex = /^(\d{5})\s([\w\s가-힣]+)\s(\(.+\))$/;

        // 정규 표현식을 사용하여 주소 매칭
        const match = fullAddress.match(regex);

        if (match) {
            return {
                postalCode: match[1], // 우편번호
                streetAddress: match[2], // 기본 주소
                detailAddress: match[3] // 상세 주소
            };
        } else {
            // 정규 표현식에 맞지 않는 경우 에러 메시지 반환
            return "주소 형식이 올바르지 않습니다.";
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