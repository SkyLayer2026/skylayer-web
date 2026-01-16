(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function autoAddReveal() {
    const selectors = [
      '.hero-content',
      '.section h2',
      '.card',
      '.note-box',
      '.steps li',
      '.footer .container'
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
      });
    });
  }

  function initReveal() {
    if (prefersReduced) return;

    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('active');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    targets.forEach(t => obs.observe(t));
  }

  let lastFocus = null;

  function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;

    lastFocus = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');

    const focusable = overlay.querySelector(
      'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) focusable.focus();

    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
  }

  function closeModal(overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');

    if (location.hash === '#' + overlay.id) {
      history.replaceState(null, '', location.pathname);
    }

    if (lastFocus) lastFocus.focus();
  }

  function initModals() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-modal-open]');
      if (btn) {
        e.preventDefault();
        openModal(btn.getAttribute('data-modal-open'));
        return;
      }

      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        const overlay = closeBtn.closest('.modal-overlay');
        if (overlay) closeModal(overlay);
        return;
      }

      const overlay = e.target.classList.contains('modal-overlay') ? e.target : null;
      if (overlay && overlay.classList.contains('open')) closeModal(overlay);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const openOverlay = document.querySelector('.modal-overlay.open');
      if (openOverlay) closeModal(openOverlay);
    });

    window.addEventListener('load', () => {
      const hash = location.hash.replace('#', '');
      if (!hash) return;
      const overlay = document.getElementById(hash);
      if (overlay && overlay.classList.contains('modal-overlay')) openModal(hash);
    });
  }

  function initScrollBar(){
    const bar = document.getElementById('scrollbar');
    if (!bar || prefersReduced) return;

    function update(){
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct.toFixed(2) + '%';
    }

    update();
    window.addEventListener('scroll', update, { passive:true });
    window.addEventListener('resize', update);
  }


  window.addEventListener('DOMContentLoaded', () => {
    autoAddReveal();
    initReveal();
    initModals();
    initScrollBar();
  });
})();
