<template>

<section id="skills">

<h2>Technical Skills</h2>

<div class="skills">

<div class="skill">
<i class="fab fa-python"></i>
Python
</div>

<div class="skill">
<i class="fab fa-aws"></i>
AWS
</div>

<div class="skill">
<i class="fab fa-vuejs"></i>
Vue.js
</div>

<div class="skill">
<i class="fab fa-react"></i>
React.js
</div>

<div class="skill">
<i class="fas fa-database"></i>
PostgreSQL
</div>

<div class="skill">
<i class="fab fa-gitlab"></i>
GitLab
</div>

<div class="skill">
<i class="fab fa-github"></i>
GitHub
</div>

<div class="skill">
<i class="fa-brands fa-bitbucket"></i>
Bitbucket
</div>

<div class="skill">
<i class="fab fa-docker"></i>
Docker
</div>


</div>


</section>

</template>

<style scoped>
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.skill {
  background: var(--card);
  color: var(--card-text);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  font-size: 18px;
  transition: 0.3s;
  border: 1px solid var(--border);
}

.skill:hover {
  transform: translateY(-5px);
  opacity: 0.95;
}

.skill i {
  font-size: 35px;
  margin-bottom: 10px;
  display: block;
  color: var(--primary);
}
</style>