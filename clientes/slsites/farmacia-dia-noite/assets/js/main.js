document.addEventListener('DOMContentLoaded', function () {

  // ===== Mobile Navigation =====
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      nav.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      }
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // ===== Header scroll shadow =====
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ===== Active nav link =====
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ===== Products Data =====
  var products = [
    { id: 1, name: 'Paracetamol', presentation: '500mg - Comp. 24 unidades', category: 'medicamentos', icon: '💊', description: 'Analgésico e antitérmico para dores e febre.' },
    { id: 2, name: 'Amoxicilina', presentation: '500mg - Cáps. 21 unidades', category: 'medicamentos', icon: '💊', description: 'Antibiótico de amplo espectro para infeções bacterianas.' },
    { id: 3, name: 'Ibuprofeno', presentation: '400mg - Comp. 20 unidades', category: 'medicamentos', icon: '💊', description: 'Anti-inflamatório não esteroide para dores e inflamações.' },
    { id: 4, name: 'Metformina', presentation: '850mg - Comp. 60 unidades', category: 'medicamentos', icon: '💊', description: 'Antidiabético oral para controlo da glicemia.' },
    { id: 5, name: 'Omeprazol', presentation: '20mg - Cáps. 14 unidades', category: 'medicamentos', icon: '💊', description: 'Inibidor da bomba de protões para úlceras e refluxo.' },
    { id: 6, name: 'Captopril', presentation: '25mg - Comp. 30 unidades', category: 'medicamentos', icon: '💊', description: 'Anti-hipertensivo para controlo da pressão arterial.' },
    { id: 7, name: 'Losartana', presentation: '50mg - Comp. 30 unidades', category: 'medicamentos', icon: '💊', description: 'Anti-hipertensivo para tratamento da hipertensão.' },
    { id: 8, name: 'Sinvastatina', presentation: '20mg - Comp. 30 unidades', category: 'medicamentos', icon: '💊', description: 'Redutor do colesterol para prevenção cardiovascular.' },
    { id: 9, name: 'Diazepam', presentation: '5mg - Comp. 20 unidades', category: 'medicamentos', icon: '💊', description: 'Ansiolítico e relaxante muscular mediante receita.' },
    { id: 10, name: 'Prednisolona', presentation: '5mg - Comp. 20 unidades', category: 'medicamentos', icon: '💊', description: 'Corticosteroide para processos alérgicos e inflamatórios.' },
    { id: 11, name: 'Dipirona Sódica', presentation: '500mg - Comp. 10 unidades', category: 'medicamentos', icon: '💊', description: 'Analgésico e antitérmico potente.' },
    { id: 12, name: 'Azitromicina', presentation: '500mg - Comp. 3 unidades', category: 'medicamentos', icon: '💊', description: 'Antibiótico macrólido para infeções respiratórias.' },
    { id: 13, name: 'Ciprofloxacino', presentation: '500mg - Comp. 14 unidades', category: 'medicamentos', icon: '💊', description: 'Antibiótico quinolona para infeções urinárias.' },
    { id: 14, name: 'Cetoconazol', presentation: '200mg - Comp. 10 unidades', category: 'medicamentos', icon: '💊', description: 'Antifúngico sistémico para micoses.' },
    { id: 15, name: 'Fluconazol', presentation: '150mg - Cáps. 1 unidade', category: 'medicamentos', icon: '💊', description: 'Antifúngico para candidíase e micoses.' },
    { id: 16, name: 'Loratadina', presentation: '10mg - Comp. 10 unidades', category: 'medicamentos', icon: '💊', description: 'Anti-histamínico para alergias e rinite.' },
    { id: 17, name: 'Ranitidina', presentation: '150mg - Comp. 20 unidades', category: 'medicamentos', icon: '💊', description: 'Antagonista H2 para úlceras gástricas.' },
    { id: 18, name: 'Amoxicilina + Ác. Clavulânico', presentation: '875mg+125mg - Comp. 14 unidades', category: 'medicamentos', icon: '💊', description: 'Antibiótico de largo espectro para infeções graves.' },
    { id: 19, name: 'Vitamina C', presentation: '1000mg - Comp. 30 unidades', category: 'vitaminas', icon: '💪', description: 'Suplemento vitamínico para reforço imunológico.' },
    { id: 20, name: 'Ferro + Ácido Fólico', presentation: 'Comp. 30 unidades', category: 'vitaminas', icon: '💪', description: 'Suplemento para prevenção e tratamento de anemias.' },
    { id: 21, name: 'Multivitamínico Completo', presentation: 'Comp. 60 unidades', category: 'vitaminas', icon: '💪', description: 'Suplemento com vitaminas e minerais essenciais.' },
    { id: 22, name: 'Vitamina D3', presentation: '2000 UI - Comp. 60 unidades', category: 'vitaminas', icon: '💪', description: 'Suplemento para saúde óssea e imunidade.' },
    { id: 23, name: 'Complexo B', presentation: 'Comp. 30 unidades', category: 'vitaminas', icon: '💪', description: 'Vitaminas do complexo B para energia e metabolismo.' },
    { id: 24, name: 'Soro Fisiológico', presentation: '0.9% - 500ml', category: 'cuidados', icon: '🧴', description: 'Solução salina para hidratação e limpeza nasal.' },
    { id: 25, name: 'Álcool 70%', presentation: '500ml', category: 'cuidados', icon: '🧴', description: 'Antissético para desinfeção de superfícies e mãos.' },
    { id: 26, name: 'Álcool Gel', presentation: '500ml', category: 'cuidados', icon: '🧴', description: 'Gel antissético para higienização das mãos.' },
    { id: 27, name: 'Solução Antissética', presentation: 'Clorexidina 200ml', category: 'cuidados', icon: '🧴', description: 'Antissético tópico para limpeza de feridas.' },
    { id: 28, name: 'Protetor Solar FPS 50', presentation: '200ml', category: 'cuidados', icon: '🧴', description: 'Proteção solar alta para pele saudável.' },
    { id: 29, name: 'Pomada para Queimaduras', presentation: 'Bisnaga 30g', category: 'primeiros', icon: '🩹', description: 'Tratamento tópico para queimaduras leves.' },
    { id: 30, name: 'Penso Rápido (Band-aid)', presentation: 'Caixa 50 unidades', category: 'primeiros', icon: '🩹', description: 'Pensos adesivos para pequenos ferimentos.' },
    { id: 31, name: 'Gaze Estéril', presentation: 'Pacote 10 unidades 10x10cm', category: 'primeiros', icon: '🩹', description: 'Gaze para limpeza e cobertura de feridas.' },
    { id: 32, name: 'Esparadrapo', presentation: 'Rolo 5m x 2.5cm', category: 'primeiros', icon: '🩹', description: 'Fita adesiva para fixação de pensos e gazes.' },
    { id: 33, name: 'Luvas Descartáveis', presentation: 'Caixa 100 unidades', category: 'primeiros', icon: '🩹', description: 'Luvas de látex para procedimentos.' },
    { id: 34, name: 'Leite Infantil 1', presentation: 'Lata 400g - 0-6 meses', category: 'bebe', icon: '👶', description: 'Fórmula infantil para recém-nascidos.' },
    { id: 35, name: 'Leite Infantil 2', presentation: 'Lata 400g - 6-12 meses', category: 'bebe', icon: '👶', description: 'Fórmula infantil de seguimento.' },
    { id: 36, name: 'Fraldas Descartáveis', presentation: 'Pacote 30 unidades - Tamanho M', category: 'bebe', icon: '👶', description: 'Fraldas com ajuste elástico e absorção máxima.' },
    { id: 37, name: 'Toalhitas Húmidas', presentation: 'Pacote 100 unidades', category: 'bebe', icon: '👶', description: 'Toalhitas suaves para higiene do bebé.' },
    { id: 38, name: 'Pomada Assaduras', presentation: 'Bisnaga 50g', category: 'bebe', icon: '👶', description: 'Proteção e tratamento de assaduras.' },
    { id: 39, name: 'Medidor de Pressão Digital', presentation: 'Automático braço', category: 'equipamento', icon: '🩺', description: 'Monitor de pressão arterial digital preciso.' },
    { id: 40, name: 'Termómetro Digital', presentation: 'Digital', category: 'equipamento', icon: '🩺', description: 'Termómetro digital de leitura rápida.' },
    { id: 41, name: 'Glicosímetro', presentation: 'Kit completo', category: 'equipamento', icon: '🩺', description: 'Medidor de glicose no sangue para diabéticos.' },
    { id: 42, name: 'Máscaras Cirúrgicas', presentation: 'Caixa 50 unidades', category: 'equipamento', icon: '🩺', description: 'Máscaras de proteção tripla camada.' },
    { id: 43, name: 'Máscara N95', presentation: 'Unidade', category: 'equipamento', icon: '🩺', description: 'Proteção respiratória avançada.' }
  ];

  var categoryIcons = {
    medicamentos: '💊',
    vitaminas: '💪',
    cuidados: '🧴',
    primeiros: '🩹',
    bebe: '👶',
    equipamento: '🩺'
  };

  var categoryNames = {
    medicamentos: 'Medicamentos',
    vitaminas: 'Vitaminas',
    cuidados: 'Cuidados Pessoais',
    primeiros: 'Primeiros Socorros',
    bebe: 'Produtos para Bebés',
    equipamento: 'Equipamento Médico'
  };

  // ===== Product Rendering =====
  var productsGrid = document.getElementById('productsGrid');
  var searchInput = document.getElementById('searchInput');
  var searchClear = document.getElementById('searchClear');
  var tabBtns = document.querySelectorAll('.tab-btn');
  var productsCount = document.getElementById('productsCount');

  var activeCategory = 'todos';
  var searchTerm = '';

  function renderProducts() {
    if (!productsGrid) return;

    var filtered = products.filter(function (p) {
      var matchCategory = activeCategory === 'todos' || p.category === activeCategory;
      var term = searchTerm.toLowerCase();
      var matchSearch = !term ||
        p.name.toLowerCase().includes(term) ||
        p.presentation.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      return matchCategory && matchSearch;
    });

    if (productsCount) {
      productsCount.textContent = filtered.length + ' produto' + (filtered.length !== 1 ? 's' : '') + ' encontrado' + (filtered.length !== 1 ? 's' : '');
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = '<div class="no-products"><div class="no-icon">🔍</div><h3>Nenhum produto encontrado</h3><p>Tente outro termo de pesquisa ou limpe os filtros.</p></div>';
      return;
    }

    var html = '';
    filtered.forEach(function (p) {
      var catName = categoryNames[p.category] || p.category;
      var catIcon = categoryIcons[p.category] || '💊';
      var msg = 'Olá Farmácia Dia %26 Noite%2C gostaria de saber se tem ' + encodeURIComponent(p.name) + ' disponível.';
      var waLink = 'https://wa.me/258843983260?text=' + msg;

      html += '<div class="product-card" data-category="' + p.category + '">' +
        '<div class="product-card-header">' +
          '<span class="product-category">' + catName + '</span>' +
          '<span class="product-icon">' + catIcon + '</span>' +
        '</div>' +
        '<div class="product-card-body">' +
          '<h3>' + p.name + '</h3>' +
          '<p class="presentation">' + p.presentation + '</p>' +
          '<p class="description">' + p.description + '</p>' +
          '<a href="' + waLink + '" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">💬 Verificar Disponibilidade</a>' +
        '</div>' +
      '</div>';
    });

    productsGrid.innerHTML = html;
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchTerm = this.value;
      if (searchClear) {
        searchClear.classList.toggle('visible', searchTerm.length > 0);
      }
      renderProducts();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', function () {
      if (searchInput) {
        searchInput.value = '';
        searchTerm = '';
        this.classList.remove('visible');
        renderProducts();
        searchInput.focus();
      }
    });
  }

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      activeCategory = this.getAttribute('data-category');
      renderProducts();
    });
  });

  // ===== Contact Form =====
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      var fields = [
        { id: 'nome', label: 'Nome' },
        { id: 'email', label: 'Email' },
        { id: 'telefone', label: 'Telefone' },
        { id: 'mensagem', label: 'Mensagem' }
      ];

      fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        var group = input ? input.closest('.form-group') : null;
        if (group) { group.classList.remove('invalid'); }
        if (input && !input.value.trim()) {
          if (group) { group.classList.add('invalid'); }
          isValid = false;
        }
      });

      if (isValid) {
        document.querySelector('.form-fields').classList.add('hidden');
        document.querySelector('.form-success').classList.add('visible');

        // Send to WhatsApp as notification
        var nome = document.getElementById('nome').value.trim();
        var email = document.getElementById('email').value.trim();
        var telefone = document.getElementById('telefone').value.trim();
        var mensagem = document.getElementById('mensagem').value.trim();
        var waMsg = 'Olá Farmácia Dia %26 Noite%2C sou ' + encodeURIComponent(nome) + '. Email: ' + encodeURIComponent(email) + ', Tel: ' + encodeURIComponent(telefone) + '. Mensagem: ' + encodeURIComponent(mensagem);
        window.open('https://wa.me/258843983260?text=' + waMsg, '_blank');
      }
    });
  }

  // ===== Floating WhatsApp =====
  var whatsappFloat = document.getElementById('whatsappFloat');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function () {
      window.open('https://wa.me/258843983260?text=Ol%C3%A1%20Farm%C3%A1cia%20Dia%20%26%20Noite%2C%20gostaria%20de%20saber%20se%20tem%20dispon%C3%ADvel...', '_blank');
    });
  }

  // ===== Initialize products on page load =====
  renderProducts();

  // ===== Smooth scroll for internal links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
