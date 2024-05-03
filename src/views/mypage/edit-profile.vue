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
                                                    <input type="text" name="pn" class="flex-grow-7 classinput input-control block focus:outline-none h-[40px]" id="pn" readonly="" disabled="">
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
                                                <input type="email" name="pn" placeholder="이메일 입력" class="flex-grow-7 classinput input-control w-full block focus:outline-none h-[40px]" id="pn">
                                                <div class="flex-grow-3"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td class="vgt-left-align">
                                            <span>주소</span>
                                        </td>
                                        <td class="vgt-right-align">
                                            <div class="grid-cols-1 grid mb-5 last:mb-0">
                                                <div class="flex items-center">
                                                    <input type="text" name="pn" placeholder="주소 입력" class="flex-grow-7 classinput input-control block focus:outline-none h-[40px]" id="pn">
                                                    <div class="flex-grow-3">
                                                        <Button text="우편번호 찾기" class="w-full"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="py-10 px-1" >
                                <div class="text-center mt-10">
                                    <Button class="px-20" text="수정하기" btnClass="btn-primary"/>
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