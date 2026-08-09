import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface ProductInCart {
  id: string;
  productId: string;
  name: string;
  batchId: string;
  expiryDate: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

interface PosCartState {
  items: ProductInCart[];
  total: number;
  addItem: (product: { productId: string; name: string; batchId: string; expiryDate: string; sellPrice: number; availableQty: number }) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const usePosCartStore = create<PosCartState>((set, get) => ({
  items: [],
  total: 0,

  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.batchId === product.batchId);
      let updatedItems;

      if (existingItem) {
        // Check if adding one more exceeds available quantity
        if (existingItem.quantity + 1 > product.availableQty) {
          alert(`Quantidade máxima disponível para ${product.name} (${product.expiryDate}) é ${product.availableQty}`);
          return state; // Do not update state if quantity exceeds available
        }
        updatedItems = state.items.map((item) =>
          item.batchId === product.batchId
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.unitPrice }
            : item
        );
      } else {
        if (1 > product.availableQty) {
          alert(`Quantidade máxima disponível para ${product.name} (${product.expiryDate}) é ${product.availableQty}`);
          return state; // Do not add if initial quantity exceeds available
        }
        updatedItems = [
          ...state.items,
          {
            id: uuidv4(),
            productId: product.productId,
            name: product.name,
            batchId: product.batchId,
            expiryDate: product.expiryDate,
            unitPrice: product.sellPrice,
            quantity: 1,
            subtotal: product.sellPrice,
          },
        ];
      }

      const newTotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);
      return { items: updatedItems, total: newTotal };
    });
  },

  removeItem: (itemId) => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== itemId);
      const newTotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);
      return { items: updatedItems, total: newTotal };
    });
  },

  updateItemQuantity: (itemId, quantity) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === itemId ? { ...item, quantity, subtotal: quantity * item.unitPrice } : item
      );
      const newTotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);
      return { items: updatedItems, total: newTotal };
    });
  },

  clearCart: () => set({ items: [], total: 0 }),
}));
