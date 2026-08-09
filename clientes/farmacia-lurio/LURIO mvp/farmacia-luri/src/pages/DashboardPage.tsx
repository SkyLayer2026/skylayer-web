import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../services/dashboardApi';
import { KPICardProps, SalesData, AlertData, SyncStatus } from '../types/dashboard';
import KPICards from '../components/Dashboard/KPICards';
import SalesComparisonChart from '../components/Dashboard/SalesComparisonChart';
import AlertsTable from '../components/Dashboard/AlertsTable';
import SyncStatusBadge from '../components/Dashboard/SyncStatusBadge';

const DashboardPage: React.FC = () => {
  const [kpis, setKpis] = useState<KPICardProps[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [syncStatus, setSyncStatus] = useState<SyncStatus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setKpis(await dashboardApi.getKPICards());
      setSalesData(await dashboardApi.getSalesComparison());
      setAlerts(await dashboardApi.getAlerts());
      setSyncStatus(await dashboardApi.getSyncStatus());
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Farmácia Luri</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {kpis.map((kpi, index) => (
          <KPICards key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Comparativo de Vendas (Sede vs Filial)</h2>
          <SalesComparisonChart data={salesData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Alertas e Notificações</h2>
          <AlertsTable alerts={alerts} />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Status de Sincronização</h2>
        <div className="flex gap-4">
          {syncStatus.map((status, index) => (
            <SyncStatusBadge key={index} {...status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
