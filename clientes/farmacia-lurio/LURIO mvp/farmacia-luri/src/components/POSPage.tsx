import React, { useState, useEffect, useRef } from 'react';
import { usePosCartStore } from '../store/posCartStore';
import { posCheckout } from '../services/posCheckout';
import { v4 as uuidv4 } from 'uuid';

interface ProductDisplay {
  productId: string;
  name: string;
  batchId: string;
  expiryDate: string;
  sellPrice: number;
  availableQty: number;
}

const POSPage: React.FC = () => {
  const [barcode, setBarcode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Dinheiro');
  const [amountPaid, setAmountPaid] = useState(0);
  const [change, setChange] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  const { items, total, addItem, removeItem, updateItemQuantity, clearCart } = usePosCartStore();

  const branchId = "branch-1"; // TODO: Get from config

  useEffect(() => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setChange(amountPaid - total);
  }, [amountPaid, total]);

  const handleBarcodeScan = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && barcode.trim() !== '') {
      const product = await posCheckout.getProductByBarcode(barcode.trim(), branchId);
      if (product) {
        addItem({
          productId: product.product_id,
          name: product.name,
          batchId: product.batch_id,
          expiryDate: product.expiry_date,
          sellPrice: product.sell_price,
          availableQty: product.batch_qty,
        });
        setBarcode('');
      } else {
        alert('Produto não encontrado ou sem stock ativo.');
      }
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }
    if (amountPaid < total) {
      alert('Valor pago insuficiente.');
      return;
    }

    const saleItems = items.map(item => ({
      id: uuidv4(),
      batch_id: item.batchId,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      subtotal: item.subtotal,
    }));

    const result = await posCheckout.checkout({
      branchId,
      paymentMethod,
      total,
      items: saleItems,
    });

    if (result.success) {
      alert('Venda realizada com sucesso!');
      // @ts-ignore
      window.api.printReceipt({ branchName: "Farmácia Luri", address: "Rua Exemplo, 123", phone: "(XX) XXXX-XXXX", saleId: uuidv4(), operator: "Caixa 1", date: new Date().toLocaleString(), items: items, subtotal: total, tax: 0, total: total, amountPaid: amountPaid, change: change });
      clearCart();
      setAmountPaid(0);
      setIsCheckoutModalOpen(false);
    } else {
      alert(`Erro ao finalizar venda: ${result.error}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Painel Esquerdo: Carrinho e Input de Barcode */}
      <div className="w-2/3 p-4 flex flex-col">
        <div className="flex-grow bg-white rounded shadow p-4 mb-4">
          <h2 className="text-xl font-bold mb-4">Carrinho de Compras</h2>
          <div className="overflow-y-auto h-3/4">
            {items.length === 0 ? (
              <p>Carrinho vazio.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Unit.</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name} ({item.expiryDate})</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
                          className="w-16 border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">R$ {item.unitPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">R$ {item.subtotal.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-900">Remover</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="bg-white rounded shadow p-4">
          <input
            type="text"
            ref={barcodeInputRef}
            className="w-full p-2 border border-gray-300 rounded-md text-lg"
            placeholder="Ler código de barras ou digitar produto..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            onKeyDown={handleBarcodeScan}
          />
        </div>
      </div>

      {/* Painel Direito: Resumo da Venda e Pagamento */}
      <div className="w-1/3 p-4 flex flex-col bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Resumo da Venda</h2>
        <div className="flex justify-between text-lg mb-2">
          <span>Total:</span>
          <span className="font-bold">R$ {total.toFixed(2)}</span>
        </div>

        <div className="mt-4">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Método de Pagamento</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartao">Cartão</option>
            <option value="Pix">Pix</option>
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="amountPaid" className="block text-sm font-medium text-gray-700">Valor Pago</label>
          <input
            type="number"
            id="amountPaid"
            value={amountPaid}
            onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            step="0.01"
          />
        </div>

        <div className="flex justify-between text-xl mt-4 font-bold">
          <span>Troco:</span>
          <span>R$ {change.toFixed(2)}</span>
        </div>

        <button
          onClick={() => setIsCheckoutModalOpen(true)}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md text-lg"
        >
          Finalizar Venda (F2)
        </button>

        {/* Checkout Modal */}
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Confirmar Venda</h3>
              <p className="text-lg mb-2">Total: <span className="font-bold">R$ {total.toFixed(2)}</span></p>
              <p className="text-lg mb-2">Valor Pago: <span className="font-bold">R$ {amountPaid.toFixed(2)}</span></p>
              <p className="text-lg mb-4">Troco: <span className="font-bold">R$ {change.toFixed(2)}</span></p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default POSPage;
