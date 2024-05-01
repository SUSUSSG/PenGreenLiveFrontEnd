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
          <!-- 필요한 내용 추가 -->
        </Card>
      </div>
    </div>
</template>

  

<script>
import Card from "@/components/Card";
import { stackChart } from "@/constant/appex-chart";
import { donutChart } from "@/constant/appex-chart";

export default {
    components:{
        Card
    },
    data(){
        return{
            stackChart,
            donutChart
        }
    }

}
</script>

<style scoped>
.review-charts-container {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}

.review-charts-container > div {
  flex: 1; /* 모든 카드가 동일한 너비를 갖도록 설정 */
  margin: 0 10px; /* 카드 사이의 간격을 조정 */
}

.apexchart {
  width: 100%; /* 차트가 카드 컨테이너 내에서 전체 너비를 차지하도록 설정 */
}
</style>


