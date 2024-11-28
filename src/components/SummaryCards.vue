<template>
  <div class="summary-cards">
    <div class="card">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-value">${{ availableBalance }}</p>
      <button class="cashout-button" @click="handleCashOut">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 10V3L4 14h7v7l9-11h-7z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SummaryCards',
  props: {
    title: {
      type: String,
      default: 'Available for Cash-out',
    },
    availableBalance: {
      type: Number,
      required: true,
    },
    buttonText: {
      type: String,
      default: 'Cash Out',
    },
  },
  methods: {
    handleCashOut() {
      this.$emit('cash-out')
    },
  },
})
</script>

<style scoped>
.summary-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

.card {
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
  gap: 0.8rem;
}

.card-title {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.card-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
}

.cashout-button {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  color: white;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #10b981;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}

.cashout-button:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(16, 185, 129, 0.3);
}

.cashout-button svg {
  width: 1rem;
  height: 1rem;
}
</style>
