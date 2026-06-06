<template>
  <nav class="navbar">

    <div class="logo">
      <i class="fas fa-code"></i>
      Sakkthinagaraj
    </div>

    <ul :class="['nav-links', { active: menuOpen }]">

      <li>
        <a href="#">
          <i class="fas fa-house"></i>
          Home
        </a>
      </li>

      <li>
        <a href="#about">
          <i class="fas fa-user"></i>
          About
        </a>
      </li>

      <li>
        <a href="#skills">
          <i class="fas fa-laptop-code"></i>
          Skills
        </a>
      </li>

      <li>
        <a href="#experience">
          <i class="fas fa-briefcase"></i>
          Experience
        </a>
      </li>

      <li>
        <a href="#certifications">
          <i class="fas fa-certificate"></i>
          Certifications
        </a>
      </li>

      <!-- <li>
        <a href="#chatbot">
          <i class="fas fa-robot"></i>
          AI Assistant
        </a>
      </li> -->

      <li>
        <a href="#contact">
          <i class="fas fa-envelope"></i>
          Contact
        </a>
      </li>

      <!-- <li>
        <a
          href="/resume.pdf"
          target="_blank"
          class="resume-btn"
        >
          <i class="fas fa-download"></i>
          Resume
        </a>
      </li> -->

    </ul>

    <div
      class="menu-btn"
      @click="menuOpen = !menuOpen"
    >
      <i
        :class="menuOpen
          ? 'fas fa-times'
          : 'fas fa-bars'"
      ></i>
    </div>

  </nav>
</template>

<script setup>
import { ref } from "vue"

const menuOpen = ref(false)
</script>

<style scoped>

.navbar{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  z-index:1000;

  display:flex;
  justify-content:space-between;
  align-items:center;

  padding:18px 8%;

  background:rgba(15,23,42,.85);
  backdrop-filter:blur(12px);
  box-shadow:0 2px 10px rgba(0,0,0,.2);
}

.logo{
  color:white;
  font-size:24px;
  font-weight:bold;
}

.logo i{
  color:#60a5fa;
  margin-right:8px;
}

.nav-links{
  display:flex;
  gap:25px;
  list-style:none;
}

.nav-links a{
  color:white;
  text-decoration:none;
  transition:.3s;
  font-size:15px;
}

.nav-links a:hover{
  color:#60a5fa;
}

.nav-links i{
  margin-right:6px;
}

.resume-btn{
  background:#2563eb;
  padding:10px 16px;
  border-radius:8px;
}

.resume-btn:hover{
  background:#1d4ed8;
  color:white !important;
}

.menu-btn{
  display:none;
  color:white;
  font-size:26px;
  cursor:pointer;
}

@media(max-width:900px){

  .menu-btn{
    display:block;
  }

  .nav-links{
    position:absolute;
    top:80px;
    left:-100%;
    width:100%;
    background:#0f172a;
    flex-direction:column;
    text-align:center;
    padding:30px 0;
    transition:.3s;
  }

  .nav-links.active{
    left:0;
  }

}

</style>