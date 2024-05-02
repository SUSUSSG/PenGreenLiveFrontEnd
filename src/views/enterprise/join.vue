<template>
    <div class="container-fluid w-[1200px] m-auto">
        <div style="opacity: 1; transform: none;">
            <div class="card rounded-md dark:bg-slate-800 custom-class">
                <header class="m-10">
                        <p class="card-title text-center">협력사 회원가입</p>
                </header>
                <main class="bg-white card-body-1 form_bg">
                    <div class="sub-title">
                        <h3><span>개인정보 이용동의</span></h3>
                    </div>
                    <div>
                        <div class="relative flex-1">
                            <Checkbox
                                label="개인정보의 수집 및 이용 동의 (필수)"
                                name="tc" value="1" :checked="false" />
                            <textarea class="form-control py-2 h-[100px] my-3" name="pd" readonly>당사는 다음과 같이 개인 정보를 수집하고 있습니다.
수집항목 : (필수) [기본 정보] 사업자번호(ID), 비밀번호, 담당자 연락처, 담당자 성명, 담당자 이메일 [협력사 정보] 대표자명, 법인번호(생년월일), 주소, 전화번호
이용목적 : 상품 입점 제안 관련 제안 채택 여부 통지 및 채택 후 협의, 협력사 만족도 조사
보유 및 이용기간 : 협력사 거래 종료 시까지
※ 고객님께서는 위와 같은 개인정보 수집에 동의를 거부하실 수 있습니다. 다만, 필수항목 수집 동의 거부시 입점계약시스템 서비스 이용이 제한됩니다.
                            </textarea>
                        </div>
                        <div class="relative flex-1" >
                            <Checkbox
                            label="개인정보의 수집 및 이용 동의 (선택)"
                            name="tc"
                            value="1"
                            :checked="false"
                        />
                            <textarea class="form-control py-2 h-[100px] my-3" name="pd" readonly>당사는 다음과 같이 개인 정보를 수집하고 있습니다.
수집항목 : (선택) [협력사 정보] 신용평가결과, FAX번호
이용목적 : 상품 입점제안 협력사 평가
보유 및 이용기간 : 협력사 거래 종료 시까지
※ 고객님께서는 위와 같은 개인정보 수집에 동의를 거부하실 수 있으며, 선택항목 수집 동의를 거부하더라도 서비스 이용에 제한이 없습니다.</textarea>
                        </div>
                    </div>
                </main>
                
    
                <main class="form-section bg-white card-body-2 form_bg">
                    <div class="sub-title">
                        <h3><span>기본 정보</span></h3>
                    </div>
                    <div class="relative">
                        <p class="essential text-right"><img src="/src/assets/images/icon/essential.gif" alt="필수입력">필수입력</p>
                        <table id="vgt-table1" class="vgt-table">
                            <colgroup>
                                <col class="fixed-width"> 
                                <col class="flexible-width"> 
                                <col class="fixed-width">
                                <col class="flexible-width">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td class="vgt-left-align essential">
                                        <span>사업자번호(ID)</span>
                                    </td>
                            
                                    <td class="vgt-left-align">
                                        <div class="flex items-center space-x-3">
                                            <input type="text" name="pn1" class="classinput input-control flex-item block focus:outline-none w-full h-[40px]">
                                            <input type="text" name="pn2" class="classinput input-control flex-item block focus:outline-none w-full h-[40px]">
                                            <input type="text" name="pn3" class="classinput input-control flex-item block focus:outline-none w-full h-[40px]">
                                            <div class="button-container">
                                                <Button text="조회" btnClass="btn-primary"/>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="vgt-left-align essential">
                                        <span>담당자 성명</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="relative">
                                            <input type="text" name="pn4" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn4">
                                        </div>                                    
                                    </td>
                                </tr>
                                <tr>
                                    <td class="vgt-left-align essential">
                                        <span>비밀번호</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="relative">
                                            <input type="password" name="pn5" placeholder="비밀번호 (8~20자 영문+숫자)" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn5">
                                        </div>
                                    </td>
                                    <td class="vgt-left-align"></td>
                                    <td class="vgt-left-align"></td>
                                </tr>
                                <tr>
                                    <td class="vgt-left-align essential">
                                        <span>비밀번호 확인</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="relative">
                                            <input type="password" name="pn6" placeholder="비밀번호 확인 (8~20자 영문+숫자)" class="classinput input-control block focus:outline-none w-full h-[40px]" id="pn6">
                                        </div>
                                    </td>
                                    <td class="vgt-left-align"></td>
                                    <td class="vgt-left-align"></td>
                                </tr>
                                <tr>
                                    <td class="vgt-left-align essential">
                                        <span>담당자 연락처</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="flex items-center space-x-3">
                                            <input type="text" name="pn7" value="010" class="input-control focus:outline-none block w-[50px] h-[40px]" id="pn7" readonly>
                                            <input type="text" name="pn8" placeholder="휴대폰번호 (-없이 입력)" class="input-control w-full focus:outline-none block h-[40px]" id="pn8">
                                        </div>
                                    </td>
                                    <td class="vgt-left-align essential">
                                        <span>이메일</span>
                                    </td>
                                    <td class="vgt-left-align">
                                        <div class="relative">
                                            <input type="email" name="pn9" placeholder="이메일 입력" class="classinput input-control w-full block focus:outline-none h-[40px]" id="pn9">
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>

                <main class="bg-white card-body-2 form_bg">
                    <div class="sub-title">
                        <h3><span>협력사 정보</span></h3>
                    </div>
                    <p class="essential text-right"><img src="/src/assets/images/icon/essential.gif" alt="필수입력">필수입력</p>

                    <table id="vgt-table2" class="vgt-table">
                        <colgroup>
                            <col id="col-20" class="w-[144px]">
                            <col id="col-21">
                            <col id="col-22" class="w-[144px]">
                            <col id="col-23">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td class="vgt-left-align essential">
                                    <span>회사명</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="relative">
                                        <input type="text" name="pn" class="classinput input-control w-full block focus:outline-none h-[40px]">
                                    </div>
                                </td>
                                <td class="vgt-left-align essential">
                                    <span>거래협력사구분</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div data-v-33d05f57="" class="relative">
                                        <select data-v-33d05f57="" class="classinput input-control block w-full focus:outline-none min-h-[40px]" formatter="a=>a">
                                            <option data-v-33d05f57="" value="">선택</option>
                                            <option data-v-33d05f57="" value="">제조사</option>
                                            <option data-v-33d05f57="" value="">벤더</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="vgt-left-align essential">
                                    <span>업종</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="relative">
                                        <input type="text" name="pn" class="classinput input-control w-full block focus:outline-none h-[40px]">
                                    </div>
                                </td>
                                <td class="vgt-left-align essential">
                                    <span>업태</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="relative">
                                        <input type="text" name="pn" class="classinput input-control w-full block focus:outline-none h-[40px]">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="vgt-left-align essential">
                                    <span>대표자명</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="relative">
                                        <input type="text" name="pn" class="classinput input-control w-full block focus:outline-none h-[40px]">
                                    </div>
                                </td>
                                <td class="vgt-left-align essential">
                                    <span>설립연월일</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="relative">
                                        <input type="text" placeholder="YYYY-MM-DD" class="  form-control py-2">                                       
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="vgt-left-align essential">
                                    <span>취급품목</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="relative">
                                        <input type="text" name="pn" class="classinput input-control w-full block focus:outline-none h-[40px]">
                                    </div>
                                </td>
                                <td class="vgt-left-align essential">
                                    <span>전화번호</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="grid-cols-1 grid mb-5 last:mb-0">
                                        <div class="flex items-center space-x-4">
                                            <div data-v-33d05f57="" class="relative">
                                                <select data-v-33d05f57="" class="classinput input-control block w-[80px] focus:outline-none min-h-[40px]" formatter="a=>a">
                                                    <option data-v-33d05f57="" value="">선택</option>
                                                    <option data-v-33d05f57="" value="">02</option>
                                                    <option data-v-33d05f57="" value="">031</option>
                                                    <option data-v-33d05f57="" value="">032</option>
                                                    <option data-v-33d05f57="" value="">033</option>
                                                    <option data-v-33d05f57="" value="">041</option>
                                                    <option data-v-33d05f57="" value="">042</option>
                                                    <option data-v-33d05f57="" value="">043</option>
                                                    <option data-v-33d05f57="" value="">044</option>
                                                    <option data-v-33d05f57="" value="">051</option>
                                                    <option data-v-33d05f57="" value="">052</option>
                                                    <option data-v-33d05f57="" value="">053</option>
                                                    <option data-v-33d05f57="" value="">054</option>
                                                    <option data-v-33d05f57="" value="">055</option>
                                                    <option data-v-33d05f57="" value="">061</option>
                                                    <option data-v-33d05f57="" value="">062</option>
                                                    <option data-v-33d05f57="" value="">063</option>
                                                    <option data-v-33d05f57="" value="">064</option>
                                                    <option data-v-33d05f57="" value="">070</option>
                                                </select>
                                            </div>
                                            <input type="text" name="pn" class="input-control w-full focus:outline-none h-[40px]">
                                            <input type="text" name="pn" class="input-control w-full focus:outline-none h-[40px]">
                                        </div>                                    
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="vgt-left-align essential">
                                    <span>법인번호</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="relative">
                                        <input type="text" name="pn" placeholder="법인번호 (개인 사업자는 생년월일 6자리 입력)" class="input-control w-full block focus:outline-none h-[40px]"/>
                                    </div>
                                </td>
                                <td class="vgt-left-align essential">
                                    <span>법인번호 교부일자</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="relative">
                                        <input type="text" placeholder="YYYY-MM-DD" class="  form-control py-2" >                                        
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="vgt-left-align essential">
                                    <span>기업타입</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="grid-cols-1 grid mb-5 last:mb-0">
                                        <div data-v-33d05f57="" class="relative">
                                            <select data-v-33d05f57="" class="classinput input-control block w-full focus:outline-none min-h-[40px]" formatter="a=>a">
                                                <option data-v-33d05f57="" value="">선택</option>
                                                <option data-v-33d05f57="" value="">대기업</option>
                                                <option data-v-33d05f57="" value="">중소기업</option>
                                                <option data-v-33d05f57="" value="">수입기업</option>
                                                <option data-v-33d05f57="" value="">모바일전용</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="vgt-left-align essential">
                                    <span>주소</span>
                                </td>
                                <td class="vgt-left-align">
                                        <div class="flex items-center space-x-4">
                                        <input type="text" name="pn" class="classinput input-control w-full block focus:outline-none h-[40px]">
                                        <Button text="우편번호 찾기" btnClass="btn-primary"/>
                                    </div>
                                </td>
                                <td class="vgt-left-align essential">
                                    <span>상세주소</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="relative">
                                        <input type="text" name="pn" placeholder="상세주소" class="classinput input-control w-full block focus:outline-none h-[40px]">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="vgt-left-align essential">
                                    <span>사업자 구분</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="grid-cols-1 grid mb-5 last:mb-0">
                                        <div data-v-33d05f57="" class="relative">
                                            <select data-v-33d05f57="" class="classinput input-control block w-full focus:outline-none min-h-[40px]" formatter="a=>a">
                                                <option data-v-33d05f57="" value="">선택</option>
                                                <option data-v-33d05f57="" value="">법인사업자</option>
                                                <option data-v-33d05f57="" value="">일반과세자</option>
                                                <option data-v-33d05f57="" value="">면세사업자</option>
                                                <option data-v-33d05f57="" value="">간이과세자</option>
                                                <option data-v-33d05f57="" value="">주민등록자</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td class="vgt-left-align essential">
                                    <span>자본금/매출규모</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="relative">
                                        <input type="text" name="pn" placeholder="10억/100억" class="classinput input-control w-full block focus:outline-none h-[40px]">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="vgt-left-align ">
                                    <span>FAX번호</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div class="grid-cols-1 grid mb-5 last:mb-0">
                                        <div class="flex items-center space-x-4">
                                            <div data-v-33d05f57="" class="relative">
                                                <select data-v-33d05f57="" class="classinput input-control block w-[80px] focus:outline-none min-h-[40px]" formatter="a=>a">
                                                    <option data-v-33d05f57="" value="">선택</option>
                                                    <option data-v-33d05f57="" value="">02</option>
                                                    <option data-v-33d05f57="" value="">031</option>
                                                    <option data-v-33d05f57="" value="">032</option>
                                                    <option data-v-33d05f57="" value="">033</option>
                                                    <option data-v-33d05f57="" value="">041</option>
                                                    <option data-v-33d05f57="" value="">042</option>
                                                    <option data-v-33d05f57="" value="">043</option>
                                                    <option data-v-33d05f57="" value="">044</option>
                                                    <option data-v-33d05f57="" value="">051</option>
                                                    <option data-v-33d05f57="" value="">052</option>
                                                    <option data-v-33d05f57="" value="">053</option>
                                                    <option data-v-33d05f57="" value="">054</option>
                                                    <option data-v-33d05f57="" value="">055</option>
                                                    <option data-v-33d05f57="" value="">061</option>
                                                    <option data-v-33d05f57="" value="">062</option>
                                                    <option data-v-33d05f57="" value="">063</option>
                                                    <option data-v-33d05f57="" value="">064</option>
                                                    <option data-v-33d05f57="" value="">070</option>
                                                </select>
                                            </div>
                                            <input type="text" name="pn" class="input-control w-full focus:outline-none h-[40px]">
                                            <input type="text" name="pn" class="input-control w-full focus:outline-none h-[40px]">
                                        </div>                                    
                                    </div>
                                </td>
                                <td class="vgt-left-align">
                                    <span>홈페이지</span>
                                </td>
                                <td class="vgt-left-align">
                                    <div data-v-33d05f57="" class="relative">
                                        <input type="text" name="pn" class="input-control w-full focus:outline-none h-[40px]">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </main>
                
                <main class="py-10">
                    <div class="text-center space-x-2">
                        <Button class="px-20" text="회원가입" btnClass="btn-primary"/>
                        <Button class="px-20" text="취소" btnClass="btn-primary"/>
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

.card-body-1 {
    padding: 22px 30px 90px;
}

.card-body-2  {
    padding: 60px 30px 50px;
}

.form_bg {
    margin-top: 30px;
    padding-top: 22px !important;
    border: 1px solid #e6e6e6;
    border-radius: 1rem;
}

.card-title {
    font-size: 30px;
    color: black;
}

.sub-title h3{
    padding: 25px 0 0 0;
    margin-bottom: 40px;
    text-align: center;
}

.sub-title h3 span {
    display: inline-block;
    padding-bottom: 13px;
    font-size: 24px;
    line-height: 24px;
}

.page-content {
    background-color: #fafafa
}

p.essential {
    font-size: 12px;
    color: #8c6a5e;
    height: 16px;
    margin-bottom: 1rem;
}


p.essential img {
    padding-right: 6px;
    vertical-align: middle;
    display: inline;
}


.vgt-table {
    width: 100%; 
    table-layout: fixed;
}
.fixed-width {
    width: 144px; 
}
.flexible-width {
    width: 50%;
}

.essential {
    padding-right: 1.5rem;
    background: url("/src/assets/images/icon/essential.gif") no-repeat 10px 28px;
}
</style>