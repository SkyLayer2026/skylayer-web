# Base de Dados Comercial — SLGrid Tech

## Estrutura

```
database/
├── empresas_maputo.csv      (100 registos)
├── empresas_matola.csv      (50 registos)
├── empresas_beira.csv       (50 registos)
├── empresas_nampula.csv     (50 registos)
├── empresas_completo.csv    (250 registos — consolidado)
├── templates/
│   ├── email_prospeccao.md
│   ├── proposta_comercial.md
│   ├── script_chamada.md
│   └── follow_up_calendario.md
├── solucoes/
│   ├── pacote_escritorio.md
│   ├── pacote_escola.md
│   ├── pacote_hotel.md
│   └── contrato_manutencao.md
├── gerar_emails.py
└── README.md
```

## Como usar

### 1. Base de dados comercial

Os ficheiros CSV contêm 250 empresas fictícias realistas para:

- **Treino da equipa comercial**
- **Modelo para registar prospeitos reais**
- **Testes de mail merge**

**Campos:** id, nome, contacto, email, area_actividade, quantidade_pcs, cidade, bairro, tipo_cliente

### 2. Gerar emails personalizados

```bash
python3 gerar_emails.py                        # Todos os 250 emails
python3 gerar_emails.py --cidade Maputo         # Apenas Maputo (100)
python3 gerar_emails.py --setor Hotelaria       # Apenas hotéis
python3 gerar_emails.py --formato html          # Em formato HTML
python3 gerar_emails.py --output minhas_empresas
```

Os emails serão gerados na pasta `emails_gerados/` (ou a que escolher).

### 3. Mail Merge no Gmail

1. Abra o ficheiro consolidado: `emails_gerados/todos_emails_*.txt`
2. Use a extensão **Mail Merge** no Google Sheets
3. Importe o CSV `empresas_completo.csv` como base
4. Cole o template de email e personalize

### 4. Ciclo de Follow-up

Siga o calendário em `templates/follow_up_calendario.md`:

| Semana | Ação |
|--------|------|
| 1 | Chamada + envio proposta |
| 2 | Follow-up por email |
| 3 | Última tentativa / arquivar |

## Notas

- Os dados são **fictícios** — criados para treino e modelo
- Substitua pelos dados reais dos seus prospeitos
- O script Python requer Python 3.6+
