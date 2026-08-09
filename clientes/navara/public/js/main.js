// main.js - cliente: login, projetos, detalhes, chat, contact, referências modal
const $ = id => document.getElementById(id);

const api = (path, opts={}) => {
  opts.headers = opts.headers || {};
  const token = localStorage.getItem('navara_token');
  if (token) opts.headers['Authorization'] = 'Bearer ' + token;
  return fetch('/api' + path, opts).then(r => r.json());
};

$('btnOpenLogin').addEventListener('click', ()=> $('loginCard').classList.toggle('hidden'));
$('btnCancelLogin').addEventListener('click', ()=> $('loginCard').classList.add('hidden'));

$('loginForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const f = new FormData(e.target);
  const code = f.get('code'), password = f.get('password');
  $('loginMsg').textContent = 'Entrando...';
  const res = await api('/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ code, password }) });
  if (res.error) { $('loginMsg').textContent = res.error; return; }
  localStorage.setItem('navara_token', res.token);
  localStorage.setItem('navara_isAdmin', res.isAdmin ? '1':'0');
  $('loginMsg').textContent = '';
  $('loginCard').classList.add('hidden');
  $('dashboard').classList.remove('hidden');
  $('welcomeName').textContent = `Olá, ${res.name}`;
  $('roleText').textContent = res.isAdmin ? 'Administrador' : 'Cliente';
  loadProjects();
});

$('adminLoginForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const f = new FormData(e.target);
  const res = await api('/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ code: f.get('code'), password: f.get('password') }) });
  if (res.error) { $('adminMsg').textContent = res.error; return; }
  localStorage.setItem('navara_token', res.token);
  localStorage.setItem('navara_isAdmin', res.isAdmin ? '1':'0');
  $('adminMsg').textContent = 'Admin autenticado';
  location.href = '/admin.html';
});

$('btnLogout').addEventListener('click', ()=>{
  localStorage.removeItem('navara_token'); localStorage.removeItem('navara_isAdmin');
  $('dashboard').classList.add('hidden');
  $('projectsContainer').innerHTML = '';
  $('detailCard').classList.add('hidden');
});

// load projects
async function loadProjects(){
  $('projectsContainer').textContent = 'Carregando...';
  const res = await api('/projects', { method:'GET' });
  if (res.error) { $('projectsContainer').textContent = 'Erro: ' + res.error; return; }
  if (!Array.isArray(res) || res.length === 0) { $('projectsContainer').innerHTML = '<div class="muted small">Nenhum projeto.</div>'; return; }
  $('projectsContainer').innerHTML = res.map(p => `
    <div class="card">
      <strong>${p.title}</strong>
      <div class="muted small">${p.type || ''} • ${p.location || ''}</div>
      <div style="margin-top:8px">
        <div class="status-bar"><div class="status-fill" style="width:${p.progress||0}%"></div></div>
        <div class="muted small">Progresso: ${p.progress||0}% • ${p.status||''}</div>
      </div>
      <div style="margin-top:8px"><button class="btn outline openProjectBtn" data-id="${p.id}">Abrir</button></div>
    </div>
  `).join('');
  document.querySelectorAll('.openProjectBtn').forEach(b => b.addEventListener('click', ()=> openProject(b.dataset.id)));
}

async function openProject(id){
  $('detailCard').classList.remove('hidden');
  $('detailTitle').textContent = 'Carregando...';
  const p = await api('/projects/' + id, { method:'GET' });
  if (p.error) { $('detailTitle').textContent = 'Erro'; $('detailDesc').textContent = p.error; return; }
  $('detailTitle').textContent = p.title;
  $('detailMeta').innerHTML = `<div class="muted small">#${p.id} • ${p.type||''} • ${p.location||''}</div><div class="muted small">Cliente: ${p.clientCode||''}</div>`;
  $('detailDesc').textContent = p.desc || '';
  renderSteps(p); renderDocs(p); renderChat(p);
  $('uploadWrap').classList.toggle('hidden', !(localStorage.getItem('navara_isAdmin') === '1'));
}

function renderSteps(p){
  const arr = p.timeline || p.steps || [];
  const ul = $('stepsList'); ul.innerHTML = '';
  if (!arr.length) { ul.innerHTML = '<li class="muted small">Nenhuma etapa</li>'; return; }
  arr.forEach((s,i) => {
    const title = typeof s === 'string' ? s : (s.title || `Etapa ${i+1}`);
    const done = !!(s.done);
    const li = document.createElement('li');
    li.innerHTML = `<div><strong>${title}</strong><div class="muted small">${done ? 'Concluída' : 'Pendente'}</div></div>
      <div>${localStorage.getItem('navara_isAdmin') === '1' ? `<button class="btn muted markStep" data-i="${i}">${done? 'Desmarcar':'Concluir'}</button>` : ''}${(!localStorage.getItem('navara_isAdmin') && done) ? `<button class="btn primary approveBtn" data-i="${i}">Aprovar</button>` : ''}</div>`;
    ul.appendChild(li);
  });

  document.querySelectorAll('.markStep').forEach(b => b.onclick = async ()=>{
    const idx = b.dataset.i;
    const proj = await api('/projects/' + $('detailTitle').dataset.id, { method:'GET' });
    proj.steps = proj.steps || (proj.timeline || []).map((t,i) => ({ title: t, done: false }));
    proj.steps[idx].done = !proj.steps[idx].done;
    const progress = Math.round(proj.steps.filter(s=>s.done).length / Math.max(1, proj.steps.length) * 100);
    const r = await api('/projects/' + proj.id, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ steps: proj.steps, progress }) });
    if (r.error) return alert(r.error);
    openProject(proj.id); loadProjects();
  });

  document.querySelectorAll('.approveBtn').forEach(b => b.onclick = async ()=>{
    const idx = b.dataset.i;
    const proj = await api('/projects/' + $('detailTitle').dataset.id, { method:'GET' });
    proj.steps = proj.steps || (proj.timeline || []).map((t,i)=>({ title:t, done:false }));
    proj.steps[idx].approved = 'yes';
    const r = await api('/projects/' + proj.id, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ steps: proj.steps }) });
    if (r.error) return alert(r.error);
    openProject(proj.id);
  });
}

function renderDocs(p){
  const docs = p.documents || [];
  if (!docs.length) { $('docsList').innerHTML = '<div class="muted small">Nenhum documento</div>'; return; }
  $('docsList').innerHTML = docs.map(d => `<div class="small"><a href="${d.url}" target="_blank">${d.originalName || d.filename}</a> <span class="muted small">(${new Date(d.uploadedAt||Date.now()).toLocaleString()})</span></div>`).join('');
}

$('uploadForm')?.addEventListener('submit', async e=>{
  e.preventDefault();
  if (!document.querySelector('.openProjectBtn')) return;
  const id = document.querySelector('.openProjectBtn').dataset.id;
  const fd = new FormData(e.target);
  const res = await fetch('/api/projects/' + id + '/upload', { method:'POST', headers: localStorage.getItem('navara_token') ? { 'Authorization': 'Bearer ' + localStorage.getItem('navara_token') } : {}, body: fd }).then(r=>r.json());
  if (res.error) return alert(res.error);
  alert('Upload concluído');
  openProject(id);
});

// chat send
$('sendChat').addEventListener('click', async ()=>{
  const text = $('chatText').value.trim(); if(!text) return;
  const id = document.querySelector('.openProjectBtn')?.dataset?.id;
  if (!id) return alert('Abra um projeto');
  const proj = await api('/projects/' + id, { method:'GET' });
  proj.chat = proj.chat || [];
  proj.chat.push({ senderName: localStorage.getItem('navara_isAdmin') === '1' ? 'Admin' : (localStorage.getItem('navara_name') || 'Cliente'), senderIsClient: !(localStorage.getItem('navara_isAdmin') === '1'), text, when: Date.now(), role: localStorage.getItem('navara_isAdmin') === '1' ? 'admin' : 'client' });
  const r = await api('/projects/' + proj.id, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ chat: proj.chat }) });
  if (r.error) return alert(r.error);
  $('chatText').value = '';
  openProject(id);
});

// references modal
$('btnShowRefs').addEventListener('click', async ()=>{
  const res = await api('/references', { method:'GET' });
  if (!Array.isArray(res) || res.length === 0) { $('refsList').innerHTML = '<div class="muted small">Nenhuma referência</div>'; $('refsModal').classList.remove('hidden'); return; }
  $('refsList').innerHTML = res.map(r => `<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><div style="width:120px;height:80px;overflow:hidden;border-radius:6px"><img src="${r.image||('/uploads/references/' + (r.filename||''))}" style="width:100%;height:100%;object-fit:cover"></div><div><strong>${r.title}</strong><div class="muted small">${r.location||''}</div><div class="muted small">${r.description||''}</div></div></div>`).join('');
  $('refsModal').classList.remove('hidden');
});
$('closeRefs').addEventListener('click', ()=> $('refsModal').classList.add('hidden'));

// contact
$('contactForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const f = new FormData(e.target);
  const payload = { name: f.get('name'), email: f.get('email'), phone: f.get('phone'), message: f.get('message') };
  const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }).then(r=>r.json());
  if (res.error) $('contactStatus').textContent = 'Erro: ' + res.error;
  else { $('contactStatus').textContent = 'Mensagem enviada.'; e.target.reset(); }
});

// restore token on load
(function init(){
  const token = localStorage.getItem('navara_token');
  if (token) {
    $('dashboard').classList.remove('hidden');
    $('welcomeName').textContent = 'Olá, usuário';
    loadProjects();
  }
})();

