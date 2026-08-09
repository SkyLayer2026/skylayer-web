export interface BranchKPI {
  branchId: string;
  branchName: string;
  todaySales: number;
  estimatedProfit: number;
  lowStockCount: number;
  expiringSoonCount: number;
  expiredCount: number;
  syncStatus: "online" | "syncing" | "offline" | "error";
  lastSync: string;
}

export interface DailySales {
  date: string;
  branch1: number;
  branch2: number;
}

export interface TopProduct {
  name: string;
  category: string;
  qtySold: number;
  revenue: number;
}

export interface DashboardData {
  branches: BranchKPI[];
  dailySales: DailySales[];
  topProducts: TopProduct[];
}