<template>
  <div id="gauge-chart" class="gauge-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import ApexCharts from 'apexcharts'

export default defineComponent({
  name: 'GaugeChart',
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    onMounted(() => {
      const options = {
        series: [22],
        chart: {
          type: 'radialBar',
          height: 200,
          offsetY: -10
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            hollow: {
              margin: 0,
              size: '70%',
            },
            track: {
              background: '#e7e7e7',
              strokeWidth: '97%',
              margin: 5,
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15
              }
            },
            dataLabels: {
              name: {
                show: true,
                fontSize: '14px',
                fontFamily: "'Inter', 'Inter Placeholder', sans-serif",
                fontWeight: 500,
                color: '#6B7280',
                offsetY: -10
              },
              value: {
                offsetY: 5,
                fontSize: '24px',
                fontFamily: "'Inter', 'Inter Placeholder', sans-serif",
                fontWeight: 600,
                color: '#111827',
                formatter: (val: number) => `${val}%`,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#7c3aed'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Payment Progress']
      }

      const chart = new ApexCharts(document.querySelector('#gauge-chart'), options)
      chart.render()
    })
  },
})
</script>

<style scoped>
.gauge-container {
  width: 100%;
  height: 200px;
}
</style>
