const PHONE = '258847857255';
const CART_KEY = 'burger_house_cart';

let cart = loadCart();

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(name, price, emoji) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1, emoji: emoji || '🍔' });
  }
  saveCart();
  updateCartUI();
  showToast(`✅ ${name} adicionado ao pedido!`);
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  updateCartUI();
}

function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(name);
    return;
  }
  saveCart();
  updateCartUI();
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getItemCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const sidebar = document.getElementById('cartSidebar');
  const itemsContainer = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const badge = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartToggleBtn');

  if (!itemsContainer) return;

  const count = getItemCount();
  if (badge) badge.textContent = count;
  if (cartBtn) {
    cartBtn.setAttribute('data-count', count);
  }

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <span class="emoji">🛒</span>
        <p>O teu carrinho está vazio</p>
        <p style="font-size:0.85rem;margin-top:8px">Adiciona itens do menu</p>
      </div>
    `;
  } else {
    itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <span style="font-size:1.5rem">${item.emoji}</span>
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${item.price} MT</div>
        </div>
        <div class="cart-item-qty">
          <button onclick="changeQty('${item.name.replace(/'/g, "\\'")}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.name.replace(/'/g, "\\'")}', 1)">+</button>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')">✕</button>
      </div>
    `).join('');
  }

  if (totalEl) {
    totalEl.textContent = `${getTotal()} MT`;
  }

  const sendBtn = document.getElementById('sendWhatsApp');
  if (sendBtn) {
    if (cart.length === 0) {
      sendBtn.disabled = true;
      sendBtn.style.opacity = '0.5';
      sendBtn.style.cursor = 'not-allowed';
    } else {
      sendBtn.disabled = false;
      sendBtn.style.opacity = '1';
      sendBtn.style.cursor = 'pointer';
    }
  }
}

function openCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar) sidebar.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar) sidebar.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function sendWhatsAppOrder() {
  if (cart.length === 0) return;

  let msg = '🍔 *NOVO PEDIDO - BURGER HOUSE* 🍔\n\n';
  msg += '*ITENS:*\n';
  cart.forEach(item => {
    msg += `${item.emoji} ${item.name} x${item.qty} = ${item.price * item.qty} MT\n`;
  });
  msg += `\n──────────────────\n`;
  msg += `*TOTAL: ${getTotal()} MT*\n\n`;
  msg += `📍 *Entrega:* Maputo\n`;
  msg += `👤 *Nome:* [TEU NOME]\n`;
  msg += `📞 *Contacto:* [TEU CONTACTO]\n`;
  msg += `🏠 *Endereço:* [TEU ENDEREÇO]\n\n`;
  msg += `⏱️ *Tempo estimado:* 30-45 min\n\n`;
  msg += `_Obrigado por escolheres a Burger House! 🍔🔥_`;

  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');

  showToast('✅ Pedido enviado! Aguarda a confirmação.');
  closeCart();
}

function sendWhatsAppQuick() {
  const msg = `🍔 Olá! Quero fazer um pedido.`;
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast success';
  toast.innerHTML = `<span class="toast-icon">✅</span> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Init menu tabs
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const items = document.querySelectorAll('.menu-item');

  if (!tabs.length || !items.length) return;

  function filterItems(category) {
    items.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.classList.add('visible');
      } else {
        item.classList.remove('visible');
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterItems(tab.dataset.tab);
    });
  });

  // Show first tab
  const activeTab = document.querySelector('.menu-tab.active') || tabs[0];
  if (activeTab) {
    activeTab.classList.add('active');
    filterItems(activeTab.dataset.tab);
  }
}

// Init mobile nav
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('navLinks');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

// Init header scroll
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Init add to cart buttons
function initAddToCart() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      const emoji = btn.dataset.emoji || '🍔';
      addToCart(name, price, emoji);
    });
  });
}

// Init all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initMenuTabs();
  initAddToCart();
  updateCartUI();

  // Cart toggle from any page
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', openCart);
  }

  // Close cart overlay
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  // Close cart button
  const cartClose = document.getElementById('cartClose');
  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }

  // Send WhatsApp
  const sendBtn = document.getElementById('sendWhatsApp');
  if (sendBtn) {
    sendBtn.addEventListener('click', sendWhatsAppOrder);
  }

  // Floating WhatsApp
  const floatBtn = document.getElementById('whatsappFloat');
  if (floatBtn) {
    floatBtn.addEventListener('click', sendWhatsAppQuick);
  }

  // ESC key to close cart
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });
});
