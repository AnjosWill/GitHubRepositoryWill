<template>
  <header class="dashboard-header" role="banner">
    <h1 class="title" :aria-label="title">
      {{ title }} <span>{{ highlight }}</span>
    </h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardHeader',
  props: {
    title: {
      type: String,
      default: 'Campaign',
    },
    highlight: {
      type: String,
      default: 'Dashboard',
    },
  },
})
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  color: #333;
  font-size: 1.8rem;
  font-weight: 600;
}

.title span {
  color: #7c3aed;
}
</style>
