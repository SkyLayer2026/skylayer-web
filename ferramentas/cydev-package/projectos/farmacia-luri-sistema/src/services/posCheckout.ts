import { ipcRenderer } from 'electron';
import { useCartStore } from '../store/posCartStore';

export const posCheckout = {
  validateAndProcess: async (paymentMethod: string, amountPaid: number) => {
    const { items, total, branchId } = useCartStore.getState();
    if (items.length === 0) throw new Error('Carrinho vazio');

    const saleId = crypto.randomUUID();
    const result = await ipcRenderer.invoke('db:checkout', {
      saleId, branchId, paymentMethod, total, items
    });

    if (!result.success) throw new Error(result.error || 'Falha ao registrar venda');

    return { saleId, total, change: amountPaid - total };
  }
};