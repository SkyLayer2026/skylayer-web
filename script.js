const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });
}

const currentPage = location.pathname.split("/").pop() || "index.html";
const navAnchors = document.querySelectorAll(".nav-links a");

navAnchors.forEach((a) => {
  const href = a.getAttribute("href");
  if (href === currentPage) {
    a.classList.add("active");
  }
});

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -40px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

const projects = {
  calculator: {
    title: "Calculadora de Materiais de Construção",
    desc: "Aplicação web profissional para calcular materiais de construção para fundações, pilares, paredes, pisos e pintura. Ajuda profissionais a estimar quantidades com precisão, reduzindo desperdício.",
    features: ["Cálculo automático de materiais", "Múltiplas categorias de obra", "Resultados em tempo real", "Histórico de cálculos"],
    url: "demo-calculator.html"
  },
  pharmacy: {
    title: "Sistema de Gestão de Farmácia",
    desc: "Sistema de gestão de inventário e vendas para farmácias. Permite registo de produtos, controlo de stock, monitorização de validades e exportação de relatórios.",
    features: ["Gestão de inventário", "Controlo de vendas", "Alertas de validade", "Exportação CSV"],
    url: "demo-pharmacy.html"
  },
  dashboard: {
    title: "Painel Administrativo",
    desc: "Dashboard administrativo moderno para monitorizar métricas empresariais em tempo real. Inclui gráficos interactivos, feed de actividade e gestão de utilizadores.",
    features: ["Gráficos e analytics", "KPIs animados", "Gestão de utilizadores", "Actualização automática"],
    url: "demo-dashboard.html"
  },
  booking: {
    title: "Sistema de Marcações Online",
    desc: "Sistema de agendamento online para clínicas, salões e serviços. Clientes marcam online enquanto administradores gerem horários e disponibilidade.",
    features: ["Calendário interactivo", "Gestão de horários", "Registo de clientes", "CRUD de marcações"],
    url: "demo-booking.html"
  },
  stock: {
    title: "Sistema de Gestão de Stock",
    desc: "Sistema completo de controlo de inventário com movimentações, alertas de stock mínimo e relatórios detalhados. Ideal para armazéns e lojas que precisam de visibilidade em tempo real do seu stock.",
    features: ["Gestão de inventário", "Movimentações", "Alertas de stock mínimo", "Exportação de dados"],
    url: "demo-stock.html"
  },
  erp: {
    title: "Sistema ERP Empresarial",
    desc: "Sistema integrado de gestão empresarial com módulos de vendas, compras, finanças e recursos humanos. Dados centralizados e relatórios executivos para tomada de decisão.",
    features: ["Módulo de vendas", "Compras e fornecedores", "Gestão financeira", "Recursos humanos"],
    url: "demo-erp.html"
  },
  pos: {
    title: "Sistema PDV (Ponto de Venda)",
    desc: "Sistema de ponto de venda completo com catálogo de produtos, carrinho de compras, cálculo de troco e histórico de transacções. Ideal para lojas físicas e retalho.",
    features: ["Catálogo de produtos", "Carrinho de compras", "Cálculo de troco", "Histórico de vendas"],
    url: "demo-pos.html"
  },
  crm: {
    title: "Sistema CRM",
    desc: "Gestão de relacionamento com clientes com pipeline de vendas, perfis detalhados, notas e histórico de interacções. Pesquisa avançada e filtros para equipas comerciais.",
    features: ["Pipeline de vendas", "Gestão de clientes", "Notas e histórico", "Pesquisa avançada"],
    url: "demo-crm.html"
  }
};

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

let lastFocused = null;

function openDemo(project) {
  const modal = document.getElementById("demo-modal");
  const data = projects[project];
  if (!modal || !data) return;
  lastFocused = document.activeElement;
  document.getElementById("demo-title").textContent = data.title;
  document.getElementById("demo-desc").textContent = data.desc;
  const feat = document.getElementById("demo-features");
  feat.innerHTML = data.features.map(f =>
    `<span style="padding: 6px 14px; border-radius: 20px; background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.15); color: var(--purple-light); font-size: 0.82rem;">${esc(f)}</span>`
  ).join("");
  const link = document.getElementById("demo-link");
  if (data.url) {
    link.href = data.url;
    link.textContent = "Ver Demo Completa";
    link.style.display = "inline-block";
  } else {
    link.style.display = "none";
  }
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => modal.querySelector("button, a").focus(), 100);
}

function closeDemo() {
  const modal = document.getElementById("demo-modal");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) { lastFocused.focus(); lastFocused = null; }
  }
}

document.addEventListener("click", (e) => {
  const modal = document.getElementById("demo-modal");
  if (modal && modal.classList.contains("open") && e.target === modal) {
    closeDemo();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDemo();
  }
  const modal = document.getElementById("demo-modal");
  if (e.key === "Tab" && modal && modal.classList.contains("open")) {
    const focusable = modal.querySelectorAll("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
