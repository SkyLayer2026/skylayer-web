interface ReceiptData {
  saleId: string; total: number; change: number;
  items: Array<{ productName: string; quantity: number; unitPrice: number; subtotal: number }>;
  timestamp: string;
}

export const printReceipt = ( ReceiptData) => {
  const win = window.open('', '_blank', 'width=300,height=500');
  if (!win) return alert('Pop-up bloqueado. Permita pop-ups para imprimir.');

  win.document.write(`
    <html><head><meta charset="utf-8"><style>
      body{font-family:'Courier New',monospace;width:260px;margin:0 auto;padding:10px;font-size:12px}
      h2{text-align:center;margin:5px 0;font-size:16px}
      .line{border-top:1px dashed #000;margin:5px 0}
      .row{display:flex;justify-content:space-between;margin:2px 0}
      .total{font-size:16px;font-weight:bold;margin-top:5px}
    </style></head><body>
      <h2>Farmácia Luri</h2>
      <div class="row"><span>Venda:</span><span>${data.saleId.slice(-6).toUpperCase()}</span></div>
      <div class="row"><span>Data:</span><span>${new Date(data.timestamp).toLocaleString()}</span></div>
      <div class="line"></div>
      ${data.items.map(i => `<div class="row"><span>${i.quantity}x ${i.productName.slice(0,20)}</span><span>${i.subtotal.toFixed(2)}</span></div>`).join('')}
      <div class="line"></div>
      <div class="row total"><span>TOTAL:</span><span>${data.total.toFixed(2)} MT</span></div>
      <div class="row"><span>Pago:</span><span>${(data.total + data.change).toFixed(2)} MT</span></div>
      <div class="row"><span>Troco:</span><span>${data.change.toFixed(2)} MT</span></div>
      <div class="line"></div>
      <p style="text-align:center;margin:8px 0">Obrigado pela preferência!<br/>Não é documento fiscal.</p>
      <script>window.print();setTimeout(()=>window.close(),800)</script>
    </body></html>
  `);
};