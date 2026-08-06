# 13. Sistema de IA

> Praticamente um departamento inteiro. Todos os agentes trabalham sobre a mesma base de conhecimento (MOS + biblioteca).

## Modelo comum de agente

| Campo | Descrição |
|---|---|
| Nome | Identificação (ex: SL Strategy) |
| Objetivo | O que o agente faz |
| Entradas | Que informações recebe |
| Saídas | Que tipo de resultado entrega |
| Limites | O que não pode fazer |
| Responsável | Sempre um humano |

## Agentes

### SL Strategy
- **Objetivo:** planeamento estratégico, análise de decisões, revisão de rumo.
- **Entradas:** dados financeiros, KPIs, contexto de mercado, perguntas.
- **Saídas:** análises, cenários, recomendações fundamentadas.
- **Limites:** não decide; não define valores finais; não contacta clientes.

### SL Comercial
- **Objetivo:** apoio ao CRM, prospecção, rascunhos de propostas e e-mails.
- **Entradas:** perfis de leads, histórico, templates comerciais.
- **Saídas:** rascunhos de mensagens, propostas, resumos de negociação.
- **Limites:** não envia nada; não negocia; não promete condições.

### SL Marketing
- **Objetivo:** campanhas, blog, LinkedIn, anúncios.
- **Entradas:** oferta, público, templates de conteúdo, resultados.
- **Saídas:** artigos, posts, textos de anúncio, calendário.
- **Limites:** não publica sem revisão; não define orçamentos sozinho.

### SL Técnico
- **Objetivo:** código, documentação técnica, revisão de código.
- **Entradas:** requisitos, padrões técnicos (cap. 7), biblioteca.
- **Saídas:** código, documentação, sugestões de arquitetura.
- **Limites:** não faz deploy em produção sem aprovação.

### SL Pesquisa
- **Objetivo:** concorrência, tendências, tecnologias.
- **Entradas:** temas, mercado, fontes.
- **Saídas:** relatórios com fontes.
- **Limites:** não decide tecnologia; relatórios são recomendações.

### SL QA
- **Objetivo:** testes, qualidade, auditoria.
- **Entradas:** projetos, checklists de qualidade (cap. 6).
- **Saídas:** relatórios de teste, bugs, parecer de qualidade.
- **Limites:** não aprova entregas sozinho — aprovação final é humana.

## Regras do sistema de IA

1. **Tudo passa por revisão humana** antes de ir a clientes ou produção.
2. Agentes partilham a mesma base de conhecimento.
3. Toda decisão crítica fica registada (quem decidiu, com base em quê).
4. Melhorias nos agentes são documentadas no changelog.
