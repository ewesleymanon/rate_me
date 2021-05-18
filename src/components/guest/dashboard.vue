<template>
  <div class="p-dashboard">
    <div class="p-dashboard__card">
      <div class="p-dashboard__card-item">
        <img src="../../assets/images/icons/dashboard/star.png" alt="Star">
        <h1>21</h1>
        <h6>No. of Reviews</h6>
      </div>
      <div class="p-dashboard__card-item">
        <img src="../../assets/images/icons/dashboard/thumbs-up.png" alt="Star">
        <h1>80%</h1>
        <h6>Good Reviews</h6>
      </div>
      <div class="p-dashboard__card-item">
        <img src="../../assets/images/icons/dashboard/thumbs-down.png" alt="Star">
        <h1>20%</h1>
        <h6>Kaizen Pointss</h6>
      </div>
      <div class="p-dashboard__card-item">
        <img src="../../assets/images/icons/dashboard/stats.png" alt="Star">
        <h1>3</h1>
        <h6>No. of Attended Events</h6>
      </div>
    </div>
    <canvas id="myChart" height="100%"></canvas>
    <!-- <div class="p-dashboard__top">
      <h1 class="p-dashboard__top-title">Top 3 Presentations</h1>
      <small class="p-dashoard__top-subtitl">from the previous event</small>
    </div> -->
  </div>
</template>
<script>
import Chart from 'chart.js'
import ChartData from './graph/data_of_chart'
export default {
  methods: {
    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId).getContext('2d')
      var gradientFill = ctx.createLinearGradient(500, 0, 100, 0)
      gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0.6)')
      gradientFill.addColorStop(1, 'rgba(244, 144, 128, 0.6)')
      var cData = chartData(gradientFill)
      const myChart = new Chart(ctx, {
        type: cData.type,
        data: cData.data,
        options: cData.options
      })
      console.log(myChart)
    }
  },
  mounted () {
    this.createChart('myChart', ChartData)
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/project/_guest_dashboard.scss'
</style>
