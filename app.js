// Mobile menu toggle
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    // Only handle if id is not just "#" and target exists
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      const target = document.querySelector(id);
      target.scrollIntoView({ behavior: 'smooth' });
      if (nav) nav.classList.remove('open');
    }
  });
});

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Animated counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const to = +el.dataset.to;
      const t0 = performance.now();
      const dur = 1200;
      const step = t => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.floor(p * to);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObserver.observe(c));

// Skill bars animation
const bars = document.querySelectorAll('.bar');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.pct + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
bars.forEach(b => barObserver.observe(b));

// Card fade-in animation
const cards = document.querySelectorAll('.card');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
cards.forEach(card => cardObserver.observe(card));