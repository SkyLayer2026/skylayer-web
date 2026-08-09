import { DetailedProfitReport, SalesData, AlertData, SyncStatus } from "../types/dashboard";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const dashboardApi = {
  getKPICards: async (): Promise<any[]> => {
    // Mock data for now, replace with actual API call
    return [
      { title: "Vendas Hoje", value: "R$ 1.200,00", change: "+10%", changeType: "increase" },
      { title: "Lucro Estimado", value: "R$ 350,00", change: "+5%", changeType: "increase" },
      { title: "Stock Crítico", value: "15 itens", change: "-2", changeType: "decrease" },
    ];
  },

  getSalesComparison: async (): Promise<SalesData[]> => {
    // Mock data for now, replace with actual API call
    return [
      { name: "Jan", sede: 4000, filial: 2400 },
      { name: "Fev", sede: 3000, filial: 1398 },
      { name: "Mar", sede: 2000, filial: 9800 },
      { name: "Abr", sede: 2780, filial: 3908 },
      { name: "Mai", sede: 1890, filial: 4800 },
      { name: "Jun", sede: 2390, filial: 3800 },
    ];
  },

  getAlerts: async (): Promise<AlertData[]> => {
    // Mock data for now, replace with actual API call
    return [
      { id: "1", type: "expiring_7d", severity: "critical", title: "Lote Próximo ao Vencimento", message: "Paracetamol (Lote 123) vence em 7 dias.", status: "active" },
      { id: "2", type: "low_stock", severity: "warning", title: "Stock Baixo", message: "Dipirona está com estoque abaixo do mínimo.", status: "active" },
    ];
  },

  getSyncStatus: async (): Promise<SyncStatus[]> => {
    // Mock data for now, replace with actual API call
    return [
      { branchId: "branch-1", lastSync: "2024-05-07T10:00:00Z", pendingOperations: 5, status: "pending" },
      { branchId: "branch-2", lastSync: "2024-05-07T10:05:00Z", pendingOperations: 0, status: "synced" },
    ];
  },

  getDetailedProfitReport: async (startDate: string, endDate: string): Promise<DetailedProfitReport> => {
    // Mock data for now, replace with actual API call
    console.log(`Fetching detailed profit report for ${startDate} to ${endDate}`);
    return {
      period: `${startDate} to ${endDate}`,
      totalSales: 15000,
      totalCost: 8000,
      grossProfit: 7000,
      lossByExpiry: 200,
      lossByDamage: 50,
      netProfit: 6750,
      profitMargin: 0.45,
      averageCostPrice: 10.00,
      averageSellPrice: 18.00,
      productProfits: [
        { productId: "prod1", productName: "Paracetamol", salesCount: 100, grossProfit: 500, netProfit: 480 },
        { productId: "prod2", productName: "Dipirona", salesCount: 80, grossProfit: 400, netProfit: 390 },
      ],
    };
  },
};
