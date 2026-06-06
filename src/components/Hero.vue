<template>

<section class="hero">

<img src="/profile.jpg"/>

<h1>SAKKTHINAGARAJ A P</h1>

<h3>Python AWS Data Engineer</h3>

<p>

Building scalable cloud-native applications,
AWS ETL pipelines and modern Vue.js systems.

</p>

<div>

<a href="/resume.pdf"  download="Sakkthinagaraj_Resume.pdf">
    
<button><i class="fas fa-download"></i>      Download Resume</button>
</a>
<!-- <a href="/resume.pdf" target="_blank">
    
<button><i class="fas fa-download"></i>Download Resume</button>
</a> -->

<a href="https://github.com/Sakthi93" target="_blank">
<button> <i class="fab fa-github"></i>     GitHub</button>
</a>

</div>

</section>

</template>

<style scoped>

.hero{
min-height:100vh;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

text-align:center;
}

img{
width:180px;
height:180px;
border-radius:50%;
border:5px solid #2563eb;
object-fit:cover;
margin-bottom:25px;
}

h3{
color:#60a5fa;
margin:15px 0;
}

p{
max-width:700px;
font-size:1.2rem;
line-height:1.8;
margin-bottom:30px;
}

div{
display:flex;
gap:20px;
}

</style>