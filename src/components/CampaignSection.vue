<template>
  <div class="campaign-section" :data-total-items="totalItems">
    <div class="section-header" :class="{ expanded: expanded }" @click="toggleSection">
      <h2 class="section-title">
        <svg v-if="icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path :d="icon" fill="#7c3aed"/>
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
      <slot />
    </div>
    <button class="show-more" v-if="totalItems > 1" @click.stop="toggleSection">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CampaignSection',
  props: {
    title: {
      type: String,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
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
.campaign-section {
  margin-bottom: 1rem;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.campaign-cards.collapsed {
  max-height: 0;
  overflow: hidden;
}
</style>
