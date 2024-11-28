<template>
  <section class="campaign-section">
    <div class="section-header" :class="{ expanded: expanded }" @click="toggleSection">
      <h2 class="section-title">
        <svg v-if="icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path :d="icon" fill="#7c3aed" />
        </svg>
        {{ title }}
      </h2>
      <svg class="toggle-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 10l5 5 5-5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="campaign-cards" :class="{ collapsed: !expanded }">
      <CampaignCard
        v-for="campaign in campaigns"
        :key="campaign.id"
        :campaign="campaign"
        @primary-action="$emit('primary-action', campaign.id)"
        @secondary-action="$emit('secondary-action', campaign.id)"
      />
    </div>
    <button class="show-more" v-if="campaigns.length > 1" @click.stop="toggleSection">
      {{ expanded ? 'See less' : 'See all' }}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          :d="expanded ? 'M19 15l-7-7-7 7' : 'M19 9l-7 7-7-7'"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CampaignCard from '@/components/CampaignCard.vue'

export default defineComponent({
  name: 'CampaignSection',
  components: { CampaignCard },
  props: {
    title: { type: String, required: true },
    campaigns: { type: Array, required: true },
    icon: { type: String, required: false },
  },
  setup() {
    const expanded = ref(true)

    function toggleSection() {
      expanded.value = !expanded.value
    }

    return {
      expanded,
      toggleSection,
    }
  },
})
</script>

<style scoped>
.campaign-section h2 {
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.section-header.expanded .toggle-icon {
  transform: rotate(180deg);
}

.campaign-cards {
  max-height: none;
  overflow: visible;
  transition: max-height 0.3s ease;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(680px, 1fr));
  gap: 1rem;
}

.campaign-cards.collapsed {
  max-height: 0;
  overflow: hidden;
}
</style>
