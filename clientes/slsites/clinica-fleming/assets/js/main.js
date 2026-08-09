/* ============================================
   CLÍNICA FLEMING - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------
     1. MOBILE MENU TOGGLE
  ----------------------------------------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !navList.classList.contains('active');
    navList.classList.toggle('active', isOpen);
    navOverlay.classList.toggle('active', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleMenu());
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', () => toggleMenu(false));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  /* -----------------------------------------
     2. HEADER SCROLL EFFECT
  ----------------------------------------- */
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* -----------------------------------------
     3. BADGE "ABERTO AGORA" - HORÁRIO REAL
  ----------------------------------------- */
  const badge = document.querySelector('.hero-badge');
  const badgeText = badge?.querySelector('span:last-child');

  function updateBadge() {
    if (!badgeText) return;

    const now = new Date();
    const day = now.getDay();       // 0=Dom, 1=Seg, ..., 6=Sáb
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const time = hour + minutes / 60;

    let isOpen = false;

    // Seg-Sex: 7h-20h
    if (day >= 1 && day <= 5) {
      isOpen = time >= 7 && time < 20;
    }
    // Sáb: 8h-14h
    else if (day === 6) {
      isOpen = time >= 8 && time < 14;
    }
    // Dom: Fechado
    else {
      isOpen = false;
    }

    if (isOpen) {
      badgeText.textContent = 'Aberto Agora — 7h–20h';
      badge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    } else {
      badgeText.textContent = day === 0 ? 'Fechado (Urgências: 84 757 9720)' : 'Encerrado — Abrimos às 7h';
      badge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
      badge.style.background = 'rgba(239, 68, 68, 0.15)';
    }
  }

  // Run on load and every minute
  updateBadge();
  setInterval(updateBadge, 60000);

  /* -----------------------------------------
     4. INTERSECTION OBSERVER - ANIMAÇÕES
  ----------------------------------------- */
  const animateElements = document.querySelectorAll('.fade-in');

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  }

  /* -----------------------------------------
     5. COUNTER ANIMATION (Prova Social)
  ----------------------------------------- */
  const statsNumber = document.querySelector('.stats-number');
  if (statsNumber) {
    const targetText = statsNumber.textContent;
    const targetMatch = targetText.match(/[\d.]+/);
    if (targetMatch) {
      const target = parseInt(targetMatch[0].replace(/\./g, ''));

      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(statsNumber, target, targetText);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counterObserver.observe(statsNumber);
    }
  }

  function animateCounter(element, target, originalText) {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      // Format with dots: 1.000
      const formatted = current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      element.textContent = originalText.replace(/[\d.]+/, formatted);

      if (step >= steps) {
        clearInterval(timer);
        element.textContent = originalText;
      }
    }, duration / steps);
  }

  /* -----------------------------------------
     6. SMOOTH SCROLL (fallback nativo)
  ----------------------------------------- */
  // O CSS já tem scroll-behavior: smooth
  // Garantir que âncoras com offset funcionem
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* -----------------------------------------
     7. TRACKING EVENTOS (CLICKS)
  ----------------------------------------- */
  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => {
      const action = el.getAttribute('data-track');
      // Future: enviar para analytics
      if (window.gtag) {
        gtag('event', 'click', { event_category: 'engagement', event_label: action });
      }
    });
  });

  /* -----------------------------------------
     8. FECHA NAVEGAÇÃO AO PRESSIONAR ESC
  ----------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList?.classList.contains('active')) {
      toggleMenu(false);
    }
  });

});
