// ==============================
// Cart Management (localStorage)
// ==============================

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('slgrid_cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('slgrid_cart', JSON.stringify(cart));
  updateCartBadge();
}

function cartHasItem(productId) {
  const cart = getCart();
  return cart.some(item => item.id === productId);
}

function addToCart(productId) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    // Find product from products.json
    const product = findProductById(productId);
    if (!product) return;
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  saveCart(cart);
  updateCartBadge();

  // Visual feedback
  const btn = document.querySelector(`.product-add-btn[data-id="${productId}"]`);
  if (btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Adicionado';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-cart-plus"></i> Adicionar Mais';
      btn.style.background = '';
    }, 1200);
  }
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCartPage();
}

function updateQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
  renderCartPage();
}

function findProductById(id) {
  // Try from loaded products first
  if (typeof allProducts !== 'undefined' && allProducts.length) {
    return allProducts.find(p => p.id === id);
  }
  // Fallback: fetch from JSON (shouldn't normally happen)
  return null;
}

function formatPrice(value) {
  return value.toLocaleString('pt-MZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function renderCartPage() {
  const container = document.getElementById('cartContainer');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">🛒</div>
        <h3>O seu carrinho está vazio</h3>
        <p>Explore o nosso catálogo e adicione produtos ao carrinho.</p>
        <a href="products.html" class="btn btn-primary" style="margin-top:20px;">
          <i class="fas fa-search"></i> Ver Produtos
        </a>
      </div>
    `;
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  container.innerHTML = `
    <div class="cart-layout">
      <div>
        <h2 style="font-size:1.3rem;font-weight:700;color:var(--primary);margin-bottom:20px;">
          Carrinho (${cart.reduce((s, i) => s + i.qty, 0)} itens)
        </h2>
        <div class="cart-items">
          ${cart.map(item => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.brand || ''}</p>
                <p style="font-weight:600;color:var(--primary);margin-top:4px;">
                  ${formatPrice(item.price)} MZN
                </p>
              </div>
              <div class="cart-item-qty">
                <button onclick="updateQty(${item.id}, -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="updateQty(${item.id}, 1)">+</button>
              </div>
              <div class="cart-item-total">
                ${formatPrice(item.price * item.qty)} MZN
              </div>
              <button class="btn btn-danger btn-icon" onclick="removeFromCart(${item.id})" title="Remover">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
      <div>
        <div class="cart-summary">
          <h3>Resumo</h3>
          <div class="cart-summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)} MZN</span>
          </div>
          <div class="cart-summary-row">
            <span>Envio</span>
            <span>A calcular</span>
          </div>
          <div class="cart-summary-row total">
            <span>Total</span>
            <span>${formatPrice(subtotal)} MZN</span>
          </div>
          <button class="btn btn-buy btn-block" onclick="checkout()">
            <i class="fas fa-whatsapp"></i> Pedir via WhatsApp
          </button>
          <a href="products.html" class="btn btn-primary btn-block" style="margin-top:10px;justify-content:center;">
            <i class="fas fa-arrow-left"></i> Continuar a Comprar
          </a>
        </div>
      </div>
    </div>
  `;
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) return;

  let message = 'Olá! Gostaria de fazer um pedido:%0A%0A';
  cart.forEach((item, i) => {
    message += `${i+1}. ${item.name} (x${item.qty}) — ${formatPrice(item.price * item.qty)} MZN%0A`;
  });

  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  message += `%0ATotal: ${formatPrice(total)} MZN`;

  // WhatsApp number (dummy for now)
  window.open(`https://wa.me/258840000000?text=${message}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cartContainer');
  if (container) renderCartPage();
});
