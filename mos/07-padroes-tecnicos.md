# 7. Padrões Técnicos

## Código

- Nomenclatura clara e consistente (ex: camelCase em JS/TS, kebab-case em ficheiros).
- Organização por função/domínio, não por tipo de ficheiro.
- Comentários apenas quando explicam o "porquê", nunca o "o quê".
- Estrutura padrão de projeto definida em `12-gestao-do-conhecimento.md` (templates).

## Frontend

- Responsivo (telemóvel → desktop) — obrigatório em tudo.
- Acessibilidade básica (alt em imagens, contraste, navegação por teclado).
- Desempenho: tempos de carregamento alvo < 3s em ligação móvel.
- Tailwind CSS como base de estilos; componentes reutilizados da biblioteca.

## Backend

- Autenticação segura (senhas com hash, sessões/MFA quando aplicável).
- Validação de entradas em todas as API.
- Logs de erros e ações importantes.
- Sem segredos no código (variáveis de ambiente).

## Banco de Dados

- Nomenclatura: `snake_case`, tabelas no plural.
- Índices nos campos usados em consultas frequentes.
- Backups automatizados (ver `14-seguranca.md`).

## Git

- Commits pequenos e descritivos, no idioma do projeto.
- `main` é sempre uma versão estável e funcional.
- Nada é entregue sem estar commitado e com `README` atualizado.
