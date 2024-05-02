<template>
    <div class="landing-page">
      <section class="certification">
        <div class="certification-item" v-for="item in certifications" :key="item.id">
          <img :src="item.imageUrl" :alt="item.name" class="certification-logo">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p>주요 인증 사유: {{ item.reason }}</p>
          <p>환경 영향: {{ item.environmentalImpact }}</p>
        </div>
      </section>
  
      <section class="penguin-story">
        <h2>펭귄 스토리</h2>
        <p>지구 온난화로 인해 빙하가 녹고 있습니다. 이로 인해 펭귄의 서식지가 위협받고 있습니다. 친환경 제품 사용을 통해 에너지 절약 및 환경 파괴 요소를 줄임으로써 펭귄들의 생존 가능성을 높일 수 있습니다. 이는 펭귄들에게 행복한 삶을 제공합니다.</p>
        <img src="https://example.com/penguin_story.jpg" alt="Penguin Story">
      </section>
  
      <section class="esg-info">
        <h2>ESG란 무엇인가?</h2>
        <p>ESG는 환경(Environmental), 사회(Social), 지배구조(Governance)의 첫 글자를 딴 용어로 기업이 환경적, 사회적, 지배구조적 책임을 어떻게 이행하고 있는지를 평가하는 기준입니다.</p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
    data() {
      return {
        certifications: [
          {
            id: 1,
            name: '환경표지 제품',
            description: '환경부로부터 환경 표지 인증을 받은 제품입니다.',
            reason: '친환경 소재 사용 및 저에너지 공정',
            environmentalImpact: '자원 절약 및 환경 오염 감소',
            imageUrl: '../src/assets/images/all-img/img-env-wrapper.png'
          },
          {
            id: 2,
            name: '저탄소 제품',
            description: '저탄소 제품 인증을 받은 제품입니다.',
            reason: '탄소 배출 최소화',
            environmentalImpact: '온실가스 감축에 기여',
            imageUrl: '../src/assets/images/all-img/img-low-carbon.png'
          },
          {
            id: 3,
            name: 'GR제품',
            description: '자원순환율이 높은 GR 인증을 받은 제품입니다.',
            reason: '재활용 가능 자재 사용',
            environmentalImpact: '자원 순환 향상',
            imageUrl: '../src/assets/images/all-img/img-gr.png'
          }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .landing-page {
    font-family: 'Arial', sans-serif;
  }
  
  .certification .certification-item {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .certification-logo {
    width: 100px;
    height: auto;
    margin-bottom: 10px;
  }
  
  .penguin-story, .esg-info {
    background-color: #f9f9f9;
    padding: 20px;
    margin-top: 20px;
  }
  </style>
  