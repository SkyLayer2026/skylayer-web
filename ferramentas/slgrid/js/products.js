let allProducts = [];
let allCategories = [];
let activeCategory = 'all';
let activeBrand = 'all';
let searchTerm = '';

// Load search from URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('search')) {
  searchTerm = urlParams.get('search');
}

function formatPrice(value) {
  return value.toLocaleString('pt-MZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getBadgeHTML(badge) {
  if (!badge) return '';
  const labels = {
    promocao: 'Promoção',
    novo: 'Novo',
    mais_vendido: 'Mais Vendido'
  };
  return `<span class="product-badge ${badge}">${labels[badge] || badge}</span>`;
}

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="icon">📦</div>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar a pesquisa ou o filtro selecionado.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(product => {
    const inCart = cartHasItem(product.id);
    return `
    <div class="product-card fade-in">
      <div class="product-image-wrap">
        ${getBadgeHTML(product.badge)}
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
      </div>
      <div class="product-body">
        ${product.brand ? `<div class="product-brand">${product.brand}</div>` : ''}
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(product.price)} MZN</span>
          ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)} MZN</span>` : ''}
        </div>
        ${product.stock
          ? `<button class="btn btn-buy btn-sm product-add-btn" data-id="${product.id}" onclick="addToCart(${product.id})">
              <i class="fas fa-cart-plus"></i> ${inCart ? 'Adicionar Mais' : 'Adicionar ao Carrinho'}
            </button>`
          : `<button class="btn btn-sm btn-outline" style="color:var(--gray-400);border-color:var(--gray-300);cursor:not-allowed;width:100%;justify-content:center;" disabled>
              <i class="fas fa-times-circle"></i> Sem Stock
            </button>`
        }
      </div>
    </div>`;
  }).join('');

  // Trigger fade-in for newly rendered items
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card.fade-in').forEach(el => observer.observe(el));
}

function filterProducts() {
  let filtered = allProducts;

  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  if (activeBrand !== 'all') {
    filtered = filtered.filter(p => p.brand === activeBrand);
  }

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      (p.brand && p.brand.toLowerCase().includes(term))
    );
  }

  renderProducts(filtered);
}

function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('searchInput');
  const brandFilter = document.getElementById('brandFilter');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      filterProducts();
    });
  });

  if (brandFilter) {
    brandFilter.addEventListener('change', (e) => {
      activeBrand = e.target.value;
      filterProducts();
    });
  }

  if (searchInput) {
    searchInput.value = searchTerm;
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      filterProducts();
    });
  }
}

function populateBrandFilter() {
  const brandFilter = document.getElementById('brandFilter');
  if (!brandFilter) return;

  const brands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))].sort();

  brands.forEach(brand => {
    const opt = document.createElement('option');
    opt.value = brand;
    opt.textContent = brand;
    brandFilter.appendChild(opt);
  });
}

async function loadProducts() {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch('data/products.json'),
      fetch('data/categories.json')
    ]);

    allProducts = await productsRes.json();
    allCategories = await categoriesRes.json();

    // Populate filter buttons
    const filterContainer = document.querySelector('.filters-bar .filters-group');
    if (filterContainer) {
      let buttons = '<button class="filter-btn active" data-category="all">Todos</button>';
      allCategories.forEach(cat => {
        buttons += `<button class="filter-btn" data-category="${cat.id}">${cat.name}</button>`;
      });
      filterContainer.innerHTML = buttons;
    }

    setupFilters();
    populateBrandFilter();
    filterProducts();
  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
    const grid = document.getElementById('productsGrid');
    if (grid) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="icon">⚠️</div>
          <h3>Erro ao carregar produtos</h3>
          <p>Não foi possível carregar o catálogo. Tente novamente mais tarde.</p>
        </div>
      `;
    }
  }
}

async function loadFeaturedProducts() {
  try {
    const res = await fetch('data/products.json');
    const products = await res.json();
    const featured = products.filter(p => p.featured);

    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    if (featured.length === 0) {
      grid.innerHTML = '';
      return;
    }

    grid.innerHTML = featured.map(product => {
      const inCart = cartHasItem(product.id);
      return `
      <div class="product-card fade-in">
        <div class="product-image-wrap">
          ${getBadgeHTML(product.badge)}
          <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        </div>
        <div class="product-body">
          ${product.brand ? `<div class="product-brand">${product.brand}</div>` : ''}
          <h3>${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-price-row">
            <span class="product-price">${formatPrice(product.price)} MZN</span>
            ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)} MZN</span>` : ''}
          </div>
          ${product.stock
            ? `<button class="btn btn-buy btn-sm product-add-btn" data-id="${product.id}" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> ${inCart ? 'Adicionar Mais' : 'Adicionar ao Carrinho'}
              </button>`
            : `<button class="btn btn-sm btn-outline" style="color:var(--gray-400);border-color:var(--gray-300);cursor:not-allowed;width:100%;justify-content:center;" disabled>
                <i class="fas fa-times-circle"></i> Sem Stock
              </button>`
          }
        </div>
      </div>`;
    }).join('');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('#featuredGrid .product-card.fade-in').forEach(el => observer.observe(el));
  } catch (err) {
    console.error('Erro ao carregar produtos em destaque:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  loadFeaturedProducts();
});
