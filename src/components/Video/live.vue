<template>
  <div class="video-component" :style="{ width: width, height: height }">
    <div class="title-bar w-full flex items-center justify-between p-4" v-if="showTitleBar">
      <div class="flex items-center">
        <img :src="announceIconSrc" class="logo">
        방송 제목
      </div>
    </div>

    <div class="video-and-sidebar-wrapper" :style="{ top: showTitleBar ? '10vh' : '0' }">
      <VideoPlayer :videoSource="videoSourceSrc"></VideoPlayer>
      <div class="icons-sidebar" v-if="showIconSideBar">
        <div class="icon-wrapper" @click="toggleLike">
          <img ref="heartIcon" :src="isLiked ? activeHeartIconSrc : heartIconSrc" class="heart-icon">
          <span class="likes-count">{{ likesCount }}</span>
        </div>
        <div class="icon-wrapper" @click="toggleMute">
          <img :src="isMuted ? soundIconSrc : muteIconSrc" class="mute-icon">
          <span class="icon-label">Mute</span>
        </div>
        <div class="icon-wrapper" @click="share">
          <img :src="shareIconSrc" class="share-icon">
          <span class="icon-label">Share</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/Video/videoplayer.vue";
import announceIcon from '@/assets/images/all-img/announce.png';
import heartIcon from '@/assets/images/all-img/heart.png';
import muteIcon from '@/assets/images/all-img/mute.png';
import shareIcon from '@/assets/images/all-img/share.png';
import soundIcon from "@/assets/images/all-img/speaker.png";
import redheart from "@/assets/images/all-img/redheart.png";
import videoSource from "@/assets/video/test-video.mp4"

export default {
  components: {
    VideoPlayer
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'auto'
    },
    showTitleBar: {
      type: Boolean,
      default: false
    },
    showIconSideBar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLiked: false,
      likesCount: 100, // Dummy data
      isMuted: false,
      videoUrl: 'https://example.com/dummy-video-url', // Dummy data
      announceIconSrc: announceIcon,
      heartIconSrc: heartIcon,
      activeHeartIconSrc: redheart,
      muteIconSrc: muteIcon,
      soundIconSrc: soundIcon,
      shareIconSrc: shareIcon,
      videoSourceSrc: videoSource
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
      navigator.clipboard.writeText(this.videoUrl)
          .then(() => alert('Video URL copied to clipboard!'))
          .catch(err => console.error('Failed to copy text: ', err));
    }
  }
};
</script>

<style scoped>
.video-component {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center alignment horizontally */
  position: relative;
}

.title-bar {
  width: 100%;
  height: 10vh; /* Explicit height of the title bar */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  z-index: 10;
}

.video-and-sidebar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center; /* Centering horizontally */
  align-items: flex-end; /* Aligning at the bottom */
  width: 100%;
  position: absolute;
}

.icons-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0; /* Padding on top and bottom */
  justify-content: flex-end; /* Align icons at the bottom */
}

.icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px; /* Spacing between icons */
}

.heart-icon, .mute-icon, .share-icon {
  width: 70px; /* Increase icon size */
  height: 70px;
  margin-bottom: 5px; /* Spacing between icon and text */
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px; /* Increase padding inside the icon */
  box-shadow: 0 4px 6px rgba(0,0,0,0.3); /* Enhance shadow effect */
}

.icon-label {
  font-size: 12px; /* Icon label size */
  color: #333; /* Text color */
}

@media (max-width: 600px) {
  .video-and-sidebar-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .video-wrapper {
    width: 95%; /* Side margins on narrow screens */
    height: calc(95vw * 9 / 16); /* Adjust ratio for the narrower screen */
  }

  .icons-sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
  }

  .heart-icon, .mute-icon, .share-icon {
    margin: 0 5px; /* Spacing between icons */
  }
}
</style>