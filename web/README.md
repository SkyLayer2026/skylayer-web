# Skylayer — Website

Website institucional + landing pages por serviço.

## Stack

- Vite + React 18 + React Router
- Tailwind CSS v4
- Lucide (ícones)
- 100% estático — pronto para hospedagem gratuita (GitHub Pages, Netlify, Vercel, etc.)

## Estrutura

```
src/
├── config.js              ← CONTACTOS: editar aqui (WhatsApp, e-mail, redes)
├── data/services.js       ← Dados de todos os serviços e landing pages
├── components/            ← Header, Footer, ContactForm
└── pages/
    ├── Home.jsx           ← Página inicial
    ├── Services.jsx       ← Índice de serviços
    ├── ServiceLanding.jsx ← Template único de landing page por serviço
    ├── Portfolio.jsx      ← Portfólio (espaços reservados)
    ├── Diagnostico.jsx    ← Lead magnet: diagnóstico gratuito
    ├── Contact.jsx        ← Página de contacto
    └── NotFound.jsx
```

## Primeira configuração (obrigatória)

1. Abrir `src/config.js` e substituir:
   - `whatsappNumber` — número real (código do país + número, sem `+` e sem espaços)
   - `email` — e-mail profissional
   - `social` — links reais das redes
2. `npm run dev` para desenvolver.
3. `npm run build` → pasta `dist/` pronta a publicar.

## Landing pages

Uma por serviço, geridas a partir de `src/data/services.js`:

| Rota | Serviço |
|---|---|
| `/servicos/sites` | Criação de sites profissionais |
| `/servicos/sistemas` | Sistemas de gestão interna |
| `/servicos/identidade` | Identidade visual |
| `/servicos/manutencao` | Manutenção e suporte |
| `/servicos/consultoria` | Consultoria em transformação digital |
| `/diagnostico` | Diagnóstico gratuito (lead magnet) |

Para adicionar um serviço novo: criar o objeto em `services.js` seguindo o mesmo formato e a rota é criada automaticamente.

## Formulários

Os formulários não têm backend: abrem o WhatsApp com a mensagem pronta. Simples, sem custos e adequado ao público-alvo. Substituir por backend/email quando fizer sentido.

## Deploy

```bash
npm run build
# publicar a pasta dist/ em qualquer hospedagem estática
```

Nota: com BrowserRouter, configurar o redirecionamento de rotas para `index.html` (SPA fallback) na hospedagem.
