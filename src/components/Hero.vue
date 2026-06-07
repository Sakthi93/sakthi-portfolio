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

<a href="/resume.pdf"  target="_blank">
    
<button class="btn" data-tooltip="View my resume">
  <i class="fa-solid fa-eye"></i>
  <span>View Resume</span>
</button>
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

/* Tooltip box */
.btn::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 6px;
  white-space: nowrap;

  opacity: 0;
  pointer-events: none;
  transition: 0.2s ease;
}

/* Tooltip arrow */
.btn::before {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.8);

  opacity: 0;
  transition: 0.2s ease;
}

/* Show on hover */
.btn:hover::after,
.btn:hover::before {
  opacity: 1;
}

</style>