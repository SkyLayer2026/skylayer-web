// Antes:
// printReceipt({ ...res, items, timestamp: new Date().toISOString() });

// Depois:
import { printReceipt } from '../services/printService';

const finalizeSale = async () => {
  try {
    const paid = parseFloat(amountPaid) || total;
    const res = await posCheckout.validateAndProcess('dinheiro', paid);
    
    const receiptData = {
      branchName: 'Farmácia Luri',
      address: 'Av. Principal, nº 123',
      phone: '+258 84 000 0000',
      saleId: res.saleId,
      operator: 'Caixa 1',
      date: new Date().toISOString(),
      items: items.map(i => ({ name: i.productName, qty: i.quantity, price: i.unitPrice, total: i.subtotal })),
      subtotal: total, tax: 0, total: total,
      paymentMethod: 'Dinheiro', amountPaid: paid, change: res.change
    };

    const printResult = await printReceipt(receiptData);
    if (!printResult.success) {
      alert(`⚠️ Falha na impressão: ${printResult.error}\nA venda foi registrada. Imprima manualmente se necessário.`);
    }
    
    clearCart(); setPaymentOpen(false); setAmountPaid(''); setError(null);
  } catch (err: any) { setError(err.message); }
};