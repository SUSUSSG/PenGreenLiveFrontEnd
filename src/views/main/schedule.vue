<template>
  <div class="content-wrapper">
    <Categories />
    <hr class="mt-6" />

    <CardSchedule
      v-for="(item, index) in liveData"
      :key="index"
      :liveTime="item.liveTime"
      :thumbnailUrl="item.thumbnailUrl"
      :liveTitle="item.liveTitle"
      :liveBenefitTitle="item.liveBenefitTitle"
      :productName="item.productName"
      :productImgUrl="item.productImgUrl"
      :productDescription="item.productDescription"
      :productPrice="item.productPrice"
      :shopName="item.shopName"
      :shopThumbnailUrl="item.shopThumbnailUrl"
      class="mt-8"
    />
    <hr class="mt-6" />
    <hr />
  </div>
</template>

<script>
import Categories from "@/components/Category/Categories.vue";
import CardSchedule from "@/components/Card/schedule-card.vue";

export default {
  components: {
    Categories,
    CardSchedule,
  },
  data() {
    return {
      liveData: [
        {
          liveTime: "09:10",
          thumbnailUrl: "https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90",
          liveTitle: "live title test",
          liveBenefitTitle: "라이브 한정 추가 쿠폰 제공",
          productName: "상품 이름",
          productImgUrl: "https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90",
          productDescription: "상품 설명이 위치하는 영역입니다.",
          productPrice: "60% 할인 123,450원",
          shopName: "testshop",
          shopThumbnailUrl: "https://phinf.pstatic.net/dthumb/?src=%22http%3A%2F%2Fshop1.phinf.naver.net%2F20220412_182%2F1649725677134MWG9L_PNG%2F50861519847511263_1050462988.png%22&service=selective&type=f180_180_q90",
        },
        {
          liveTime: "09:10",
          thumbnailUrl: "https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90",
          liveTitle: "live title test",
          liveBenefitTitle: "라이브 한정 추가 쿠폰 제공",
          productName: "상품 이름",
          productImgUrl: "https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90",
          productDescription: "상품 설명이 위치하는 영역입니다.",
          productPrice: "60% 할인 123,450원",
          shopName: "testshop",
          shopThumbnailUrl: "https://phinf.pstatic.net/dthumb/?src=%22http%3A%2F%2Fshop1.phinf.naver.net%2F20220412_182%2F1649725677134MWG9L_PNG%2F50861519847511263_1050462988.png%22&service=selective&type=f180_180_q90",
        },
        {
          liveTime: "09:10",
          thumbnailUrl: "https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90",
          liveTitle: "live title test",
          liveBenefitTitle: "라이브 한정 추가 쿠폰 제공",
          productName: "상품 이름",
          productImgUrl: "https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90",
          productDescription: "상품 설명이 위치하는 영역입니다.",
          productPrice: "60% 할인 123,450원",
          shopName: "testshop",
          shopThumbnailUrl: "https://phinf.pstatic.net/dthumb/?src=%22http%3A%2F%2Fshop1.phinf.naver.net%2F20220412_182%2F1649725677134MWG9L_PNG%2F50861519847511263_1050462988.png%22&service=selective&type=f180_180_q90",
        },
        {
          liveTime: "09:10",
          thumbnailUrl: "https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90",
          liveTitle: "live title test",
          liveBenefitTitle: "라이브 한정 추가 쿠폰 제공",
          productName: "상품 이름",
          productImgUrl: "https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90",
          productDescription: "상품 설명이 위치하는 영역입니다.",
          productPrice: "60% 할인 123,450원",
          shopName: "testshop",
          shopThumbnailUrl: "https://phinf.pstatic.net/dthumb/?src=%22http%3A%2F%2Fshop1.phinf.naver.net%2F20220412_182%2F1649725677134MWG9L_PNG%2F50861519847511263_1050462988.png%22&service=selective&type=f180_180_q90",
        },
        {
          liveTime: "09:10",
          thumbnailUrl: "https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90",
          liveTitle: "live title test",
          liveBenefitTitle: "라이브 한정 추가 쿠폰 제공",
          productName: "상품 이름",
          productImgUrl: "https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90",
          productDescription: "상품 설명이 위치하는 영역입니다.",
          productPrice: "60% 할인 123,450원",
          shopName: "testshop",
          shopThumbnailUrl: "https://phinf.pstatic.net/dthumb/?src=%22http%3A%2F%2Fshop1.phinf.naver.net%2F20220412_182%2F1649725677134MWG9L_PNG%2F50861519847511263_1050462988.png%22&service=selective&type=f180_180_q90",
        },
      ],
    };
  },
};
</script>
<style scoped>
.content-wrapper {
  width: 77%;
  margin: auto;
  display:flex!important;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
}
.under-category-section {
  border-left: 1px solid #e6e7eb;
  border-right: 1px solid #e6e7eb;
}
.under-category-section::-webkit-scrollbar {
  display: none;
}

hr{
  width:100%;
}

</style>
