// server.js — NAVARA (versão revisada, compatível Express 5)
// Funcionalidades:
// - Autenticação simples (token em memória)
// - CRUD clients / projects / references
// - Uploads: references, carousel, project documents, optional client photo
// - Criação automática de pastas: data/clients/<clientCode>/projects/<projectId>/documents
// - Endpoints públicos: /api/references/carousel, /uploads/*
// - Fallback route compatível com Express 5 (regex /.*/)
// - Logs simples via console

const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const BASE = __dirname;
const PUBLIC = path.join(BASE, 'public');
const DATA_DIR = path.join(BASE, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const UPLOADS = path.join(BASE, 'uploads');
const UPLOADS_REFS = path.join(UPLOADS, 'references');
const UPLOADS_CAROUSEL = path.join(UPLOADS, 'carousel');
const LOGS = path.join(BASE, 'logs');

// Ensure directories exist
[
  DATA_DIR,
  path.join(PUBLIC),
  path.join(PUBLIC, 'images'),
  path.join(PUBLIC, 'references'),
  UPLOADS,
  UPLOADS_REFS,
  UPLOADS_CAROUSEL,
  path.join(DATA_DIR, 'clients'),
  LOGS
].forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

// Helpers for DB
function readDB() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
  catch (e) { return null; }
}
function writeDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

// Initialize DB if not present
if (!fs.existsSync(DB_FILE)) {
  const initial = {
    clients: [
      { code: "565", name: "Cliente Demo", email: "cliente@navara.test", phone: "875157669", password: "1234", isAdmin: false, photo: null },
      { code: "dev0", name: "Administrador Oculto", email: "dev@navara.test", phone: "", password: "5678", isAdmin: true, photo: null }
    ],
    projects: [
      { id: "p1", title: "Residência Matola A", type: "Construção", location: "Matola", clientCode: "565", status: "Em execução", progress: 60, timeline: ["Terraplanagem","Fundação","Estrutura"], documents: [], chat: [], payments: [] }
    ],
    references: [],
    messages: []
  };
  writeDB(initial);
  console.log('DB inicial criado em data/db.json');
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static serving (uploads and public)
app.use('/uploads', express.static(UPLOADS));             // serve uploads (references, carousel, project docs)
app.use('/public', express.static(PUBLIC));               // optional reference
app.use(express.static(PUBLIC));                          // serve index.html, admin.html, /css, /js etc.

// Multer storages
const safeName = (orig) => `${Date.now()}-${orig.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_\.-]/g,'')}`;

const storageRefs = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_REFS),
  filename: (req, file, cb) => cb(null, safeName(file.originalname))
});
const storageCarousel = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_CAROUSEL),
  filename: (req, file, cb) => cb(null, safeName(file.originalname))
});
const storageGeneric = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS),
  filename: (req, file, cb) => cb(null, safeName(file.originalname))
});
const uploadRef = multer({ storage: storageRefs });
const uploadCarousel = multer({ storage: storageCarousel });
const uploadGeneric = multer({ storage: storageGeneric });

// Session tokens in memory (simple)
const sessions = {};
function genToken(){ return crypto.randomBytes(16).toString('hex'); }

// Auth endpoint
app.post('/api/login', (req, res) => {
  const { code, password } = req.body || {};
  if (!code || !password) return res.status(400).json({ error: 'Código e senha obrigatórios' });
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'DB não disponível' });
  const user = db.clients.find(c => c.code === String(code));
  if (!user || user.password !== String(password)) return res.status(401).json({ error: 'Código ou senha inválidos' });
  const token = genToken();
  sessions[token] = { code: user.code, isAdmin: !!user.isAdmin, name: user.name };
  res.json({ token, name: user.name, isAdmin: !!user.isAdmin });
});

// Auth middleware
function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: 'Token não fornecido' });
  const parts = h.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Formato de token inválido' });
  const token = parts[1];
  const s = sessions[token];
  if (!s) return res.status(401).json({ error: 'Token inválido' });
  req.session = s;
  next();
}

// Utility: create folders for client and project
function ensureClientFolders(clientCode) {
  const clientRoot = path.join(DATA_DIR, 'clients', String(clientCode));
  const projectsRoot = path.join(clientRoot, 'projects');
  [clientRoot, projectsRoot].forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });
  return { clientRoot, projectsRoot };
}
function ensureProjectFolders(clientCode, projectId) {
  const projectRoot = path.join(DATA_DIR, 'clients', String(clientCode), 'projects', String(projectId));
  const docs = path.join(projectRoot, 'documents');
  [projectRoot, docs].forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });
  return { projectRoot, docs };
}

// ---------- CLIENTS CRUD ----------
app.get('/api/clients', auth, (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Acesso negado' });
  const db = readDB();
  res.json(db.clients || []);
});

// create client (admin) with optional photo (field 'photo')
app.post('/api/clients', auth, uploadGeneric.single('photo'), (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Apenas admin' });
  const { code, name, email, phone, password } = req.body || {};
  if (!code || !name || !password) return res.status(400).json({ error: 'code, name e password obrigatórios' });
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'DB indisponível' });
  if (db.clients.find(c => c.code === String(code))) return res.status(400).json({ error: 'Código já existe' });
  const photoPath = req.file ? `/uploads/${req.file.filename}` : null;
  const client = { code: String(code), name, email: email || '', phone: phone || '', password, isAdmin: false, photo: photoPath };
  db.clients.push(client);
  writeDB(db);
  ensureClientFolders(code);
  res.json({ success: true, client });
});

app.patch('/api/clients/:code', auth, uploadGeneric.single('photo'), (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Apenas admin' });
  const db = readDB();
  const c = db.clients.find(x => x.code === req.params.code);
  if (!c) return res.status(404).json({ error: 'Cliente não encontrado' });
  const allowed = ['name', 'email', 'phone', 'password', 'isAdmin'];
  allowed.forEach(k => { if (req.body[k] !== undefined) c[k] = req.body[k]; });
  if (req.file) {
    if (c.photo) {
      try { fs.unlinkSync(path.join(BASE, c.photo)); } catch (_) { /* ignore */ }
    }
    c.photo = `/uploads/${req.file.filename}`;
  }
  writeDB(db);
  res.json({ success: true, client: c });
});

app.delete('/api/clients/:code', auth, (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Apenas admin' });
  const db = readDB();
  db.clients = db.clients.filter(x => x.code !== req.params.code);
  // remove client data folder (force)
  const clientRoot = path.join(DATA_DIR, 'clients', req.params.code);
  try { if (fs.existsSync(clientRoot)) fs.rmSync(clientRoot, { recursive: true, force: true }); } catch (_) {}
  writeDB(db);
  res.json({ success: true });
});

// ---------- PROJECTS CRUD ----------
app.get('/api/projects', auth, (req, res) => {
  const db = readDB();
  const list = req.session.isAdmin ? (db.projects || []) : (db.projects || []).filter(p => p.clientCode === req.session.code);
  res.json(list);
});

app.get('/api/projects/:id', auth, (req, res) => {
  const db = readDB();
  const p = (db.projects || []).find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Projeto não encontrado' });
  if (!req.session.isAdmin && p.clientCode !== req.session.code) return res.status(403).json({ error: 'Acesso negado' });
  res.json(p);
});

// create project (admin) -> auto create folders
app.post('/api/projects', auth, (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Apenas admin' });
  const { title, type, location, clientCode, timeline } = req.body || {};
  if (!title || !clientCode) return res.status(400).json({ error: 'title e clientCode obrigatórios' });
  const db = readDB();
  const id = 'p' + Date.now();
  const project = {
    id,
    title,
    type: type || 'Geral',
    location: location || '',
    clientCode,
    status: 'Novo',
    progress: 0,
    timeline: Array.isArray(timeline) ? timeline : (typeof timeline === 'string' ? timeline.split('|').map(s => s.trim()).filter(Boolean) : []),
    documents: [],
    chat: [],
    payments: []
  };
  db.projects.push(project);
  writeDB(db);
  ensureClientFolders(clientCode);
  ensureProjectFolders(clientCode, id);
  res.json(project);
});

app.patch('/api/projects/:id', auth, (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Apenas admin' });
  const db = readDB();
  const p = (db.projects || []).find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Projeto não encontrado' });
  const allowed = ['title', 'type', 'location', 'status', 'progress', 'timeline', 'documents', 'chat', 'payments'];
  allowed.forEach(k => { if (req.body[k] !== undefined) p[k] = req.body[k]; });
  writeDB(db);
  res.json({ success: true, project: p });
});

app.delete('/api/projects/:id', auth, (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Apenas admin' });
  const db = readDB();
  const idx = (db.projects || []).findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Projeto não encontrado' });
  const p = db.projects[idx];
  // remove project folder
  try {
    const projectRoot = path.join(DATA_DIR, 'clients', p.clientCode, 'projects', p.id);
    if (fs.existsSync(projectRoot)) fs.rmSync(projectRoot, { recursive: true, force: true });
  } catch (_) {}
  db.projects.splice(idx, 1);
  writeDB(db);
  res.json({ success: true });
});

// Upload project document (admin) -> saved inside client's project documents folder
const uploadProjectDoc = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const id = req.params.id;
      const db = readDB();
      const p = (db.projects || []).find(x => x.id === id);
      if (!p) return cb(new Error('Projeto não encontrado'));
      const folders = ensureProjectFolders(p.clientCode, p.id);
      cb(null, folders.docs);
    },
    filename: (req, file, cb) => cb(null, safeName(file.originalname))
  })
});
app.post('/api/projects/:id/upload', auth, uploadProjectDoc.single('file'), (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Apenas admin' });
  const db = readDB();
  const p = (db.projects || []).find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Projeto não encontrado' });
  p.documents = p.documents || [];
  const entry = {
    originalName: req.file.originalname,
    filename: req.file.filename,
    url: `/uploads/${path.relative(UPLOADS, req.file.path).replace(/\\/g, '/')}`,
    uploadedAt: new Date().toISOString()
  };
  p.documents.push(entry);
  writeDB(db);
  res.json({ success: true, file: entry });
});

// ---------- REFERENCES (admin CRUD) ----------
app.get('/api/references', auth, (req, res) => {
  const db = readDB();
  res.json(db.references || []);
});

// public endpoint for carousel (no auth) -> only show_in_carousel = true
app.get('/api/references/carousel', (req, res) => {
  const db = readDB();
  const list = (db.references || []).filter(r => r.show_in_carousel);
  res.json(list);
});

// create reference (admin) with image (field name 'image')
app.post('/api/references', auth, uploadRef.single('image'), (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Apenas admin' });
  const { title, location, description, show_in_carousel } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title obrigatório' });
  const db = readDB();
  const id = 'r' + Date.now();
  const filename = req.file ? req.file.filename : null;
  const image = filename ? `/uploads/references/${filename}` : null;
  const ref = { id, title, location: location || '', description: description || '', filename, image, show_in_carousel: !!(show_in_carousel === 'true' || show_in_carousel === true), createdAt: new Date().toISOString() };
  db.references = db.references || [];
  db.references.push(ref);
  writeDB(db);
  res.json({ success: true, reference: ref });
});

// update reference (admin) - can replace image
app.put('/api/references/:id', auth, uploadRef.single('image'), (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Apenas admin' });
  const db = readDB();
  const r = (db.references || []).find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: 'Referência não encontrada' });
  const { title, location, description, show_in_carousel } = req.body || {};
  if (title !== undefined) r.title = title;
  if (location !== undefined) r.location = location;
  if (description !== undefined) r.description = description;
  if (show_in_carousel !== undefined) r.show_in_carousel = !!(show_in_carousel === 'true' || show_in_carousel === true);
  if (req.file) {
    if (r.filename) {
      try { fs.unlinkSync(path.join(UPLOADS_REFS, r.filename)); } catch (_) {}
    }
    r.filename = req.file.filename;
    r.image = `/uploads/references/${req.file.filename}`;
  }
  writeDB(db);
  res.json({ success: true, reference: r });
});

// delete reference (admin)
app.delete('/api/references/:id', auth, (req, res) => {
  if (!req.session.isAdmin) return res.status(403).json({ error: 'Apenas admin' });
  const db = readDB();
  const idx = (db.references || []).findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Referência não encontrada' });
  const r = db.references[idx];
  if (r && r.filename) {
    try { fs.unlinkSync(path.join(UPLOADS_REFS, r.filename)); } catch (_) {}
  }
  db.references.splice(idx, 1);
  writeDB(db);
  res.json({ success: true });
});

// ---------- CONTACT ----------
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !message) return res.status(400).json({ error: 'name e message obrigatórios' });
  const db = readDB();
  db.messages = db.messages || [];
  db.messages.push({ id: 'm' + Date.now(), name, email: email || '', phone: phone || '', message, createdAt: new Date().toISOString() });
  writeDB(db);
  res.json({ success: true });
});

// images-list (debug)
app.get('/images-list', (req, res) => {
  const imgsRef = fs.existsSync(UPLOADS_REFS) ? fs.readdirSync(UPLOADS_REFS).filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f)) : [];
  const imgsCarousel = fs.existsSync(UPLOADS_CAROUSEL) ? fs.readdirSync(UPLOADS_CAROUSEL).filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f)) : [];
  res.json({ references: imgsRef, carousel: imgsCarousel });
});

// ---------- Fallback (Express 5 safe) ----------
app.get(/.*/, (req, res) => {
  const index = path.join(PUBLIC, 'index.html');
  if (fs.existsSync(index)) return res.sendFile(index);
  res.status(404).send('No frontend found');
});

// Start
app.listen(PORT, () => {
  console.log(`NAVARA backend rodando em http://localhost:${PORT}`);
  console.log('Contas de teste: cliente 565/1234  | admin dev0/5678');
});

