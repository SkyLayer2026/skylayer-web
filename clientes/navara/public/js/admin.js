// admin.js - painel em cards para referências (upload, editar, apagar)
const $ = id => document.getElementById(id);
const apiAuth = (path, opts={})=>{
  opts.headers = opts.headers || {};
  const token = localStorage.getItem('navara_token');
  if (token) opts.headers['Authorization'] = 'Bearer ' + token;
  return fetch('/api' + path, opts).then(r => r.json());
};

async function loadRefsGrid(){
  const grid = $('refsGrid');
  grid.innerHTML = 'Carregando...';
  const res = await apiAuth('/references', { method:'GET' });
  if (!Array.isArray(res) || res.length === 0) { grid.innerHTML = '<div class="muted small">Nenhuma referência</div>'; return; }
  grid.innerHTML = '';
  res.forEach(r => {
    const card = document.createElement('div');
    card.style.border = '1px solid #eef3fb';
    card.style.borderRadius = '8px';
    card.style.padding = '8px';
    card.style.background = '#fff';
    card.innerHTML = `<div style="height:120px;overflow:hidden;border-radius:6px;background:#f0f2f7"><img src="${r.image || ('/uploads/references/' + (r.filename || ''))}" style="width:100%;height:100%;object-fit:cover"></div>
      <div style="margin-top:8px"><strong>${r.title}</strong></div>
      <div class="muted small">${r.location || ''}</div>
      <div style="display:flex;gap:6px;margin-top:8px">
        <button class="btn outline editRef" data-id="${r.id}">Editar</button>
        <button class="btn muted deleteRef" data-id="${r.id}">Apagar</button>
      </div>
      <div class="muted small" style="margin-top:6px">No carrossel: ${r.show_in_carousel ? 'Sim' : 'Não'}</div>
    `;
    grid.appendChild(card);
  });
  // attach handlers
  document.querySelectorAll('.deleteRef').forEach(b => b.onclick = async ()=> {
    if (!confirm('Excluir referência?')) return;
    const id = b.dataset.id;
    const res = await apiAuth('/references/' + id, { method:'DELETE' });
    if (res.error) return alert(res.error);
    alert('Removido');
    loadRefsGrid();
  });

  document.querySelectorAll('.editRef').forEach(b => b.onclick = async ()=> {
    const id = b.dataset.id;
    const db = await apiAuth('/references', { method:'GET' });
    const r = db.find(x => x.id === id);
    if (!r) return alert('Não encontrado');
    const title = prompt('Título', r.title);
    if (title === null) return;
    const location = prompt('Localização', r.location || '');
    const description = prompt('Descrição', r.description || '');
    const show = confirm('Exibir no carrossel? OK = Sim, Cancel = Não');
    // send PUT (no file)
    const body = { title, location, description, show_in_carousel: show };
    const res = await apiAuth('/references/' + id, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
    if (res.error) return alert(res.error);
    alert('Atualizado');
    loadRefsGrid();
  });
}

$('refCreateForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const f = new FormData(e.target);
  const file = f.get('image');
  if (!file || file.size === 0) return alert('Escolha uma imagem');
  $('refCreateMsg').textContent = 'Enviando...';
  // build multipart/form-data request (fetch handles FormData)
  const res = await fetch('/api/references', { method:'POST', headers: { 'Authorization': 'Bearer ' + (localStorage.getItem('navara_token') || '') }, body: f }).then(r => r.json());
  if (res.error) { $('refCreateMsg').textContent = 'Erro: ' + res.error; return; }
  $('refCreateMsg').textContent = 'Criado';
  e.target.reset();
  loadRefsGrid();
});

$('btnListClients').addEventListener('click', async ()=>{
  const res = await apiAuth('/clients', { method:'GET' });
  if (res.error) return alert(res.error);
  $('adminDump').textContent = JSON.stringify(res, null, 2);
});

$('btnListProjects').addEventListener('click', async ()=>{
  const res = await apiAuth('/projects', { method:'GET' });
  if (res.error) return alert(res.error);
  $('adminDump').textContent = JSON.stringify(res, null, 2);
});

// init grid
loadRefsGrid();

