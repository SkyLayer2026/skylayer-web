// api.js - helper wrapper (adiciona token se presente)
const apiFetch = (path, opts = {}) => {
  opts.headers = opts.headers || {};
  const token = localStorage.getItem('navara_token');
  if (token) opts.headers['Authorization'] = 'Bearer ' + token;
  return fetch('/api' + path, opts).then(r => r.json());
};

