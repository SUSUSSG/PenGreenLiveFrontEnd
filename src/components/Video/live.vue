<template>
  <div class="video-component" :style="{ width: width, height: height }">
    <div class="title-bar w-full flex items-center justify-between p-4">
      <div class="flex items-center">
        <img :src="announceIconSrc" class="logo">
        &nbsp;&nbsp;방송 제목
      </div>
    </div>

    <!-- 비디오 플레이어와 사이드바 아이콘 섹션 -->
    <div class="video-and-sidebar-wrapper">
      <div class="video-wrapper">
        <video ref="videoPlayer" class="video" playsinline>
          <source :src="videoSourceSrc" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="icons-sidebar">
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
import announceIcon from '@/assets/images/all-img/announce.png';
import heartIcon from '@/assets/images/all-img/heart.png';
import muteIcon from '@/assets/images/all-img/mute.png';
import shareIcon from '@/assets/images/all-img/share.png';
import videoSource from '@/assets/video/test-video.mp4';
import videoSource1 from '@/assets/video/test-video1.mp4';
import Button from "@/components/Button/index.vue";
import soundIcon from "@/assets/images/all-img/speaker.png"
import redheart from "@/assets/images/all-img/redheart.png"

export default {
  components:{
    Button
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  data() {
    return {
      isLiked: false,
      likesCount: 100, // 더미 데이터
      isMuted: false,
      videoUrl: 'https://example.com/dummy-video-url', // 더미 데이터
      announceIconSrc: announceIcon,
      heartIconSrc: heartIcon,
      activeHeartIconSrc: redheart,
      muteIconSrc: muteIcon,
      soundIconSrc: soundIcon,
      shareIconSrc: shareIcon,
      videoSourceSrc: videoSource
    };
  },
  computed: {
    aspectRatio() {
      return (this.height === 'auto' ? '177.77%' : this.height);
    }
  },
  mounted() {
    // 음소거 상태에서 자동 재생을 시도합니다.
    let videoElement = this.$refs.videoPlayer;
    videoElement.muted = true; // 비디오를 음소거합니다.
    videoElement.play() // 음소거 상태에서 자동 재생을 시도합니다.
        .then(() => {
          console.log("비디오가 자동 재생되었습니다.");
        })
        .catch((error) => {
          console.error("자동 재생 실패:", error);
          alert("실패!");
          // 사용자 상호작용을 유도하는 UI를 표시할 수 있습니다.
        });
  },
  methods: {
    toggleLike() {
      if (!this.isLiked) {
        this.isLiked = true;
        this.likesCount++;
        const heartIcon = this.$refs.heartIcon; // ref를 이용해 DOM에 접근
        heartIcon.classList.add('active');
        setTimeout(() => {
          heartIcon.classList.remove('active');
        }, 400); // 애니메이션 시간과 동일하게 설정
      }
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
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
  width: 100%; /* 컴포넌트의 전체 너비 */
  height: 100vh; /* 뷰포트의 전체 높이 */
  position: relative;
  align-items: center; /* 가로 방향으로 중앙 정렬 */
}

.title-bar {
  width: 100%;
  height: 10vh; /* 타이틀바의 명시적 높이 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  z-index: 10;
  position: absolute;
  top: 0;
}

.video-and-sidebar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center; /* 가로 중앙 정렬에서 좌우 정렬로 변경 */
  align-items: flex-end; /* 아래쪽으로 정렬 유지 */
  width: 100%;
  height: 90vh;
  position: absolute;
  top: 10vh;
}


.video-wrapper {
  flex: 1; /* 비디오 래퍼가 가능한 공간을 모두 채우도록 */
  max-width: calc(90vh * 9 / 16); /* 16:9 비율 유지 */
  height: auto;
  border-radius: 10px;
  overflow: hidden;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 비디오가 비디오 래퍼 크기에 맞춰 조정 */
}

.icons-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px; /* 사이드바 너비를 조금 더 늘림 */
  height: 40%; /* 전체 높이 조정 */
  padding: 10px 0; /* 상하 패딩 추가 */
  justify-content: flex-end; /* 아이콘들을 하단에 정렬 */
}
.icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px; /* 아이콘 간 간격 */
}
.heart-icon, .mute-icon, .share-icon {
  width: 70px; /* 아이콘 크기 증가 */
  height: 70px;
  margin-bottom: 5px; /* 아이콘과 텍스트 간 간격 */
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px; /* 내부 패딩 증가 */
  box-shadow: 0 4px 6px rgba(0,0,0,0.3); /* 그림자 효과 강조 */
}

.icon-label {
  font-size: 12px; /* 아이콘 라벨 크기 */
  color: #333; /* 글자 색상 */
}

.heart-icon:last-child, .mute-icon:last-child, .share-icon:last-child {
  margin-bottom: 0;
}

@media (max-width: 600px) {
  .video-and-sidebar-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .video-wrapper {
    width: 95%; /* 좁은 화면에서는 양쪽 여백 존재 */
    height: calc(95vw * 9 / 16); /* 비율 유지 조정 */
  }

  .icons-sidebar {
    position: static;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
  }

  .heart-icon, .mute-icon, .share-icon {
    margin: 0 5px; /* 아이콘 사이 간격 */
  }

  .icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .likes-count {
    font-size: 12px; /* 좋아요 수 표시를 위한 작은 폰트 크기 */
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1); /* 원래 크기 */
    }
    50% {
      transform: scale(1.25); /* 25% 더 커짐 */
    }
  }

  .heart-icon.active {
    animation: pulse 0.4s ease; /* 애니메이션 실행 시간 및 속도 곡선 */
  }


}
</style>
