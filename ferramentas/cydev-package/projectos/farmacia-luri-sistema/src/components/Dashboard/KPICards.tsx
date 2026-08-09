import type { BranchKPI } from '../../types/dashboard';

export const KPICards = ({ branches }: { branches: BranchKPI[] }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
    {branches.map(b => (
      <div key={b.branchId} style={{ background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16, color: '#444' }}>{b.branchName}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <KPICard label="Vendas Hoje" value={`${b.todaySales.toFixed(0)} MT`} color="#1976d2" />
          <KPICard label="Lucro Estimado" value={`${b.estimatedProfit.toFixed(0)} MT`} color="#2e7d32" />
          <KPICard label="Stock Baixo" value={b.lowStockCount} color="#f57c00" />
          <KPICard label="Próx. Expirar" value={b.expiringSoonCount} color="#c62828" />
        </div>
      </div>
    ))}
  </div>
);

const KPICard = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div style={{ background: '#f8f9fa', padding: 12, borderRadius: 8, textAlign: 'center' }}>
    <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
  </div>
);