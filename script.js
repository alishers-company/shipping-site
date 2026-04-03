const menuButton = document.querySelector('[data-testid="mobile-nav-toggle"]');
const nav = document.querySelector('[data-testid="primary-nav"]');
const demoBtn = document.querySelector('[data-testid="interactive-demo"]');

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('is-open');
  
  // Toggle sidebar on mobile
  document.querySelector('.dash-sidebar')?.classList.toggle('sidebar-open');
});

demoBtn?.addEventListener('click', () => {
  demoBtn.textContent = 'Exporting... \u2713';
  demoBtn.style.borderColor = 'var(--accent)';
  demoBtn.style.color = 'var(--accent)';
  demoBtn.disabled = true;
});

// Scroll-triggered fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .screen-card, .article-card, .metric-card, .integration-chip').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  observer.observe(el);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); nav?.classList.remove('is-open'); }
  });
});

// Tab click interactivity
document.querySelectorAll('.card-tab, .cat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    tab.parentElement?.querySelectorAll('.card-tab, .cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Sidebar nav active state
document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});