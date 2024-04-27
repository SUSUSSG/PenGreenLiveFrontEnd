<template>
  <div class="space-y-3 shopinfo">
    <Textinput label="상점 닉네임" name="nickname" type="text" placeholder="닉네임을 입력하세요. " />
    <Textinput label="자사몰 링크" name="shoplink" type="text" placeholder="www.example.com" />
    <label class="ltr:inline-block rtl:block input-label">대표이미지 등록</label><br>
    <input type="file" id="imageUpload" @change="handleImageUpload" accept="image/jpeg, image/png, image/gif"
      class="mt-2 text-base text-slate-600 dark:text-slate-300" />
    <img v-if="previewImage" :src="previewImage" alt="대표 이미지 미리보기" style="max-width: 100px">

    <Textarea label="상점 소개글" name="description" placeholder="상점을 소개해보세요" />

    <div class="text-center">
      <button class="btn inline-flex justify-center btn-sm btn-dark mr-3 mt-3"><span>저장</span></button>
      <button class="btn inline-flex justify-center btn-sm  btn-dark" @click="resetForm"><span>취소</span></button>
    </div>
  </div>


</template>

<script>
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
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.previewImage = null;
      }
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