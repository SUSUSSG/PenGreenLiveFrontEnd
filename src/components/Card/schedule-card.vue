<template>
    <div class="box">
      <div class="group">
        <div class="text-wrapper">09:10</div>
        <img class="image" src="path/to/image" alt="Image" />
        <div class="group-2">
          <div class="text-wrapper-2">adsf asdfsonsaurus test</div>
          <div class="text-wrapper-3">초특가 대방출</div>
          <button class="button-small">알림 신청</button>
        </div>
        <div class="list-one-line">testshop</div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .box {
    height: 200px;
    position: relative;
    width: 1760px;
  }
  
  .box .group {
    height: 200px;
    left: 0;
    position: fixed;
    top: 0;
    width: 1762px;
  }
  
  .box .text-wrapper {
    color: #000000;
    font-family: ".SF NS Rounded-RegularG1", Helvetica;
    font-size: 32px;
    font-weight: 400;
    left: 0;
    letter-spacing: 0;
    line-height: 24px;
    position: absolute;
    top: 84px;
    width: 104px;
  }
  
  .box .image {
    height: 200px !important;
    left: 152px !important;
    position: absolute !important;
    top: 0 !important;
    width: 200px !important;
  }
  
  .box .group-2 {
    height: 154px;
    left: 400px;
    position: absolute;
    top: 23px;
    width: 494px;
  }
  
  .box .text-wrapper-2 {
    color: #1a1a1a;
    font-family: "Redacted Script-Regular", Helvetica;
    font-size: 40px;
    font-weight: 400;
    left: 0;
    letter-spacing: 0;
    line-height: 24px;
    position: absolute;
    top: 0;
    width: 490px;
  }
  
  .box .text-wrapper-3 {
    color: #666666;
    font-family: "Balsamiq Sans-Regular", Helvetica;
    font-size: 14px;
    font-weight: 400;
    left: 0;
    letter-spacing: 0;
    line-height: 20px;
    position: absolute;
    top: 40px;
    width: 337px;
  }
  
  .box .button-small {
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: 4px;
    color: #000000;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0 16px;
    height: 30px;
    font-size: 12px;
  }
  
  .box .list-one-line {
    display: inline-flex;
    left: 1613px;
    position: absolute;
    top: 72px;
    white-space: nowrap;
    width: fit-content;
  }
  </style>