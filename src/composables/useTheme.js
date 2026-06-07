import { ref, onMounted } from "vue";

const theme = ref("light");

export function useTheme() {

  const applyTheme = (value) => {
    document.documentElement.classList.remove("dark");

    if (value === "dark") {
      document.documentElement.classList.add("dark");
    }
  };

  const setTheme = (value) => {
    theme.value = value;
    localStorage.setItem("theme", value);
    applyTheme(value);
  };

  const initTheme = () => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
  };

  onMounted(() => {
    initTheme();
  });

  return {
    theme,
    setTheme
  };
}