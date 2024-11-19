<template>
  <div class="summary-section">
    <!-- Gauge Chart -->
    <div id="gauge-chart" class="gauge-container"></div>
    <!-- Informações Detalhadas -->
    <div class="gauge-labels">
      <div v-for="(item, index) in financialData" :key="index" class="gauge-label">
        <span class="gauge-label-text">{{ item.label }}</span>
        <span class="gauge-label-value">{{ item.value }}</span>
      </div>
    </div>
    <!-- Active Campaigns -->
    <div class="active-campaigns">
      <span class="gauge-label-text">Active Campaigns</span>
      <span class="gauge-label-value">{{ activeCampaigns }}</span>
    </div>
    <!-- Cash Out Section -->
    <div class="balance-row">
      <div class="balance-item">
        <span class="balance-label">Available for Cash-out</span>
        <span class="balance-value">{{ cashOutAvailable }}</span>
      </div>
      <button class="cashout-button" @click="handleCashOut">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Cash Out
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ApexCharts from "apexcharts";

export default defineComponent({
  name: "SummarySection",
  props: {
    progress: {
      type: Number,
      required: true,
    },
    financialData: {
      type: Array as () => { label: string; value: string }[],
      required: true,
    },
    activeCampaigns: {
      type: Number,
      required: true,
    },
    cashOutAvailable: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleCashOut() {
      alert("Cash Out initiated!");
    },
  },
  mounted() {
    const options = {
      series: [this.progress],
      chart: {
        type: "radialBar",
        height: 200,
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            size: "70%",
          },
          track: {
            background: "#e7e7e7",
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "14px",
              color: "#6B7280",
            },
            value: {
              fontSize: "24px",
              color: "#111827",
              formatter: (val: number) => `${val}%`,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#7c3aed"],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Payment Progress"],
    };

    const chart = new ApexCharts(document.querySelector("#gauge-chart"), options);
    chart.render();
  },
});
</script>

<style scoped>
.summary-section {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.gauge-container {
  margin-bottom: 2.5rem;
  width: 100%;
  height: 200px;
}

.gauge-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 15%;
}

.gauge-label {
  text-align: center;
}

.gauge-label-text {
  font-size: 0.9rem;
  color: #6B7280;
  font-weight: 500;
}

.gauge-label-value {
  font-size: 1.2rem;
  color: #111827;
  font-weight: 600;
}

.active-campaigns {
  text-align: right;
}

.balance-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.balance-item {
  text-align: center;
}

.balance-label {
  font-size: 0.9rem;
  color: #6B7280;
}

.balance-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
}

.cashout-button {
  background: #10B981;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}

.cashout-button:hover {
  background: #059669;
}
</style>
