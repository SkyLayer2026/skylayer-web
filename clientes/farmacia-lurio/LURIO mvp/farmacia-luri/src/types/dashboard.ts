export interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
}

export interface SalesData {
  name: string;
  sede: number;
  filial: number;
}

export interface AlertData {
  id: string;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  status: 'active' | 'acknowledged';
}

export interface SyncStatus {
  branchId: string;
  lastSync: string;
  pendingOperations: number;
  status: 'synced' | 'pending' | 'error';
}

export interface DetailedProfitReport {
  period: string;
  totalSales: number;
  totalCost: number;
  grossProfit: number;
  lossByExpiry: number;
  lossByDamage: number;
  netProfit: number;
  profitMargin: number;
  averageCostPrice: number;
  averageSellPrice: number;
  productProfits: Array<{
    productId: string;
    productName: string;
    salesCount: number;
    grossProfit: number;
    netProfit: number;
  }>;
}
