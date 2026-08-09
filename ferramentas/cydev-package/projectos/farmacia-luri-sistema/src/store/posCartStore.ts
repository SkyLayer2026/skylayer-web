import { create } from 'zustand';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  batchId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  branchId: string;
  addItem: (item: Omit<CartItem, 'quantity' | 'subtotal' | 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  branchId: 'branch-1',
  addItem: ({ productId, productName, batchId, unitPrice }) => {
    const items = [...get().items];
    const existing = items.find(i => i.batchId === batchId);
    if (existing) {
      existing.quantity += 1;
      existing.subtotal = existing.quantity * existing.unitPrice;
    } else {
      items.push({ id: crypto.randomUUID(), productId, productName, batchId, quantity: 1, unitPrice, subtotal: unitPrice });
    }
    set({ items, total: items.reduce((s, i) => s + i.subtotal, 0) });
  },
  removeItem: (id) => {
    const items = get().items.filter(i => i.id !== id);
    set({ items, total: items.reduce((s, i) => s + i.subtotal, 0) });
  },
  updateQuantity: (id, qty) => {
    if (qty < 1) return get().removeItem(id);
    const items = get().items.map(i => i.id === id ? { ...i, quantity: qty, subtotal: i.unitPrice * qty } : i);
    set({ items, total: items.reduce((s, i) => s + i.subtotal, 0) });
  },
  clearCart: () => set({ items: [], total: 0 })
}));