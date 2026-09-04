import {
  Globe,
  LayoutDashboard,
  Workflow,
  ServerCog,
  Puzzle,
  Compass,
  Wrench,
  FileText,
  Palette,
  GraduationCap,
  Sparkles,
  Activity,
  Network,
} from "lucide-react"

export const products = [
  {
    slug: "presence",
    code: "01",
    name: "SL Presence",
    stage: "Começar",
    short: "Presença digital profissional.",
    chips: ["Website", "Landing page", "Portfólio"],
    home: {
      phrase:
        "Transforme a presença da sua empresa numa plataforma que apresenta os serviços, gera confiança e facilita o contacto com clientes.",
      audience: "empresas sem presença digital profissional.",
      chipsLabel: "Inclui:",
      chips: ["Website", "Landing Pages", "Portfólio", "Contacto"],
    },

    title: "Presença digital profissional",
    icon: Globe,
    tagline:
      "Sites e páginas que apresentam o seu negócio com profissionalismo e transformam visitantes em clientes.",
    audience: "Para quem precisa de um site novo, de renovar o atual ou de páginas específicas para campanhas.",
    pain: [
      "Não tem site, ou o site atual transmite pouca credibilidade.",
      "Clientes procuram a sua empresa na internet e não a encontram.",
      "Perde oportunidades para concorrentes que já têm presença digital profissional.",
    ],
    includes: [
      "Página inicial + páginas internas (serviços, sobre, contactos)",
      "Design responsivo — telemóvel, tablet e desktop",
      "Formulários de contacto e ligação direta ao WhatsApp",
      "SEO básico para ser encontrado no Google",
      "Carregamento rápido em ligações móveis",
      "Documentação e orientação para gerir o site",
      "Período de suporte incluído após a entrega",
    ],
    steps: [
      ["Entendemos", "Diagnóstico da necessidade, público e objetivo."],
      ["Propomos", "Escopo, prazo e valor por escrito em até 48 horas."],
      ["Construímos", "Design, desenvolvimento e testes por etapas."],
      ["Entregamos", "Publicação, documentação e orientação de uso."],
    ],
    faq: [
      {
        q: "Quanto tempo demora a criar um site?",
        a: "Entre 1 a 3 semanas, dependendo do número de páginas. O prazo fica escrito na proposta e informamo-lo por etapa.",
      },
      {
        q: "Preciso de comprar domínio e hospedagem?",
        a: "Sim, e ajudamos em todo o processo. Recomendamos opções adequadas ao seu orçamento, sem forçar escolhas caras.",
      },
      {
        q: "Vou conseguir atualizar o site depois de entregue?",
        a: "Sim. Entregamos documentação e orientação simples, e oferecemos gestão de conteúdo se preferir que fiquemos a cargo.",
      },
    ],
  },
  {
    slug: "business-systems",
    code: "02",
    name: "SL Business Systems",
    stage: "Organizar",
    short: "Digitalizar a operação da empresa.",
    chips: ["Clientes", "Vendas", "Stock", "Dashboards"],
    home: {
      phrase:
        "Sistemas para centralizar clientes, projetos, vendas, inventário e outras operações.",
      audience: "empresas que ainda dependem de processos manuais.",
      chipsLabel: "Exemplos:",
      chips: ["CRM", "ERP", "Stock", "Projetos"],
    },

    title: "Sistemas digitais para empresas",
    icon: LayoutDashboard,
    tagline:
      "Sistemas sob medida para organizar clientes, vendas, stock e processos internos num só lugar.",
    audience: "Para empresas que ainda gerem tudo em papel, planilhas ou mensagens soltas.",
    pain: [
      "Informação de clientes e pedidos espalhada por mensagens e planilhas.",
      "Sem visão clara de pendências, pagamentos ou atrasos.",
      "Cada pessoa faz o processo à sua maneira — dados inconsistentes e erros frequentes.",
    ],
    includes: [
      "Acesso seguro por utilizador",
      "Gestão de clientes, contactos e histórico",
      "Dashboard com os indicadores do seu negócio",
      "Controlo de vendas, stock e pagamentos",
      "Formulários e fluxos ajustados ao seu processo",
      "Hospedagem, backups e monitorização incluídos",
      "Documentação e formação da equipa",
    ],
    steps: [
      ["Entendemos", "Análise do processo atual e identificação das falhas."],
      ["Propomos", "Proposta e protótipo antes de construir."],
      ["Construímos", "Desenvolvimento por etapas com validação regular."],
      ["Entregamos", "Formação da equipa e documentação completa."],
    ],
    faq: [
      {
        q: "Para que tipo de negócio serve?",
        a: "Lojas, serviços, revenda, manutenção, clínicas e outros. Se gere clientes e pagamentos sem sistema, serve para si.",
      },
      {
        q: "Funciona no telemóvel?",
        a: "Sim. Desenvolvemos para funcionar bem no computador, tablet e telemóvel.",
      },
      {
        q: "Os dados estão seguros?",
        a: "Sim. Acesso protegido, backups regulares e ambiente adequado.",
      },
    ],
  },
  {
    slug: "automation",
    code: "03",
    name: "SL Automation",
    stage: "Automatizar",
    short: "Reduzir o trabalho manual repetitivo.",
    chips: ["Integrações", "Notificações", "Relatórios"],
    home: {
      phrase:
        "Automatize tarefas e conecte ferramentas para reduzir trabalho manual e erros.",
      audience: "empresas com processos digitais que ainda executam tarefas manualmente.",
      chipsLabel: "Exemplos:",
      chips: ["Fluxos", "Relatórios", "Integrações", "Notificações"],
    },

    title: "Automação de processos",
    icon: Workflow,
    tagline:
      "Eliminamos tarefas repetitivas ligando as ferramentas que a sua empresa já usa.",
    audience: "Para empresas que perdem horas por semana em trabalho manual e repetitivo.",
    pain: [
      "Horas gastas a copiar informações entre ferramentas.",
      "Notificações, relatórios e confirmações feitas à mão.",
      "Erros humanos em tarefas repetitivas que poderiam ser automáticas.",
    ],
    includes: [
      "Mapeamento dos processos repetitivos do seu negócio",
      "Integração entre as ferramentas que já utiliza",
      "Notificações e relatórios automáticos",
      "Fluxos de aprovação e acompanhamento",
      "Redução de erros e de trabalho manual",
      "Documentação dos fluxos criados",
    ],
    steps: [
      ["Entendemos", "Identificamos as tarefas repetitivas e o tempo que consomem."],
      ["Propomos", "Plano de automação com impacto estimado."],
      ["Construímos", "Implementação e testes dos fluxos."],
      ["Entregamos", "Documentação e acompanhamento dos resultados."],
    ],
    faq: [
      {
        q: "Preciso de trocar as minhas ferramentas?",
        a: "Não. Trabalhamos com as ferramentas que já usa e ligamos o que está desconectado.",
      },
      {
        q: "Que processos costumam ser automatizados?",
        a: "Confirmações de pedidos, lembretes de pagamento, relatórios de vendas, sincronização de dados e aprovações internas, entre outros.",
      },
    ],
  },
  {
    slug: "infrastructure",
    code: "04",
    name: "SL Digital Infrastructure",
    stage: "Estruturar",
    short: "Uma base tecnológica estável e segura.",
    chips: ["Domínio", "Hospedagem", "E-mail", "Backups"],
    home: {
      phrase:
        "Configuração e manutenção da infraestrutura que mantém os seus serviços digitais a funcionar.",
      audience: "empresas que querem tecnologia estável sem se preocupar com a manutenção.",
      chipsLabel: "Inclui:",
      chips: ["Hospedagem", "Domínios", "Backups", "Segurança", "Monitorização"],
    },

    title: "Infraestrutura e suporte tecnológico",
    icon: ServerCog,
    tagline:
      "Domínio, hospedagem, e-mail profissional, segurança e backups geridos por nós.",
    audience: "Para empresas que querem tecnologia estável sem se preocupar com a manutenção.",
    pain: [
      "O site fica fora do ar ou lento sem ninguém responsável.",
      "Medo de falhas, ataques ou perda de dados.",
      "Nenhum apoio técnico quando algo corre mal.",
    ],
    includes: [
      "Registo e gestão de domínio",
      "Hospedagem adequada ao projeto",
      "E-mail profissional com o seu domínio",
      "Certificados de segurança (HTTPS)",
      "Backups regulares e verificados",
      "Monitorização de disponibilidade",
      "Apoio técnico por WhatsApp e e-mail",
    ],
    steps: [
      ["Entendemos", "Avaliação do estado atual da infraestrutura."],
      ["Propomos", "Plano de infraestrutura e suporte adequado."],
      ["Construímos", "Migração e configuração do ambiente."],
      ["Entregamos", "Monitorização contínua e apoio dedicado."],
    ],
    faq: [
      {
        q: "Posso manter o meu domínio e hospedagem atuais?",
        a: "Sim. Podemos gerir a infraestrutura atual ou migrar para uma mais adequada, conforme o que fizer mais sentido.",
      },
      {
        q: "E se algo correr mal fora do horário?",
        a: "Tem um contacto direto para reportar e o nosso acompanhamento inclui resposta prioritária para indisponibilidades.",
      },
    ],
  },
  {
    slug: "custom-solutions",
    code: "05",
    name: "SL Custom Solutions",
    stage: "Construir",
    short: "Quando nenhuma solução pronta chega.",
    chips: ["Aplicações à medida", "Integrações", "APIs"],
    home: {
      phrase:
        "Desenvolvemos soluções específicas para problemas que não cabem num produto padrão.",
      audience: "empresas com necessidades específicas que as soluções de mercado não resolvem.",
      chipsLabel: "Exemplos:",
      chips: ["Sistemas personalizados", "IoT", "Integrações", "Aplicações específicas"],
    },

    title: "Soluções tecnológicas personalizadas",
    icon: Puzzle,
    tagline:
      "Aplicações e integrações feitas à medida do seu negócio, quando nenhuma solução pronta chega.",
    audience: "Para empresas com necessidades específicas que as soluções de mercado não resolvem.",
    pain: [
      "Nenhuma ferramenta pronta se ajusta ao seu processo.",
      "Soluções que comprou exigem mudar a forma de trabalhar.",
      "Necessidades específicas ficam sempre por resolver.",
    ],
    includes: [
      "Análise detalhada da necessidade",
      "Conceção da solução com a sua participação",
      "Desenvolvimento sob medida",
      "Integrações com sistemas e ferramentas existentes",
      "Testes e validação antes da entrega",
      "Documentação, formação e suporte",
    ],
    steps: [
      ["Entendemos", "Conversa detalhada sobre a necessidade e o contexto."],
      ["Propomos", "Escopo, prazo e valor antes de qualquer trabalho."],
      ["Construímos", "Desenvolvimento com validação por etapas."],
      ["Entregamos", "Entrega completa com documentação e formação."],
    ],
    faq: [
      {
        q: "Não vai sair caro demais?",
        a: "O valor é definido após diagnóstico e apresentado antes de qualquer compromisso. Em muitos casos, uma solução ajustada poupa mais do que custa.",
      },
      {
        q: "Quanto tempo demora?",
        a: "Depende da complexidade. Definimos o prazo na proposta e acompanhamos por etapas.",
      },
    ],
  },
  {
    slug: "monitor",
    code: "06",
    name: "SL Monitor",
    stage: "Observar",
    short: "Transforme sensores em informação útil.",
    chips: ["Sensores", "Telemetria", "Dashboard", "Alertas"],
    home: {
      phrase:
        "Monitorização de temperatura, humidade, energia e outros dados do mundo físico — com painéis e alertas em tempo real.",
      audience: "empresas que precisam de acompanhar condições físicas e equipamentos.",
      chipsLabel: "Inclui:",
      chips: ["Sensores", "Telemetria", "Dashboard", "Alertas"],
    },

    title: "Monitorização e telemetria IoT",
    icon: Activity,
    tagline:
      "Sensorização e monitorização de condições físicas com painéis em tempo real e alertas automáticos.",
    audience: "Para empresas que querem ver, medir e acompanhar o que acontece nas suas instalações e equipamentos.",
    pain: [
      "Sem visibilidade sobre temperatura, humidade ou consumo de energia.",
      "Problemas detetados tarde, depois de causarem perdas.",
      "Dados espalhados em papel ou visitas manuais às instalações.",
    ],
    includes: [
      "Sensorização de temperatura, humidade, energia e outros dados",
      "Dashboard em tempo real acessível do telemóvel",
      "Alertas automáticos por WhatsApp e e-mail",
      "Histórico e relatórios para decisão",
      "Instalação e configuração dos dispositivos",
      "Suporte e manutenção do sistema",
    ],
    steps: [
      ["Entendemos", "Identificação dos dados que importam para a sua operação."],
      ["Propomos", "Escopo, dispositivos e valor por escrito."],
      ["Construímos", "Instalação, configuração e painéis por etapas."],
      ["Entregamos", "Formação e acesso ao sistema em produção."],
    ],
    faq: [
      {
        q: "Quais dados consigo monitorizar?",
        a: "Temperatura, humidade, energia, presença e outros — depende dos sensores adequados à sua necessidade.",
      },
      {
        q: "Recebo alertas quando algo está fora do normal?",
        a: "Sim. Definimos limites e o sistema avisa automaticamente por WhatsApp ou e-mail antes do problema se agravar.",
      },
    ],
  },
  {
    slug: "network",
    code: "07",
    name: "SL Network",
    stage: "Conectar",
    short: "Uma infraestrutura de rede organizada e confiável.",
    chips: ["LAN", "Wi-Fi", "VLAN", "Configuração", "Diagnóstico"],
    home: {
      phrase:
        "Redes locais e Wi-Fi profissionais — estrutura, configuração, diagnóstico e segurança da conectividade da sua operação.",
      audience: "empresas com redes lentas, instáveis ou mal organizadas.",
      chipsLabel: "Inclui:",
      chips: ["LAN", "Wi-Fi", "VLAN", "Segurança", "Diagnóstico"],
    },

    title: "Redes e infraestrutura de conectividade",
    icon: Network,
    tagline:
      "Planeamento, configuração e manutenção de redes locais com conectividade rápida, estável e segura.",
    audience: "Para empresas cujo trabalho depende de uma rede de internet e Wi-Fi confiável.",
    pain: [
      "Internet lenta ou instável mesmo com boa ligação contratada.",
      "Wi-Fi fraco em algumas áreas do espaço de trabalho.",
      "Sem organização clara da rede — problemas difíceis de diagnosticar.",
    ],
    includes: [
      "Diagnóstico da rede atual",
      "Planeamento da estrutura (LAN, Wi-Fi, VLAN)",
      "Configuração de routers, switches e pontos de acesso",
      "Segurança básica da rede",
      "Documentação da topologia e credenciais",
      "Suporte e manutenção contínua",
    ],
    steps: [
      ["Entendemos", "Diagnóstico da rede, equipamentos e pontos críticos."],
      ["Propomos", "Plano de estrutura e melhorias com prioridades claras."],
      ["Construímos", "Instalação e configuração dos equipamentos."],
      ["Entregamos", "Documentação, testes e suporte contínuo."],
    ],
    faq: [
      {
        q: "Preciso de comprar equipamento novo?",
        a: "Nem sempre. Diagnosticamos primeiro e só recomendamos investimentos quando são realmente necessários.",
      },
      {
        q: "A rede fica mais rápida com a vossa intervenção?",
        a: "Em muitos casos, sim. Uma boa configuração e organização evita congestionamentos e aproveita melhor a ligação que já tem.",
      },
    ],
  },
]

export const complementary = [
  {
    icon: Compass,
    name: "Consultoria digital",
    text: "Um plano prático para digitalizar o seu negócio, sem termos técnicos.",
  },
  {
    icon: Wrench,
    name: "Manutenção e suporte",
    text: "O seu site e sistemas seguros, atualizados e sempre a funcionar.",
  },
  {
    icon: FileText,
    name: "Gestão de conteúdo",
    text: "Textos, notícias e atualizações do seu site tratados por nós.",
  },
  {
    icon: Palette,
    name: "Identidade digital",
    text: "Logo, cores e tipografia que dão a cara certa à sua marca.",
  },
  {
    icon: GraduationCap,
    name: "Formação tecnológica",
    text: "A sua equipa a usar as ferramentas digitais com confiança.",
  },
  {
    icon: Sparkles,
    name: "Integração de IA",
    text: "Automatizamos tarefas repetitivas e acrescentamos funcionalidades inteligentes ao seu negócio.",
  },
]

export const process = [
  ["Entendemos", "Conhecemos o negócio e identificamos o problema real."],
  ["Propomos", "Apresentamos uma solução adequada à necessidade e ao orçamento."],
  ["Construímos", "Design, desenvolvimento, integração e testes."],
  ["Validamos", "O cliente verifica a solução antes da entrega."],
  ["Entregamos", "Publicação, documentação e orientação."],
  ["Evoluímos", "Suporte, manutenção e melhorias quando necessário."],
]

export const pillars = [
  {
    title: "Estável",
    text: "Arquitetura pensada para manutenção e evolução.",
  },
  {
    title: "Segura",
    text: "HTTPS, backups e boas práticas desde o desenvolvimento.",
  },
  {
    title: "Acessível",
    text: "Tecnologia planeada para diferentes dimensões e realidades.",
  },
  {
    title: "Inclusiva",
    text: "Tecnologia pensada para diferentes realidades.",
  },
]


export const faq = [
  {
    q: "Quanto tempo demora um projeto?",
    a: "Sites entre 1 a 3 semanas e sistemas entre 3 a 8 semanas. O prazo fica escrito na proposta e acompanhamos por etapas.",
  },
  {
    q: "A Skylayer trabalha com empresas pequenas?",
    a: "Sim. A Skylayer existe exatamente para isso — tecnologia acessível, adequada a diferentes dimensões e orçamentos.",
  },
  {
    q: "Posso pedir uma solução personalizada?",
    a: "Sim. O SL Custom Solutions é feito para necessidades que as soluções prontas não resolvem. O valor é apresentado após diagnóstico, antes de qualquer compromisso.",
  },
  {
    q: "Fazem manutenção depois da entrega?",
    a: "Sim. Cada entrega inclui um período de suporte, e oferecemos planos de manutenção contínua (SL Digital Infrastructure).",
  },
  {
    q: "Posso começar com um orçamento pequeno?",
    a: "Sim. Começamos pelo essencial e o projeto evolui por etapas, conforme os resultados apareçam.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "O padrão é 50% no início e 50% na entrega. Aceitamos transferência bancária e dinheiro eletrónico.",
  },
  {
    q: "Como peço um orçamento?",
    a: "Pelo formulário, WhatsApp ou e-mail. Começamos com um diagnóstico gratuito e só depois enviamos a proposta.",
  },
]

export const getProduct = (slug) => products.find((p) => p.slug === slug)
