import { useState, useEffect } from 'react';
import { fetchDashboardData } from '../services/dashboardApi';
import type { DashboardData } from '../types/dashboard';
import { KPICards } from '../components/Dashboard/KPICards';
import { SalesComparisonChart } from '../components/Dashboard/SalesComparisonChart';
import { AlertsTable } from '../components/Dashboard/AlertsTable';
import { SyncStatusBadge } from '../components/Dashboard/SyncStatusBadge';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchDashboardData();
        setData(res);
      } catch (err) {
        setError('Falha ao carregar dados do painel');
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // Auto-refresh a cada 5 min quando online
    const interval = setInterval(() => navigator.onLine && loadData(), 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={styles.center}>🔄 Carregando painel central...</div>;
  if (error || !data) return <div style={styles.center}>⚠️ {error || 'Dados indisponíveis'}</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>📊 Painel Central – Farmácia Luri</h1>
        <div style={styles.headerMeta}>
          <span>Atualizado: {new Date().toLocaleTimeString('pt-PT')}</span>
          <SyncStatusBadge status="online" />
        </div>
      </header>

      <KPICards branches={data.branches} />
      
      <div style={styles.grid}>
        <SalesComparisonChart data={data.dailySales} />
        <AlertsTable branches={data.branches} />
      </div>

      <section style={styles.section}>
        <h2>📦 Top Produtos (Últimos 7 dias)</h2>
        <table style={styles.table}>
          <thead><tr><th>Produto</th><th>Categoria</th><th>Qtd Vendida</th><th>Receita</th></tr></thead>
          <tbody>
            {data.topProducts.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td><td>{p.category}</td><td>{p.qtySold}</td><td>{p.revenue.toFixed(2)} MT</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const styles = {
  container: { maxWidth: 1200, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  headerMeta: { display: 'flex', alignItems: 'center', gap: 16, fontSize: 14, color: '#666' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 },
  section: { background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: 12 },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', fontSize: 18, color: '#666' }
};