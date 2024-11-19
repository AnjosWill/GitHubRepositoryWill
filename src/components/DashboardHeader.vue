<template>
  <header class="dashboard-header">
    <h1 class="title">
      Campaign <span>Dashboard</span>
    </h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardHeader",
});
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
