<template>
  <div id="app">
    <DashboardView v-if="currentView === 'Dashboard'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DashboardView from "@/views/DashboardView.vue";

export default defineComponent({
  name: "App",
  components: {
    DashboardView
  },
  setup() {
    const currentView = ref("Dashboard");
    return { currentView };
  },
});
</script>

<style>
@import "@/styles/global.scss";
</style>
