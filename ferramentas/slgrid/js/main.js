document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      const icon = toggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  updateCartBadge();

  const headerSearch = document.getElementById('headerSearch');
  if (headerSearch) {
    headerSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && headerSearch.value.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(headerSearch.value.trim())}`;
      }
    });
  }

  animateCounters();
});

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const cart = JSON.parse(localStorage.getItem('slgrid_cart') || '[]');
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        if (!target) return;

        let current = 0;
        const increment = Math.ceil(target / 40);
        const duration = 1500;
        const stepTime = Math.floor(duration / 40);

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = target.toLocaleString('pt-MZ');
            clearInterval(timer);
          } else {
            entry.target.textContent = current.toLocaleString('pt-MZ');
          }
        }, stepTime);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}
