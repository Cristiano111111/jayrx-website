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
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const payload = {
    name: this.querySelector('[name="name"]').value,
    email: this.querySelector('[name="email"]').value,
    package: this.querySelector('[name="package"]').value,
    message: this.querySelector('[name="message"]').value,
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Request failed');

    btn.textContent = 'Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    this.reset();
  } catch (err) {
    btn.textContent = 'Failed — try again';
    btn.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
    btn.disabled = false;
    setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 3500);
  }
});

// Nav shadow on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.5)' : 'none';
});
