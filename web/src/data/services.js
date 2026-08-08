import {
  Globe,
  LayoutDashboard,
  Palette,
  Wrench,
  Compass,
  SearchCheck,
} from "lucide-react"

export const services = [
  {
    slug: "sites",
    name: "Criação de Sites Profissionais",
    shortName: "Sites",
    icon: Globe,
    tagline:
      "O seu site pronto a apresentar a sua empresa, atrair clientes e transmitir credibilidade.",
    price: "a partir de 7.000 MZN",
    priceNote: "Pagamento em 2 prestações: 50% no início e 50% na entrega.",
    pain: [
      "Não tem site, ou o site atual transmite pouca credibilidade e está desatualizado.",
      "Clientes e fornecedores procuram a sua empresa na internet e não a encontram, ou encontram informação errada.",
      "Perde oportunidades para concorrentes que já têm presença digital profissional.",
    ],
    includes: [
      "Página inicial + até 5 páginas (serviços, sobre, contactos, etc.)",
      "Design responsivo — funciona bem em telemóvel, tablet e desktop",
      "Formulário de contacto e botão de WhatsApp integrados",
      "SEO básico para ser encontrado no Google",
      "Carregamento rápido mesmo em ligações móveis",
      "Documentação e formação simples para gerir o site",
      "Período de suporte incluído após a entrega",
    ],
    excludes: [],
    steps: [
      ["Diagnóstico gratuito", "Conversa de 15–30 minutos para entender o seu objetivo e o seu público."],
      ["Proposta clara em 48h", "Escopo, prazo e valor por escrito, sem letra pequena."],
      ["Desenvolvimento em 1–3 semanas", "Acompanhamento por etapas até à aprovação."],
      ["Entrega com suporte", "Documentação, formação e suporte incluído após o lançamento."],
    ],
    faq: [
      {
        q: "Quanto tempo demora a criar o meu site?",
        a: "Entre 1 a 3 semanas, dependendo do número de páginas e do conteúdo. Definimos o prazo exato na proposta e informamo-lo por etapa.",
      },
      {
        q: "Preciso de comprar um domínio e hospedagem?",
        a: "Sim, e ajudamos em todo o processo. Recomendamos domínio e hospedagem adequados ao seu orçamento, sem forçar opções caras.",
      },
      {
        q: "Vou conseguir atualizar o site depois de entregue?",
        a: "Sim. Entregamos documentação e treino simples para alterar textos, imagens e notícias, e oferecemos planos de manutenção se preferir que fiquemos a cargo.",
      },
      {
        q: "Posso colocar o site no ar antes de pagar tudo?",
        a: "O site só é publicado após o pagamento da prestação final e da aprovação do trabalho concluído.",
      },
    ],
  },
  {
    slug: "sistemas",
    name: "Sistemas de Gestão Interna",
    shortName: "Sistemas",
    icon: LayoutDashboard,
    tagline:
      "Troque o WhatsApp, as planilhas e os cadernos por um sistema simples que organiza clientes, vendas e tarefas.",
    price: "sob proposta",
    priceNote: "Projeto + manutenção mensal. Valor definido após diagnóstico.",
    pain: [
      "Gestão de clientes e pedidos espalhada por mensagens, planilhas e memorização.",
      "Sem visão clara de quem deve, quem comprou, o que está pendente ou atrasado.",
      "Cada funcionário faz as coisas à sua maneira — dados espalhados e erros frequentes.",
    ],
    includes: [
      "Login seguro com contas por utilizador",
      "Gestão de clientes, contactos e histórico de interações",
      "Dashboard com indicadores do negócio",
      "Controlo de vendas, pagamentos e pendências",
      "Formulários ajustados ao seu processo",
      "Hospedagem, backups e monitorização incluídos",
      "Documentação e formação da equipa",
    ],
    steps: [
      ["Diagnóstico do processo atual", "Entendemos como trabalha hoje e onde estão as falhas."],
      ["Proposta e protótipo", "Mostramos o sistema antes de começar a construir."],
      ["Desenvolvimento em 3–8 semanas", "Entregas parciais para ir validando o resultado."],
      ["Entrega e treino", "A equipa formada com o sistema a funcionar."],
    ],
    faq: [
      {
        q: "Para que tipo de negócio serve?",
        a: "Lojas, serviços, vendas por atacado, clínicas, manutenção, entre outros. Se gere clientes e pagamentos sem prioridade, serve para si.",
      },
      {
        q: "Possui de computadores ou funciona no telemóvel?",
        a: "Desenvolvemos responsivo: funciona bem no computador, tablet e telemóvel.",
      },
      {
        q: "Os dados estão seguros?",
        a: "Sim. Acesso protegido, backups diários e ambiente adequado, sem segredos em concentração.",
      },
      {
        q: "Já tem sistema e este é caro?",
        a: "Alguns clientes usam coisas prontas que não se ajustam ao negócio. Criamos um sistema que se adapta ao seu processo, sem mensalidades enormes.",
      },
    ],
  },
  {
    slug: "identidade",
    name: "Identidade Visual",
    shortName: "Identidade",
    icon: Palette,
    tagline:
      "Logo, cores e tipografia que fazem a sua empresa parecer aquilo que ela realmente vale.",
    price: "sob proposta",
    priceNote: "Valor definido após diagnóstico de marca.",
    pain: [
      "A empresa transmite menos credibilidade do que merece no dia a dia.",
      "Materiais, rede social e embalagens sem consistência visual.",
      "Concorrentes com visual profissional atraem mais clientes com o mesmo trabalho.",
    ],
    includes: [
      "Logotipo principal + variações (fundo escuro, fundo claro, ícone)",
      "Paleta de cores própria da sua marca",
      "Tipografia (fontes) definidas para materiais e web",
      "Regras simples de uso (como aplicar o logo sem erros)",
      "Ficheiros prontos para impressão e redes sociais",
      "Envio em formatos utilizáveis (PNG, SVG, PDF)",
    ],
    steps: [
      ["Diagnóstico de marca", "Entendemos o seu negócio, público e diferenciais."],
      ["Propostas de conceito", "Apresentamos 2–3 direções visuais."],
      ["Refinamento", "Ajustes até ficar exatamente com a vossa cara."],
      ["Entrega do kit", "Todos os ficheiros e guia de uso."],
    ],
    faq: [],
  },
  {
    slug: "manutencao",
    name: "Manutenção e Suporte",
    shortName: "Manutenção",
    icon: Wrench,
    tagline:
      "O seu site ou sistema seguro, atualizado e a funcionar — todos os meses, sem sobressaltos.",
    price: "mensal, sob proposta",
    priceNote: "Plano mensal simples, sem surpresas.",
    pain: [
      "O site parece velhinho, tem ligações partidas ou demora a carregar.",
      "Medo de falhas, vírus ou perdas de dados sem apoio técnico.",
      "Sem ninguém responsável para quando algo correr mal.",
    ],
    includes: [
      "Atualizações de segurança e manutenção do site/sistema",
      "Backups regulares e verificados",
      "Monitorização simples de disponibilidade",
      "Correção de pequenos problemas e ajustes",
      "Apoio técnico por WhatsApp e e-mail",
      "Relatório mensal do que foi feito",
    ],
    steps: [
      ["Avaliação inicial", "Revisamos o estado atual do seu site ou sistema."],
      ["Plano de manutenção", "Escolha o nível de serviço adequado."],
      ["Manutenção mensal", "Cuidado contínuo e relatórios."],
      ["Suporte dedicado", "Contacto direto sempre que algo surgir."],
    ],
    faq: [],
  },
  {
    slug: "consultoria",
    name: "Consultoria em Transformação Digital",
    shortName: "Consultoria",
    icon: Compass,
    tagline:
      "Um plano prático para digitalizar o seu negócio, sem termos técnicos e sem complicações.",
    price: "por sessão, sob proposta",
    priceNote: "Sessões de análise e plano de ação.",
    pain: [
      "Tem muitas ideias digitais mas não sabe por onde começar.",
      "Investiu em ferramentas que ninguém usa.",
      "Precisa de um plano, não de mais tecnologia avulsa.",
    ],
    includes: [
      "Análise do estado digital atual do seu negócio",
      "Mapa das oportunidades com prioridades",
      "Plano de ação faseado e orçamento estimado",
      "Recomendações ajustadas à sua realidade",
      "Apoio à escolha de ferramentas e fornecedores",
      "Relatório final prático",
    ],
    steps: [
      ["Sessão de diagnóstico", "Analisamos o seu negócio e objetivos."],
      ["Plano de ação", "Prioridades e estimativas claras."],
      ["Execução guiada", "Acompanhamos os primeiros passos."],
    ],
    faq: [],
  },
]

export const diagnostico = {
  slug: "diagnostico",
  name: "Diagnóstico Gratuito da Presença Digital",
  icon: SearchCheck,
  tagline:
    "Descubra gratuitamente como a sua empresa pode melhorar a sua presença digital.",
  price: "Gratuito",
  includes: [
    "Análise do seu site, redes sociais e presença no Google",
    "O que está a funcionar bem e o que está a afastar clientes",
    "3 primeiras ações recomendadas, ordenadas por impacto",
    "Sugestões realistas ajustadas ao seu orçamento",
    "Sem compromisso — o relatório é seu, mesmo que não continue connosco",
  ],
  steps: [
    "1. Preencha o formulário com os contactos e o seu site/redes",
    "2. Analisamos a sua presença digital (3–5 dias úteis)",
    "3. Recebe o relatório por WhatsApp ou e-mail",
    "4. Só continua se quiser — a decisão é sua",
  ],
}

export const getService = (slug) => services.find((s) => s.slug === slug)