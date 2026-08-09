import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import DetailedProfitReportPage from './pages/DetailedProfitReportPage';
import POSPage from './components/POSPage';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold mb-6">Farmácia Luri</h1>
          <nav>
            <ul>
              <li className="mb-2">
                <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
              </li>
              <li className="mb-2">
                <Link to="/pos" className="block py-2 px-4 rounded hover:bg-gray-700">Ponto de Venda</Link>
              </li>
              <li className="mb-2">
                <Link to="/reports/profit" className="block py-2 px-4 rounded hover:bg-gray-700">Relatório de Lucro</Link>
              </li>
              {/* Adicionar mais links de navegação aqui */}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pos" element={<POSPage />} />
            <Route path="/reports/profit" element={<DetailedProfitReportPage />} />
            <Route path="/" element={<DashboardPage />} /> {/* Rota padrão */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
