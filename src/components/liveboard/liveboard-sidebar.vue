<template>
  <div class="sidebar">
    <div class="sidebar-area">
        <!-- 카메라 on/off -->
        <div class="sidebar-icon" @click="toggleIcon(statistics[0])">
          <Icon :icon="statistics[0].isActive ? statistics[0].activeIcon : statistics[0].icon">
          </Icon>
        </div>

        <!-- 마이크 on/off -->
        <div class="sidebar-icon" @click="toggleIcon(statistics[1])">
          <Icon :icon="statistics[1].isActive ? statistics[1].activeIcon : statistics[1].icon">
          </Icon>
        </div>

        <!-- 방송 송출 기기 설정 -->
        <div class="sidebar-icon" @click="openBroadcastDeviceControl()">
          <Icon :icon="statistics[2].icon" />
        </div>
        <LivePrepareModal v-if="showLivePrepareModal" @broadcast-device-selected="handleDeviceSelection"
          ref="broadcastDeviceControl" :showButtons="false" class="z-20" />

        <!-- 공지사항 -->
        <div class="sidebar-icon" @click="toggleIcon(statistics[4]); addNoticeModal()">
          <Icon :icon="statistics[4].icon" />
          <Modal title="공지사항 등록" ref="addNoticeModal" :showButtons="false">
            <!-- 등록 -->
            <div class="notice-add">
              <label for="addNotice" class="notice-label">공지사항 등록</label>
              <div class="flex items-center space-x-2">
                <input id="addNotice" type="text" name="addNotice" v-model="noticeContent" class="notice-input" />
                <Button btnClass="btn-primary btn-sm" @click="submitNotice()">
                  등록
                </Button>
              </div>
            </div>
            <!-- 목록-->
            <div class="space-y-2">
              <label for="addNotice" class="notice-label">공지사항 목록</label>
              <div class="notice-list" v-for="notice in notices" :key="notice.noticeSeq">{{ notice.noticeContent }}
                <Icon icon="heroicons-outline:x" @click="removeNotice(notice.noticeSeq)" class="remove-button" />
              </div>
            </div>
          </Modal>
        </div>

        <!-- 자주 묻는 질문 -->
        <div class="sidebar-icon" @click="toggleIcon(statistics[5]); addFaqModal()">
          <Icon :icon="statistics[5].icon" />
          <Modal title="자주 묻는 질문 등록" ref="addFaqRef" :showButtons="false" id="addFaq" :sizeClass="'max-w-6xl'">
            <div class="flex">
              <div class="w-1/2">
                <div class="flex flex-col">
                  <div class="flex items-center mb-2">
                    <label for="addFaq" class="faq-label">질문 등록</label>
                    <textarea id="addQuestion" type="text" name="addFaq" rows="1" class="faq-textarea"
                      v-model="questionTitle" />
                  </div>
                  <div class="flex items-center mb-2">
                    <label for="addFaq" class="faq-label">답변 등록</label>
                    <textarea id="addAnswer" type="text" name="addFaq" rows="4" class="faq-textarea"
                      v-model="questionAnswer" />
                  </div>
                  <Button btnClass="btn-primary btn-sm mt-5" @click="submitFaq()">
                    등록
                  </Button>
                </div>
              </div>
              <div class="w-1/2 ml-5">
                <div class="space-y-2">
                  <label for="addFaq" class="faq-label">기존 목록</label>
                  <div class="faq-list" v-for="faq in faqs" :key="faq.faqSeq">
                    <div class="flex  items-center">
                      <Icon icon="heroicons-outline:x" @click="removeFaq(faq.faqSeq)" class="remove-button mr-3" />
                      <div>
                        <dt>{{ faq.questionTitle }}</dt>
                        <dd>{{ faq.questionAnswer }}</dd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
</template>

<script>
import Icon from "@/components/Icon/index.vue";
import Modal from "../Modal/Modal.vue";
import Button from "@/components/Button";
import LivePrepareModal from "@/components/Modal/live-prepare-modal.vue";
import Textarea from "@/components/Textarea";

import { useToast } from "vue-toastification";
import axios from "axios";

export default {
  components: {
    Icon,
    Modal,
    Button,
    LivePrepareModal,
    Textarea
  },
  props: {
    notices: Array,
    faqs: Array,
    broadcastId: Number
  },
  data() {
    return {
      statistics: [
        {
          icon: "material-symbols:hangout-video",
          activeIcon: "material-symbols:hangout-video-off",
          isActive: false
        },
        {
          icon: "material-symbols:mic",
          activeIcon: "material-symbols:mic-off",
          isActive: false
        },
        { icon: "material-symbols:settings-video-camera-sharp" },
        { icon: "material-symbols:app-registration" },
        { icon: "material-symbols:campaign-rounded" },
        { icon: "material-symbols:maps-ugc-rounded" },
      ],
      noticeContent: '',
      showLivePrepareModal: false,
      questionTitle: '',
      questionAnswer: '',
    }
  },
  methods: {
    handleDeviceSelection(selection) {
      // 선택된 장치를 상위 컴포넌트로 전달
      this.$emit('broadcast-device-selected', selection);
      this.showLivePrepareModal = false; // 모달 닫기
    },
    toggleIcon(item) {
      // 아이콘 활성화 상태를 토글
      item.isActive = !item.isActive;
      console.log("일단 접근");

      // 조건에 따라 상위 컴포넌트로 이벤트 발송
      if (item.icon === "material-symbols:hangout-video") {
        console.log("Video 비활성화 혹은 활성화");
        this.$emit('toggle-video', item.isActive);
      } else if (item.icon === "material-symbols:mic") {
        console.log("Audio 비활성화 혹은 활성화");
        this.$emit('toggle-audio', item.isActive);
      }
    },
    openBroadcastDeviceControl() {
      this.showLivePrepareModal = !this.showLivePrepareModal;
    },
    editBroadcastInfoModal() {
      this.isOpen = true;
      this.$refs.editBroadcastInfo.openModal();
    },
    addNoticeModal() {
      this.isOpen = true;
      this.$refs.addNoticeModal.openModal();
    },
    addFaqModal() {
      this.isOpen = true;
      this.$refs.addFaqRef.openModal();
    },
    submitNotice() {
      const toast = useToast();

      const broadcastSeq = this.broadcastId;
      const noticeContent = this.noticeContent;

      const requestData = {
        broadcastSeq: broadcastSeq,
        noticeContent: noticeContent
      }

      console.log(requestData)

      axios.post('http://localhost:8090/live-notice/add', requestData)
        .then(response => {
          // 아래 목록에 추가
          const newNotice = response.data;
          console.log("newNotice", newNotice);
          this.notices.push(newNotice);
          this.noticeContent = '';
        })
        .catch(error => {
          console.error("공지 추가 실패 : ", error);
          toast.error("공지 사항 추가 실패", { timeout: 1000 })
        })
    },
    removeNotice(noticeId) {
      axios.delete(`http://localhost:8090/live-notice/delete/${noticeId}`)
        .then(response => {
          const index = this.notices.findIndex(notice => notice.noticeSeq === noticeId);
          if (index !== -1) {
            this.notices.splice(index, 1);
          }
        })
        .catch(error => {
          console.error("공지 삭제 실패 : ", error);
          toast.error("공지 사항 삭제 실패", { timeout: 1000 })
        })
    },
    submitFaq() {
      const toast = useToast();

      const requestData = {
        broadcastSeq: this.broadcastId,
        questionTitle: this.questionTitle,
        questionAnswer: this.questionAnswer
      }

      axios.post('http://localhost:8090/live-faq/add', requestData)
        .then(response => {
          const newFaq = response.data;
          console.log("newFaq", newFaq);
          this.faqs.push(newFaq);
          this.questionTitle = '';
          this.questionAnswer = '';
        })
        .catch(error => {
          console.error("자주묻는 질문 및 답변 추가 실패 : ", error);
          toast.error("자주묻는 질문 및 답변  추가 실패", { timeout: 1000 })
        })
    },
    removeFaq(faqId) {
      axios.delete(`http://localhost:8090/live-faq/delete/${faqId}`)
        .then(response => {
          const index = this.faqs.findIndex(faq => faq.faqSeq === faqId);
          if (index !== -1) {
            this.faqs.splice(index, 1);
          }
        })
        .catch(error => {
          console.error("자주묻는 질문과 답 삭제 실패 : ", error);
          toast.error("자주묻는 질문과 답  삭제 실패", { timeout: 1000 })
        })
    },
  }
}
</script>

<style>
.sidebar {
  width: 70px;
  height: 550px;
  margin-top: 130px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
}

.sidebar-area {
  display: grid;
  gap: 40px;
  grid-template-rows: repeat(5, 1fr);
}


.notice-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7fafc;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  background-color: #f7fafc;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

li {
  list-style: none;
}

dt {
  font-weight: bold;
}

.remove-button {
  background-color: rgb(251, 56, 56);
  color: #fff;
  border-radius: 0.25rem;
  padding: 0.25rem;
  cursor: pointer;
}

.sidebar-icon {
  margin-left: auto;
  margin-right: auto;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white;
  font-size: 1.7rem;
  margin-bottom: 1rem;
  color: black;
  cursor: pointer;
  color: #134010;
}

.notice-add {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.notice-label,
.faq-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.faq-label {
  margin-right: 1rem;
  width: 5rem;
}

.notice-input,
.faq-textarea {
  flex-grow: 1;
  display: block;
  width: 100%;
  min-width: 0;
  border-bottom: #134010 1px solid;
  border-radius: 0.1rem;
}
</style>