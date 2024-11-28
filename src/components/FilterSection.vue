<template>
  <div class="filter-section">
    <!-- Search Bar -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search campaigns or brands..."
      class="search-bar"
    />

    <!-- Status Filters -->
    <div class="status-filters">
      <button
        :class="['status-filter status-filter-all', { active: !activeFilters.length }]"
        @click="toggleFilter('All')"
      >
        All
      </button>
      <button
        v-for="status in allStatuses"
        :key="status"
        :class="[
          'status-filter',
          { active: activeFilters.includes(status) },
          mapStatusToClass(status),
        ]"
        @click="toggleFilter(status)"
      >
        {{ status }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
import { ALL_STATUSES, CAMPAIGN_STATUSES } from '@/config/constants'
import debounce from 'lodash/debounce'

export default defineComponent({
  name: 'FilterSection',
  computed: {
    ...mapState({
      allStatuses: () => ALL_STATUSES,
      activeFilters: (state) => state.filters.statuses,
    }),
    searchQuery: {
      get() {
        return this.$store.state.filters.searchQuery
      },
      set: debounce(function (value: string) {
        this.setFilters({ searchQuery: value, statuses: this.activeFilters })
      }, 300),
    },
  },
  methods: {
    ...mapMutations(['setFilters']),
    toggleFilter(status: string) {
      const updatedFilters =
        status === 'All'
          ? []
          : this.activeFilters.includes(status)
          ? this.activeFilters.filter((s) => s !== status)
          : [...this.activeFilters, status]

      this.setFilters({ searchQuery: this.searchQuery, statuses: updatedFilters })
    },
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
.filter-section {
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.search-bar {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  background: white;
  transition: border-color 0.3s ease;
}

.search-bar:focus {
  border: 2px solid #7c3aed;
  outline: none;
}

.status-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status-filter {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  background: #f3f4f6;
  color: #6b7280;
}

.status-filter.active {
  border-color: currentColor;
}

.status-filter-all {
  color: #111827;
}

.status-filter.status-pending {
  color: #06b6d4;
}
.status-filter.status-approved {
  color: #4f46e5;
}
.status-filter.status-available-soon {
  color: #d97706;
}
.status-filter.status-available {
  color: #059669;
}
.status-filter.status-completed {
  color: #374151;
}
</style>
