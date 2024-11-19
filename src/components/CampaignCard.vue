<template>
  <div class="campaign-card">
    <div class="campaign-left">
      <div class="brand-profile">
        <img :src="logo" :alt="altText" />
      </div>
      <div class="campaign-basic-info">
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
      </div>
    </div>
    <div class="campaign-right">
      <div class="campaign-amount">{{ amount }}</div>
      <span :class="['status-badge', badgeClass]">{{ badgeText }}</span>
      <div v-if="paymentDate" class="payment-timeline">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span v-if="badgeClass === 'status-completed'">
          Completed on: {{ paymentDate }}
        </span>
        <span v-else-if="badgeClass === 'status-earned' || badgeClass === 'status-awaiting'">
          Expected payment: {{ paymentDate }}
        </span>
      </div>
      <button v-if="buttonText" :class="['action-button', buttonClass]" @click="handleButtonClick">
        <svg v-if="buttonClass === 'action-button-view'" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="2"/>
          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" stroke-width="2"/>
        </svg>
        <svg v-else-if="buttonClass === 'action-button-cashout'" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="buttonClass === 'action-button-early'" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CampaignCard",
  props: {
    logo: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    badgeText: {
      type: String,
      required: true,
    },
    badgeClass: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonClass: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: String,
      required: false,
    },
  }
});
</script>
