<template>

<nav>

<h2>Sakkthinagaraj</h2>

<div>

<a href="#about">About</a>
<a href="#skills">Skills</a>
<a href="#experience">Experience</a>
<a href="#projects">Projects</a>
<a href="#chatbot">AI</a>
<a href="#contact">Contact</a>

</div>

</nav>

</template>

<style scoped>

nav{
position:fixed;
top:0;
left:0;
right:0;

display:flex;
justify-content:space-between;
align-items:center;

padding:20px 10%;

background:rgba(15,23,42,.8);
backdrop-filter:blur(12px);

z-index:100;
}

div{
display:flex;
gap:25px;
}

a{
color:white;
text-decoration:none;
transition:.3s;
}

a:hover{
color:#60a5fa;
}

</style>