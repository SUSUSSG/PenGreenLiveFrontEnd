<template>
  <div class="video-component" :style="{ width: width, height: height }">
    <div
      class="title-bar w-full flex items-center justify-between"
      v-if="showTitleBar"
    >
      <div class="flex items-center">
        <img :src="announceIconSrc" class="logo" style="width: 50%" />
        <p class=" broad-title">방송 제목</p>
      </div>
    </div>

    <div class="video-and-sidebar-wrapper">
      <div v-if="streamManager">
        <VideoPlayer :stream-manager="streamManager" :is-muted="isMuted"></VideoPlayer>
      </div>
      <div class="icons-sidebar" v-if="showIconSideBar">
        <div class="icon-wrapper" @click="toggleLike">
          <img
            ref="heartIcon"
            :src="isLiked ? activeHeartIconSrc : heartIconSrc"
            class="heart-icon"
          />
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

export default {
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
      isLiked: false,
      likesCount: 100, // Dummy data
      isMuted: false,
      announceIconSrc: announceIcon,
      heartIconSrc: heartIcon,
      activeHeartIconSrc: redheart,
      muteIconSrc: muteIcon,
      soundIconSrc: soundIcon,
      shareIconSrc: shareIcon,
      OV: null,
      session: null,
    };
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked;
      this.likesCount += this.isLiked ? 1 : -1;
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      // Additional functionality to actually mute the video can be implemented here
    },
    share() {
      // 현재 페이지 URL을 클립보드에 복사
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
  },
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
