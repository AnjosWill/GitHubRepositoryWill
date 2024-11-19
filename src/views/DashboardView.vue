<template>
  <div class="container">
    <DashboardHeader />
    <SummarySection
      :progress="22"
      :financialData="[
        { label: 'Total Balance', value: '$4,100' },
        { label: 'Balance', value: '$900' },
        { label: 'Pending Payments', value: '$3,200' }
      ]"
      :activeCampaigns="4"
      cashOutAvailable="$1,200"
    />
    <CampaignSection title="Eligible for Advance" :totalItems="2"
    icon="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z">
      <CampaignCard
        logo="/images/autumn-bliss.PNG"
        altText="Autumn Bliss logo"
        title="Fall Launch"
        subtitle="Autumn Bliss"
        amount="$500"
        badgeText="Earned"
        badgeClass="status-earned"
        buttonText="Get Payment Early"
        buttonClass="action-button-early"
        paymentDate="December 9, 2024"
        @button-click="handleAction('getPaymentEarly')"
      />
      <CampaignCard
        logo="/images/lume-atelier.PNG"
        altText="Lume Atelier logo"
        title="Summer Collection 2024"
        subtitle="Lume Atelier Co."
        amount="$750"
        badgeText="Earned"
        badgeClass="status-earned"
        buttonText="Get Payment Early"
        buttonClass="action-button-early"
        paymentDate="July 30, 2023"
        @button-click="handleAction('getPaymentEarly')"
      />
    </CampaignSection>
    <CampaignSection title="Pending Payments" :totalItems="2"
    icon="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z">
      <CampaignCard
        logo="/images/festiva.PNG"
        altText="Festiva logo"
        title="Holiday Campaign"
        subtitle="Festiva"
        amount="$1,200"
        badgeText="Available for Cash-out"
        badgeClass="status-available"
        buttonText="Cash Out Now"
        buttonClass="action-button-cashout"
        @button-click="handleAction('getCashOutNow')"
      />
      <CampaignCard
        logo="/images/summer-glow.PNG"
        altText="SummerGlow logo"
        title="Summer Series"
        subtitle="Summer Glow Co."
        amount="$750"
        badgeText="Awaiting Payment"
        badgeClass="status-awaiting"
        paymentDate="November 25, 2024"
        buttonText="View Details"
        buttonClass="action-button-view"
        @button-click="handleAction('getViewDetails')"
      />
    </CampaignSection>
    <CampaignSection title="Completed" :totalItems="1"
    icon="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z">
      <CampaignCard
        logo="/images/ever-trend.PNG"
        altText="EverTrend logo"
        title="Completed Series"
        subtitle="EverTrend Co."
        amount="$900"
        badgeText="Completed"
        badgeClass="status-completed"
        paymentDate="November 13, 2024"
        buttonText="View Details"
        buttonClass="action-button-view"
        @button-click="handleAction('getViewDetails')"
      />
    </CampaignSection>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import SummarySection from '@/components/SummarySection.vue'
import CampaignSection from '@/components/CampaignSection.vue'
import CampaignCard from '@/components/CampaignCard.vue'
import { handleButtonClick } from '@/utils/interaction'

export default defineComponent({
  name: 'DashboardView',
  components: {
    DashboardHeader,
    SummarySection,
    CampaignSection,
    CampaignCard,

  },
  methods: {
    handleAction(action: string) {
      handleButtonClick(action)
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

.summary-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: rgba(255, 255, 255, 0.5);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.campaign-section {
  margin-bottom: 1rem;
}
</style>
