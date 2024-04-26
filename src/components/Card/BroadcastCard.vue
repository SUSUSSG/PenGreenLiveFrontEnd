<template>
  <div class="card-component">
    <div class="card-header">
      <span v-if="timeDifference">{{ timeDifference }}뒤</span>
      <span v-else>실시간 방송중!!</span>

      <div class="card-time">
        <span>{{ formattedDatetime }}</span>
      </div>
    </div>
    <div class="card-body">
      <img :src="imageSrc" alt="Card image" class="card-image" />
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
    datetime: String,
    buttonText: String,
  },
  computed: {
    formattedDatetime() {
      const options = {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return new Date(this.parseDateTime(this.datetime)).toLocaleString('kr-KR', options);
    },
    timeDifference() {
      const now = new Date();
      const eventTime = new Date(this.parseDateTime(this.datetime));
      const diff = Math.abs(now - eventTime) / 36e5; // 시간 단위로 변환
      if (diff < 1) {
        return '';
      } else if (diff < 24) {
        return `${Math.floor(diff)}시간`;
      } else {
        return `${Math.floor(diff / 24)}일`;
      }
    },
  },
  methods: {
    parseDateTime(dateTimeString) {
      const [date, time] = dateTimeString.split('T');
      const [year, month, day] = date.split('-');
      const [hours, minutes, seconds] = time.split(':');
      return new Date(year, month - 1, day, hours, minutes, seconds);
    },
  },
};
</script>
  <style>
  .card-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    width: 200px; /* 가정한 너비 */
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
    align-items: left;
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
  