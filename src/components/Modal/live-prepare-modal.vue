<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content">
      <Button @click="closeModal">닫기</Button>
      <div class="camera-feed">
        <video ref="cameraFeed" autoplay></video>
      </div>
      <div class="controls">
        <select v-model="selectedCamera">
          <option v-for="camera in cameraOptions" :value="camera.deviceId">{{ camera.label }}</option>
        </select>
        <select v-model="selectedMicrophone">
          <option v-for="mic in microphoneOptions" :value="mic.deviceId">{{ mic.label }}</option>
        </select>
        <div class="volume-control">
          <label for="microphoneVolume">마이크 입력 레벨</label>
          <input type="range" id="microphoneVolume" v-model="microphoneVolume" min="0" max="100" disabled>
        </div>
        <button @click="toggleMonitor">{{ monitorActive ? '마이크 테스트 중지' : '마이크 테스트' }}</button>
        <button class="start-broadcasting" @click="startBroadcasting">방송 시작하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button/index.vue";
export default {
  components:{
    Button
  },
  data() {
    return {
      showModal: true,
      selectedCamera: '',
      selectedMicrophone: '',
      cameraOptions: [], // Should be populated dynamically
      microphoneOptions: [], // Should be populated dynamically
      microphoneVolume: 50,
      outputVolume: 50,
      monitorActive: false, // For toggling monitor on/off
      audioContext: null,
      microphoneStream: null
    };
  },
  beforeDestroy() {
    this.closeModal();  // 이미 구현된 모달 닫기 함수 호출
  },

  created() {
    this.getMediaDevices().then(() => {
      // Set default devices
      if (this.cameraOptions.length > 0) {
        this.selectedCamera = this.cameraOptions[0].deviceId;
      }
      if (this.microphoneOptions.length > 0) {
        this.selectedMicrophone = this.microphoneOptions[0].deviceId;
      }
    });
  },
  watch: {
    selectedCamera(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getCameraStream();
      }
    },
    selectedMicrophone(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getMicrophoneStream();
      }
    }
  },
  methods: {
    async getCameraStream() {
      if (this.selectedCamera) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {deviceId: this.selectedCamera},
            audio: false
          });
          this.$refs.cameraFeed.srcObject = stream;
        } catch (error) {
          console.error('Error accessing camera stream:', error);
          // Handle error (e.g., camera not available or permission denied)
        }
      }
    },
    startBroadcasting() {
      // Emit an event with the selected settings
      this.$emit('start-broadcast', {
        camera: this.selectedCamera,
        microphone: this.selectedMicrophone,
        micVolume: this.microphoneVolume,
        outVolume: this.outputVolume
      });
      this.showModal = false;
    },
    async getMediaDevices() {
      try {
        // Only proceed if the user has granted permission
        await navigator.mediaDevices.getUserMedia({audio: true, video: true});

        const devices = await navigator.mediaDevices.enumerateDevices();
        this.cameraOptions = devices
            .filter(device => device.kind === 'videoinput')
            .map(device => ({
              label: device.label || `Camera ${device.deviceId.substr(0, 8)}`,
              deviceId: device.deviceId
            }));

        this.microphoneOptions = devices
            .filter(device => device.kind === 'audioinput')
            .map(device => ({
              label: device.label || `Microphone ${device.deviceId.substr(0, 8)}`,
              deviceId: device.deviceId
            }));

        console.log('Cameras found:', this.cameraOptions);
        console.log('Microphones found:', this.microphoneOptions);
      } catch (error) {
        console.error('Error accessing media devices:', error);
        // Handle the error gracefully, consider user feedback
      }
    },
    async getMicrophoneStream() {
      if (this.selectedMicrophone) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: this.selectedMicrophone },
          });
          this.setupMicrophoneVolumeDetection(stream);
        } catch (error) {
          console.error('Error accessing microphone:', error);
        }
      }
    },

    async toggleMonitor() {
      this.monitorActive = !this.monitorActive; // Toggle the active state

      if (this.monitorActive) {
        // Activate monitoring
        try {
          this.microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.audioContext = new AudioContext();
          const source = this.audioContext.createMediaStreamSource(this.microphoneStream);
          source.connect(this.audioContext.destination); // Connect to speakers
          this.setupMicrophoneVolumeDetection(this.microphoneStream); // Start volume monitoring
        } catch (error) {
          console.error('Error accessing microphone:', error);
          this.monitorActive = false; // Reset the toggle if there was an error
        }
      } else {
        // Deactivate monitoring
        if (this.audioContext) {
          this.audioContext.close();
          this.audioContext = null;
        }
        if (this.microphoneStream) {
          this.microphoneStream.getTracks().forEach(track => track.stop()); // Stop the stream
          this.microphoneStream = null;
        }
        cancelAnimationFrame(this.volumeAnimationRequest); // Stop volume monitoring
        this.microphoneVolume = 0; // Reset the volume indicator
      }
    },
    setupMicrophoneVolumeDetection(stream) {
      const audioContext = new AudioContext();
      const microphone = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      microphone.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const getVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        let volume = sum / bufferLength;
        this.microphoneVolume = (volume / 128.0) * 100; // Scale the volume to fit the range of 0-100
        if (this.monitorActive) { // Only continue the loop if monitoring is active
          this.volumeAnimationRequest = requestAnimationFrame(getVolume);
        }
      };

      this.volumeAnimationRequest = requestAnimationFrame(getVolume); // Start the volume monitoring loop
    },
    closeModal() {
      // 카메라 스트림 해제
      if (this.$refs.cameraFeed && this.$refs.cameraFeed.srcObject) {
        const tracks = this.$refs.cameraFeed.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        this.$refs.cameraFeed.srcObject = null;
      }

      // 마이크 스트림 해제
      if (this.microphoneStream) {
        this.microphoneStream.getTracks().forEach(track => track.stop());
        this.microphoneStream = null;
      }

      // 오디오 컨텍스트 닫기
      if (this.audioContext) {
        this.audioContext.close();
        this.audioContext = null;
      }

      // 모달 상태 업데이트
      this.showModal = false;
      this.destroy()
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 30px;
  width: 90%;
  max-width: 1000px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
}

.camera-feed {
  height: 400px;
  background-color: #000;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
}

.camera-feed video {
  width: 100%;
  height: 100%;
}

.controls {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controls select,
.controls button,
.controls .volume-control {
  width: 90%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.start-broadcasting {
  background-color: #3071a9;
  color: white;
  font-weight: bold;
  border: none;
  margin-top: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.1em;
}

.start-broadcasting:hover {
  background-color: #265d8a;
}

.volume-control {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.volume-control label {
  margin-bottom: 5px;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 90%;
  margin: auto;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

/* Styles for the slider thumb for Webkit browsers */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  margin-top: -14px; /* You need to adjust this accordingly */
}

/* Styles for Mozilla browsers */
input[type="range"]::-moz-range-thumb {
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

</style>
