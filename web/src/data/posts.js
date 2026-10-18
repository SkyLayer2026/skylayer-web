import { postsAntigos } from "./posts_antigos.js"

export const categories = ["Tecnologia", "Negócios", "Engenharia", "Segurança", "Skylayer"]

const postsNovos = [
  {
    slug: "comecar-a-digitalizar",
    category: "Negócios",
    title: "Como pequenas empresas podem começar a digitalizar os seus processos",
    date: "2026-08-08",
    readTime: "5 min",
    excerpt:
      "Digitalizar não significa comprar ferramentas caras. Começa por identificar o que mais se repete no dia a dia — e corrigir isso primeiro.",
    content: [
      {
        type: "p",
        text: "Quando se fala em digitalização, muitas pequenas empresas pensam imediatamente em investimentos grandes: softwares caros, equipamentos novos, horas de formação. A realidade é diferente: digitalizar começa por olhar para o trabalho do dia a dia e perguntar onde o tempo está a ser desperdiçado.",
      },
      {
        type: "h2",
        text: "Comece pelo que mais se repete",
      },
      {
        type: "p",
        text: "Faça uma lista mental das tarefas que aparecem todas as semanas: registar pedidos, responder aos mesmos tipos de mensagens, somar vendas no fim do mês, lembrar clientes de pagamentos em atraso. Cada uma destas tarefas, repetida dezenas de vezes, é um candidato a digitalização.",
      },
      {
        type: "p",
        text: "O primeiro projeto digital não tem de ser bonito nem completo. Tem de ser útil: se resolve uma tarefa que se repete, já devolve horas todos os meses.",
      },
      {
        type: "h2",
        text: "Uma ferramenta de cada vez",
      },
      {
        type: "p",
        text: "O erro mais comum é adotar várias ferramentas ao mesmo tempo. A equipa não acompanha, ninguém usa e o investimento perde-se. Escolha um problema, resolva-o bem, documente como se usa — e só depois avance para o seguinte.",
      },
      {
        type: "h2",
        text: "Registe antes de automatizar",
      },
      {
        type: "p",
        text: "Só se automatiza bem aquilo que já está registado. Se o processo muda todos os dias, primeiro estabilize o processo em papel ou num registo simples; depois automatize a parte repetitiva.",
      },
      {
        type: "p",
        text: "Digitalização não é um projeto com fim — é uma direção. A empresa que avança uma tarefa repetitiva por mês fica, ao fim de um ano, com doze processos a menos a depender da memória de alguém.",
      },
    ],
  },
  {
    slug: "seguranca-basica-empresas",
    category: "Segurança",
    title: "Segurança digital básica para a sua empresa",
    date: "2026-08-08",
    readTime: "5 min",
    excerpt:
      "Cinco práticas simples que reduzem a maioria dos riscos — sem precisar de ser especialista em tecnologia.",
    content: [
      {
        type: "p",
        text: "A segurança digital de uma pequena empresa não depende de sistemas caros. Depende, na maioria dos casos, de hábitos simples e consistentes. Estas cinco práticas cobrem a maior parte dos riscos do dia a dia.",
      },
      {
        type: "h2",
        text: "1. Senhas diferentes e geridas",
      },
      {
        type: "p",
        text: "A mesma senha em várias contas transforma uma falha pequena num problema grande. Use senhas únicas por serviço e um gestor de senhas para não precisar de as decorar.",
      },
      {
        type: "h2",
        text: "2. Verificação em duas etapas",
      },
      {
        type: "p",
        text: "Ative a verificação em duas etapas em tudo o que a suportar: e-mail, redes sociais, banco, ferramentas de trabalho. É o passo individual de maior impacto para impedir acessos não autorizados.",
      },
      {
        type: "h2",
        text: "3. Backups regulares e verificados",
      },
      {
        type: "p",
        text: "Um backup que nunca foi testado não é um backup. Faça cópias regulares dos dados importantes, guarde em local separado e confirme, de tempos a tempos, que consegue recuperar.",
      },
      {
        type: "h2",
        text: "4. Menos pessoas, menos acesso",
      },
      {
        type: "p",
        text: "Cada pessoa deve ter acesso apenas ao que precisa para trabalhar. Quando alguém sai da empresa, os acessos são revogados no mesmo dia.",
      },
      {
        type: "h2",
        text: "5. Cuidado com mensagens suspeitas",
      },
      {
        type: "p",
        text: "A maioria dos ataques começa com uma mensagem: um link, um anexo, um pedido de dados. Regra simples — confirme sempre por outro canal antes de abrir anexos ou partilhar informação sensível.",
      },
      {
        type: "p",
        text: "Segurança não é um projeto com fim. É uma rotina — e as rotinas simples, mantidas, valem mais do que qualquer sistema sofisticado que ninguém segue.",
      },
    ],
  },
  {
    slug: "porque-versionamos-tudo-em-git",
    category: "Engenharia",
    title: "Porque versionamos tudo em Git (mesmo em projetos pequenos)",
    date: "2026-10-18",
    readTime: "4 min",
    excerpt:
      "O controlo de versões parece um detalhe técnico. Na prática, é o que permite saber o que mudou, quando e porquê — e voltar atrás sem drama.",
    content: [
      {
        type: "p",
        text: "Quando um projeto não tem controlo de versões, cada alteração é um risco silencioso. Alguém muda um ficheiro, algo deixa de funcionar, e ninguém sabe exactamente o que foi alterado nem quando. O Git existe para resolver isso: guarda o histórico completo do trabalho, com quem alterou, quando e porquê.",
      },
      { type: "h2", text: "O que é, em linguagem simples" },
      {
        type: "p",
        text: "O Git é um sistema de controlo de versões. Cada vez que o trabalho avança, fica registado um ponto com uma descrição do que mudou. Se algo correr mal, é possível voltar a qualquer ponto anterior — sem adivinhar nem refazer trabalho já feito.",
      },
      {
        type: "p",
        text: "Não é uma ferramenta só para equipas grandes. Um site simples ou um sistema pequeno beneficiam exactamente da mesma protecção. O tamanho do projeto não muda o princípio.",
      },
      { type: "h2", text: "O que isto muda para o cliente" },
      {
        type: "p",
        text: "Três coisas concretas. Reversibilidade: um erro identificado hoje corrige-se sem desfazer o resto. Rastreabilidade: é possível ver o histórico de cada alteração, em vez de depender da memória de quem a fez. Continuidade: se outro programador assumir o projeto, encontra o contexto todo à frente — não um conjunto de ficheiros sem história.",
      },
      { type: "h2", text: "Um projeto sem histórico é uma caixa fechada" },
      {
        type: "p",
        text: "Quando o código não tem histórico, cada alteração é uma aposta. Quando tem, trabalhar nele torna-se previsível. É por isso que versionamos tudo — do primeiro ficheiro ao último ajuste em produção.",
      },
    ],
  },
  {
    slug: "o-que-avaliamos-antes-de-tocar-num-sistema",
    category: "Engenharia",
    title: "O que avaliamos antes de tocar num sistema que já existe",
    date: "2026-10-18",
    readTime: "5 min",
    excerpt:
      "Antes de propor alterações, é preciso saber o que já lá está. Estes são os pontos que verificamos primeiro — e porque é que a ordem importa.",
    content: [
      {
        type: "p",
        text: "É tentador começar a mudar assim que aparece um problema visível. Mas mexer num sistema sem o compreender cria problemas novos, mais difíceis de encontrar. Por isso, qualquer intervenção nossa começa por um diagnóstico.",
      },
      { type: "h2", text: "1. O que existe e quem controla" },
      {
        type: "p",
        text: "Primeiro: onde está alojado, quem tem acesso, onde está registado o domínio e se os acessos estão em nome do cliente. Muitos problemas começam aqui — sistemas presos a contas pessoais de quem os criou, difíceis de recuperar mais tarde.",
      },
      { type: "h2", text: "2. Desempenho e comportamento real" },
      {
        type: "p",
        text: "Não basta funcionar no escritório com boa internet. Verificamos o carregamento em ligações móveis, o comportamento no telemóvel e os pontos onde a experiência quebra. É aí que se perdem clientes sem ninguém dar por isso.",
      },
      { type: "h2", text: "3. Segurança básica" },
      {
        type: "p",
        text: "HTTPS activo e válido, permissões de acesso, credenciais escritas dentro do código e software desactualizado. São os riscos mais comuns — e os mais fáceis de corrigir cedo.",
      },
      { type: "h2", text: "4. Backups e recuperação" },
      {
        type: "p",
        text: "Um backup que nunca foi testado não é um backup. Verificamos se existem cópias, onde estão guardadas e — o mais importante — se é realmente possível recuperar a partir delas.",
      },
      { type: "h2", text: "5. O que é urgente e o que pode esperar" },
      {
        type: "p",
        text: "O resultado de um diagnóstico não é uma lista de problemas: é uma ordem. O que é urgente, o que é importante e o que pode esperar. Assim, o investimento vai para o que reduz risco real, e não para o que é apenas mais visível.",
      },
      {
        type: "p",
        text: "Este diagnóstico é o primeiro passo de qualquer projeto connosco. E entregamo-lo por escrito, mesmo quando a decisão do cliente é não avançar.",
      },
    ],
  },
]

export const posts = [...postsAntigos, ...postsNovos]

export const getPost = (slug) => posts.find((p) => p.slug === slug)
