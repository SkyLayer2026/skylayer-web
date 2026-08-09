/* ============================================
   PORTFOLIO JS — EDMILSON MOURINHO GUIRENGANE
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- HEADER SCROLL ---- */
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = y;
  });

  /* ---- HAMBURGER / MOBILE MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      }
    });

    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  /* ---- SCROLL REVEAL ---- */
  const revealElements = document.querySelectorAll(
    '.sobre__card, .timeline__item, .cert__card, .hco__item, .skills__cat, ' +
    '.ref__card, .contact__card, .section__header, .idiomas__table'
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  /* ---- ACTIVE NAV LINK ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
        });
        const activeLink = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.style.color = '#00d4ff';
        }
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => navObserver.observe(section));

  /* ---- PARALLAX HERO BG ---- */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroBg.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
});
