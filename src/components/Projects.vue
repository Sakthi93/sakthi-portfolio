<template>

<section id="projects">

<h2>Projects</h2>

<div class="projects">

<div class="card">

<h3>AWS ETL Pipeline</h3>

<p>
S3, Glue, Lambda,
Step Functions,
SQS and SNS
</p>

</div>

<div class="card">

<h3>Welcome CRM</h3>

<p>
Django REST Framework
Vue 3
Dynamic APIs
</p>

</div>

<div class="card">

<h3>ToDo App</h3>

<p>
FastAPI
Vue 3
Docker
</p>

</div>

</div>

</section>

</template>

<style scoped>

.projects{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
gap:25px;
}

.card{
background:#1e293b;
padding:30px;
border-radius:15px;
transition:.3s;
}

.card:hover{
transform:translateY(-8px);
}

</style>