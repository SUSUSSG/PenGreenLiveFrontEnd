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
      if (!this.datetime) return 'No date provided';
      const options = {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return new Date(this.datetime).toLocaleString('kr-KR', options);
    },
    timeDifference() {
      if (!this.datetime) return 'No date provided';
      const now = new Date();
      const eventTime = new Date(this.datetime);
      const diff = (eventTime - now) / 36e5; // Calculate difference in hours
      if (diff <= 0) {
        return null; // When event time is past or now, show live
      } else if (diff < 1) {
        return '방송 중'; // Less than 1 hour to start
      } else if (diff < 24) {
        return `${Math.floor(diff)} 시간 뒤`;
      } else {
        return `${Math.floor(diff / 24)} 일 뒤`;
      }
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
  