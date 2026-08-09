// Dados iniciais (simulando banco de dados)
let currentBranch = null;
let cart = [];
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: 'Paracetamol 500mg', barcode: '1234567890123', category: 'Analgésicos', cost: 5.00, price: 10.00, minStock: 10 },
    { id: 2, name: 'Amoxicilina 500mg', barcode: '2345678901234', category: 'Antibióticos', cost: 15.00, price: 30.00, minStock: 5 },
    { id: 3, name: 'Vitamina C 1g', barcode: '3456789012345', category: 'Suplementos', cost: 8.00, price: 15.00, minStock: 15 },
    { id: 4, name: 'Álcool 70%', barcode: '4567890123456', category: 'Higiene', cost: 3.00, price: 6.00, minStock: 20 }
];

let batches = JSON.parse(localStorage.getItem('batches')) || [
    { id: 1, productId: 1, batchNumber: 'L001', quantity: 50, expiryDate: '2026-12-31' },
    { id: 2, productId: 2, batchNumber: 'L002', quantity: 30, expiryDate: '2026-06-30' },
    { id: 3, productId: 3, batchNumber: 'L003', quantity: 100, expiryDate: '2026-05-15' },
    { id: 4, productId: 4, batchNumber: 'L004', quantity: 80, expiryDate: '2027-01-01' }
];

let sales = JSON.parse(localStorage.getItem('sales')) || [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    setInterval(updateDate, 60000);
    
    // Definir datas padrão para relatórios (hoje)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('reportStartDate').value = today;
    document.getElementById('reportEndDate').value = today;
});

function updateDate() {
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('pt-BR', options);
}

// Seleção de Filial
function selectBranch(branchId, branchName) {
    currentBranch = branchId;
    document.getElementById('currentBranch').textContent = branchName;
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');
    
    // Carregar dados iniciais
    renderProducts();
    updateStockAlerts();
    generateReport();
}

function logout() {
    currentBranch = null;
    cart = [];
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('cartItems').innerHTML = '';
    document.getElementById('emptyCart').style.display = 'block';
    document.getElementById('cartTotal').textContent = '0,00 MT';
    document.getElementById('btnCheckout').disabled = true;
}

// Navegação
function showSection(section) {
    // Esconder todas as seções
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    // Mostrar seção selecionada
    document.getElementById(section + 'Section').classList.add('active');
    document.getElementById('nav-' + section).classList.add('active');
    
    // Atualizar dados específicos
    if (section === 'stock') updateStockAlerts();
    if (section === 'reports') generateReport();
    if (section === 'products') renderProducts();
}

// PDV - Carrinho
function handleBarcode(event) {
    if (event.key === 'Enter') {
        searchProduct();
    }
}

function searchProduct() {
    const barcode = document.getElementById('barcodeInput').value.trim();
    if (!barcode) return;
    
    const product = products.find(p => p.barcode === barcode);
    if (!product) {
        alert('Produto não encontrado!');
        document.getElementById('barcodeInput').value = '';
        document.getElementById('barcodeInput').focus();
        return;
    }
    
    // Verificar stock
    const batch = batches.find(b => b.productId === product.id && b.quantity > 0);
    if (!batch) {
        alert('Produto sem stock!');
        return;
    }
    
    // Verificar validade
    const today = new Date();
    const expiryDate = new Date(batch.expiryDate);
    if (expiryDate < today) {
        alert('Produto vencido! Não pode ser vendido.');
        return;
    }
    
    addToCart(product, batch);
    document.getElementById('barcodeInput').value = '';
    document.getElementById('barcodeInput').focus();
}

function addToCart(product, batch) {
    const existingItem = cart.find(item => item.batchId === batch.id);
    
    if (existingItem) {
        if (existingItem.quantity < batch.quantity) {
            existingItem.quantity++;
            existingItem.subtotal = existingItem.quantity * existingItem.unitPrice;
        } else {
            alert('Quantidade máxima em stock atingida!');
            return;
        }
    } else {
        cart.push({
            batchId: batch.id,
            productId: product.id,
            productName: product.name,
            quantity: 1,
            unitPrice: product.price,
            subtotal: product.price
        });
    }
    
    renderCart();
}

function renderCart() {
    const tbody = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const btnCheckout = document.getElementById('btnCheckout');
    
    if (cart.length === 0) {
        tbody.innerHTML = '';
        emptyCart.style.display = 'block';
        btnCheckout.disabled = true;
        document.getElementById('cartTotal').textContent = '0,00 MT';
        return;
    }
    
    emptyCart.style.display = 'none';
    btnCheckout.disabled = false;
    
    tbody.innerHTML = cart.map((item, index) => `
        <tr>
            <td>${item.productName}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateQuantity(${index}, this.value)" 
                       style="width: 60px; padding: 5px;">
            </td>
            <td>${item.unitPrice.toFixed(2)} MT</td>
            <td>${item.subtotal.toFixed(2)} MT</td>
            <td>
                <button onclick="removeFromCart(${index})" class="btn-danger">Remover</button>
            </td>
        </tr>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2).replace('.', ',') + ' MT';
}

function updateQuantity(index, quantity) {
    const qty = parseInt(quantity);
    if (qty < 1) {
        removeFromCart(index);
        return;
    }
    
    const item = cart[index];
    const batch = batches.find(b => b.id === item.batchId);
    
    if (qty > batch.quantity) {
        alert('Quantidade superior ao stock disponível!');
        renderCart();
        return;
    }
    
    item.quantity = qty;
    item.subtotal = qty * item.unitPrice;
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Pagamento
function openPaymentModal() {
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
    document.getElementById('paymentTotal').textContent = total.toFixed(2).replace('.', ',') + ' MT';
    document.getElementById('amountReceived').value = '';
    document.getElementById('changeAmount').textContent = '0,00 MT';
    document.getElementById('paymentModal').classList.remove('hidden');
    document.getElementById('amountReceived').focus();
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.add('hidden');
}

function calculateChange() {
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const received = parseFloat(document.getElementById('amountReceived').value) || 0;
    const change = received - total;
    
    document.getElementById('changeAmount').textContent = 
        (change > 0 ? change : 0).toFixed(2).replace('.', ',') + ' MT';
}

function completeSale() {
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const received = parseFloat(document.getElementById('amountReceived').value) || 0;
    
    if (received < total) {
        alert('Valor recebido inferior ao total!');
        return;
    }
    
    // Registrar venda
    const sale = {
        id: Date.now(),
        branchId: currentBranch,
        date: new Date().toISOString(),
        items: [...cart],
        total: total,
        paymentMethod: 'Dinheiro'
    };
    
    sales.push(sale);
    
    // Atualizar stock
    cart.forEach(item => {
        const batch = batches.find(b => b.id === item.batchId);
        if (batch) {
            batch.quantity -= item.quantity;
        }
    });
    
    // Salvar no localStorage
    localStorage.setItem('sales', JSON.stringify(sales));
    localStorage.setItem('batches', JSON.stringify(batches));
    
    alert(`Venda finalizada com sucesso!\nTotal: ${total.toFixed(2)} MT\nTroco: ${(received - total).toFixed(2)} MT`);
    
    // Limpar carrinho
    cart = [];
    renderCart();
    closePaymentModal();
    
    // Atualizar relatórios
    generateReport();
}

// Gestão de Produtos
function renderProducts() {
    const search = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.barcode.includes(search)
    );
    
    const container = document.getElementById('productsList');
    container.innerHTML = filtered.map(product => {
        const batch = batches.find(b => b.productId === product.id);
        const totalStock = batch ? batch.quantity : 0;
        
        return `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p><strong>Código:</strong> ${product.barcode}</p>
                <p><strong>Categoria:</strong> ${product.category || 'N/A'}</p>
                <p><strong>Preço Custo:</strong> ${product.cost.toFixed(2)} MT</p>
                <p><strong>Preço Venda:</strong> ${product.price.toFixed(2)} MT</p>
                <p><strong>Stock:</strong> ${totalStock} un (Mín: ${product.minStock})</p>
                <div style="margin-top: 10px; display: flex; gap: 10px;">
                    <button onclick="editProduct(${product.id})" class="btn-primary" style="flex: 1;">Editar</button>
                    <button onclick="addStock(${product.id})" class="btn-success" style="flex: 1;">+ Stock</button>
                </div>
            </div>
        `;
    }).join('');
}

function filterProducts() {
    renderProducts();
}

function openProductModal() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productModalTitle').textContent = '📦 Novo Produto';
    document.getElementById('productModal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

function saveProduct(event) {
    event.preventDefault();
    
    const id = document.getElementById('productId').value;
    const productData = {
        name: document.getElementById('productName').value,
        barcode: document.getElementById('productBarcode').value,
        category: document.getElementById('productCategory').value,
        cost: parseFloat(document.getElementById('productCost').value),
        price: parseFloat(document.getElementById('productPrice').value),
        minStock: parseInt(document.getElementById('productMinStock').value)
    };
    
    if (id) {
        // Editar
        const index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        // Novo
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, ...productData });
    }
    
    localStorage.setItem('products', JSON.stringify(products));
    closeProductModal();
    renderProducts();
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productBarcode').value = product.barcode;
    document.getElementById('productCategory').value = product.category || '';
    document.getElementById('productCost').value = product.cost;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productMinStock').value = product.minStock;
    
    document.getElementById('productModalTitle').textContent = '✏️ Editar Produto';
    document.getElementById('productModal').classList.remove('hidden');
}

function addStock(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const batchNumber = prompt('Número do Lote:', 'L' + Date.now().toString().slice(-3));
    if (!batchNumber) return;
    
    const quantity = parseInt(prompt('Quantidade:', '50'));
    if (!quantity || quantity <= 0) return;
    
    const expiryDate = prompt('Data de Validade (AAAA-MM-DD):', '2026-12-31');
    if (!expiryDate) return;
    
    batches.push({
        id: Date.now(),
        productId: productId,
        batchNumber: batchNumber,
        quantity: quantity,
        expiryDate: expiryDate
    });
    
    localStorage.setItem('batches', JSON.stringify(batches));
    alert('Stock adicionado com sucesso!');
    renderProducts();
    updateStockAlerts();
}

// Stock e Validade
function updateStockAlerts() {
    const today = new Date();
    const sevenDays = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    // Stock baixo
    const lowStock = [];
    products.forEach(product => {
        const batch = batches.find(b => b.productId === product.id);
        if (batch && batch.quantity <= product.minStock) {
            lowStock.push(`${product.name}: ${batch.quantity} un`);
        }
    });
    
    document.getElementById('lowStockList').innerHTML = 
        lowStock.length ? lowStock.map(item => `<li>${item}</li>`).join('') : '<li>Nenhum produto com stock baixo</li>';
    
    // Próximos a expirar
    const expiring = [];
    batches.forEach(batch => {
        const expiryDate = new Date(batch.expiryDate);
        if (expiryDate <= sevenDays && expiryDate >= today) {
            const product = products.find(p => p.id === batch.productId);
            const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            expiring.push(`${product?.name || 'Produto'} (Lote ${batch.batchNumber}): ${daysLeft} dias`);
        }
    });
    
    document.getElementById('expiringList').innerHTML = 
        expiring.length ? expiring.map(item => `<li>${item}</li>`).join('') : '<li>Nenhum produto próximo a expirar</li>';
    
    // Lista completa de lotes
    const stockList = batches.map(batch => {
        const product = products.find(p => p.id === batch.productId);
        const expiryDate = new Date(batch.expiryDate);
        let status = '<span style="color: green;">✓ Válido</span>';
        
        if (expiryDate < today) {
            status = '<span style="color: red;">✕ Vencido</span>';
        } else if (expiryDate <= sevenDays) {
            status = '<span style="color: orange;">⚠️ Expirando</span>';
        }
        
        return `
            <tr>
                <td>${product?.name || 'N/A'}</td>
                <td>${batch.batchNumber}</td>
                <td>${batch.quantity}</td>
                <td>${new Date(batch.expiryDate).toLocaleDateString('pt-BR')}</td>
                <td>${status}</td>
            </tr>
        `;
    }).join('');
    
    document.getElementById('stockList').innerHTML = stockList;
}

// Relatórios
function generateReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    
    if (!startDate || !endDate) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    // Filtrar vendas do período
    const periodSales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= start && saleDate <= end && sale.branchId === currentBranch;
    });
    
    // Calcular totais
    const totalSalesValue = periodSales.reduce((sum, sale) => sum + sale.total, 0);
    const totalItems = periodSales.reduce((sum, sale) => 
        sum + sale.items.reduce((s, item) => s + item.quantity, 0), 0
    );
    
    // Calcular lucro estimado
    let totalCost = 0;
    periodSales.forEach(sale => {
        sale.items.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                totalCost += product.cost * item.quantity;
            }
        });
    });
    
    const profit = totalSalesValue - totalCost;
    
    // Atualizar cards
    document.getElementById('salesToday').textContent = totalSalesValue.toFixed(2).replace('.', ',') + ' MT';
    document.getElementById('totalSales').textContent = periodSales.length;
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('estimatedProfit').textContent = profit.toFixed(2).replace('.', ',') + ' MT';
    
    // Produtos mais vendidos
    const productStats = {};
    periodSales.forEach(sale => {
        sale.items.forEach(item => {
            if (!productStats[item.productId]) {
                productStats[item.productId] = { name: item.productName, qty: 0, revenue: 0 };
            }
            productStats[item.productId].qty += item.quantity;
            productStats[item.productId].revenue += item.subtotal;
        });
    });
    
    const topProducts = Object.values(productStats)
        .sort((a, b) => b.qty - a.qty)
        .slice(0, 5);
    
    document.getElementById('topProducts').innerHTML = topProducts.map(p => `
        <tr>
            <td>${p.name}</td>
            <td>${p.qty}</td>
            <td>${p.revenue.toFixed(2).replace('.', ',')} MT</td>
        </tr>
    `).join('');
}

// Utilitários
function formatCurrency(value) {
    return value.toFixed(2).replace('.', ',') + ' MT';
}
function searchProduct() {
    const barcode = document.getElementById('barcodeInput').value.trim();
    if (!barcode) return;

    const product = products.find(p => p.barcode === barcode);
    
    if (product) {
        // ✅ Produto já cadastrado → adiciona ao carrinho
        const batch = batches.find(b => b.productId === product.id && b.quantity > 0);
        if (!batch) { alert('Produto sem stock!'); return; }
        if (new Date(batch.expiryDate) < new Date()) { alert('Produto vencido!'); return; }
        addToCart(product, batch);
    } else {
        // 🔹 Produto novo → abre modal de cadastro rápido
        openQuickRegisterModal(barcode);
    }
    
    document.getElementById('barcodeInput').value = '';
    document.getElementById('barcodeInput').focus();
}

function openQuickRegisterModal(barcode) {
    document.getElementById('productBarcode').value = barcode;
    document.getElementById('productName').value = '';
    document.getElementById('productCost').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productModalTitle').textContent = '📦 Produto Novo - Cadastro Rápido';
    document.getElementById('productModal').classList.remove('hidden');
    document.getElementById('productName').focus();
}
