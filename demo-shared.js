function showToast(m, t) {
  t = t || 'info';
  const icons = { success: '\u2713', error: '\u2715', warning: '\u26A0', info: '\u2192' };
  const c = document.getElementById('toast-container') ||
    (() => { const e = document.createElement('div'); e.id = 'toast-container'; e.className = 'toast-container'; document.body.appendChild(e); return e; })();
  const o = document.createElement('div');
  o.className = 'toast ' + t;
  o.innerHTML = '<span class="toast-icon">' + (icons[t] || '\u2192') + '</span>' + m;
  c.appendChild(o);
  o.setAttribute('role','alert');
  o.setAttribute('aria-live','polite');
  setTimeout(() => {
    o.style.opacity = '0';
    o.style.transform = 'translateX(100%)';
    o.style.transition = 'all .3s ease';
    setTimeout(() => o.remove(), 300);
  }, 2700);
}

function showConfirm(m) {
  return new Promise(r => {
    const o = document.createElement('div');
    o.className = 'confirm-overlay open';
    o.setAttribute('role','dialog');
    o.setAttribute('aria-modal','true');
    o.innerHTML = '<div class="confirm-box"><h4>Confirmar</h4><p>' + m + '</p><div class="confirm-actions"><button class="btn btn-cancel" id="confirmNo">Cancelar</button><button class="btn btn-confirm" id="confirmYes">Confirmar</button></div></div>';
    document.body.appendChild(o);
    const y = o.querySelector('#confirmYes'), n = o.querySelector('#confirmNo');
    y.onclick = () => { o.remove(); r(true); };
    n.onclick = () => { o.remove(); r(false); };
    o.onclick = e => { if (e.target === o) { o.remove(); r(false); } };
    const onKey = e => {
      if (e.key === 'Escape') { o.remove(); r(false); document.removeEventListener('keydown', onKey); }
      if (e.key === 'Tab') {
        const focusable = o.querySelectorAll('button');
        if (focusable.length) {
          if (e.shiftKey && document.activeElement === focusable[0]) { e.preventDefault(); focusable[focusable.length-1].focus(); }
          else if (!e.shiftKey && document.activeElement === focusable[focusable.length-1]) { e.preventDefault(); focusable[0].focus(); }
        }
      }
    };
    document.addEventListener('keydown', onKey);
    y.focus();
  });
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function getData(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}

function setData(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { showToast('Erro ao salvar dados', 'error'); }
}

function removeData(key) {
  try { localStorage.removeItem(key); } catch {}
}

function showLoading(container) {
  if (typeof container === 'string') container = document.getElementById(container);
  if (!container) return;
  container.innerHTML = '<div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line"></div>';
}

function hideLoading(container) {
  if (typeof container === 'string') container = document.getElementById(container);
  if (!container) return;
  container.innerHTML = '';
}

function showFieldError(input, msg) {
  if (typeof input === 'string') input = document.getElementById(input);
  if (!input) return;
  input.classList.add('error');
  let err = input.parentElement.querySelector('.form-error');
  if (!err) {
    err = document.createElement('div');
    err.className = 'form-error';
    input.parentElement.appendChild(err);
  }
  err.textContent = msg;
  err.classList.add('show');
}

function clearFieldError(input) {
  if (typeof input === 'string') input = document.getElementById(input);
  if (!input) return;
  input.classList.remove('error');
  const err = input.parentElement.querySelector('.form-error');
  if (err) { err.classList.remove('show'); err.textContent = ''; }
}

function clearAllFieldErrors(form) {
  if (typeof form === 'string') form = document.getElementById(form);
  if (!form) form = document;
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  form.querySelectorAll('.form-error.show').forEach(el => el.classList.remove('show'));
}
