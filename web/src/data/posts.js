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
]

export const posts = [...postsAntigos, ...postsNovos]

export const getPost = (slug) => posts.find((p) => p.slug === slug)
