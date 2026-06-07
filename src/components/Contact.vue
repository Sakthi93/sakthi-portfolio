<template>
  <section id="contact">
    <h2>Contact Me</h2>

    <div class="contact-container">

      <a href="mailto:asakthinagaraj93@gmail.com" class="contact-item">
        <i class="fas fa-envelope"></i>
        <span>Mail me at : asakthinagaraj93@gmail.com</span>
      </a>

      <a href="tel:+918667218036" class="contact-item">
        <i class="fas fa-phone"></i>
        <span>+91 8667218036</span>
      </a>

      <a
        href="https://github.com/Sakthi93"
        target="_blank"
        class="contact-item"
      >
        <i class="fab fa-github"></i>
        <span>View my Github</span>
      </a>

    </div>
  </section>
</template>

<style scoped>
#contact {
  padding: 80px 10%;
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.contact-container {
  max-width: 700px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 25px;
  background: #1e293b;
  border-radius: 15px;
  text-decoration: none;
  color: white;
  transition: 0.3s;
}

.contact-item:hover {
  transform: translateY(-3px);
  background: #2563eb;
}

.contact-item i {
  font-size: 24px;
  width: 30px;
}

.contact-item span {
  font-size: 18px;
}
</style>