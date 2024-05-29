<template>
    <div class="container-fluid  w-[800px] m-auto">
        <div style="opacity: 1; transform: none;">
            <div class="card bg-white custom-class">
                <main class="card-body p-6">
                    <div class="vgt-inner-wrap">
                        <div class="vgt-fixed-header"></div>
                        <div class="vgt-responsive">
                            <div class="flex justify-center my-[2rem]">
                                <div class="text-center">
                                <div class="user-img">
                                    <img :src="user.userProfileImg ? user.userProfileImg : defaultImage" alt="Profile Picture"
                                        class="profile profile-image-preview"
                                        @click="toggleModal"/>
                                </div>
                                <input type="file" ref="fileInput" accept="image/*" style="display: none;" @change="onFileChange">
                                </div>
                            </div>

                            <div class="flex justify-center mb-[1rem] items-center">
                                <div class="modify-btn-group-vertical flex justify-center items-center">
                                    <div class="btn modify-btn" @click="selectImage" style="cursor: pointer;" type="button">
                                        <p class="change-img-btn">사진 변경</p>
                                    </div>
                                    <div class="div">|</div>
                                    <div class="btn modify-btn" @click="changeDefaultImg" style="cursor: pointer;" type="button">
                                        <p class="change-default-img-btn">기본 이미지로 변경</p>
                                    </div>
                                </div>
                            </div>
        
                            
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
                                                        <input v-model="form.userTel" :disabled="responseAuth" type="text" placeholder="휴대폰번호 (-없이 입력)" class="w-full input-control focus:outline-none h-[40px]">
                                                    </div>
                                                    <div class="w-[163px]">
                                                        <Button :disabled="responseAuth" @click="requestPhoneAuthCode" type="button" text="인증번호 받기" class="w-full"/>
                                                    </div>
                                                </div>                                    
                                            </div>
                                            <div class="grid-cols-1 grid mb-5 last:mb-0" v-if="requestAuth">
                                                <div class="flex items-center"> 
                                                    <input v-model="inputAuthCode" type="text" placeholder="인증번호 6자리 입력" class="flex-grow-7 input-control focus:outline-none h-[40px]">
                                                    <div class="flex-grow-3">
                                                        <Button @click="verifyCode" type="button" text="인증번호 확인" class="w-full"/>
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
                                    <tr>
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
    import Modal from "@/components/Modal"
    import Checkbox from "@/components/Checkbox";
    import Textarea from "@/components/Textarea";
    import axios from "@/axios";
    import { onMounted, ref } from 'vue';
    import Map from "@/components/Map/map.vue";
    import { add } from "@amcharts/amcharts5/.internal/core/util/Time";
    import { useToast } from "vue-toastification";

    const toast = useToast();

    onMounted(() =>{
        getUserInfo();
    });
    
    const form = ref({
        userBirthDt: null,
        userTel: "",
        userEmail: "",
        userAddress: null,
        userPw: "",
        userProfileImgFile: null,
    });
    
    const user = ref({});

    async function getUserInfo() {
        try {
            const response = await axios.get(`/user`);
            if (response.data) {
                user.value = response.data;
                console.log("유저 정보 ", response.data );
            }
        } catch(error) {
            console.error("회원정보 변경 실패", error);
        }
    }

    // 휴대폰 번호 인증
    let requestAuth = ref(false);
    let responseAuth = ref(false);        
    let inputAuthCode = ref(null);
    let userTelVerify = ref(false);

    function phoneNumberCheck(number){
        let result = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
        return result.test(number);
    }

    function initPhoneNumberInput() {
        responseAuth.value = false;
        requestAuth.value = false;
        form.value.userTel = "";
    }

    async function requestPhoneAuthCode() {
        const phoneNumber = `${form.value.userTel}`;

        if (phoneNumber==="010") {
            alert("휴대폰 번호를 입력하세요.");
            return;
        }
        else if (!phoneNumberCheck(phoneNumber)) {
            alert("휴대폰번호 입력 형식이 다릅니다.");
            return;
        } 

        const params = {
            phoneNumber: phoneNumber
        }

        try {
            responseAuth.value = true;
            const response = await axios.post(`/sms/request-authcode`, null, {params});

            if (response.status===200) {
                console.log(response.statusText);
                requestAuth.value = true;
            } else {
                console.log(response.statusText);
            }
        } catch (error) {
            alert('Error :', error.response.data);
            responseAuth.value = false;
            requestAuth.value = false;
        }
    }

    async function verifyCode() {
        const phoneNumber = `${form.value.userTel}`;

        if (inputAuthCode.value===null) {
            alert("인증번호를 입력해주세요.");
            return;
        }

        const params = {
            phoneNumber: phoneNumber,
            code: inputAuthCode.value
        }

        try {
            const response = await axios.post('/sms/verify', null, {params});
            if (response.status === 200) {
                console.log(response.data);
                alert("인증되었습니다.");
                requestAuth.value = false;
                userTelVerify.value = true;
            } else {
                alert(response.data);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {    // 인증번호 틀림
                    alert(error.response.data);
                } else if(error.response.status === 410) {  // 인증시간 만료
                    alert(error.response.data);
                    initPhoneNumberInput();
                }
                else {
                    alert(`서버 오류: ${error.response.tbody}`);
                    responseAuth.value = false;
                    requestAuth.value = false;
                    form.value.userTel = "";
                }
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('네트워크 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            } else {
                console.error('Error message:', error.message);
                alert('알 수 없는 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            }
        }
    }

     // 비밀번호 일치 체크
    let confirmPassword = ref(null);

    function checkPasswordsMatch() {
        return form.value.userPw === confirmPassword.value;
    }

    // 비밀번호 형식 검사
    function validateUserPw() {
        const pattern = /^[a-zA-Z0-9]{8,20}$/;
        return pattern.test(form.value.userPw);
    }

    // 이메일 타입 체크
    const emailError = ref(true);
    function validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(form.value.userEmail);
    }

    // 우편번호 찾기
    const showMapModal =ref(false);
    const postalCode = ref('');
    const addressForm = ref({
        address: '',
        zonecode: '',
        detailAddress: '',
    });


    async function updateUserProfile() {

        if (addressForm.value.zonecode && addressForm.value.address && addressForm.value.detailAddress) {
            user.value.userAddress = `[${zonecode}] ${address} ${detailAddress}`;
        } else {
            user.value.userAddress = null;
        }   
        user.value.userProfileImgFile = form.value.userProfileImgFile || null;
        user.value.userBirthDt = form.value.userBirthDt || null;
        user.value.userEmail = form.value.userEmail || null;
        // user.value.userAddress = `${addressForm.value.zonecode} ${addressForm.value.address} ${addressForm.value.detailAddress}` || null;
        user.value.userPw = form.value.userPw || null;
        user.value.userTel = form.value.userTel || null;

        console.log(form.value);

        try {
            const response = await axios.patch(`/user`, user.value, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) {
                toast.success("회원정보 수정 완료");
                console.log("유저 정보 업데이트 성공", response.data);
            } else {
                toast.warning("회원정보 수정 실패")
                console.log("유저 정보 업데이트 실패");
            }
        } catch(error) {
            console.error("서버 오류", error);
        }
    }

    function openAddressPopup(data) {
        const popup = window.open('/daum-map', 'popup', 'width=500px,height=505px');

        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) return;

            const { address, zonecode, buildingName } = event.data;
            addressForm.value.address = address;
            addressForm.value.zonecode = zonecode;
            addressForm.value.detailAddress = buildingName ? `(${buildingName}) `: '';
        });
    };

    // 프로필 이미지 변경
    const defaultImage = 'https://kr.object.ncloudstorage.com/susussg-img-bucket/user-profile/default-img.png';
    const fileInput = ref(null);
    const profilePic = ref(null);

    const show = ref(false);
    const toggleModal = () => {
        show.value = !show.value;
    };

    function selectImage() {
        fileInput.value.click();
    }

    function changeDefaultImg() {
        user.value.userProfileImg = defaultImage;
        form.value.userProfileImg = null;
    }

    function onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.match("image/*")) {
            alert("이미지 파일만 업로드할 수 있습니다.");
            return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                user.value.userProfileImg = e.target.result;
                const base64String = e.target.result.split(',')[1];
                form.value.userProfileImgFile = base64String;
            };
            reader.readAsDataURL(file);
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


img.profile-image-preview {
    border-radius: 50%;
    height: 8rem;
    width: 8rem;
    object-fit: cover;
    object-position: center;
}

#modify-modal {
    height: 10rem;
}

#modify-modal h4 {
    font-weight: 600;
}

.modify-btn-group {
    width: 100%;
    height: 100%;
}

.modify-btn-group-vertical {
    width: 100%;
    height: 100%;
}

.modify-btn {
    height: 90%;
    background: white;
    text-align: left;
    font-size: 14px;
}

.change-img-btn {
    color : #0066ff;
    font-weight: 500;
}

.change-default-img-btn {
    font-weight: 500;
}

.div {
    font-size: 14px;
}
</style>