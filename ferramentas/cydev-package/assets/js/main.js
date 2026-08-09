(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== Reveal =====
  function autoAddReveal() {
    const selectors = [
      '.hero .container',
      '.section .container',
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
    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
      return;
    }

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

  // ===== Active nav =====
  function initActiveNav() {
    const page = document.body.getAttribute('data-page');
    if (!page) return;
    document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
      if (a.getAttribute('data-nav') === page) a.classList.add('active');
    });
  }

  // ===== Mobile menu =====
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    const bodyTarget = menu.querySelector('[data-mobile-menu-content]');
    if (bodyTarget) {
      const nav = document.querySelector('.nav');
      const lang = document.querySelector('.lang');

      if (nav && !bodyTarget.querySelector('.mobile-nav')) {
        const navClone = nav.cloneNode(true);
        navClone.classList.remove('nav');
        navClone.classList.add('mobile-nav');
        bodyTarget.appendChild(navClone);
      }

      if (lang && !bodyTarget.querySelector('.mobile-lang')) {
        const langClone = lang.cloneNode(true);
        langClone.classList.remove('lang');
        langClone.classList.add('mobile-lang');
        bodyTarget.appendChild(langClone);
      }
    }

    const panel = menu.querySelector('.mobile-menu-panel');
    const closeBtn = menu.querySelector('.mobile-menu-close');
    const focusableSel = 'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    let prevFocus = null;

    function open() {
      prevFocus = document.activeElement;
      menu.classList.add('open');
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
      const first = panel ? panel.querySelector(focusableSel) : null;
      if (first) first.focus();
    }

    function close() {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (menu.classList.contains('open')) close();
      else open();
    });

    if (closeBtn) closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      close();
    });

    menu.addEventListener('click', (e) => {
      if (e.target === menu) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) close();
    });

    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => close()));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760 && menu.classList.contains('open')) close();
    });
  }

  // ===== Modal =====
  let lastFocus = null;

  function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;

    lastFocus = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');

    const focusable = overlay.querySelector('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }

  function closeModal(overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function initModals() {
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('[data-modal-open]');
      if (openBtn) {
        e.preventDefault();
        openModal(openBtn.getAttribute('data-modal-open'));
        return;
      }

      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        e.preventDefault();
        const overlay = closeBtn.closest('.modal-overlay');
        if (overlay) closeModal(overlay);
        return;
      }

      const overlay = e.target.classList && e.target.classList.contains('modal-overlay') ? e.target : null;
      if (overlay && overlay.classList.contains('open')) {
        closeModal(overlay);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const openOverlay = document.querySelector('.modal-overlay.open');
      if (openOverlay) closeModal(openOverlay);
    });

    // allow deep link: #modal-id
    window.addEventListener('load', () => {
      const hash = location.hash.replace('#', '');
      if (!hash) return;
      const overlay = document.getElementById(hash);
      if (overlay && overlay.classList.contains('modal-overlay')) openModal(hash);
    });
  }

  // ===== Scrollbar =====
  function initScrollBar() {
    const bar = document.getElementById('scrollbar');
    if (!bar || prefersReduced) return;

    function update() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct.toFixed(2) + '%';
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  
  // ===== Contact prefill (services -> contact) =====
  function initContactPrefill() {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('service');
    if (!key) return;

    const emailBtn = document.getElementById('contact-email') || document.getElementById('Contacto-email');
    const note = document.getElementById('contact-service-note') || document.getElementById('Contacto-service-note');
    if (!emailBtn && !note) return;

    const lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
    const isPT = lang.startsWith('pt');

    const mapPT = {
      'criacao-site': 'Criação de site',
      'dominios': 'Domínios & DNS',
      'hospedagem': 'Hospedagem',
      'manutencao': 'Manutenção e suporte',
      'migracao': 'Migração',
      'seo': 'SEO',
      'sistemas-gestao': 'Sistemas de Gestão',
      'dashboards-bi': 'Dashboards & BI',
      'automacoes': 'Automações'
    };

    const mapEN = {
      'website-build': 'Website build',
      'domains': 'Domains',
      'hosting': 'Hosting',
      'maintenance': 'Maintenance & support',
      'migration': 'Migration',
      'seo': 'SEO',
      'sistemas-gestao': 'Management systems',
      'dashboards-bi': 'Dashboards & BI',
      'automacoes': 'Automations'
    };

    const label = (isPT ? mapPT[key] : mapEN[key]) || key.replace(/-/g, ' ');

    if (note) {
      note.textContent = isPT ? ('Serviço selecionado: ' + label) : ('Selected service: ' + label);
    }

    const message = isPT
      ? ('Olá, quero contratar o serviço: ' + label + '.\n\n' +
         'Detalhes:\n' +
         '- Nome/Empresa:\n' +
         '- Domínio (se existir):\n' +
         '- Prazo:\n' +
         '- Observações:')
      : ('Hello, I would like to hire: ' + label + '.\n\n' +
         'Details:\n' +
         '- Name/Company:\n' +
         '- Domain (if any):\n' +
         '- Timeline:\n' +
         '- Notes:');

    const subject = isPT
      ? ('SkyLayer — Pedido: ' + label)
      : ('SkyLayer — Request: ' + label);
    const mailUrl = 'mailto:skylayer.tech@outlook.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message);

    if (emailBtn) emailBtn.href = mailUrl;
  }

window.addEventListener('DOMContentLoaded', () => {
    autoAddReveal();
    initReveal();
    initMobileMenu();
    initActiveNav();
    initModals();
    initScrollBar();
    initContactPrefill();
  });
})();