<template>

<section id="skills">

<h2>Technical Skills</h2>

<div class="grid">

<div class="card">Python</div>
<div class="card">Django</div>
<div class="card">FastAPI</div>
<div class="card">Vue 3</div>
<div class="card">React</div>
<div class="card">AWS Glue</div>
<div class="card">Lambda</div>
<div class="card">Step Functions</div>
<div class="card">Docker</div>
<div class="card">Terraform</div>
<div class="card">PostgreSQL</div>
<div class="card">Redis</div>

</div>

</section>

</template>

<style scoped>

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
gap:20px;
}

.card{
background:#1e293b;
padding:25px;
text-align:center;
border-radius:12px;
transition:.3s;
}

.card:hover{
transform:translateY(-5px);
background:#334155;
}

</style>