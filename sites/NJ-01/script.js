// Intersection Observer for fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.section-label, .section-title, .about-text, .about-built, ' +
  '.video-wrapper, .screenshot-card, .team-card, .link-card, .team-intro'
).forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Stagger screenshot cards
document.querySelectorAll('.screenshot-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});

// Stagger team cards
document.querySelectorAll('.team-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

// Stagger link cards
document.querySelectorAll('.link-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => navObserver.observe(s));
