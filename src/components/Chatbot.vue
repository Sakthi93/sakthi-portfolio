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

      <i
        class="fas fa-times close"
        @click="toggleChat"
      ></i>

    </div>

    <!-- Messages -->

    <div
      class="chat-body"
      ref="chatBody"
    >

      <div
        v-for="(message,index) in messages"
        :key="index"
        :class="message.type"
      >

        {{ message.text }}

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

    </div>

  </div>

</template>

<script setup>

import { ref, nextTick } from "vue"
import resume from "../assets/resumeData"
import { matchJD } from "../utils/jdMatcher"

const isOpen = ref(false)

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

const streamMessage = async (text) => {

  if (!text) return


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

    botMessage.text += text[i]

    messages.value = [...messages.value]

    await scrollBottom()

    await new Promise(resolve =>
      setTimeout(resolve, 12)
    )

  }

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
  q.includes("experience")
) {
  answer = resume.overview
}
else if(
  q.includes("aws")
){
  answer = Object.entries(resume.awsExperience).map(([key, val]) => `• ${key}:\n${val}`).join("\n\n")
}
else if(
  q.includes("ai tool") ||
  q.includes("aitools") ||
  q.includes("ai tools")
){
  answer = Object.entries(resume.AIToolsExperience).map(([key, val]) => `• ${key}:\n${val}`).join("\n\n")
}
else if(
  q.includes("django")
){
  answer = Object.entries(resume.djangoExperience).map(([key, val]) => `• ${key}:\n${val}`).join("\n\n")
}
else if(
  q.includes("Frontend")
){
  answer = Object.entries(resume.FrontendExperience).map(([key, val]) => `• ${key}:\n${val}`).join("\n\n")
}
else if(
  q.includes("fastapi")
){
  answer = Object.entries(resume.FastAPIExperience).map(([key, val]) => `• ${key}:\n${val}`).join("\n\n")
}
else if(
  q.includes("iac")
){
  answer = Object.entries(resume.IACExperience).map(([key, val]) => `• ${key}:\n${val}`).join("\n\n")
}
else if(
  q.includes("ai")
){
  answer = Object.entries(resume.AIToolsExperience).map(([key, val]) => `• ${key}:\n${val}`).join("\n\n")
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

    answer = resume.companyList

  }
  // Companies

  else if (
    q.includes("accenture")
  ) {

    answer = resume.companies.accenture

  }

  else if (
    q.includes("ec group")
  ) {

    answer = resume.companies.ecgroup

  }

  else if (
    q.includes("talentztech")
  ) {

    answer = resume.companies.talentztech

  }

  // Projects

  else if (
    q.includes("ipu")
  ) {

    answer = resume.projects.ipu

  }

  else if (
    q.includes("alexandria")
  ) {

    answer = resume.projects.alexandria

  }

  else if (
    q.includes("cda")
  ) {

    answer = resume.projects.cda

  }

  else if (
    q.includes("strategy ai")
  ) {

    answer = resume.projects.strategyai

  }

  else if (
    q.includes("pinnit")
  ) {

    answer = resume.projects.pinnit

  }

  else if (
    q.includes("strategy cascader") ||
    q.includes("cascader")
  ) {

    answer = resume.projects.cascader

  }

  else if (
    q.includes("welcome crm") ||
    q.includes("crm")
  ) {

    answer = resume.projects.crm

  }

  question.value = ""

  await streamMessage(answer)

}

</script>

<style scoped>

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
  border-radius:10px;
  background:#2563eb;
  color:white;
  cursor:pointer;
  transition:.3s;
}

.chat-footer button:hover{
  background:#1d4ed8;
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