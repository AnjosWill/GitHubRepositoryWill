<template>
  <Dialog ref="dialog" />
  <div class="container">
    <DashboardHeader />
    <SummaryCards :availableBalance="totalAvailableForCashOut" @cash-out="handleCashOut" />

    <!-- Filter Section -->
    <FilterSection />

    <div v-if="isFiltered" class="filtered-campaigns">
      <CampaignSection
        title="Filtered Campaigns"
        :campaigns="filteredCampaigns"
        @primary-action="handleAction('getPaymentEarly', $event)"
        @secondary-action="handleAction('getViewDetails', $event)"
      />
    </div>
    <div v-else-if="!isFiltered" class="section-campaigns">
      <CampaignSection
        v-if="eligibleCampaigns.length"
        title="Eligible for Advance"
        icon="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"
        :campaigns="eligibleCampaigns"
        @primary-action="handleAction('getPaymentEarly', $event)"
        @secondary-action="handleAction('getViewDetails', $event)"
      />
      <CampaignSection
        v-if="pendingCampaigns.length"
        title="Pending Payments"
        icon="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
        :campaigns="pendingCampaigns"
        @secondary-action="handleAction('getViewDetails', $event)"
      />
      <CampaignSection
        v-if="completedCampaigns.length"
        title="Completed"
        icon="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
        :campaigns="completedCampaigns"
        @secondary-action="handleAction('getViewDetails', $event)"
      />
    </div>
    <div v-else class="no-campaigns">No campaigns available.</div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import { CAMPAIGN_STATUSES } from '@/config/constants'
import DashboardHeader from '@/components/DashboardHeader.vue'
import SummaryCards from '@/components/SummaryCards.vue'
import FilterSection from '@/components/FilterSection.vue'
import CampaignSection from '@/components/CampaignSection.vue'
import Dialog from '@/components/Dialog.vue'

export default defineComponent({
  name: 'DashboardView',
  components: {
    DashboardHeader,
    SummaryCards,
    FilterSection,
    CampaignSection,
    Dialog,
  },
  setup() {
    const dialog = ref(null)
    return {
      dialog,
    }
  },
  computed: {
    ...mapState(['availableBalance', 'filters']),
    ...mapGetters([
      'filteredCampaigns',
      'eligibleCampaigns',
      'pendingCampaigns',
      'completedCampaigns',
      'totalAvailableForCashOut',
    ]),
    isFiltered() {
      const hasFilters = this.filters.statuses.length > 0 && !this.filters.statuses.includes('All')
      if (this.filters.searchQuery || hasFilters) {
        return this.filteredCampaigns
      }
      return null
    },
  },
  methods: {
    ...mapActions(['updateCampaign', 'cashOut']),
    handleAction(action, campaignId) {
      const campaign = this.$store.state.campaigns.find((c) => c.id === campaignId)

      if (!campaign) return

      if (action === 'getPaymentEarly') {
        const feePercentage = 5 // Exemplo de taxa de 5%
        const fee = (campaign.amount * feePercentage) / 100
        const total = campaign.amount + fee

        this.$refs.dialog.open({
          title: 'Early Payment Request',
          content: [
            { label: 'Original amount:', value: `$${campaign.amount}`, isBold: true },
            { label: `Early payment fee (${feePercentage}%):`, value: `$${fee.toFixed(2)}` },
            {
              label: 'Total amount:',
              value: `$${total.toFixed(2)}`,
              isTotal: true,
            },
          ],
          message: 'Would you like to proceed with the early payment request?',
          confirmText: 'Confirm',
          cancelText: 'Cancel',
          onConfirm: () => {
            this.$store.commit('updateCampaignStatus', {
              id: campaignId,
              status: CAMPAIGN_STATUSES.AVAILABLE_SOON,
              total,
            })
            setTimeout(() => {
              this.$store.commit('updateCampaignStatus', {
                id: campaignId,
                status: CAMPAIGN_STATUSES.AVAILABLE_FOR_CASHOUT,
              })
              this.$store.commit('addToAvailableBalance', total)
            }, 10000)
          },
        })
      }
    },
    handleCashOut() {
      const total = this.$store.getters.totalAvailableForCashOut
      if (total > 0) {
        this.$refs.dialog.open({
          title: 'Confirm Cash Out',
          content: [
            {
              label: 'Amount to cash out:',
              value: `$${total}`,
              isTotal: true,
            },
          ],
          message: `Would you like to proceed with the cash out?`,
          confirmText: 'Confirm',
          cancelText: 'Cancel',
          onConfirm: this.cashOut,
        })
      } else {
        console.warn('No balance available to cash out.')
      }
    },
  },
})
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1400px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(255, 192, 203, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  animation: fadeIn 0.5s ease-in-out;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.dialog {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}
.dialog-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}
.dialog-button-confirm {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.dialog-button-cancel {
  background: transparent;
  border: 1px solid #6b7280;
  color: #6b7280;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
