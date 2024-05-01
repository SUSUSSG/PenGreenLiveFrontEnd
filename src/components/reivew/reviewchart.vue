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
  border: 1px solid #E5E7EB;
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
</style>



