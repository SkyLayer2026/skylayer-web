import type { DashboardData } from '../types/dashboard';

// 🔹 Substitua por chamada real à sua API central (Node.js/PostgreSQL)
export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulação de delay de rede
  await new Promise(res => setTimeout(res, 800));

  return {
    branches: [
      { branchId: 'branch-1', branchName: 'Farmácia Luri - Sede', todaySales: 18450.00, estimatedProfit: 4210.50, lowStockCount: 14, expiringSoonCount: 6, expiredCount: 1, syncStatus: 'online', lastSync: new Date().toISOString() },
      { branchId: 'branch-2', branchName: 'Farmácia Luri - Filial', todaySales: 11230.00, estimatedProfit: 2580.00, lowStockCount: 9, expiringSoonCount: 3, expiredCount: 0, syncStatus: 'syncing', lastSync: new Date(Date.now() - 300000).toISOString() }
    ],
    dailySales: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }),
      branch1: Math.floor(Math.random() * 5000) + 10000,
      branch2: Math.floor(Math.random() * 4000) + 7000
    })),
    topProducts: [
      { name: 'Paracetamol 500mg', category: 'Analgésicos', qtySold: 142, revenue: 2840.00 },
      { name: 'Amoxicilina 500mg', category: 'Antibióticos', qtySold: 89, revenue: 3560.00 },
      { name: 'Vitamina C 1g', category: 'Suplementos', qtySold: 115, revenue: 1725.00 },
      { name: 'Álcool 70%', category: 'Higiene', qtySold: 210, revenue: 840.00 }
    ]
  };
};