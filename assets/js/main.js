// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.work-card, .package-card, .review-card, .section-header, .contact-left, .contact-form').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const name = this.querySelector('[name="name"]').value;
  btn.textContent = 'Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
  btn.disabled = true;

  const mailto = `mailto:jayrx16@gmail.com?subject=New Project Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${this.querySelector('[name="email"]').value}\nPackage: ${this.querySelector('[name="package"]').value}\n\n${this.querySelector('[name="message"]').value}`
  )}`;
  window.location.href = mailto;
});

// Delayed audio fade-in for showreel
const showreelVideo = document.getElementById('showreelVideo');
if (showreelVideo) {
  showreelVideo.addEventListener('play', () => {
    setTimeout(() => {
      showreelVideo.muted = false;
      showreelVideo.volume = 0;
      const fade = setInterval(() => {
        showreelVideo.volume = Math.min(showreelVideo.volume + 0.04, 1);
        if (showreelVideo.volume >= 1) clearInterval(fade);
      }, 50);
    }, 2000);
  }, { once: true });
}

// Nav shadow on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.5)' : 'none';
});
