<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  data() {
    return {
      chartData: {
        labels: ['02.21.19', '02.22.19', '02.23.19', '02.24.19'],
        datasets: [
          {
            label: 'Reliability in %',
            backgroundColor: '#f87987',
            data: [80, 30, 50, 90]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }
};
</script>
