<template>
  <Navbar />

  <!-- Theme Toggle (below navbar, fixed) -->
  <ThemeToggle />

  <HomeView />
</template>

<script setup>
import HomeView from "./views/HomeView.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<style>
/* only layout-related overrides if needed */
</style>