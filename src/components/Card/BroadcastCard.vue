<template>
    <div class="card-component">
      <div class="card-header">
        <div class="card-time">
          <span>{{ date }}</span>
          <span>{{ time }}</span>
        </div>
      </div>
      <div class="card-body">
        <img :src="imageSrc" alt="Card image" class="card-image">
        <h1 class="card-title">{{ title }}</h1>
        <p class="card-text">{{ text }}</p>
      </div>
      <button class="card-button">{{ buttonText }}</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imageSrc: String,
      title: String,
      text: String,
      date: String,
      time: String,
      buttonText: String
    }
  }
  </script>
  
  <style>
  .card-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    width: 328px; /* 가정한 너비 */
  }
  
  .card-header {
    width: 100%;
    margin-bottom: 16px;
  }
  
  .card-time {
    font-size: 12px;
    text-align: left;
    width: 100%;
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .card-image {
    margin-bottom: 16px;
  }
  
  .card-title {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .card-text {
    font-size: 16px;
    text-align: center;
    margin-bottom: 16px;
  }
  
  .card-button {
    padding: 8px 16px;
    border: none;
    background-color: black;
    color: white;
    cursor: pointer;
  }
  </style>
  