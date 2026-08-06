# 14. Segurança

## Regras gerais

1. **Senhas:** únicas por serviço, geridas com gestor de senhas (ex: Bitwarden).
2. **MFA:** ativado em tudo o que suportar (GitHub, e-mail, painéis, servidores).
3. **Permissões:** mínimo necessário — contas só acedem ao que precisam.
4. **Acesso:** chaves SSH em vez de senhas em servidores; senhas nunca no código.
5. **Segredos:** domínio, API keys, tokens e credenciais vivem em variáveis de ambiente, nunca no repositório.
6. **Dispositivos:** ecrã bloqueado, atualizações em dia.

## Backups

| O quê | Frequência | Onde |
|---|---|---|
| Código (GitHub) | Cada commit | GitHub (remoto) |
| Bases de dados de clientes | Diária | Backup local + remoto |
| Documentos (MOS, biblioteca) | Cada alteração | Git + remoto |
| Configurações de servidor | Sempre que mudar | Ficheiro documentado |

## Regra de ouro

> Antes de qualquer entrega: backup existente, verificado, em local diferente do original.

## Incidentes

- Qualquer suspeita de violação é comunicada ao cliente afetado e corrigida no dia.
- O incidente vira conhecimento: regista-se o que aconteceu, como se corrigiu e como se evita.
