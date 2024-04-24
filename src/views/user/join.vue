<template>
    <div data-v-dc744160="" class="card-text h-full">
        <header class="px-4 pt-4 pb-3 mb-3">
            <h5 class="card-title mb-0">일반회원가입</h5>
        </header>
        <div class="vgt-wrap">
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
                                        <span>이름</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="relative"><input type="text" name="pn" placeholder="이름" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn"><div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2"></div></div>                                    
                                    </td>
                                </tr>
                                <tr class="">
                                    <td class="vgt-left-align">
                                        <span>휴대폰 번호</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div>
                                            <div class="relative">
                                                <input type="text" name="pn3" value="010" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn3" readonly="" disabled="">
                                                <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2"></div>
                                            </div>
                                            <div class="relative">
                                                <input type="text" name="pn" placeholder="휴대폰번호 (-없이 입력)" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn">
                                                <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2"></div>
                                            </div>
                                            <div class="relative">
                                                <Button text="인증번호 받기" btnClass="btn-primary"/>
                                            </div>                                    
                                        </div>
                                        <div>
                                            <div class="relative">
                                                <input type="text" name="pn" placeholder="인증번호 6자리 입력" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn">
                                                <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2"></div>
                                            </div>
                                            <div class="relative">
                                                <Button text="인증번호 확인" btnClass="btn-primary"/>
                                            </div> 
                                        </div>
                                    </td>
                                </tr>
                                <tr class="">
                                    <td class="vgt-left-align">
                                        <span>아이디</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="relative">
                                            <input type="text" name="pn" placeholder="아이디 (5~12자 영문+숫자)" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn">
                                            <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="">
                                    <td class="vgt-left-align">
                                        <span>비밀번호</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="relative">
                                            <input type="password" name="pn" placeholder="비밀번호 (8~20자 영문+숫자)" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn">
                                            <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="">
                                    <td class="vgt-left-align">
                                        <span>비밀번호 확인</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="relative">
                                            <input type="password" name="pn" placeholder="비밀번호 확인 (8~20자 영문+숫자)" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn">
                                            <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="">
                                    <td class="vgt-left-align">
                                        <span>성별</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div data-v-33d05f57="" class="relative">
                                            <select data-v-33d05f57="" class="classinput input-control block w-full focus:outline-none min-h-[40px]" formatter="a=>a">
                                                <option data-v-33d05f57="" value="">응답 안함</option>
                                                <option data-v-33d05f57="" value="">여성</option>
                                                <option data-v-33d05f57="" value="">남성</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="">
                                    <td class="vgt-left-align">
                                        <span>이메일</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="relative">
                                            <input type="email" name="pn" placeholder="이메일 입력" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn">
                                            <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="">
                                    <td class="vgt-left-align">
                                        <span>주소</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="relative">
                                            <input type="password" name="pn" placeholder="주소 입력" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn">
                                            <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2"></div>
                                            <Button text="우편번호 찾기" btnClass="btn-primary"/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>    
    import Button from "@/components/Button";
</script>
  