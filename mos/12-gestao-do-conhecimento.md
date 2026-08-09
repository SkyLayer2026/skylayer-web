# 12. Gestão do Conhecimento

## Regra

> Todo problema resolvido deve gerar conhecimento reutilizável.

## Formatos de conhecimento

| Formato | Exemplo |
|---|---|
| Templates | Estrutura de projeto, proposta, contrato |
| Guias | Como configurar domínio, como entregar um projeto |
| Procedimentos | Passo a passo de tarefas repetitivas |
| Checklists | Entrega, lançamento, revisão |
| Código reutilizável | Snippets, componentes, autenticação, dashboards, formulários |
| Documentação | Manuais de projeto, FAQ, tutoriais, playbooks |

## Biblioteca Skylayer

| Área | Conteúdos | Local |
|---|---|---|
| Comercial | Propostas, contratos, apresentações | `empresa/contratos/`, `empresa/marketing/` |
| Design | Componentes, ícones, cores | `clientes/slsites/`, `ferramentas/slgrid/` |
| Desenvolvimento | Autenticação, dashboards, login, formulários | `ferramentas/`, `legado/` |
| Marketing | Posts, artigos, e-mails | `web/src/data/posts.js` (blog 23 artigos) |
| Histórico | Site v5, zips de entregas, backup, marca antiga | `legado/` |

> O objetivo é nunca começar um projeto do zero.

> A biblioteca vive em `~/skylayer/` (junto do MOS); o histórico completo anterior à fundação está em `legado/`.

## Processo

1. Problema resolvido → anotar a solução.
2. Transformar em formato reutilizável (snippet, guia, template).
3. Guardar na pasta certa da biblioteca.
4. Referenciar no MOS se aplicar.
5. Registar no changelog.

## Regras

- Conhecimento sem local definido não existe.
- O MOS aponta para a biblioteca; a biblioteca vive no repositório junto do código.
- Apenas conhecimento testado (usado em pelo menos 1 projeto real) entra como padrão.
