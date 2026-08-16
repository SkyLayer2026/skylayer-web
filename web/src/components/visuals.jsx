function WindowChrome({ title }) {
  return (
    <div className="flex items-center gap-2 border-b border-line-soft bg-surface px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-[#fca5a5]" />
      <span className="h-2 w-2 rounded-full bg-[#fde68a]" />
      <span className="h-2 w-2 rounded-full bg-[#86efac]" />
      <span className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-[9px] font-medium text-muted">
        {title}
      </span>
    </div>
  )
}

export function LayerCorners() {
  return (
    <span className="absolute right-2 top-2 z-10 flex -space-x-1" aria-hidden="true">
      <span className="h-3 w-4 -rotate-6 rounded-[3px] border border-brand-300 bg-white/90" />
      <span className="h-3 w-4 rotate-6 rounded-[3px] border border-brand-200 bg-brand-50/90" />
    </span>
  )
}

export function HeroVisual({ className = "" }) {
  return (
    <div className={`pointer-events-none relative mx-auto h-[380px] w-full max-w-[520px] select-none sm:h-[440px] ${className}`} aria-hidden="true">
      <div className="absolute right-[6%] top-6 bottom-6 hidden w-px border-l border-dashed border-line sm:block" />
      <span className="absolute right-[5.4%] top-14 hidden h-2 w-2 rounded-full bg-brand-600 sm:block" />
      <span className="absolute right-[5.4%] top-1/2 hidden h-2 w-2 rounded-full bg-brand-600 sm:block" />
      <span className="absolute right-[5.4%] bottom-14 hidden h-2 w-2 rounded-full bg-brand-600 sm:block" />

      <div className="hero-layer hero-layer-1 absolute left-0 top-0 z-10 w-[58%] rounded-xl border border-line bg-white shadow-xl">
        <WindowChrome title="skylayer.co.mz" />
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="h-1.5 w-8 rounded bg-brand-600" />
            <div className="flex gap-1.5">
              <span className="h-1 w-5 rounded bg-[#e4e4e7]" />
              <span className="h-1 w-5 rounded bg-[#e4e4e7]" />
              <span className="h-1 w-5 rounded bg-[#e4e4e7]" />
              <span className="h-1.5 w-6 rounded bg-brand-600" />
            </div>
          </div>
          <div className="mt-4 h-2.5 w-3/4 rounded bg-ink/80" />
          <div className="mt-1.5 h-2.5 w-1/2 rounded bg-ink/60" />
          <div className="mt-1.5 h-1.5 w-4/5 rounded bg-[#e4e4e7]" />
          <div className="mt-3 flex gap-1.5">
            <span className="h-4 w-10 rounded-md bg-brand-600" />
            <span className="h-4 w-10 rounded-md border border-line" />
          </div>
        </div>
      </div>

      <div className="hero-layer hero-layer-2 absolute left-[16%] top-[26%] z-20 w-[58%] rounded-xl border border-line bg-white shadow-xl">
        <WindowChrome title="Painel · Sistema" />
        <div className="flex gap-2 px-3 py-3">
          <div className="hidden w-10 flex-col gap-1.5 sm:flex">
            <span className="h-1.5 rounded bg-brand-600" />
            <span className="h-1.5 rounded bg-[#e4e4e7]" />
            <span className="h-1.5 rounded bg-[#e4e4e7]" />
          </div>
          <div className="flex-1">
            <div className="flex gap-1.5">
              <div className="flex-1 rounded-lg border border-line-soft bg-surface px-2 py-1.5">
                <p className="text-[8px] font-semibold uppercase tracking-wide text-muted">Clientes</p>
                <p className="text-sm font-bold text-brand-600">124</p>
              </div>
              <div className="flex-1 rounded-lg border border-line-soft bg-surface px-2 py-1.5">
                <p className="text-[8px] font-semibold uppercase tracking-wide text-muted">Vendas</p>
                <p className="text-sm font-bold text-ink">38</p>
              </div>
            </div>
            <div className="mt-1.5 flex h-10 items-end gap-1 rounded-lg border border-line-soft bg-surface px-2 pt-1.5">
              {[35, 55, 40, 70, 60, 90, 75].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-sm bg-brand-600/20" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-layer hero-layer-3 absolute bottom-0 left-[30%] z-30 w-[60%] rounded-xl border border-line bg-white shadow-xl">
        <WindowChrome title="Dados · Pedidos" />
        <div className="space-y-1.5 px-3 py-3">
          {[
            { label: "Pedido #1024", status: "Entregue", ok: true },
            { label: "Pedido #1025", status: "Em preparação", ok: false },
            { label: "Pedido #1026", status: "Entregue", ok: true },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between rounded-lg border border-line-soft bg-surface px-2.5 py-1.5">
              <span className="text-[10px] font-semibold text-ink">{r.label}</span>
              <span className={`flex items-center gap-1 text-[9px] font-medium ${r.ok ? "text-emerald-700" : "text-amber-700"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${r.ok ? "bg-emerald-500" : "bg-amber-500"}`} />
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProductVisual({ slug, className = "" }) {
  if (slug === "presence") {
    return (
      <div className={`relative rounded-xl border border-line bg-surface p-3 ${className}`} aria-hidden="true">
        <LayerCorners />
        <div className="flex items-center gap-2 border-b border-line-soft pb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#fca5a5]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#fde68a]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#86efac]" />
          <span className="ml-1 h-2.5 flex-1 rounded bg-white" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="h-2 w-9 rounded bg-brand-600" />
          <span className="flex gap-1">
            <span className="h-1 w-4 rounded bg-[#e4e4e7]" />
            <span className="h-1 w-4 rounded bg-[#e4e4e7]" />
          </span>
        </div>
        <div className="mt-3 h-2 w-3/4 rounded bg-ink/70" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded bg-[#e4e4e7]" />
        <div className="mt-3 flex gap-1.5">
          <span className="h-3.5 w-9 rounded bg-brand-600" />
          <span className="h-3.5 flex-1 rounded bg-white" />
        </div>
      </div>
    )
  }

  if (slug === "business-systems") {
    return (
      <div className={`relative flex items-stretch gap-2 rounded-xl border border-line bg-surface p-3 sm:gap-3 sm:p-4 ${className}`} aria-hidden="true">
        <LayerCorners />
        <div className="hidden w-9 flex-col gap-1.5 sm:flex">
          <span className="h-1.5 rounded bg-brand-600" />
          <span className="h-1.5 rounded bg-white" />
          <span className="h-1.5 rounded bg-white" />
          <span className="h-1.5 rounded bg-white" />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-2">
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Clientes", value: "124", strong: true },
              { label: "Vendas", value: "38", strong: false },
              { label: "Stock", value: "92", strong: false },
            ].map((k) => (
              <div key={k.label} className="rounded-lg bg-white p-2">
                <p className="text-[7px] font-semibold uppercase tracking-wide text-muted">{k.label}</p>
                <p className={`text-xs font-bold ${k.strong ? "text-brand-600" : "text-ink"}`}>{k.value}</p>
              </div>
            ))}
          </div>
          <div className="flex h-12 items-end gap-1 rounded-lg bg-white p-2">
            {[40, 65, 50, 80, 60, 95, 70, 85, 55].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-sm bg-brand-600/20" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="hidden grid-cols-3 gap-1.5 sm:grid">
            {["#1042", "#1043", "#1044"].map((n) => (
              <div key={n} className="flex items-center justify-between rounded-md bg-white px-2 py-1">
                <span className="text-[7px] font-semibold text-ink">{n}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (slug === "automation") {
    return (
      <div className={`relative rounded-xl border border-line bg-surface p-4 ${className}`} aria-hidden="true">
        <div className="flex items-center">
          <div className="flex-1 rounded-lg bg-white px-2 py-2 text-center">
            <p className="text-[8px] font-bold text-ink">Pedido novo</p>
            <p className="text-[7px] text-muted">WhatsApp → sistema</p>
          </div>
          <span className="w-5 text-center text-brand-600">→</span>
          <div className="flex-1 rounded-lg bg-white px-2 py-2 text-center">
            <p className="text-[8px] font-bold text-ink">Notificação</p>
            <p className="text-[7px] text-muted">cliente avisado</p>
          </div>
          <span className="w-5 text-center text-brand-600">→</span>
          <div className="flex-1 rounded-lg bg-brand-600 px-2 py-2 text-center">
            <p className="text-[8px] font-bold text-white">Relatório</p>
            <p className="text-[7px] text-brand-100">semanal automático</p>
          </div>
        </div>
      </div>
    )
  }

  if (slug === "infrastructure") {
    return (
      <div className={`relative rounded-xl border border-line bg-surface p-4 ${className}`} aria-hidden="true">
        <LayerCorners />
        <div className="relative space-y-1.5 pl-4">
          <span className="absolute left-0 top-2 bottom-2 w-px border-l border-dashed border-brand-300" />
          {[
            { label: "Domínio e e-mail", status: "ativo" },
            { label: "Servidor e HTTPS", status: "seguro" },
            { label: "Backups diários", status: "verificados" },
          ].map((row) => (
            <div key={row.label} className="relative flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5">
              <span className="absolute -left-4 h-2 w-2 rounded-full border-2 border-brand-300 bg-white" />
              <span className="h-2 w-2 rounded-sm bg-brand-600" />
              <p className="text-[8px] font-semibold text-ink">{row.label}</p>
              <span className="ml-auto text-[7px] font-medium text-emerald-700">{row.status}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1.5">
          <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full border border-brand-600 text-[7px] font-bold leading-none text-brand-600">
            ✓
          </span>
          <p className="text-[8px] font-semibold text-brand-700">Monitorização 24/7</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative rounded-xl border border-line bg-surface p-4 ${className}`} aria-hidden="true">
      <LayerCorners />
      <div className="flex items-center gap-2 border-b border-line-soft pb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#fca5a5]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#fde68a]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#86efac]" />
        <span className="ml-1 h-2.5 flex-1 rounded bg-white" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <div className="rounded-lg bg-white p-1.5 -rotate-2">
          <span className="block h-1.5 w-3/4 rounded bg-brand-600" />
          <span className="mt-1 block h-1 w-1/2 rounded bg-[#e4e4e7]" />
        </div>
        <div className="rounded-lg bg-white p-1.5 rotate-1">
          <span className="block h-1.5 w-3/4 rounded bg-[#e4e4e7]" />
          <span className="mt-1 block h-1 w-1/2 rounded bg-[#e4e4e7]" />
        </div>
        <div className="rounded-lg bg-white p-1.5 -rotate-1">
          <span className="block h-1.5 w-3/4 rounded bg-[#e4e4e7]" />
          <span className="mt-1 block h-1 w-1/2 rounded bg-[#e4e4e7]" />
        </div>
        <div className="-mt-1 rounded-lg bg-white p-1.5 rotate-2">
          <span className="block h-1.5 w-3/4 rounded bg-brand-600" />
          <span className="mt-1 block h-1 w-1/2 rounded bg-[#e4e4e7]" />
        </div>
        <div className="-mt-1 rounded-lg bg-white p-1.5">
          <span className="block h-1.5 w-3/4 rounded bg-[#e4e4e7]" />
          <span className="mt-1 block h-1 w-1/2 rounded bg-[#e4e4e7]" />
        </div>
        <div className="-mt-1 rounded-lg bg-white p-1.5">
          <span className="block h-1.5 w-3/4 rounded bg-[#e4e4e7]" />
          <span className="mt-1 block h-1 w-1/2 rounded bg-[#e4e4e7]" />
        </div>
      </div>
      <div className="mt-2 flex h-2 w-1/2 items-center rounded-full bg-brand-600/20 px-0.5">
        <span className="h-1.5 w-2/3 rounded-full bg-brand-600" />
      </div>
    </div>
  )
}

export const pillarIcons = {
  Estável: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <path d="M6 16v16M42 16v16" stroke="#d4d4d8" strokeWidth="2" />
      <path d="M8 24h7l4-8 6 16 5-12 3 4h7" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3.5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
    </svg>
  ),
  Segura: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <path d="M24 6l14 5v12c0 9-6 15-14 19-8-4-14-10-14-19V11l14-5z" stroke="#2563eb" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M17 24l5 5 9-11" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Acessível: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <rect x="6" y="8" width="24" height="32" rx="3" stroke="#d4d4d8" strokeWidth="2" />
      <rect x="34" y="14" width="10" height="20" rx="2" stroke="#2563eb" strokeWidth="2.5" />
      <path d="M30 40h-26" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 20h8" stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Inclusiva: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <circle cx="14" cy="16" r="4" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx="34" cy="16" r="4" stroke="#d4d4d8" strokeWidth="2" />
      <circle cx="24" cy="16" r="4" stroke="#d4d4d8" strokeWidth="2" />
      <circle cx="14" cy="34" r="4" stroke="#d4d4d8" strokeWidth="2" />
      <circle cx="34" cy="34" r="4" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx="24" cy="34" r="4" stroke="#d4d4d8" strokeWidth="2" />
    </svg>
  ),
}