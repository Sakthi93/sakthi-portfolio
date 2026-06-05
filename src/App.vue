<template>
  <HomeView />
</template>

<script setup>
import HomeView from "./views/HomeView.vue"
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: Inter, Arial, sans-serif;
}

html{
  scroll-behavior:smooth;
}

body{
  background:#0f172a;
  color:#ffffff;
}

section{
  padding:80px 10%;
}

h1{
  font-size:3rem;
}

h2{
  font-size:2rem;
  margin-bottom:20px;
}

button{
  padding:12px 24px;
  border:none;
  border-radius:8px;
  cursor:pointer;
  background:#2563eb;
  color:white;
  transition:.3s;
}

button:hover{
  transform:translateY(-2px);
  background:#1d4ed8;
}
</style>