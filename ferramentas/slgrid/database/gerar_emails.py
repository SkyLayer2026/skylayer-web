#!/usr/bin/env python3
"""
Gerador de Emails Personalizados — SLGrid Tech
================================================
Lê o CSV de empresas e gera emails de prospeção personalizados
para cada empresa, combinando com o template desejado.

Uso:
    python3 gerar_emails.py                             # Gera todos os emails
    python3 gerar_emails.py --cidade Maputo              # Apenas Maputo
    python3 gerar_emails.py --setor Hotelaria            # Apenas hotéis
    python3 gerar_emails.py --output pasta_emails        # Pasta de saída
    python3 gerar_emails.py --formato txt                # Formato: txt ou html
"""

import csv, os, argparse
from datetime import datetime

TEMPLATE_EMAIL = """\
Para: {email}
Assunto: Soluções em TI para {nome_empresa}

Olá,

A SLGrid Tech é uma empresa moçambicana especializada no fornecimento de equipamentos tecnológicos e soluções em TI.

Sabemos que a {nome_empresa} ({area}) em {cidade} utiliza equipamentos informáticos, por isso gostaríamos de apresentar as nossas soluções:

✔ Computadores e Laptops (Dell, HP, Lenovo)
✔ Impressoras (HP, Epson, Canon)
✔ UPS e Proteção Elétrica (APC, Eaton)
✔ Redes Wi-Fi e Cablagem (TP-Link, MikroTik)
✔ Contratos de Manutenção

Podemos preparar uma proposta personalizada para a {nome_empresa}.

Agendamos uma breve chamada?

Atenciosamente,
[Seu Nome]
SLGrid Tech
+258 84 000 0000 | info@slgridtech.co.mz
"""

def carregar_empresas(caminho_csv):
    empresas = []
    with open(caminho_csv, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            empresas.append(row)
    return empresas

def gerar_email(empresa):
    return TEMPLATE_EMAIL.format(
        nome_empresa=empresa['nome'],
        email=empresa['email'],
        area=empresa['area_actividade'],
        cidade=empresa['cidade'],
        bairro=empresa['bairro'],
        pcs=empresa['quantidade_pcs'],
        tipo=empresa['tipo_cliente']
    )

def main():
    parser = argparse.ArgumentParser(description='Gerar emails personalizados de prospeção')
    parser.add_argument('--cidade', '-c', help='Filtrar por cidade')
    parser.add_argument('--setor', '-s', help='Filtrar por setor/área de atividade')
    parser.add_argument('--output', '-o', default='emails_gerados', help='Pasta de saída')
    parser.add_argument('--formato', '-f', choices=['txt', 'html'], default='txt', help='Formato de saída')
    parser.add_argument('--csv', default='empresas_completo.csv', help='Caminho do CSV')

    args = parser.parse_args()

    # Carregar empresas
    empresas = carregar_empresas(args.csv)

    # Aplicar filtros
    if args.cidade:
        empresas = [e for e in empresas if e['cidade'].lower() == args.cidade.lower()]
        print(f"Filtrado por cidade '{args.cidade}': {len(empresas)} empresas")
    if args.setor:
        empresas = [e for e in empresas if args.setor.lower() in e['area_actividade'].lower()]
        print(f"Filtrado por setor '{args.setor}': {len(empresas)} empresas")

    if not empresas:
        print("Nenhuma empresa encontrada com os filtros indicados.")
        return

    # Criar pasta de saída
    os.makedirs(args.output, exist_ok=True)

    # Gerar emails
    timestamp = datetime.now().strftime("%Y%m%d_%H%M")
    for i, empresa in enumerate(empresas, 1):
        email_content = gerar_email(empresa)
        ext = args.formato
        id_ = empresa['id']
        filename = f"{args.output}/{id_}_{empresa['nome'][:20].strip().replace(' ', '_')}.{ext}"

        with open(filename, 'w', encoding='utf-8') as f:
            f.write(email_content)

        print(f"  [{i}/{len(empresas)}] {filename}")

    # Gerar arquivo consolidado
    consolidado = f"{args.output}/todos_emails_{timestamp}.{args.formato}"
    with open(consolidado, 'w', encoding='utf-8') as f:
        for empresa in empresas:
            f.write(gerar_email(empresa))
            f.write("\n" + "="*50 + "\n\n")

    print(f"\n✓ {len(empresas)} emails gerados em '{args.output}/'")
    print(f"✓ Consolidado: {consolidado}")
    print(f"\nDica: Use mail merge no Gmail com {args.output}/todos_emails_{timestamp}.txt")

if __name__ == '__main__':
    main()
