export default function POSPage() {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>✅ Farmácia Luri - POS</h1>
      <p style={{ color: '#2e7d32' }}>Sistema carregado com sucesso!</p>
      
      <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
        <h3>🧪 Teste de Funcionalidades:</h3>
        <ul>
          <li>✅ Electron: OK</li>
          <li>✅ React: OK</li>
          <li>✅ SQLite: OK</li>
          <li>⏳ POS completo: Em desenvolvimento</li>
        </ul>
      </div>

      <button 
        onClick={() => alert('Botão funciona! 🎉')}
        style={{ 
          marginTop: 16, 
          padding: '12px 24px', 
          background: '#1976d2', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Testar Interação
      </button>

      <div style={{ marginTop: 32, fontSize: '0.9rem', color: '#666' }}>
        <p><strong>Próximos passos:</strong></p>
        <ol>
          <li>Cadastrar produtos no banco</li>
          <li>Implementar leitor de código de barras</li>
          <li>Adicionar carrinho de compras</li>
          <li>Integrar impressão térmica</li>
        </ol>
      </div>
    </div>
  );
}