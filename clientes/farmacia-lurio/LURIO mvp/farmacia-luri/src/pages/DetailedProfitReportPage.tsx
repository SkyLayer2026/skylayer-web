import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../services/dashboardApi';
import { DetailedProfitReport } from '../types/dashboard';

const DetailedProfitReportPage: React.FC = () => {
  const [report, setReport] = useState<DetailedProfitReport | null>(null);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');

  const fetchReport = async () => {
    const data = await dashboardApi.getDetailedProfitReport(startDate, endDate);
    setReport(data);
  };

  useEffect(() => {
    fetchReport();
  }, [startDate, endDate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Relatório de Lucro Detalhado</h1>

      <div className="flex gap-4 mb-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Data Início</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Data Fim</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      {report ? (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Período: {report.period}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div><strong>Vendas Totais:</strong> R$ {report.totalSales.toFixed(2)}</div>
            <div><strong>Custo Total:</strong> R$ {report.totalCost.toFixed(2)}</div>
            <div><strong>Lucro Bruto:</strong> R$ {report.grossProfit.toFixed(2)}</div>
            <div><strong>Perda por Vencimento:</strong> R$ {report.lossByExpiry.toFixed(2)}</div>
            <div><strong>Perda por Dano:</strong> R$ {report.lossByDamage.toFixed(2)}</div>
            <div><strong>Lucro Líquido:</strong> R$ {report.netProfit.toFixed(2)}</div>
            <div><strong>Margem de Lucro:</strong> {(report.profitMargin * 100).toFixed(2)}%</div>
            <div><strong>Preço Médio de Custo:</strong> R$ {report.averageCostPrice.toFixed(2)}</div>
            <div><strong>Preço Médio de Venda:</strong> R$ {report.averageSellPrice.toFixed(2)}</div>
          </div>

          <h3 className="text-lg font-semibold mb-2">Lucro por Produto:</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendas</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lucro Bruto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lucro Líquido</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {report.productProfits.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.salesCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">R$ {product.grossProfit.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">R$ {product.netProfit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Carregando relatório...</p>
      )}
    </div>
  );
};

export default DetailedProfitReportPage;
