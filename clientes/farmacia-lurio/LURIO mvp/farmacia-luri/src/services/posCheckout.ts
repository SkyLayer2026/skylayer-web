import { v4 as uuidv4 } from 'uuid';

interface SaleItem {
  id: string;
  batch_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

interface CheckoutData {
  branchId: string;
  paymentMethod: string;
  total: number;
  items: SaleItem[];
}

export const posCheckout = {
  checkout: async (data: CheckoutData) => {
    const saleId = uuidv4();
    try {
      // @ts-ignore
      const result = await window.api.checkout({
        saleId,
        branchId: data.branchId,
        paymentMethod: data.paymentMethod,
        total: data.total,
        items: data.items.map(item => ({
          id: uuidv4(), // Generate ID for each sale item
          batch_id: item.batch_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          subtotal: item.subtotal,
        })),
      });
      return result;
    } catch (error) {
      console.error("Erro no checkout:", error);
      return { success: false, error: "Erro ao finalizar a venda." };
    }
  },

  getProductByBarcode: async (barcode: string, branchId: string) => {
    try {
      // @ts-ignore
      const product = await window.api.getProductByBarcode(barcode, branchId);
      return product;
    } catch (error) {
      console.error("Erro ao buscar produto por código de barras:", error);
      return null;
    }
  },
};
