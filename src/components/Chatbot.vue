<template>

  <!-- Floating Chat Bubble -->

  <div
    v-if="!isOpen"
    class="chat-bubble"
    @click="toggleChat"
  >
    <i class="fas fa-robot"></i>
  </div>

  <!-- Chat Window -->

  <div
    v-if="isOpen"
    class="chat-window"
  >

    <!-- Header -->

    <div class="chat-header">

      <div>
        <i class="fas fa-robot"></i>
        Sakkthi AI
      </div>

      <div class="header-actions">
        <i
          :class="speakEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute'"
          :title="speakEnabled ? 'Voice ON' : 'Voice OFF'"
          class="voice-toggle"
          @click="speakEnabled = !speakEnabled"
        ></i>
        <i
          class="fas fa-times close"
          @click="toggleChat"
        ></i>
      </div>

    </div>

    <!-- Messages -->

    <div
      class="chat-body"
      ref="chatBody"
    >

      <div
        v-for="(message,index) in messages"
        :key="index"
        :class="['chips', 'cert'].includes(message.type) ? 'bot' : message.type"
      >
        <template v-if="message.type === 'chips'">
          <div>{{ message.label }}</div>
          <div class="chips">
            <span
              v-for="chip in message.chips"
              :key="chip.key"
              class="chip"
              @click="selectChip(chip)"
            >{{ chip.key }}</span>
          </div>
        </template>
        <template v-else-if="message.type === 'cert'">
          <div style="margin-bottom:6px;font-weight:600;">{{ message.name }}</div>
          <div>To verify, <a :href="message.credlyUrl" target="_blank" class="cert-link">click here</a></div>
        </template>
        <template v-else>
          {{ message.text }}
        </template>
      </div>

    </div>

    <!-- Input -->

    <div class="chat-footer">

      <input
        v-model="question"
        @keyup.enter="askQuestion"
        placeholder="Ask about Sakkthi..."
      />

      <button @click="askQuestion">
        <i class="fas fa-paper-plane"></i>
      </button>

      <button
        class="stop-btn"
        :disabled="!isStreaming"
        :title="isStreaming ? 'Stop' : 'Not streaming'"
        @click="stopStreaming"
      >
        <i class="fas fa-stop-circle"></i>
      </button>

    </div>

  </div>

</template>

<script setup>

import { ref, nextTick } from "vue"
import resume from "../assets/resumeData"
import { matchJD } from "../utils/jdMatcher"

const isOpen = ref(false)
const speakEnabled = ref(false)
const isStreaming = ref(false)
let stopFlag = false

const stopStreaming = () => {
  stopFlag = true
  window.speechSynthesis.cancel()
}

const speak = (text) => {
  if (!speakEnabled.value) return
  window.speechSynthesis.cancel()
  const clean = text.replace(/[^\x00-\x7F•]/g, "").trim()
  if (!clean) return
  const utter = new SpeechSynthesisUtterance(clean)
  utter.rate = 1
  utter.pitch = 1
  utter.lang = "en-US"
  window.speechSynthesis.resume()
  window.speechSynthesis.speak(utter)
}

const question = ref("")

const chatBody = ref(null)

const messages = ref([
  {
  type: "bot",
  text: `Hi! I'm Sakkthi's AI assistant.

You can:
• Ask about skills
• Ask about projects
• Ask about companies
• Ask about AWS experience
• Ask about education
• Paste a Job Description for JD matching`
}
])

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const scrollBottom = async () => {

  await nextTick()

  if (chatBody.value) {
    chatBody.value.scrollTop =
      chatBody.value.scrollHeight
  }

}

const JD_KEYWORDS = [
  "requirements",
  "responsibilities",
  "must have",
  "preferred",
  "job description",
  "looking for",
  "experience with",
  "skills required",
  "qualifications"
]

const isJobDescription = (text) => {

  const lower = text.toLowerCase()

  const keywordMatches =
    JD_KEYWORDS.filter(keyword =>
      lower.includes(keyword)
    ).length

  const skillMatches = [
    "python",
    "django",
    "react",
    "vue",
    "aws",
    "docker",
    "kubernetes",
    "postgresql",
    "microservices"
  ].filter(skill =>
    lower.includes(skill)
  ).length

  return keywordMatches >= 1 || skillMatches >= 4
}

const flattenResume = () => {
  const results = []
  const walk = (obj) => {
    if (typeof obj === "string") {
      results.push(obj)
    } else if (Array.isArray(obj)) {
      obj.forEach(walk)
    } else if (obj && typeof obj === "object") {
      Object.values(obj).forEach(walk)
    }
  }
  walk(resume)
  return results
}

const fuzzySearch = (q) => {
  const keywords = q.split(" ").filter(w => w.length > 2)
  const allTexts = flattenResume()
  const scored = allTexts.map(text => {
    const lower = text.toLowerCase()
    const score = keywords.filter(k => lower.includes(k)).length
    return { text, score }
  }).filter(r => r.score > 0)
  scored.sort((a, b) => b.score - a.score)
  return scored.length ? scored[0].text : null
}
const replaceName = (text) => {
  if (typeof text !== "string") return String(text)
  let firstFound = false
  return text.replace(/Sakkthinagaraj/gi, () => {
    if (!firstFound) { firstFound = true; return "Sakkthinagaraj" }
    return "He"
  })
}

const showChips = (label, obj, type = "default") => {
  messages.value.push({
    type: "chips",
    label,
    chips: Object.entries(obj).map(([key, value]) => ({ key, value, type }))
  })
  scrollBottom()
}

const selectChip = async (chip) => {
  messages.value.push({ type: "user", text: chip.key })
  await scrollBottom()
  if (chip.type === "company") {
    const companyMap = {
      "Accenture": resume.companies.accenture,
      "EC Group Datasoft": resume.companies.ecgroup,
      "Talentztech Solution": resume.companies.talentztech
    }
    const company = companyMap[chip.key]
    if (company) {
      await streamMessage(company.summary)
      showChips("Select a project:", company.projects, "project")
      return
    }
  }
  await streamMessage(chip.value)
}

const streamMessage = async (text) => {

  if (!text) return

  stopFlag = false
  isStreaming.value = true

  text = replaceName(text)

  speak(text)

  const botMessage = {
    type: "bot",
    text: ""
  }
  messages.value.push(botMessage)

  await scrollBottom()

  await new Promise(resolve =>
    setTimeout(resolve, 400)
  )

  for (let i = 0; i < text.length; i++) {

    if (stopFlag) {
      isStreaming.value = false
      return
    }

    botMessage.text += text[i]

    messages.value = [...messages.value]

    await scrollBottom()

    await new Promise(resolve =>
      setTimeout(resolve, 12)
    )

  }

  isStreaming.value = false

}

const askQuestion = async () => {

  if (question.value.trim() === "")
    return

  const originalQuestion = question.value

  const q = originalQuestion.toLowerCase()

  // Show user message in chat first
  messages.value.push({
    type: "user",
    text:
      originalQuestion.length > 200
        ? originalQuestion.substring(0, 200) + "..."
        : originalQuestion
  })

  await scrollBottom()

  // ==========================
  // JD MATCHER
  // ==========================

  if (isJobDescription(originalQuestion)) {

    const result = matchJD(originalQuestion)

    let answer = `
🎯 JD MATCH SCORE: ${result.score}%

✅ Matched Skills:
${result.matched.length
  ? result.matched.join(", ")
  : "None"}

❌ Missing Skills:
${result.missing.length
  ? result.missing.join(", ")
  : "None"}
`

    if (result.score >= 80) {

      answer += `

🚀 Strong match for this role.
Likely to clear resume screening.
`

    } else if (result.score >= 60) {

      answer += `

⚡ Good match.
Some upskilling may improve alignment.
`

    } else {

      answer += `

📚 Several skill gaps detected.
Consider highlighting transferable experience.
`

    }

    question.value = ""

    await streamMessage(answer)

    return
  }
  await scrollBottom()

  let answer =
    "Sorry, I can answer only questions related to Sakkthi's resume."

  // About

if (
  q.includes("about") ||
  q.includes("introduce") ) {
  answer = resume.about
}
else if (
  q.includes("years")
) {
  question.value = ""
  await streamMessage(resume.totalYearsOfExperience)
  showChips("Explore experience by domain:", resume.domainExperience)
  return
}
else if (
  q.includes("certification") ||
  q.includes("certified") ||
  q.includes("credly")
) {
  question.value = ""
  resume.certifications.forEach(cert => {
    messages.value.push({ type: "cert", name: cert.name, credlyUrl: cert.credlyUrl })
  })
  await scrollBottom()
  return
}
else if(
  q.includes("aws")
){
  question.value = ""
   await streamMessage(resume.awsExperienceSummary)
  showChips("Select an AWS service:", resume.awsExperience || {})
  return
}
else if(
  Object.keys(resume.awsExperience).some(k => q.includes(k.toLowerCase()))
){
  const matchedKey = Object.keys(resume.awsExperience).find(k => q.includes(k.toLowerCase()))
  answer = resume.awsExperience[matchedKey]
}
else if(
  q.includes("ai")
){
  question.value = ""
  await streamMessage(resume.AIToolsExperienceSummary)
  showChips("Select an AI tool:", resume.AIToolsExperience || {})
  return
}
else if(
  q.includes("django")
){
  question.value = ""
  await streamMessage(resume.djangoExperienceSummary)
  showChips("Select a Django topic:", resume.djangoExperience || {})
  return
}
else if(
  q.includes("frontend")
){
  question.value = ""
  await streamMessage(resume.FrontendExperienceSummary)
  showChips("Select a Frontend topic:", resume.FrontendExperience || {})
  return
}
else if(
  q.includes("fastapi")
){
  question.value = ""
  await streamMessage(resume.FastAPIExperience.fastapi) 
  return
}
else if(
  q.includes("iac")
){
  question.value = ""
  await streamMessage(resume.IACExperience.terraform)
  return
}
else if(
  q.includes("ai")
){
  question.value = ""
  showChips("Select an AI tool:", resume.AIToolsExperience || {})
  return
}
// Overview
  else if (
    q.includes("overview") ||
    q.includes("summary")
) {
  
  answer = resume.overview
}

  // Skills

  else if (
    q.includes("skill")
  ) {
    answer = resume.skills

  }

  // Education

  else if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("mca") ||
    q.includes("bca")
  ) {

    answer = resume.education

  }
  else if (
    q.includes("companies") ||
    q.includes("he worked for")
  ) {
    question.value = ""
    await streamMessage(resume.companyList)
    showChips("Select a company:", {
      "Accenture": resume.companies.accenture.summary,
      "EC Group Datasoft": resume.companies.ecgroup.summary,
      "Talentztech Solution": resume.companies.talentztech.summary
    }, "company")
    return
  }
  else if (
    q.includes("accenture")
  ) {
    question.value = ""
    await streamMessage(resume.companies.accenture.summary)
    showChips("Select a project:", resume.companies.accenture.projects, "project")
    return
  }

  else if (
    q.includes("ec group")
  ) {
    question.value = ""
    await streamMessage(resume.companies.ecgroup.summary)
    showChips("Select a project:", resume.companies.ecgroup.projects, "project")
    return
  }

  else if (
    q.includes("talentztech")
  ) {
    question.value = ""
    await streamMessage(resume.companies.talentztech.summary)
    showChips("Select a project:", resume.companies.talentztech.projects, "project")
    return
  }

  // Projects

  else if (q.includes("ipu")) {
    answer = resume.companies.accenture.projects["IPU Optimization"]
  }

  else if (q.includes("alexandria")) {
    answer = resume.companies.accenture.projects["Project Alexandria"]
  }

  else if (q.includes("cda")) {
    answer = resume.companies.accenture.projects["CDA DAP Migration"]
  }

  else if (q.includes("strategy ai")) {
    answer = resume.companies.ecgroup.projects["Strategy AI"]
  }

  else if (q.includes("pinnit")) {
    answer = resume.companies.ecgroup.projects["Pinnit"]
  }

  else if (q.includes("strategy cascader") || q.includes("cascader")) {
    answer = resume.companies.ecgroup.projects["Strategy Cascader"]
  }

  else if (q.includes("welcome crm") || q.includes("crm")) {
    answer = resume.companies.talentztech.projects["Welcome CRM"]
  }
  else if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("reach")
  ) {
    const c = resume.contact
    answer = `📧 Email: ${c.email}\n📞 Phone: ${c.phone}\n🔗 GitHub: ${c.github}`
  }
  else if(
    q.includes("years")
  ){
    answer = resume.totalYearOfExperience
  }

  if (answer === "Sorry, I can answer only questions related to Sakkthi's resume.") {
    const fuzzy = fuzzySearch(q)
    if (fuzzy) answer = fuzzy
  }

  question.value = ""

  await streamMessage(answer)

}

</script>

<style scoped>

.cert-link{
  color:#60a5fa;
  text-decoration:underline;
}

.chips{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-top:10px;
}

.chip{
  background:#2563eb;
  color:white;
  padding:6px 14px;
  border-radius:20px;
  font-size:0.82rem;
  cursor:pointer;
  transition:.2s;
}

.chip:hover{
  background:#1d4ed8;
}

.chat-bubble{
  position:fixed;
  bottom:25px;
  right:25px;
  width:65px;
  height:65px;
  border-radius:50%;
  background:#2563eb;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  color:white;
  font-size:28px;
  box-shadow:0 8px 25px rgba(0,0,0,.35);
  transition:.3s;
  z-index:9999;
}

.chat-bubble:hover{
  transform:scale(1.08);
}

.chat-window{
  position:fixed;
  right:25px;
  bottom:25px;
  width:380px;
  height:550px;
  background:#0f172a;
  border-radius:20px;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  box-shadow:0 10px 40px rgba(0,0,0,.4);
  z-index:9999;
}

.chat-header{
  background:#2563eb;
  color:white;
  padding:18px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-weight:bold;
}

.chat-header i{
  margin-right:8px;
}

.header-actions{
  display:flex;
  align-items:center;
  gap:14px;
}

.voice-toggle{
  cursor:pointer;
  font-size:18px;
  transition:.2s;
  opacity:0.7;
}

.stop-btn{
  width:50px;
  border:none;
  border-radius:10px;
  background:transparent;
  color:#ef4444;
  cursor:pointer;
  transition:.3s;
  font-size:20px;
}

.stop-btn:hover:not(:disabled){
  color:#dc2626;
}

.stop-btn:disabled{
  opacity:0.3;
  cursor:not-allowed;
}


.close{
  cursor:pointer;
}

.chat-body{
  flex:1;
  padding:15px;
  overflow-y:auto;
  display:flex;
  flex-direction:column;
  gap:12px;
}

.bot{
  background:#1e293b;
  color:white;
  padding:12px;
  border-radius:12px;
  max-width:85%;
  align-self:flex-start;
  white-space:pre-wrap;
  line-height:1.5;
}

.user{
  background:#2563eb;
  color:white;
  padding:12px;
  border-radius:12px;
  max-width:85%;
  align-self:flex-end;
  white-space:pre-wrap;
  line-height:1.5;
}

.chat-footer{
  background:#111827;
  padding:10px;
  display:flex;
  gap:10px;
}

.chat-footer input{
  flex:1;
  padding:12px;
  border:none;
  outline:none;
  border-radius:10px;
  background:#1e293b;
  color:white;
}

.chat-footer input::placeholder{
  color:#94a3b8;
}

.chat-footer button{
  width:50px;
  border:none;
  background:transparent;
  color:white;
  cursor:pointer;
  transition:.3s;
  font-size:20px;
}

.chat-footer button:hover{
  color:#93c5fd;
}

.chat-body::-webkit-scrollbar{
  width:6px;
}

.chat-body::-webkit-scrollbar-thumb{
  background:#334155;
  border-radius:10px;
}

@media(max-width:500px){

  .chat-window{
    width:95%;
    right:2.5%;
    bottom:15px;
    height:80vh;
  }

}

</style>