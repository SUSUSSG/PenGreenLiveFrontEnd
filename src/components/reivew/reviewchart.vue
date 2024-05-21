<template>
  <div class="review-charts-container">
    <div class="card">
      <Card title="리뷰 감정 추이 분포">
        <apexchart
          type="bar"
          height="350"
          :options="
            this.$store.themeSettingsStore.isDark
              ? stackChartDark.chartOptions
              : stackChart.chartOptions
          "
          :series="stackChart.series"
        ></apexchart>
      </Card>
    </div>

    <div class="card">
      <Card title="리뷰 긍정률 분포">
        <apexchart
          type="donut"
          height="450"
          :options="
            this.$store.themeSettingsStore.isDark
              ? donutChartDark.chartOptions
              : donutChart.chartOptions
          "
          :series="donutChart.series"
        ></apexchart>
      </Card>
    </div>

    <div class="card">
      <Card title="리뷰 핵심 문구 차트">
        <template v-if="reviewImage">
          <img :src="reviewImage" alt="리뷰 요약 이미지" />
        </template>
        <template v-else>
          <div class="col">
            <p>-- 에러 --</p>
            <p>분석을 위한 리뷰 수가 부족합니다!!</p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { stackChart } from "@/constant/appex-chart";
import { donutChart } from "@/constant/appex-chart";

export default {
  components: {
    Card,
  },
  props: {
    reviewImage: String, // 상위 컴포넌트에서 전달받는 리뷰 이미지 데이터
  },
  data() {
    return {
      stackChart,
      donutChart,
    };
  },
};
</script>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.review-charts-container {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}

.review-charts-container > div {
  flex: 1;
  margin: 0 10px;
}

.apexchart {
  width: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1.5rem;
  width: 32%;
  height: 400px;
  margin: 10px;
}

.review-charts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  width: 100%;
  gap: 1.5rem;
}

img {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
