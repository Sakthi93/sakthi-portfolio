<template>
  <Navbar />

  <div style="margin-top:80px">
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Certifications />
    <Chatbot />
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue"
import Hero from "../components/Hero.vue"
import About from "../components/About.vue"
import Skills from "../components/Skills.vue"
import Experience from "../components/Experience.vue"
import Projects from "../components/Projects.vue"
import Certifications from "../components/Certifications.vue"
import Chatbot from "../components/Chatbot.vue"
import Contact from "../components/Contact.vue"
import Footer from "../components/Footer.vue"
</script>