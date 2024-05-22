<template>
  <div class="review-charts-container">
    <div class="card">
      <Card title="리뷰 감정 추이 분포">
        <template v-if="loading">
          <div class="loading-text">조회 중...</div>
        </template>
        <template v-else>
          <apexchart
            type="line"
            height="350"
            :options="chartOptions"
            :series="series"
          ></apexchart>
          <div class="chart-data">
            <p>가로축: 일자</p>
            <p>세로축: 긍정, 부정, 중립 비율</p>
          </div>
        </template>
      </Card>
    </div>

    <div class="card">
      <Card title="리뷰 긍정률 분포">
        <template v-if="loading">
          <div class="loading-text">조회 중...</div>
        </template>
        <template v-else>
          <apexchart
            type="donut"
            height="450"
            :options="donutChartOptions"
            :series="donutSeries"
          ></apexchart>
          <div class="chart-data">
            <p>긍정, 부정, 중립 비율</p>
          </div>
        </template>
      </Card>
    </div>

    <div class="card">
      <Card title="리뷰 핵심 문구 차트">
        <template v-if="loading">
          <div class="review-word-loading">리뷰 핵심 단어 연관관계 분석 중...</div>
        </template>
        <template v-else-if="reviewImage">
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
import { ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    Card,
    apexchart: VueApexCharts,
  },
  props: {
    dailySentiments: Object,
    reviewImage: String,
    loading: Boolean,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'line',
        },
        xaxis: {
          categories: [],
          title: {
            text: '날짜'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        yaxis: {
          title: {
            text: 'Percentage'
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "%";
            }
          }
        },
        legend: {
          position: 'bottom'
        }
      },
      series: [],
      donutChartOptions: {
        chart: {
          type: 'donut',
        },
        labels: ['Positive', 'Negative', 'Neutral'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        legend: {
          position: 'bottom'
        }
      },
      donutSeries: []
    };
  },
  watch: {
    dailySentiments: {
      handler(newValue) {
        this.updateChartData(newValue);
      },
      deep: true,
    }
  },
  methods: {
    updateChartData(data) {
      const dates = Object.keys(data);
      const positive = dates.map(date => data[date].positive);
      const negative = dates.map(date => data[date].negative);
      const neutral = dates.map(date => data[date].neutral);

      this.chartOptions.xaxis.categories = dates;
      this.series = [
        {
          name: 'Positive',
          data: positive
        },
        {
          name: 'Negative',
          data: negative
        },
        {
          name: 'Neutral',
          data: neutral
        }
      ];

      const totalSentiments = dates.reduce((acc, date) => {
        acc.positive += data[date].positive;
        acc.negative += data[date].negative;
        acc.neutral += data[date].neutral;
        return acc;
      }, { positive: 0, negative: 0, neutral: 0 });

      const totalCount = dates.length;
      this.donutSeries = [
        totalSentiments.positive / totalCount,
        totalSentiments.negative / totalCount,
        totalSentiments.neutral / totalCount
      ];
    }
  }
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

.review-word-loading,
.loading-text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #333;
}

.review-charts-container {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}

.review-charts-container > div {
  flex: 1;
}

.apexchart {
  width: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  gap: 1rem;
}

img {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;
}

.chart-data {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.apexcharts-legend {
  justify-content: center !important;
}
</style>
