document.addEventListener('DOMContentLoaded', () => {

  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll Animations with Intersection Observer
  const animateElements = document.querySelectorAll('[data-aos]');

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.aosDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  }

  // Animated Statistics (counting effect)
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.dataset.target, 10);
          const suffix = target.dataset.suffix || '';
          const duration = 2000;
          const increment = finalValue / (duration / 16);
          let current = 0;

          const updateNumber = () => {
            current += increment;
            if (current < finalValue) {
              target.textContent = Math.round(current) + suffix;
              requestAnimationFrame(updateNumber);
            } else {
              target.textContent = finalValue.toLocaleString() + suffix;
            }
          };

          updateNumber();
          statObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));
  }

  // Appointment Form Validation
  const appointmentForm = document.getElementById('appointmentForm');
  const successMessage = document.getElementById('successMessage');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;

      const requiredFields = appointmentForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        if (!field.value.trim()) {
          formGroup.classList.add('error');
          isValid = false;
        } else {
          formGroup.classList.remove('error');
        }
      });

      // Phone validation
      const phone = document.getElementById('telefone');
      if (phone) {
        const phoneGroup = phone.closest('.form-group');
        const phoneRegex = /(?:\+?258|0)?[8][3-7]\d{7}/;
        if (!phoneRegex.test(phone.value.trim())) {
          phoneGroup.classList.add('error');
          phoneGroup.querySelector('.error-message').textContent = 'Introduza um número de telefone válido (ex: 84 963 2330)';
          isValid = false;
        }
      }

      if (isValid) {
        appointmentForm.style.display = 'none';
        successMessage.classList.add('show');
      }
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;

      const requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        if (!field.value.trim()) {
          formGroup.classList.add('error');
          isValid = false;
        } else {
          formGroup.classList.remove('error');
        }
      });

      if (isValid) {
        const btn = contactForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Mensagem Enviada ✓';
        btn.style.background = '#10B981';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }
    });
  }

  // Current year in footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Active nav link based on current page
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath ||
        (currentPath.endsWith('/') && href === 'index.html') ||
        (currentPath.endsWith(href) && href !== '#')) {
      link.classList.add('active');
    } else if (currentPath.includes('/pages/') && href === '../index.html') {
      link.classList.remove('active');
    }
  });
});
