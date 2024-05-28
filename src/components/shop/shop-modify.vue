<template>
  <div class="space-y-3 shopinfo">
    <Textinput label="상점 닉네임" name="nickname" v-model="shopInfo.channelNM" type="text" placeholder="닉네임을 입력하세요." />
    <Textinput label="자사몰 링크" name="shoplink" v-model="shopInfo.channelUrl" type="text" placeholder="www.example.com" />
    <label class="ltr:inline-block rtl:block input-label">대표이미지 등록</label><br>
    <input type="file" id="imageUpload" @change="handleImageUpload" accept="image/jpeg, image/png, image/gif"
      class="mt-2 text-base text-slate-600 dark:text-slate-300" />
    <img v-if="previewImage" :src="previewImage" alt="대표 이미지 미리보기" style="max-width: 100px">
    <Textarea label="상점 소개글" name="description" v-model="shopInfo.channelInfo" placeholder="상점을 소개해보세요" />
    <div class="text-center">
      <button class="btn inline-flex justify-center btn-sm btn-dark mr-3 mt-3" @click="saveShopInfo"><span>저장</span></button>
      <button class="btn inline-flex justify-center btn-sm btn-dark" @click="resetForm"><span>취소</span></button>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";

export default {
  components: {
    Textinput,
    Textarea,
  },
  data() {
    return {
      previewImage: null,
      shopInfo: {
        channelNM: '',
        channelUrl: '',
        channelImage: null,
        rawchannelImage: '',
        channelInfo: '',
      }
    };
  },
  created() {
    this.loadShopInfo();
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
          this.shopInfo.channelImage = e.target.result.split(',')[1]; // 이미지를 Base64로 인코딩
        };
        reader.readAsDataURL(file);
      } else {
        this.previewImage = this.shopInfo.channelImage || null;
      }
    },
    getChannelSeqFromUrl() {
      const path = window.location.pathname;
      return path.split('/').pop();
    },
    loadShopInfo() {
      const url = `/shop`;
      axios.get(url)
        .then(response => {
          this.shopInfo.channelNM = response.data.channelNM;
          this.shopInfo.channelUrl = response.data.channelUrl;
          this.shopInfo.channelInfo = response.data.channelInfo;

          if (response.data.channelImage) {
            this.previewImage = response.data.channelImage; // URL로부터 로드된 이미지
            this.shopInfo.channelImage = response.data.channelImage;
          } else {
            this.previewImage = null;
          }
        })
        .catch(error => {
          console.error('상점 정보 로드 실패:', error);
          alert('상점 정보 로드 중 오류가 발생했습니다.');
        });
    },
    saveShopInfo() {
      const url = `/shop`;
      const shopInfoToSend = {
        ...this.shopInfo,
        channelImage: this.shopInfo.channelImage || null, 
      };
      axios.put(url, shopInfoToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          alert('상점 정보가 성공적으로 업데이트되었습니다.');
          this.loadShopInfo(); 
        })
        .catch(error => {
          console.error('상점 정보 업데이트 실패:', error);
          alert('상점 정보 업데이트 중 오류가 발생했습니다.');
        });
    },
    resetForm() {
      this.loadShopInfo(); // 원래 상점 정보를 다시 로드
    }
  },
};
</script>

<style lang="scss" scoped>
.shopinfo {
  background-color: white;
  border-radius: 0.375rem;
  padding: 1.5rem;
}
</style>
