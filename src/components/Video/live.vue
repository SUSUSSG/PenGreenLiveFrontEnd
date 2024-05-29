<template>
  <div class="video-component" :style="{ width: width, height: height }">
    <div class="title-bar w-full flex items-center justify-between" v-if="showTitleBar">
      <div class="flex items-center">
        <!-- <img :src="announceIconSrc" class="logo" style="width: 50%" />
        <p class="broadcast-title">{{ broadcastTitle }}</p> -->
      </div>
    </div>

    <div class="video-and-sidebar-wrapper">
      <div v-if="streamManager">
        <div class="video-player-wrapper" v-if="streamManager">
          <VideoPlayer :stream-manager="streamManager" :is-muted="isMuted" :subtitles-active="subtitlesActive"></VideoPlayer>
        </div>
        <div class="icons-sidebar" v-if="showIconSideBar">
          <div class="icon-wrapper" @click="toggleLike">
            <img ref="heartIcon" :src="isLiked ? activeHeartIconSrc : heartIconSrc" class="heart-icon" />
            <span class="likes-count">{{ likesCount }}</span>
          </div>
          <div class="icon-wrapper" @click="toggleMute">
            <img :src="isMuted ? muteIconSrc : soundIconSrc" class="mute-icon" />
            <span class="icon-label">음소거</span>
          </div>
          <div class="icon-wrapper" @click="share">
            <img :src="shareIconSrc" class="share-icon" />
            <span class="icon-label">공유하기</span>
          </div>
          <div class="icon-wrapper" @click="toggleSubtitles">
            <img :src="subtitlesActive ? subtitlesActiveIconSrc : subtitlesInactiveIconSrc" class="subtitles-icon" />
            <span class="icon-label">자막</span>
          </div>
        </div>
      </div>
      <div v-else class="broadcast-image">
        <img :src="broadcastImage">
        <div class="overlay">
          <div class="overlay-text">
            방송 시작 전입니다. <br>
            잠시만 기다려 주세요.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
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
    broadcastTitle: String,
    broadcastImage: String
  },
  data() {
    return {
      broadcastId: undefined,
      isLiked: false,
      likesCount: 0,
      isMuted: true,
      subtitlesActive: true,
      announceIconSrc: announceIcon,
      heartIconSrc: heartIcon,
      activeHeartIconSrc: redheart,
      muteIconSrc: muteIcon,
      soundIconSrc: soundIcon,
      shareIconSrc: shareIcon,
      subtitlesActiveIconSrc: 'https://kr.object.ncloudstorage.com/susussg-img-bucket/broadcast-icon/free-icon-subtitles-active.png',
      subtitlesInactiveIconSrc: 'https://kr.object.ncloudstorage.com/susussg-img-bucket/broadcast-icon/free-icon-subtitles-inactive.png',
      languageIconSrc: undefined,
      showLanguageMenu: false,
      OV: null,
      session: null,
      likeQueue: [],
      likeTimeout: null,
      likesUpdateInterval:null
    };
  },
  async mounted() {
    await this.updateLikes();
    setInterval(async () => {
      await this.updateLikes();
    }, 15000);
    await this.checkLikes();
  },
  beforeUnmount() {
    clearInterval(this.likesUpdateInterval);
  },
  methods: {
    async toggleLike() {
      try {
        if (this.isLiked) {
          await axios.patch(`/broadcasts/statistics/${this.broadcastId}/likes/toggle`, {}, {
          });
          this.likesCount += 1;
        } else {
          await axios.patch(`/broadcasts/statistics/${this.broadcastId}/likes/toggle`, {}, {
          });
          this.likesCount -= 1;
        }
        this.isLiked = !this.isLiked;
      }catch (error){
        alert("좋아요는 회원만 누를 수 있습니다!");
      }
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
    },
    toggleSubtitles() {
      this.subtitlesActive = !this.subtitlesActive;
    },
    toggleLanguageMenu() {
      this.showLanguageMenu = !this.showLanguageMenu;
    },
    setLanguage(language) {
      alert(`Language set to ${language}`);
      this.showLanguageMenu = false;
    },
    share() {
      const currentUrl = window.location.href;
      navigator.clipboard
          .writeText(currentUrl)
          .then(() => {
            alert("Video URL copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
    },
    async fetchLikes() {
      try {
        const response = await axios.get(`/broadcasts/statistics/${this.broadcastId}`, {
          params:{
            'USER_UUID': '95224537-18d7-11ef-8fe3-f220affc9a21'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Failed to fetch likes:', error);
        throw error;
      }
    },
    async checkLikes(){
      this.isLiked = axios.get(`/broadcasts/statistics/${this.$route.params.broadcastId}/likes/check`)
    },
    async updateLikes() {
      try {
        const statistics = await this.fetchLikes();
        this.likesCount = statistics.likesCount;
      } catch (error) {
        console.error('Failed to update likes:', error);
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
  width: 100%;
  height: 100%;
  position: absolute;
}

.video-player-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
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
.share-icon,
.subtitles-icon,
.language-icon {
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

.broadcast-image {
  position: relative;
}

.broadcast-image img {
  width: 700px;
  height: 1000px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
}

.overlay-text {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 400px;
  text-align: center;
}

.language-menu {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 30;
}

.language-option {
  padding: 10px;
  cursor: pointer;
}

.language-option:hover {
  background-color: #f0f0f0;
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
  .share-icon,
  .subtitles-icon,
  .language-icon {
    margin: 0 5px;
  }
}
</style>
