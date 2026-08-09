#!/usr/bin/env python3
"""Gera products.json com 700 produtos de marcas reais."""

import json, random

random.seed(42)

categories = [
    {
        "id": "redes",
        "name": "Redes e Infraestrutura",
        "brands": ["TP-Link", "MikroTik", "D-Link", "Huawei", "Cisco", "Ubiquiti", "Panduit", "CommScope"],
        "products": [
            ("Router", 3500, 18000), ("Switch", 2500, 45000), ("Access Point", 4000, 25000),
            ("Cabo Rede Cat6", 800, 3500), ("Cabo Fibra Óptica", 1500, 6000),
            ("Modem", 2000, 8000), ("Conversor Fibra", 3000, 9000),
            ("Painel de Patch", 1200, 5000), ("Repetidor WiFi", 2000, 7000),
            ("Gateway VoIP", 5000, 15000), ("Injector PoE", 1000, 4000),
            ("Rack Parede", 3000, 12000), ("Keystone Jack", 150, 500),
            ("Patch Cord", 200, 800), ("Módulo SFP", 800, 3000),
            ("Controlador WiFi", 8000, 30000), ("Bridge Wireless", 5000, 20000),
            ("Crimping Tool", 600, 2500), ("Teste de Cabo", 2000, 8000),
            ("Antena WiFi", 1500, 6000),
            ("Extensor WiFi", 1500, 5000), ("Switch PoE", 5000, 25000),
            ("Conversor Media", 2500, 8000), ("FacePlate", 200, 800),
            ("Mangueira Corrugada", 300, 2000), ("Organizador Cabo", 400, 1800),
            ("Bastidor Aberto", 4000, 20000), ("Patch Panel", 1500, 6000),
            ("Cabo Coaxial", 600, 3000), ("Ferramenta Impacto", 500, 2000)
        ]
    },
    {
        "id": "eletrico",
        "name": "Material Elétrico",
        "brands": ["APC", "Eaton", "Siemens", "Legrand", "Schneider", "Nexans", "ABB", "EnerSys"],
        "products": [
            ("UPS", 5000, 45000), ("Disjuntor", 300, 2000), ("Tomada", 100, 600),
            ("Cabo Elétrico 1.5mm", 1500, 5000), ("Cabo Elétrico 2.5mm", 2000, 6000),
            ("Cabo Elétrico 4mm", 3000, 8000), ("Quadro Elétrico", 1500, 8000),
            ("Interruptor", 100, 500), ("Fita Isolante", 80, 300),
            ("Calha Plástica", 200, 1500), ("DPS", 800, 3500),
            ("Contacto", 400, 2000), ("Ventilador Industrial", 3000, 12000),
            ("Estabilizador", 4000, 15000), ("Transformador", 2000, 10000),
            ("Relé Térmico", 500, 3000), ("Disjuntor Diferencial", 800, 3500),
            ("Caixa de Derivação", 100, 500), ("Eletroduto", 300, 2000),
            ("Alicate Desencapador", 300, 1500), ("Berço para Cabo", 500, 2500),
            ("Canaleta", 200, 1200), ("Tomada Industrial", 500, 2500),
            ("Sensor Presença", 400, 2000),             ("Mini UPS", 2000, 8000),
            ("Aterramento", 1500, 5000), ("Conector Rápido", 100, 400),
            ("Base Tomada", 80, 300), ("Espelho", 50, 250),
            ("Suporte Cabo", 200, 1000), ("Grampo", 50, 200),
            ("Fio Terra", 500, 2500), ("Bobina Cabo", 2000, 7000),
            ("Lâmpada LED Industrial", 500, 3000)
        ]
    },
    {
        "id": "eletronicos",
        "name": "Equipamentos Eletrónicos",
        "brands": ["Dell", "HP", "Lenovo", "Epson", "Canon", "Brother", "ASUS", "Samsung", "LG", "Acer"],
        "products": [
            ("Portátil", 25000, 85000), ("Desktop", 18000, 55000),
            ("Impressora Laser", 12000, 45000), ("Impressora Jato Tinta", 5000, 15000),
            ("Monitor", 8000, 35000), ("Fonte Alimentação", 500, 3000),
            ("Adaptador Universal", 300, 1500), ("Multímetro", 800, 5000),
            ("Osciloscópio", 8000, 35000), ("Ferro de Soldar", 400, 2500),
            ("Placa Arduino", 600, 3000), ("Raspberry Pi", 3000, 12000),
            ("Hub USB", 300, 1500), ("Teclado", 500, 3000),
            ("Rato", 300, 2000), ("Webcam", 1500, 8000),
            ("Microfone", 500, 4000), ("Auriculares", 800, 6000),
            ("Coluna Bluetooth", 1500, 10000), ("Power Bank", 800, 5000),
            ("Leitor de Cartões", 200, 1000), ("Disco Externo", 2500, 12000),
            ("Pen Drive", 200, 1500), ("Cartão SD", 300, 2000),
            ("Estação Meteorológica", 3000, 12000),
            ("Dock Station", 2000, 8000), ("Adaptador HDMI", 200, 1000),
            ("Cabo USB-C", 150, 800), ("Suporte Monitor", 1500, 6000),
            ("Base Refrigeração", 800, 3500), ("Filtro Linha", 600, 3000),
            ("GPU Externa", 15000, 50000), ("Placa Som", 2000, 8000),
            ("UPS Mini Eletrónicos", 1500, 6000)
        ]
    }
]

badges_opts = [None] * 85 + ["promocao"] * 10 + ["novo"] * 3 + ["mais_vendido"] * 2

def gerar():
    products = []
    pid = 1

    for cat in categories:
        for brand in cat["brands"]:
            for prod_name, price_min, price_max in cat["products"]:
                price = random.randint(price_min, price_max)
                has_old = random.random() < 0.3
                old_price = round(price * random.uniform(1.1, 1.35), -2) if has_old else None
                stock = random.random() < 0.85
                featured = random.random() < 0.15
                badge = random.choice(badges_opts)

                model = f"{brand.split()[0].upper()}-{random.randint(100, 9999)}"
                full_name = f"{brand} {prod_name} {model}"

                hex_color = random.choice(["1a3a5c","2d6a4f","e63946","0a1929","f47b20","0066cc"])
                img = f"https://placehold.co/400x400/{hex_color}/ffffff?text={prod_name.replace(' ','+')}"

                specs_count = random.randint(3, 5)
                specs = [f"Especificação {i+1}: {random.randint(100, 9999)}" for i in range(specs_count)]

                products.append({
                    "id": pid,
                    "name": full_name,
                    "brand": brand,
                    "category": cat["id"],
                    "price": float(price),
                    "oldPrice": float(old_price) if old_price else None,
                    "badge": badge,
                    "image": img,
                    "description": f"{prod_name} da marca {brand}, ideal para {cat['name'].lower()} profissionais.",
                    "specs": specs,
                    "stock": stock,
                    "featured": featured
                })
                pid += 1

    random.shuffle(products)
    # Re-assign sequential IDs after shuffle
    for i, p in enumerate(products, 1):
        p["id"] = i

    # Exactly 700
    products = products[:700]

    with open("data/products.json", "w") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    # Stats
    from collections import Counter
    cat_count = Counter(p["category"] for p in products)
    brand_count = Counter(p["brand"] for p in products)
    badge_count = Counter(b for b in [p["badge"] for p in products])
    stock_count = sum(1 for p in products if p["stock"])
    old_count = sum(1 for p in products if p["oldPrice"])

    print(f"Total: {len(products)} produtos")
    print(f"\nCategorias:")
    for c, n in cat_count.most_common():
        print(f"  {c}: {n}")
    print(f"\nMarcas ({len(brand_count)}):")
    for b, n in brand_count.most_common():
        print(f"  {b}: {n}")
    print(f"\nBadges: {dict(badge_count)}")
    print(f"Com stock: {stock_count}")
    print(f"Com desconto: {old_count}")
    print(f"Destaques: {sum(1 for p in products if p['featured'])}")

if __name__ == "__main__":
    gerar()
