<template>
  <div class="video-component" :style="{ width: width, height: height }">
    <div class="title-bar w-full flex items-center justify-between" v-if="showTitleBar">
      <div class="flex items-center">
        <img :src="announceIconSrc" class="logo" style="width: 50%" />
        <p class="broad-title">방송 제목</p>
      </div>
    </div>

    <div class="video-and-sidebar-wrapper">
      <div v-if="streamManager">
        <VideoPlayer :stream-manager="streamManager" :is-muted="isMuted"></VideoPlayer>
      </div>
      <div class="icons-sidebar" v-if="showIconSideBar">
        <div class="icon-wrapper" @click="toggleLike">
          <img ref="heartIcon" :src="isLiked ? activeHeartIconSrc : heartIconSrc" class="heart-icon" />
          <span class="likes-count">{{ likesCount }}</span>
        </div>
        <div class="icon-wrapper" @click="toggleMute">
          <img :src="isMuted ? muteIconSrc : soundIconSrc" class="mute-icon" />
          <span class="icon-label">Mute</span>
        </div>
        <div class="icon-wrapper" @click="share">
          <img :src="shareIconSrc" class="share-icon" />
          <span class="icon-label">Share</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/Video/videoplayer.vue";
import announceIcon from "@/assets/images/all-img/announce.png";
import heartIcon from "@/assets/images/all-img/heart.png";
import muteIcon from "@/assets/images/all-img/mute.png";
import shareIcon from "@/assets/images/all-img/share.png";
import soundIcon from "@/assets/images/all-img/speaker.png";
import redheart from "@/assets/images/all-img/redheart.png";
import { onMounted } from 'vue';
import axios from "axios";

export default {
  setup() {
    onMounted(() => {

    });
  },
  components: {
    VideoPlayer,
  },
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "auto",
    },
    showTitleBar: {
      type: Boolean,
      default: false,
    },
    showIconSideBar: {
      type: Boolean,
      default: false,
    },
    streamManager: Object,
  },
  data() {
    return {
      broadcastId: undefined,
      isLiked: false,
      likesCount: 0,  // 초기값 설정
      isMuted: false,
      announceIconSrc: announceIcon,
      heartIconSrc: heartIcon,
      activeHeartIconSrc: redheart,
      muteIconSrc: muteIcon,
      soundIconSrc: soundIcon,
      shareIconSrc: shareIcon,
      OV: null,
      session: null,
      likeQueue: [],
      likeTimeout: null,
    };
  },
  async mounted() {
    await this.updateLikes();
    setInterval(async () => {
      await this.updateLikes();
    }, 15000);
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked;
      if (this.isLiked) {
        this.likesCount += 1;
        this.likeQueue.push(1);
      } else {
        this.likesCount -= 1;
        this.likeQueue.push(-1);
      }
      this.processLikeQueue();
    },
    processLikeQueue() {
      if (this.likeTimeout) {
        clearTimeout(this.likeTimeout);
      }
      this.likeTimeout = setTimeout(() => {
        console.log("좋아요 수 집계 중");
        const totalLikes = this.likeQueue.reduce((acc, val) => acc + val, 0);
        this.likeQueue = [];
        if (totalLikes > 0) {
          this.incrementLike(totalLikes);
        } else if (totalLikes < 0) {
          this.decrementLike(-totalLikes);
        }
      }, 5000); // 5초 동안 클릭을 모아서 처리
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
    },
    share() {
      const currentUrl = window.location.href; // 현재 페이지의 URL을 가져옴
      navigator.clipboard
          .writeText(currentUrl)
          .then(() => {
            alert("Video URL copied to clipboard!"); // 성공 메시지
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err); // 오류 처리
          });
    },
    incrementLike(count) {
      axios.patch(`http://localhost:8090/broadcasts/statistics/${this.broadcastId}/likes/increment`, { count })
          .then(response => console.log("좋아요 수 증가"))
          .catch(error => console.log("좋아요 증가 실패: " + error));
    },
    decrementLike(count) {
      axios.patch(`http://localhost:8090/broadcasts/statistics/${this.broadcastId}/likes/decrement`, { count })
          .then(response => console.log("좋아요 수 감소"))
          .catch(error => console.log("좋아요 감소 실패: " + error));
    },
    async fetchLikes() {
      try {
        const response = await axios.get(`http://localhost:8090/broadcasts/statistics/${this.broadcastId}`);
        console.log('좋아요수 들고옴:', response.data);
        return response.data;
      } catch (error) {
        console.error('좋아요를 가져오지 못했습니다.', error);
        throw error;
      }
    },
    async updateLikes() {
      try {
        const statistics = await this.fetchLikes();
        this.likesCount = statistics.likesCount;
      } catch (error) {
        console.error('업데이트 실패:', error);
      }
    }
  },
  created() {
    this.broadcastId = this.$route.params.broadcastId || 'defaultSessionId';
  }
};
</script>

<style scoped>
.video-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  z-index: 10;
  padding: 20px;
}

.broad-title {
  padding-left: 20px;
}

.logo {
  max-width: 25px;
  height: auto;
}

.video-and-sidebar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  position: absolute;
}

.icons-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  z-index: 20;
  position: absolute;
  right: 40px;
  bottom: 10px;
}

.icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.heart-icon,
.mute-icon,
.share-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 1px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.icon-label {
  font-size: 12px;
  color: #333;
}

@media (max-width: 600px) {
  .video-and-sidebar-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .video-wrapper {
    width: 95%;
    height: calc(95vw * 9 / 16);
  }

  .icons-sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
  }

  .heart-icon,
  .mute-icon,
  .share-icon {
    margin: 0 5px;
  }
}
</style>
