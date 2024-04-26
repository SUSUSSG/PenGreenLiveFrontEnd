<template>
  <div class="card-component">
    <div class="card-header">
      <span class="remain-time" v-if="timeDifference">{{ timeDifference }} 뒤</span>
      <span class="remain-time" v-else>실시간 방송중!!</span>

      <div class="card-time">
        <span>{{ formattedDatetime }}</span>
      </div>
    </div>
    <div class="card-body">
      <img :src="imageSrc" alt="Card image" class="card-image" />
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-text">{{ text }}</p>
    </div>
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
      const diff = Math.abs(now - eventTime) / 36e5;
      if (diff < 1) {
        return '';
      } else if (diff < 24) {
        return `${Math.floor(diff)} 시간`;
      } else {
        return `${Math.floor(diff / 24)} 일`;
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
    width: 200px;
    padding-top: 0.5rem;
    background-color: white;
  }
  
  .remain-time{
    font-size: 20px;
  }
  .card-header {
    width: 100%;
    margin-bottom: 16px;
    padding-left: 0.5rem;

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
    font-size: 20px;
    margin-bottom: 8px;
    margin-left: 0.5rem;
  }
  
  .card-text {
    font-size: 14px;
    text-align: left;
    margin-left: 0.5rem;
  }
  </style>
  