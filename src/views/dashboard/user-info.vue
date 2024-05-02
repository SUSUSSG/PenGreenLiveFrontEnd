<template>
    <div class="container-fluid w-[1200px] m-auto">
        <div style="opacity: 1; transform: none;">
            <div class="card rounded-md dark:bg-slate-800 custom-class">
                <main class="form-section bg-white card-body-2 form_bg">
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

                
                <main class="py-10">
                    <div class="text-center space-x-2">
                        <Button class="px-20" text="수정하기" btnClass="btn-primary"/>
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