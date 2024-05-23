<template>
  <div
    v-for="channel in subscribedChannels"
    :key="channel.channelSeq"
    class="channel-item"
  >
    <div class="row">
      <img
        :src="
          channel.channelImage
            ? channel.channelImage
            : 'https://placehold.co/80x80'
        "
        :alt="channel.channelNm"
        class="channel-image"
      />
      <div class="col">
        <p class="text-channel-name">{{ channel.channelNm }}</p>
        <p class="text-channel-info">{{ channel.channelInfo }}</p>
      </div>
      <button
        @click="confirmUnsubscribe(channel.channelSeq)"
        class="subscribe-button"
      >
        구독 취소
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const user = ref({});

onMounted(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
        user.value = JSON.parse(storedUser);
        fetchSubscribedChannels();
    }
});


const subscribedChannels = ref([]);

const fetchSubscribedChannels = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8090/subscribed-channels/${user.value.uuid}`,
      // { withCredentials: true }
    );
    if (response.status === 200) {
      subscribedChannels.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching subscribed channels:", error);
  }
};

const unsubscribe = async (channelSeq) => {
  try {
    const response = await axios.post(
      "http://localhost:8090/notification-channel/remove",
      null,
      {
        params: { channelSeq },
      },
    );
    if (response.status === 200) {
      subscribedChannels.value = subscribedChannels.value.filter(
        (channel) => channel.channelSeq !== channelSeq
      );
    }
  } catch (error) {
    console.error("Error unsubscribing:", error);
  }
};

const confirmUnsubscribe = (channelSeq) => {
  if (confirm("정말 구독을 취소하시겠습니까?")) {
    unsubscribe(channelSeq);
  }
};
</script>

<style scoped>
.col {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  align-items: center;
}

.channel-image {
  width: 64px;
  height: 64px;
  border-radius: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  margin-right: 1rem;
  border: 0.5px solid lightgray;
}

.text-channel-name {
  font-weight: 500;
  font-size: 1.2rem;
}
.text-channel-info {
  font-size: 0.8rem;
  color: gray;
}
.subscribe-button {
  width: 120px;
  height: 36px;
  background: #1C6D16;
  color: white;
  cursor: pointer;
  border-radius: 20rem;
  border: none;
}
</style>
