# Manual do Operador - Sistema de Gestão Farmácia Luri

## 1. Introdução

Este manual tem como objetivo guiar os operadores da Farmácia Luri na utilização do novo Sistema de Gestão. O sistema foi desenvolvido para ser intuitivo e eficiente, garantindo o funcionamento contínuo mesmo em ambientes com internet instável, com foco em Ponto de Venda (POS), gestão de stock, controlo de validade e relatórios operacionais.

## 2. Ponto de Venda (POS)

O módulo de Ponto de Venda (POS) permite registar vendas de forma rápida e eficiente.

### 2.1. Iniciar uma Venda

1.  **Aceder ao POS:** No menu principal, clique em "Ponto de Venda".
2.  **Adicionar Produtos:**
    *   Utilize o leitor de código de barras para adicionar produtos rapidamente.
    *   Alternativamente, digite o nome ou código do produto no campo de pesquisa e selecione o item desejado na lista.
3.  **Quantidade:** Ajuste a quantidade de cada produto, se necessário.
4.  **Controlo de Validade:** O sistema emitirá alertas visuais e sonoros caso tente vender um produto com validade expirada ou próxima do vencimento. A venda de produtos expirados será bloqueada.

### 2.2. Finalizar uma Venda

1.  **Rever Carrinho:** Verifique todos os itens no carrinho e as quantidades.
2.  **Método de Pagamento:** Selecione o método de pagamento (Dinheiro, Cartão de Crédito, Débito, etc.).
3.  **Troco:** O sistema calculará automaticamente o troco, se aplicável.
4.  **Emissão de Recibo:** Após a confirmação do pagamento, o recibo será impresso automaticamente na impressora térmica.

## 3. Gestão de Produtos

Este módulo permite gerir o cadastro de produtos, lotes e preços.

### 3.1. Cadastro de Produtos

1.  **Aceder:** No menu, clique em "Gestão de Produtos" > "Produtos".
2.  **Adicionar Novo Produto:** Clique em "Novo Produto" e preencha os campos:
    *   Nome do Produto
    *   Categoria
    *   Preço de Custo
    *   Preço de Venda
    *   Código de Barras (se não for gerado automaticamente)
    *   Stock Mínimo (para alertas de stock baixo)
3.  **Editar Produto:** Selecione um produto existente na lista e clique em "Editar" para fazer alterações.

### 3.2. Gestão de Lotes e Validade

1.  **Aceder:** No menu, clique em "Gestão de Produtos" > "Lotes".
2.  **Adicionar Lote:** Para cada produto, adicione novos lotes informando:
    *   Produto associado
    *   Data de Validade
    *   Quantidade inicial
3.  **Monitorização:** O sistema monitoriza automaticamente as datas de validade, gerando alertas para produtos próximos do vencimento e bloqueando a venda de produtos expirados no POS.

## 4. Controlo de Stock

O sistema oferece controlo rigoroso do stock, com entradas, saídas automáticas e ajustes manuais.

### 4.1. Movimentação de Stock

*   **Entradas:** Registadas automaticamente na adição de novos lotes ou reposição.
*   **Saídas:** Registadas automaticamente após cada venda no POS.
*   **Ajustes Manuais:** Para correções de inventário, perdas ou devoluções, aceda a "Controlo de Stock" > "Ajustes" e registe a movimentação, indicando o motivo.

### 4.2. Alertas de Stock Baixo

O sistema emitirá alertas quando o stock de um produto atingir o nível mínimo definido no cadastro do produto. Estes alertas podem ser visualizados no Dashboard.

## 5. Relatórios Operacionais

O sistema gera relatórios para auxiliar na gestão e tomada de decisões.

### 5.1. Aceder a Relatórios

1.  **Dashboard:** Aceda ao "Dashboard" para uma visão geral de vendas diárias, lucro estimado e alertas.
2.  **Relatório de Lucro Detalhado:** No menu, clique em "Relatórios" > "Lucro Detalhado". Selecione o período desejado para visualizar:
    *   Vendas Totais
    *   Custo Total
    *   Lucro Bruto e Líquido
    *   Perdas por vencimento ou dano
    *   Lucro por produto

## 6. Funcionamento Offline e Sincronização

O sistema foi projetado para funcionar sem conexão à internet. Todas as operações realizadas offline são armazenadas localmente e sincronizadas automaticamente com o servidor central assim que a conexão é restabelecida.

*   **Indicador de Sincronização:** No Dashboard, verifique o "Status de Sincronização" para cada filial. Um status "Pendente" indica que há operações a serem sincronizadas.

## 7. Multi-Filial

Para farmácias com múltiplas unidades, o sistema permite a operação independente de cada filial e oferece um painel centralizado para comparação de desempenho e gestão consolidada.

*   **Seleção de Filial:** A configuração da filial é feita no arquivo `config.json` do Electron. Certifique-se de que cada unidade tem o seu `branchId` e `branchName` corretos.

## 8. Backup e Segurança

O sistema realiza backups automáticos locais. Recomenda-se também a exportação manual de dados periodicamente para maior segurança.

*   **Backup:** Os backups locais são armazenados na pasta de dados do utilizador do Electron. Consulte o administrador do sistema para detalhes sobre a localização e frequência.

## 9. Suporte Técnico

Em caso de dúvidas ou problemas, contacte o suporte técnico da SkyLayer – Soluções Tecnológicas. Forneça o máximo de detalhes possível sobre o problema, incluindo mensagens de erro e os passos para reproduzi-lo.
