<template>
  <section id="resume-deck" class="deck-section">

    <h2 class="deck-title"></h2>

    <!-- Slide Navigation -->
    <div class="slide-tabs">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        :class="['tab', { active: currentIndex === index }]"
        @click="goTo(index)"
      >
        {{ slide.icon }} {{ slide.title }}
      </button>
    </div>

    <!-- Slide Card -->
    <div class="slide-card">

      <div class="slide-header">
        <span class="slide-icon">{{ slides[currentIndex].icon }}</span>
        <h3>{{ slides[currentIndex].title }}</h3>
      </div>

      <div class="slide-content">
        {{ slides[currentIndex].content }}
      </div>

      <!-- AI Summary -->
      <div class="ai-box" v-if="aiSummary || aiLoading">
        <div class="ai-label">✨ AI Summary</div>
        <div v-if="aiLoading" class="ai-loading">Generating summary...</div>
        <div v-else class="ai-text">{{ aiSummary }}</div>
      </div>

      <button class="ai-btn" @click="generateSummary" :disabled="aiLoading">
        {{ aiLoading ? "Generating..." : "✨ Generate AI Summary" }}
      </button>

    </div>

    <!-- Prev / Next -->
    <div class="slide-nav">
      <button @click="prev" :disabled="currentIndex === 0">← Prev</button>
      <span>{{ currentIndex + 1 }} / {{ slides.length }}</span>
      <button @click="next" :disabled="currentIndex === slides.length - 1">Next →</button>
    </div>

  </section>
</template>

<script setup>
import { ref, computed } from "vue"
import resume from "../assets/resumeData"

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const currentIndex = ref(0)
const aiSummary = ref("")
const aiLoading = ref(false)

const slides = [
  {
    icon: "👤",
    title: "About",
    content: resume.about
  },
  {
    icon: "🛠️",
    title: "Skills",
    content: resume.skills
  },
  {
    icon: "🏢",
    title: "Experience",
    content: resume.companyList + "\n\n" +
      Object.values(resume.companies).join("\n\n")
  },
  {
    icon: "🚀",
    title: "Projects",
    content: Object.entries(resume.projects)
      .map(([k, v]) => `• ${k}:\n${v}`)
      .join("\n\n")
  },
  {
    icon: "☁️",
    title: "AWS Experience",
    content: Object.entries(resume.awsExperience)
      .map(([k, v]) => `• ${k}:\n${v}`)
      .join("\n\n")
  },
  {
    icon: "🎓",
    title: "Education",
    content: resume.education
  }
]

const goTo = (index) => {
  currentIndex.value = index
  aiSummary.value = ""
}

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    aiSummary.value = ""
  }
}

const next = () => {
  if (currentIndex.value < slides.length - 1) {
    currentIndex.value++
    aiSummary.value = ""
  }
}

const generateSummary = async () => {
  aiLoading.value = true
  aiSummary.value = ""

  const slide = slides[currentIndex.value]
  const prompt = `You are a professional resume assistant. Based on the following resume section titled "${slide.title}", write a concise 2-3 line professional summary highlighting key strengths. Do not use bullet points.\n\n${slide.content}`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )
    if (res.status === 429) {
      aiSummary.value = "⚠️ Too many requests. Please wait a moment and try again."
      return
    }
    const data = await res.json()
    aiSummary.value = data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate summary."
  } catch {
    aiSummary.value = "Error connecting to Gemini API."
  } finally {
    aiLoading.value = false
  }
}
</script>

<style scoped>
.deck-section {
  padding: 60px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.deck-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--text-color, #fff);
}

.slide-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 24px;
}

.tab {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #2563eb;
  background: transparent;
  color: #2563eb;
  cursor: pointer;
  font-size: 0.85rem;
  transition: 0.2s;
}

.tab.active,
.tab:hover {
  background: #2563eb;
  color: white;
}

.slide-card {
  background: #1e293b;
  border-radius: 16px;
  padding: 30px;
  color: white;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.slide-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.slide-icon {
  font-size: 1.8rem;
}

.slide-header h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
}

.slide-content {
  white-space: pre-wrap;
  line-height: 1.8;
  color: #cbd5e1;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.ai-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.2s;
}

.ai-btn:hover:not(:disabled) {
  background: #1d4ed8;
}

.ai-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ai-box {
  background: #0f172a;
  border-left: 3px solid #2563eb;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
}

.ai-label {
  font-size: 0.8rem;
  color: #2563eb;
  font-weight: 600;
  margin-bottom: 8px;
}

.ai-text {
  color: #e2e8f0;
  line-height: 1.7;
  font-size: 0.95rem;
}

.ai-loading {
  color: #94a3b8;
  font-style: italic;
}

.slide-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
  color: #94a3b8;
}

.slide-nav button {
  background: #1e293b;
  color: white;
  border: 1px solid #334155;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.slide-nav button:hover:not(:disabled) {
  background: #2563eb;
  border-color: #2563eb;
}

.slide-nav button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 500px) {
  .slide-tabs {
    gap: 6px;
  }
  .tab {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
}
</style>
