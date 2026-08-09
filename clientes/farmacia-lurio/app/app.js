// 🔹 Toast notifications (substitui alert())
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// 🔹 Loading state
function setLoading(element, loading = true) {
  if (loading) {
    element.dataset.originalContent = element.innerHTML;
    element.innerHTML = '<span class="loading">Carregando...</span>';
    element.disabled = true;
  } else {
    element.innerHTML = element.dataset.originalContent || element.textContent;
    element.disabled = false;
  }
}

// 🔹 Format currency
function formatMT(value) {
  return parseFloat(value).toFixed(2).replace('.', ',') + ' MT';
}

// 🔹 POS: Melhor fluxo de teclado
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  
  const barcodeInput = document.getElementById('barcodeInput');
  barcodeInput?.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addToCart();
    }
  });
  
  // Atalhos de teclado globais
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      barcodeInput?.focus();
    }
    if (e.key === 'F2' && document.getElementById('btnCheckout')?.disabled === false) {
      e.preventDefault();
      checkout();
    }
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal.active');
      if (modal) modal.classList.remove('active');
    }
  });
  
  setInterval(updateSyncStatus, 10000);
  showToast('Sistema pronto! Pressione Ctrl+F para buscar produto', 'success');
});

// 🔹 POS: Adicionar ao carrinho com feedback visual
async function addToCart() {
  const barcode = document.getElementById('barcodeInput').value.trim();
  if (!barcode) return;

  const input = document.getElementById('barcodeInput');
  input.disabled = true;
  
  try {
    const item = await window.api.getProductByBarcode(barcode);
    
    if (!item) {
      showToast('Produto não encontrado. Cadastre na aba Produtos.', 'warning');
      input.value = '';
      input.disabled = false;
      input.focus();
      return;
    }

    if (new Date(item.expiry_date) < new Date()) {
      showToast('⚠️ Produto VENCIDO! Venda bloqueada.', 'error');
      input.value = '';
      input.disabled = false;
      input.focus();
      return;
    }

    const existing = cart.find(c => c.batch_id === item.batch_id);
    if (existing) {
      if (existing.qty < item.quantity) {
        existing.qty++;
        showToast(`+1 ${item.name}`, 'success', 1500);
      } else {
        showToast('Stock insuficiente para este lote', 'warning');
        return;
      }
    } else {
      cart.push({
        batch_id: item.batch_id,
        name: item.name,
        price: parseFloat(item.price),
        cost: parseFloat(item.cost),
        qty: 1
      });
      showToast(`${item.name} adicionado`, 'success', 1500);
    }

    renderCart();
    input.value = '';
  } catch (err) {
    showToast('Erro ao buscar produto. Tente novamente.', 'error');
  } finally {
    input.disabled = false;
    input.focus();
  }
}

// 🔹 Checkout com confirmação visual
async function checkout() {
  const total = cart.reduce((s, c) => s + c.qty * c.price, 0);
  
  // Modal de pagamento simplificado
  const paid = prompt(`💰 Total: ${formatMT(total)}\n\nValor recebido:`, total.toFixed(2));
  if (!paid) return;
  
  const paidValue = parseFloat(paid);
  if (isNaN(paidValue) || paidValue < total) {
    showToast('Valor insuficiente para concluir a venda', 'error');
    return;
  }

  const sale = { 
    id: Date.now(), 
    total, 
    paid: paidValue, 
    date: new Date().toISOString(), 
    items: cart.map(c => ({...c})) 
  };

  const btn = document.getElementById('btnCheckout');
  setLoading(btn, true);

  try {
    await window.api.checkout(sale);
    
    // Tentar imprimir
    const printRes = await window.api.printReceipt(sale);
    if (!printRes.success) {
      showToast('⚠️ Venda concluída, mas falha na impressão', 'warning', 5000);
    }

    // Limpar e atualizar
    cart = [];
    renderCart();
    await loadData();
    
    showToast(`✅ Venda #${sale.id.toString().slice(-6)} concluída!\nTroco: ${formatMT(paidValue - total)}`, 'success', 5000);
    
  } catch (err) {
    showToast('Erro ao finalizar venda: ' + err.message, 'error', 6000);
  } finally {
    setLoading(btn, false);
  }
}

// 🔹 Renderização do carrinho com animação
function renderCart() {
  const tbody = document.getElementById('cartBody');
  const emptyState = document.getElementById('emptyCart');
  
  if (cart.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    document.getElementById('cartTotal').textContent = formatMT(0);
    document.getElementById('btnCheckout').disabled = true;
    return;
  }
  
  if (emptyState) emptyState.style.display = 'none';
  
  tbody.innerHTML = cart.map((c, i) => `
    <tr style="animation: fadeIn 0.2s ease">
      <td><strong>${c.name}</strong></td>
      <td>
        <input type="number" value="${c.qty}" min="1" max="99" 
               onchange="updateQty(${i}, this.value)" 
               style="text-align:center">
      </td>
      <td>${formatMT(c.price)}</td>
      <td><strong>${formatMT(c.qty * c.price)}</strong></td>
      <td>
        <button onclick="removeFromCart(${i})" class="btn-danger" 
                style="padding:6px 12px;font-size:0.9rem">✕</button>
      </td>
    </tr>
  `).join('');

  const total = cart.reduce((s, c) => s + c.qty * c.price, 0);
  document.getElementById('cartTotal').textContent = formatMT(total);
  document.getElementById('btnCheckout').disabled = false;
}

// 🔹 Stock: Alertas mais visuais
function renderStock() {
  const today = new Date();
  const alertsDiv = document.getElementById('alertsContainer');
  
  const expired = batches.filter(b => new Date(b.expiry_date) < today && b.quantity > 0);
  const expiring = batches.filter(b => {
    const exp = new Date(b.expiry_date);
    const days = (exp - today) / (1000 * 60 * 60 * 24);
    return days >= 0 && days <= 7 && b.quantity > 0;
  });
  const lowStock = batches.filter(b => b.quantity <= 5 && b.quantity > 0);

  let html = '';
  if (expired.length) html += `<div class="alert-danger">🔴 ${expired.length} lote(s) VENCIDO(S) - Verificar urgentemente</div>`;
  if (expiring.length) html += `<div class="alert-warn">⚠️ ${expiring.length} lote(s) expira(m) em ≤7 dias</div>`;
  if (lowStock.length && !expired.length && !expiring.length) {
    html += `<div class="alert-warn" style="border-left-color:#f59e0b">📦 ${lowStock.length} produto(s) com stock baixo</div>`;
  }
  if (!html) html = `<div class="alert-ok">✅ Stock e validade em ordem</div>`;
  
  alertsDiv.innerHTML = html;

  // Tabela de lotes com cores de status
  document.getElementById('stockBody').innerHTML = batches.map(b => {
    const exp = new Date(b.expiry_date);
    const days = Math.ceil((exp - today) / (1000*60*60*24));
    let status = '<span style="background:#dcfce7;color:#15803d;padding:4px 10px;border-radius:20px;font-size:0.85rem">✅ Válido</span>';
    
    if (exp < today) {
      status = '<span style="background:#fee2e2;color:#b91c1c;padding:4px 10px;border-radius:20px;font-size:0.85rem">🔴 Vencido</span>';
    } else if (days <= 7) {
      status = `<span style="background:#fef3c7;color:#92400e;padding:4px 10px;border-radius:20px;font-size:0.85rem">⚠️ ${days}d</span>`;
    } else if (days <= 30) {
      status = `<span style="background:#dbeafe;color:#1e40af;padding:4px 10px;border-radius:20px;font-size:0.85rem">📅 ${days}d</span>`;
    }
    
    return `<tr>
      <td><strong>${b.product_name}</strong></td>
      <td><code style="background:#f1f5f9;padding:2px 8px;border-radius:4px">${b.lot}</code></td>
      <td><strong>${b.quantity}</strong></td>
      <td>${new Date(b.expiry_date).toLocaleDateString('pt-BR')}</td>
      <td>${status}</td>
    </tr>`;
  }).join('');
}

// 🔹 Relatórios com cálculo real de lucro
function renderReports() {
  const today = new Date().toDateString();
  window.api.getSales().then(sales => {
    const currentBranch = process.argv?.includes('filial') ? 'filial' : 'sede';
    const daily = sales.filter(s => 
      s.branch === currentBranch && 
      new Date(s.date).toDateString() === today
    );
    
    const total = daily.reduce((s, d) => s + d.total, 0);
    const profit = daily.reduce((sum, sale) => {
      const items = JSON.parse(sale.items);
      return sum + items.reduce((p, i) => p + i.qty * (i.price - i.cost), 0);
    }, 0);
    
    document.getElementById('repTotal').textContent = formatMT(total);
    document.getElementById('repCount').textContent = daily.length;
    document.getElementById('repProfit').textContent = formatMT(profit);
  });
}

// 🔹 Status de sincronização com indicador visual
function updateSyncStatus() {
  const el = document.getElementById('syncStatus');
  if (!el) return;
  
  if (navigator.onLine) {
    el.innerHTML = '🟢 Online';
    el.style.color = '#22c55e';
  } else {
    el.innerHTML = '⚪ Offline';
    el.style.color = '#94a3b8';
  }
}