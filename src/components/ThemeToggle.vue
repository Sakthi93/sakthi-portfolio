<template>
<button
  class="theme-btn"
  @click="toggleTheme"
  :data-tooltip="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
>
  <i class="fa-solid" :class="isDark ? 'fa-sun' : 'fa-moon'"></i>
  <span>
    {{ isDark ? "Light Mode" : "Dark Mode" }}
  </span>
</button>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "@/composables/useTheme";

const { theme, setTheme } = useTheme();

const isDark = computed(() => theme.value === "dark");

const toggleTheme = () => {
  setTheme(isDark.value ? "light" : "dark");
};
</script>

<style scoped>
.theme-btn {
  position: fixed;
  top: 80px; /* below navbar */
  right: 20px;
  z-index: 999;
  background: var(--card);
  color: var(--text);
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.1);
}

.theme-btn::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: -35px;
  right: 50%;
  transform: translateX(50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s ease;
}

/* arrow + hover */
.theme-btn::before {
  content: "";
  position: absolute;
  bottom: -10px;
  right: 50%;
  transform: translateX(50%);
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  transition: 0.2s ease;
}

.theme-btn:hover::after,
.theme-btn:hover::before {
  opacity: 1;
}
</style>