<template>
  <div class="prompt-card">
    <div class="row">
      <div class="text-base mb-3">프롬프터</div>
      <button
        @click="fetchPrompt"
        :disabled="loading"
        class="animated-button"
        :class="{ 'loading-button': loading }"
      >
        {{ loading ? "생성중..." : "✨ AI 프롬프트 생성" }}
      </button>
    </div>
    <div class="textarea-container">
      <textarea
        name="largesize"
        placeholder="여기에 작성해주세요"
        rows="8"
        v-model="promptText"
      ></textarea>
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
export default {
  props: {
    broadcastSeq: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      promptText: "",
      loading: false,
    };
  },
  mounted() {
    // 페이지가 새로고침되었을 때 저장된 텍스트를 복원합니다.
    this.promptText = localStorage.getItem("promptText") || "";
  },
  watch: {
    // 텍스트가 변경될 때마다 로컬 스토리지에 저장합니다.
    promptText(value) {
      localStorage.setItem("promptText", value);
    },
  },
  methods: {
    async fetchPrompt() {
      this.loading = true;
      try {
        const response = await axios.get(
          "/openai/generate-prompt",
          {
            params: { broadcastSeq: this.broadcastSeq }, // 여기에서 broadcastSeq 값을 설정합니다.
          }
        );
        this.promptText = response.data;
      } catch (error) {

        alert("프롬프트를 불러오는 중 오류가 발생했습니다.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  padding-right: 1rem;
}

.prompt-card {
  width: 100%;
  height: 262px;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-top: 14px;
  position: relative;
  padding: 1rem;
  position: relative;
}

.textarea-container {
  position: relative;
}

textarea {
  width: 100%;
  height: 100%;
  max-height: 170px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  white-space: pre-wrap;
  overflow-y: auto;
  padding: 8px;
}

.animated-button {
  background: linear-gradient(45deg, #6a5acd, #00c3ff);
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: box-shadow 0.5s, transform 0.5s, background-color 0.5s;
  border-radius: 15rem;
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
  z-index: 10;
}

.loading-button {
  background-color: #ccc;
  cursor: not-allowed;
}

.animated-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 40px rgba(106, 90, 205, 1);
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}



@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 24px;
  height: 24px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
