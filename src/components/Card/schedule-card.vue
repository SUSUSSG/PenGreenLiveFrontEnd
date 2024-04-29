<template>
  <div class="group" style="display: flex !important">
    <div class="flex-row-wrapper">
      <h6 class="text-time">09:10</h6>
      <img
        class="live-thumbnail-image"
        src="https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90"
        alt="Image"
      />
      <div class="content-wrapper">
        <div class="live-title">live title test</div>
        <div class="live-benefit-title">라이브 한정 추가 쿠폰 제공</div>
        <hr class="mt-2 mb-2"/>
        <div class="product-wrapper">
          <img
            class="live-product-image"
            src="https://g-selected.pstatic.net/MjAyNDA0MjJfNjMg/MDAxNzEzNzQyMDA2NjEx.UWvsFEHFzOoSUWwKGXJIl3T7tJrNRte4Bc39WLbc0gEg.5EipWVepAxebwdX8HRURM4kiI0phN1juuk3IkQVvyycg.JPEG/image.jpg?type=f320_480_q90"
            alt="Image"
          />
          <div class="product-content-wrapper">
            <div class="product-title">상품 이름 - 상품 설명이 위치하는 영역입니다.</div>
            <div class="product-price">60% 할인  123,450원</div>
          </div>
        </div>
      </div>
    </div>

    <div class="image-wrapper">
      <img
        class="live-thumbnail-image"
        src="https://phinf.pstatic.net/dthumb/?src=%22http%3A%2F%2Fshop1.phinf.naver.net%2F20220412_182%2F1649725677134MWG9L_PNG%2F50861519847511263_1050462988.png%22&service=selective&type=f180_180_q90"
        alt="Image"
      />
      <div class="list-one-line">testshop</div>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  width: 100%;
}
.group {
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 240px;
}
.image-wrapper img {
  width: 60px;
  height: 60px;
}
.flex-row-wrapper {
  width: 100%;
  display: flex !important;
  flex-direction: row;
  gap: 2rem;
  padding-left: 2rem;
  padding-right:2rem;
  align-items: center;
}
.image-wrapper {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 1rem;
  padding-right: 2rem;
}
.live-thumbnail-image {
  max-height: 240px;
}
.live-title {
  font-size: 24px;
}

.live-product-image {
  height: 60px;
  width: 60px;
  object-fit: cover;
}
.live-benefit-title{
    color: darkgreen;
}
.product-wrapper{
    display: flex!important;
    align-items: center;
    flex-direction: row;
    gap:10px;
}
.product-content-wrapper{
    display:flex!important;
    flex-direction:column;
}
.product-price{
    font-weight: bold;
    color: darkgreen;
}
</style>
