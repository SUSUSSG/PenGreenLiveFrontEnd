<template>
  <div class="space-y-3 shopinfo">
    <Textinput label="상점 닉네임" name="nickname" v-model="shopInfo.nickname" type="text" placeholder="닉네임을 입력하세요. " />
    <Textinput label="자사몰 링크" name="shoplink" v-model="shopInfo.shoplink" type="text" placeholder="www.example.com" />
    <label class="ltr:inline-block rtl:block input-label">대표이미지 등록</label><br>
    <input type="file" id="imageUpload" @change="handleImageUpload" accept="image/jpeg, image/png, image/gif"
      class="mt-2 text-base text-slate-600 dark:text-slate-300" />
    <img v-if="previewImage" :src="previewImage" alt="대표 이미지 미리보기" style="max-width: 100px">

    <Textarea label="상점 소개글" name="description" v-model="shopInfo.description" placeholder="상점을 소개해보세요" />

    <div class="text-center">
      <button class="btn inline-flex justify-center btn-sm btn-dark mr-3 mt-3"
        @click="saveShopInfo"><span>저장</span></button>
      <button class="btn inline-flex justify-center btn-sm  btn-dark" @click="resetForm"><span>취소</span></button>
    </div>
  </div>


</template>

<script>
import axios from 'axios';
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";
export default {
  components: {
    Textinput,
    Textarea,
    Select,
  },
  data() {
    return {
      previewImage: null,
      shopInfo: {
        channelSeq: 1,
        shoplink: '',
        description: '',
        image: null,
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
          this.shopInfo.image = file;
        };
        reader.readAsDataURL(file);
      } else {
        this.previewImage = null;
      }
    },
    getChannelSeqFromUrl() {
      const path = window.location.pathname;
      return path.split('/').pop();
    },
    loadShopInfo() {
      const url = `http://localhost:8090/shop/${this.shopInfo.channelSeq}`;
      axios.get(url)
        .then(response => {
          this.shopInfo.nickname = response.data.channelNM;
          this.shopInfo.shoplink = response.data.channelUrl;
          this.shopInfo.description = response.data.channelInfo;

          
          if (response.data.channelImage) {
            this.previewImage = `data:image/jpeg;base64,${response.data.channelImage}`;
            this.shopInfo.image = response.data.channelImage;  
          }
        })
        .catch(error => {
          console.error('상점 정보 로드 실패:', error);
          alert('상점 정보 로드 중 오류가 발생했습니다.');
        });
    },

    saveShopInfo() {
      const formData = new FormData();
      formData.append('nickname', this.shopInfo.nickname);
      formData.append('shoplink', this.shopInfo.shoplink);
      formData.append('description', this.shopInfo.description);

      if (this.shopInfo.image instanceof File) {
        formData.append('image', this.shopInfo.image);
      }

      const url = `http://localhost:8090/shop-modify/${this.shopInfo.channelSeq}`;

      axios.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          alert('상점 정보가 성공적으로 업데이트되었습니다.');
        })
        .catch(error => {
          console.error('상점 정보 업데이트 실패:', error);
          alert('상점 정보 업데이트 중 오류가 발생했습니다.');
        });
    },

    resetForm() {

      this.previewImage = null;

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