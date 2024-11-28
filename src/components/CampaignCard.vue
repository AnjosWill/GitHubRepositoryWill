<template>
  <div class="campaign-card">
    <div class="campaign-left">
      <div class="brand-profile">
        <img
          v-if="campaign && campaign.logo"
          :src="campaign.logo"
          :alt="campaign.altText || 'Campaign Logo'"
        />
      </div>
      <div class="campaign-basic-info">
        <h3>{{ campaign.title }}</h3>
        <p>{{ campaign.brand }}</p>
      </div>
    </div>
    <div class="campaign-right">
      <div class="campaign-amount">${{ campaign.amount }}</div>
      <div class="status-badges">
        <span
          v-for="badge in allStatuses"
          :key="badge"
          :class="[
            'status-badge',
            badge === campaign.currentStatus ? 'active' : 'inactive',
            mapStatusToClass(badge),
          ]"
        >
          {{ badge }}
        </span>
      </div>
      <div v-if="campaign.paymentDate" class="payment-timeline">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span>
          {{
            campaign.currentStatus === campaingStatuses.COMPLETED
              ? 'Completed on:'
              : 'Payment available on:'
          }}
          {{ campaign.paymentDate }}
        </span>
      </div>
      <div class="campaign-buttons">
        <!-- Botão de View Details -->
        <button
          v-if="showViewDetails"
          class="action-button action-button-view"
          @click="$emit('secondary-action', campaign.id)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="2" />
            <path
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          View Details
        </button>
        <!-- Botão de Get Payment Early -->
        <button
          v-if="showGetPaymentEarly"
          class="action-button action-button-early"
          @click="$emit('primary-action', campaign.id)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 10V3L4 14h7v7l9-11h-7z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Get Payment Early
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CAMPAIGN_STATUSES, ALL_STATUSES } from '@/config/constants'

export default defineComponent({
  name: 'CampaignCard',
  props: {
    campaign: {
      type: Object as () => Campaign,
      required: true,
    },
  },
  computed: {
    showViewDetails(): boolean {
      // Mostrar botão de View Details para todos os status
      return true
    },
    showGetPaymentEarly(): boolean {
      // Mostrar botão de Get Payment Early apenas para Approved
      return this.campaign.currentStatus === CAMPAIGN_STATUSES.APPROVED
    },
    campaingStatuses() {
      return CAMPAIGN_STATUSES
    },
    allStatuses() {
      return ALL_STATUSES
    },
  },
  methods: {
    mapStatusToClass(status: string): string {
      const statusMapping: Record<string, string> = {
        [CAMPAIGN_STATUSES.PENDING_APPROVAL]: 'status-pending',
        [CAMPAIGN_STATUSES.APPROVED]: 'status-approved',
        [CAMPAIGN_STATUSES.AVAILABLE_SOON]: 'status-available-soon',
        [CAMPAIGN_STATUSES.AVAILABLE_FOR_CASHOUT]: 'status-available',
        [CAMPAIGN_STATUSES.COMPLETED]: 'status-completed',
      }
      return statusMapping[status] || ''
    },
  },
})
</script>

<style scoped>
.campaign-card {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  margin: 0.06rem;
}

.campaign-left {
  display: flex;
  flex: 1;
  align-items: start;
  gap: 1rem;
}

.campaign-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 200px;
}

.brand-profile {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
}

.brand-profile img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.campaign-amount {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
  margin: 0;
}

.status-badges {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.status-badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  position: relative;
}

.status-badge.inactive {
  background: #f3f4f6 !important;
  color: #9ca3af !important;
}

.status-badge::after {
  content: '';
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 1px;
  background: #d1d5db;
}

.status-badge:last-child::after {
  display: none;
}

.status-pending {
  background: #e0f7fa;
  color: #06b6d4;
}
.status-approved {
  background: #eef2ff;
  color: #4f46e5;
}
.status-available-soon {
  background: #fef3c7;
  color: #d97706;
}
.status-available {
  background: #ecfdf5;
  color: #059669;
}
.status-completed {
  background: #f3f4f6;
  color: #374151;
}

.campaign-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.action-button {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.action-button-view {
  background: transparent;
  border: 2px solid #8b5cf6;
  color: #8b5cf6;
}

.action-button-view:hover {
  background: rgba(139, 92, 246, 0.1);
  transform: translateY(-1px);
}

.action-button-early {
  background: #3b82f6;
}

.action-button-early:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}
</style>
