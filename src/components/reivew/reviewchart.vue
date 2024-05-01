<template>
      <Card title="Basic Bar Chart">
      <apexchart
        type="bar"
        height="350"
        :options="
          this.$store.themeSettingsStore.isDark
            ? basicBarDark.chartOptions
            : basicBar.chartOptions
        "
        :series="basicBar.series"
      ></apexchart>
    </Card>
</template>

<script>
import Card from "@/components/Card";
import { basicBar } from "@/constant/appex-chart";

export default {
    components:{
        Card
    },
    data(){
        return{
            basicBar,
        }
    }

}
</script>

<style>

</style>