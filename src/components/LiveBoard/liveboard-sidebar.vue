<template>
  <div class="bg-white rounded pt-3 px-4 mt-4 ml-5" id="sidebar">
    <div class="grid gap-8 mt-5" style="grid-template-rows: repeat(6, 1fr);">
      <div class="grid gap-8" style="grid-template-rows: repeat(6, 1fr);">

        <div class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
            @click="toggleIcon(statistics[0])">
          <Icon :icon="statistics[0].isActive ? statistics[0].activeIcon : statistics[0].icon">
            <!-- 카메라 조정 -->
          </Icon>
        </div>

        <div class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
            @click="toggleIcon(statistics[1])">
          <Icon :icon="statistics[1].isActive ? statistics[1].activeIcon : statistics[1].icon">
            <!-- 마이크 조정 -->
          </Icon>
        </div>

        <div>
          <div class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
              @click="openBroadcastDeviceControl()">
            <Icon :icon="statistics[2].icon"></Icon>
          </div>
          <LivePrepareModal v-if="showLivePrepareModal"
                            @broadcast-device-selected="handleDeviceSelection"
                            title="방송 기기 설정" ref="broadcastDeviceControl"
                            :showButtons="false" class="z-20"/>
        </div>

        <div
            class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
            @click="toggleIcon(statistics[3]); editBroadcastInfoModal()">
          <Icon :icon="statistics[3].icon"></Icon>
          <Modal title="방송 정보 편집" ref="editBroadcastInfo" :showButtons="false" :sizeClass="'max-w-2xl'">
            <div class="space-y-4">
              <!-- 방송 제목 -->
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <label for="boardcastTitle" class="block text-sm font-medium text-gray-700">방송
                    제목</label>
                  <input id="newBoardcastTitle" type="text" v-model="newBroadcastTitle"
                         placeholder="방송 제목 입력" @input="updateNewBroadcastTitle"
                         class="flex-grow block w-full min-w-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-l-md mt-3"/>
                </div>
                <div class="flex items-center">
                  <Button btnClass="btn-primary btn-sm">
                    등록
                  </Button>
                </div>
              </div>

              <!-- 방송 썸네일 -->
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <label for="boardcastThumbnail"
                         class="block text-sm font-medium text-gray-700 mt-10">썸네일</label>
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <img src="https://via.placeholder.com/90x160" alt="대표 이미지 미리보기" style="max-width: 400px;"
                           class="mt-2"/>
                    </div>
                    <div class="ml-4">
                      <p>최대 용량 : 1mb</p>
                      <p>권장 사이즈 : 720 x 1280</p>
                      <input type="file" id="imageUpload" @change="handleImageUpload"
                             accept="image/jpeg, image/png, image/gif" class="mb-2"/>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <Button btnClass="btn-primary btn-sm">
                    등록
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>

        <div
            class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
            @click="toggleIcon(statistics[4]); addNoticeModal()">
          <Icon :icon="statistics[4].icon"></Icon>
          <Modal title="공지사항 등록" ref="addNoticeModal" :showButtons="false">
            <!-- 공지사항 등록 -->
            <div class="flex flex-col space-y-2 mb-4">
              <label for="addNotice" class="text-sm font-medium text-gray-700">공지사항 등록</label>
              <div class="flex items-center space-x-2">
                <input id="addNotice" type="text" name="addNotice" v-model="notice" placeholder="공지사항 입력"
                       class="flex-grow block w-full min-w-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-l-md"/>
                <Button btnClass="btn-primary btn-sm" @click="submitNotice()">
                  등록
                </Button>
              </div>
            </div>
            <!-- 공지사항 목록-->
            <div class="space-y-2">
              <label for="addNotice" class="text-sm font-medium text-gray-700">공지사항 목록</label>
              <div class="notice-list">
                <li v-for="notice in notices" :key="notice.noticeSeq">{{ notice.noticeContent }}</li>
                <button @click="removeNotice(index)"
                        class="bg-red-500 hover:bg-red-600 text-white rounded p-1">
                  <Icon icon="heroicons-outline:x"/>
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div
            class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
            @click="toggleIcon(statistics[5]); addFaqModal()">
          <Icon :icon="statistics[5].icon"></Icon>
          <Modal title="자주 묻는 질문 등록" ref="addFaqRef" :showButtons="false" id="addFaq" :sizeClass="'max-w-5xl'">
            <div class="flex">
              <div class="w-1/2">
                <div class="flex flex-col">
                  <div class="flex items-center mb-2">
                    <label for="addFaq" class="text-sm font-medium text-gray-700 mr-4 w-20">질문
                      등록</label>
                    <textarea id="addQuestion" type="text" name="addFaq" placeholder="여기에 작성해주세요"
                              rows="1" v-model="question"
                              class="flex-grow block w-full min-w-0 border-gray-300 focus:ring-black-500 focus:border-black-500 rounded-l-md"></textarea>
                  </div>
                  <div class="flex items-center mb-2">
                    <label for="addFaq" class="text-sm font-medium text-gray-700 mr-4 w-20">답변
                      등록</label>
                    <textarea id="addAnswer" type="text" name="addFaq" placeholder="여기에 작성해주세요" rows="5"
                              v-model="answer"
                              class="flex-grow block w-full min-w-0 border-gray-300 focus:ring-blue-500 focus:border-black-500 rounded-l-md"></textarea>
                  </div>
                  <Button btnClass="btn-primary btn-sm mt-5" @click="submitFaq()">
                    등록
                  </Button>
                </div>
              </div>
              <div class="w-1/2 ml-5">
                <div class="space-y-2">
                  <label for="addFaq" class="text-sm font-medium text-gray-700">기존 목록</label>
                  <div v-for="(faq, index) in FaqList" :key="index"
                       class="flex flex-col bg-gray-100 p-2 rounded">
                    <div class="flex justify-between items-center">
                      <span class="font-medium text-gray-600">{{ "Q. " + faq.question }}</span>
                      <button @click="removeFaq(index)"
                              class="bg-red-500 hover:bg-red-600 text-white rounded p-1">
                        <Icon icon="heroicons-outline:x"/>
                      </button>
                    </div>
                    <p class="font-medium">{{ "A. " + faq.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import Modal from "../Modal/Modal.vue";
import Button from "@/components/Button";
import LivePrepareModal from "@/components/Modal/live-prepare-modal.vue";
import Textarea from "@/components/Textarea";

export default {
  components: {
    Icon,
    Modal,
    Button,
    LivePrepareModal,
    Textarea
  },
  props: {
    broadcastTitle: {
      type: String,
      required: true
    },
    notices: Array
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
        {
          icon: "material-symbols:settings-video-camera-sharp",
        },
        {
          icon: "material-symbols:app-registration",
        },
        {
          icon: "material-symbols:campaign-rounded",
        },
        {
          icon: "material-symbols:maps-ugc-rounded",
        },
      ],
      // notice: '',
      // noticeList: [],
      showLivePrepareModal: false,
      question: '',
      answer: '',
      FaqList: [],
      newBroadcastTitle: ""
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
      if (this.notice.trim()) {
        this.notices.push(this.notice)
        this.notice = ''
      }
    },
    removeNotice(index) {
      this.notices.splice(index, 1);
    },
    submitFaq() {
      if (this.question.trim() && this.answer.trim()) {
        this.FaqList.push({question: this.question, answer: this.answer});
        this.question = '';
        this.answer = '';
      }
    },
    removeFaq() {
      this.FaqList.splice(index, 1);
    },
    saveChangeBroadcastTitle() {
      // 후에 작성하기
    },
    saveChangeThumbnail() {
      // 후에 작성하기
    }
  }
}
</script>

<style>
#sidebar {
  width: 70px;
  height: 550px;
  margin-top: 130px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.notice-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7fafc;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

li {
  list-style: none;
}
</style>