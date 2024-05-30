<template>
  <div class="container-fluid w-[1200px] m-auto">
    <div style="opacity: 1; transform: none">
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
                v-model="agreement"
                label="개인정보의 수집 및 이용 동의 (필수)"
                name="tc"
                value="1"
                :checked="false"
              />
              <textarea
                class="form-control py-2 h-[100px] my-3"
                name="pd"
                readonly
              >
  당사는 다음과 같이 개인 정보를 수집하고 있습니다.
  수집항목 : (필수) [기본 정보] 사업자번호(ID), 비밀번호, 담당자 연락처, 담당자 성명, 담당자 이메일
  [협력사 정보] 대표자명, 법인번호(생년월일), 주소, 전화번호
  이용목적 : 상품 입점 제안 관련 제안 채택 여부 통지 및 채택 후 협의, 협력사 만족도 조사
  보유 및 이용기간 : 협력사 거래 종료 시까지
  ※ 고객님께서는 위와 같은 개인정보 수집에 동의를 거부하실 수 있습니다. 다만, 필수항목 수집 동의 거부시 입점계약시스템 서비스 이용이 제한됩니다.
                </textarea
              >
            </div>
            <div class="relative flex-1">
              <Checkbox
                label="개인정보의 수집 및 이용 동의 (선택)"
                name="tc"
                value="1"
                v-model="formData.optionalAgreementConsent"
                :checked="false"
              />
              <textarea
                class="form-control py-2 h-[100px] my-3"
                name="pd"
                readonly
              >
  당사는 다음과 같이 개인 정보를 수집하고 있습니다.
  수집항목 : (선택) [협력사 정보] 신용평가결과, FAX번호
  이용목적 : 상품 입점제안 협력사 평가
  보유 및 이용기간 : 협력사 거래 종료 시까지
  ※ 고객님께서는 위와 같은 개인정보 수집에 동의를 거부하실 수 있으며, 선택항목 수집 동의를 거부하더라도 서비스 이용에 제한이 없습니다.
                </textarea
              >
            </div>
          </div>
        </main>

        <main class="form-section bg-white card-body-2 form_bg">
          <div class="sub-title">
            <h3><span>기본 정보</span></h3>
          </div>
          <div class="relative">
            <p class="essential text-right">
              <img
                src="/src/assets/images/icon/essential.gif"
                alt="필수입력"
              />필수입력
            </p>
            <table id="vgt-table1" class="vgt-table">
              <colgroup>
                <col class="fixed-width" />
                <col class="flexible-width" />
                <col class="fixed-width" />
                <col class="flexible-width" />
              </colgroup>
              <tbody>
                <tr>
                  <td class="vgt-left-align essential">
                    <span>사업자번호(ID)</span>
                  </td>

                  <td class="vgt-left-align">
                    <div class="flex items-center space-x-3">
                      <input
                        type="text"
                        v-model="businessNumber1"
                        name="pn1"
                        class="classinput input-control flex-item block focus:outline-none w-full h-[40px]"
                      />
                      <input
                        type="text"
                        v-model="businessNumber2"
                        name="pn2"
                        class="classinput input-control flex-item block focus:outline-none w-full h-[40px]"
                      />
                      <input
                        type="text"
                        v-model="businessNumber3"
                        name="pn3"
                        class="classinput input-control flex-item block focus:outline-none w-full h-[40px]"
                      />
                      <div class="button-container">
                        <Button
                          @click="checkBusinessNumber"
                          text="조회"
                          btnClass="btn-primary"
                        />
                      </div>
                    </div>
                  </td>
                  <td class="vgt-left-align essential">
                    <span>담당자 성명</span>
                  </td>
                  <td class="vgt-left-align">
                    <div class="relative">
                      <input
                        v-model="formData.vendorNm"
                        type="text"
                        class="classinput input-control w-full block focus:outline-none h-[40px]"
                        id="pn4"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="vgt-left-align essential">
                    <span>비밀번호</span>
                  </td>
                  <td class="vgt-left-align">
                    <div class="relative">
                      <input
                        v-model="formData.vendorPw"
                        type="password"
                        placeholder="비밀번호 (8~20자 영문+숫자)"
                        class="classinput input-control w-full block focus:outline-none h-[40px]"
                        id="pn5"
                      />
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
                      <input
                        v-model="vendorPwCheck"
                        type="password"
                        placeholder="비밀번호 확인 (8~20자 영문+숫자)"
                        class="classinput input-control block focus:outline-none w-full h-[40px]"
                        id="pn6"
                      />
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
                      <input
                        v-model="formData.vendorTel"
                        type="text"
                        placeholder="휴대폰번호 (-없이 입력)"
                        class="input-control w-full focus:outline-none block h-[40px]"
                        id="pn8"
                      />
                    </div>
                  </td>
                  <td class="vgt-left-align essential">
                    <span>이메일</span>
                  </td>
                  <td class="vgt-left-align">
                    <div class="relative">
                      <input
                        v-model="formData.vendorEmail"
                        type="email"
                        placeholder="이메일 입력"
                        class="classinput input-control w-full block focus:outline-none h-[40px]"
                        id="pn9"
                      />
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
          <p class="essential text-right">
            <img
              src="/src/assets/images/icon/essential.gif"
              alt="필수입력"
            />필수입력
          </p>

          <table id="vgt-table2" class="vgt-table">
            <colgroup>
              <col id="col-20" class="w-[144px]" />
              <col id="col-21" />
              <col id="col-22" class="w-[144px]" />
              <col id="col-23" />
            </colgroup>
            <tbody>
              <tr>
                <td class="vgt-left-align essential">
                  <span>회사명</span>
                </td>
                <td class="vgt-left-align">
                  <div class="relative">
                    <input
                      v-model="formData.companyNm"
                      type="text"
                      class="classinput input-control w-full block focus:outline-none h-[40px]"
                    />
                  </div>
                </td>
                <td class="vgt-left-align essential">
                  <span>기업타입</span>
                </td>
                <td class="vgt-left-align">
                  <div class="grid-cols-1 grid mb-5 last:mb-0">
                    <div data-v-33d05f57="" class="relative">
                      <select
                        v-model="formData.enterpriseType"
                        class="classinput input-control block w-full focus:outline-none min-h-[40px]"
                      >
                        <option value="">선택</option>
                        <option value="대기업">대기업</option>
                        <option value="중소기업">중소기업</option>
                        <option value="수입기업">수입기업</option>
                        <option value="모바일전용">모바일전용</option>
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="vgt-left-align essential">
                  <span>업종</span>
                </td>
                <td class="vgt-left-align">
                  <div class="relative">
                    <input
                      v-model="formData.industry"
                      type="text"
                      class="classinput input-control w-full block focus:outline-none h-[40px]"
                    />
                  </div>
                </td>
                <td class="vgt-left-align essential">
                  <span>업태</span>
                </td>
                <td class="vgt-left-align">
                  <div class="relative">
                    <input
                      v-model="formData.businessType"
                      type="text"
                      class="classinput input-control w-full block focus:outline-none h-[40px]"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td class="vgt-left-align essential">
                  <span>대표자명</span>
                </td>
                <td class="vgt-left-align">
                  <div class="relative">
                    <input
                      v-model="formData.representativeNm"
                      type="text"
                      class="classinput input-control w-full block focus:outline-none h-[40px]"
                    />
                  </div>
                </td>
                <td class="vgt-left-align essential">
                  <span>설립연월일</span>
                </td>
                <td class="vgt-left-align">
                  <div class="relative">
                    <input
                      type="date"
                      name="establishmentDate"
                      class="form-control py-2"
                      v-model="formData.establishmentDt"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td class="vgt-left-align essential">
                  <span>취급품목</span>
                </td>
                <td class="vgt-left-align">
                  <div class="relative">
                    <input
                      v-model="formData.handledItems"
                      type="text"
                      class="classinput input-control w-full block focus:outline-none h-[40px]"
                    />
                  </div>
                </td>
                <td class="vgt-left-align essential">
                  <span>전화번호</span>
                </td>
                <td class="vgt-left-align">
                  <div class="grid-cols-1 grid mb-5 last:mb-0">
                    <div class="flex items-center space-x-4">
                      <input
                        v-model="formData.companyTel"
                        type="text"
                        class="input-control w-full focus:outline-none h-[40px]"
                      />
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
                    <input
                      v-model="formData.corporateNumber"
                      type="text"
                      placeholder="법인번호 (개인 사업자는 생년월일 6자리 입력)"
                      class="input-control w-full block focus:outline-none h-[40px]"
                    />
                  </div>
                </td>
                <td class="vgt-left-align essential">
                  <span>법인번호 교부일자</span>
                </td>
                <td class="vgt-left-align">
                  <div class="relative">
                    <input
                      type="date"
                      name="establishmentDate"
                      class="form-control py-2"
                    />
                  </div>
                </td>
              </tr>
              <tr></tr>
              <tr>
                <td class="vgt-left-align essential">
                  <span>주소</span>
                </td>
                <td class="vgt-left-align">
                  <div class="flex items-center space-x-4">
                    <input
                      v-model="addressForm.address"
                      type="text"
                      class="classinput input-control w-full block focus:outline-none h-[40px]"
                    />
                    <Button
                      @click="openAddressPopup"
                      text="우편번호 찾기"
                      btnClass="btn-primary"
                    />
                  </div>
                </td>
                <td class="vgt-left-align essential">
                  <span>상세주소</span>
                </td>
                <td class="vgt-left-align">
                  <div class="relative">
                    <input
                      v-model="addressForm.detailAddress"
                      type="text"
                      placeholder="상세주소"
                      class="classinput input-control w-full block focus:outline-none h-[40px]"
                    />
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
                      <select
                        v-model="formData.businessClassification"
                        class="classinput input-control block w-full focus:outline-none min-h-[40px]"
                      >
                        <option value="">선택</option>
                        <option value="법인사업자">법인사업자</option>
                        <option value="일반과세자">일반과세자</option>
                        <option value="면세사업자">면세사업자</option>
                        <option value="간이과세자">간이과세자</option>
                        <option value="주민등록자">주민등록자</option>
                      </select>
                    </div>
                  </div>
                </td>
                <td class="vgt-left-align essential">
                  <span>자본금/매출규모</span>
                </td>
                <td class="vgt-left-align">
                  <div class="relative">
                    <input
                      v-model="formData.revenue"
                      type="text"
                      placeholder="10억/100억"
                      class="classinput input-control w-full block focus:outline-none h-[40px]"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td class="vgt-left-align">
                  <span>FAX번호</span>
                </td>
                <td class="vgt-left-align">
                  <div class="grid-cols-1 grid mb-5 last:mb-0">
                    <div class="flex items-center space-x-4">
                      <input
                        v-model="formData.faxNumber"
                        type="text"
                        class="input-control w-full focus:outline-none h-[40px]"
                      />
                    </div>
                  </div>
                </td>
                <td class="vgt-left-align">
                  <span>홈페이지</span>
                </td>
                <td class="vgt-left-align">
                  <div class="relative">
                    <input
                      v-model="formData.websiteUrl"
                      type="text"
                      class="input-control w-full focus:outline-none h-[40px]"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </main>

        <main class="py-10">
          <div class="text-center space-x-2">
            <Button
              @click="submitForm"
              type="button"
              class="px-20"
              text="회원가입"
              btnClass="btn-primary"
            />
            <Button
              class="px-20"
              text="취소"
              type="button"
              btnClass="btn-primary"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/axios";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Textarea from "@/components/Textarea";
import Map from "@/components/Map/map.vue";
import router from "@/router";

const formData = ref({
    vendorSeq: null,
    channelSeq: null,
    businessId: '',
    vendorNm: '',
    vendorPw: '',
    vendorTel: '',
    vendorEmail: '',
    companyNm: '',
    industry: '',
    businessType: '',
    representativeNm: '',
    establishmentDt: '',
    handledItems: '',
    companyTel: '',
    corporateNumber: '',
    enterpriseType: '',
    companyAddress: '',
    businessClassification: '',
    revenue: null,
    faxNumber: '',
    websiteUrl: '',
    optionalAgreementConsent: false,
});

const vendorPwCheck = ref(null);
const agreement = ref(false);
const isBusinessNumberValidated = ref(false); // 추가된 상태 변수

// 우편번호 찾기
const showMapModal = ref(false);
const postalCode = ref("");
const addressForm = ref({
  address: null,
  zonecode: null,
  detailAddress: null,
});

function openAddressPopup(data) {
  const popup = window.open("/daum-map", "popup", "width=500px,height=505px");

  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;

    const { address, zonecode, buildingName } = event.data;
    addressForm.value.address = `[${zonecode}] ${address}`;
    addressForm.value.detailAddress = `(${buildingName}) `;
  });
}

const businessNumber1 = ref("");
const businessNumber2 = ref("");
const businessNumber3 = ref("");
const businessInfo = ref(null);
const validationStatus = ref("");

const checkBusinessNumber = async () => {
  const businessNumber = `${businessNumber1.value}${businessNumber2.value}${businessNumber3.value}`;
  
  try {
    const response = await axios.post("/vendor/check-business-number", { businessNumber });

    if (response.status === 200 && response.data) {
      businessInfo.value = response.data;
      if (response.data.b_stt_cd === "01") {
        validationStatus.value = "인증 완료";
        isBusinessNumberValidated.value = true;
        alert("사업자번호 인증에 성공했습니다.");
      } else {
        validationStatus.value = "인증 실패";
        isBusinessNumberValidated.value = false;
        alert("사업자번호 인증에 실패했습니다.");
      }
    } else {
      validationStatus.value = "조회 실패";
      isBusinessNumberValidated.value = false;
      alert("사업자번호 조회에 실패했습니다.");
    }
  } catch (error) {

    validationStatus.value = "조회 실패";
    isBusinessNumberValidated.value = false;
    alert("사업자번호 조회에 실패했습니다.");
  }
};

function checkValidate() {
  if (formData.value.vendorPw !== vendorPwCheck.value) {
    alert("비밀번호가 다릅니다.");
    return false;
  }

  if (!isBusinessNumberValidated.value) {
    alert("사업자번호 인증을 완료해주세요.");
    return false;
  }

  if (agreement.value === false) {
    alert("필수 동의 체크하세요.");
    return false;
  }

  return true;
}

async function submitForm() {
  if (!checkValidate()) {
    return;
  }

  try {
    formData.value.companyAddress = `${addressForm.value.address} ${addressForm.value.detailAddress}`;
    formData.value.businessId = `${businessNumber1.value}${businessNumber2.value}${businessNumber3.value}`;

    const response = await axios.post("/vendor/signup", formData.value);
    alert("회원가입 성공!");
    router.push("/");
  } catch (error) {
    alert("Failed to submit the form. Please try again.");
  }
}
</script>

<style scoped>
.card-body-1 {
  padding: 22px 30px 90px;
}

.card-body-2 {
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

.sub-title h3 {
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
  background-color: #fafafa;
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
