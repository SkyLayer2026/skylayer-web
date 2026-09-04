/* ═══════════════════════════════════════════════════
   SKYLAYER v4 VISUALS
   System · Signal · Engineering aesthetics
   ═══════════════════════════════════════════════════ */

function NodeDot({ color, pulse = false, className = "" }) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${color} ${pulse ? "signal-dot" : ""} ${className}`}
      aria-hidden="true"
    />
  )
}

function TechBadge({ children, color = "text-muted", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase ${color} ${className}`}
    >
      {children}
    </span>
  )
}

/* ── HERO VISUAL: three connected system layers ──── */
export function HeroVisual({ className = "" }) {
  return (
    <div
      className={`pointer-events-none relative mx-auto h-[420px] w-full max-w-[540px] select-none sm:h-[480px] ${className}`}
      aria-hidden="true"
    >
      {/* Signal line */}
      <div className="absolute inset-y-8 right-[2%] hidden w-px border-l border-dashed border-silver sm:block" />
      <NodeDot color="bg-dev-500" pulse className="absolute right-[1.5%] top-10 hidden sm:block" />
      <NodeDot color="bg-iot-500" pulse className="absolute right-[1.5%] top-1/2 hidden sm:block" />
      <NodeDot color="bg-infra-500" pulse className="absolute right-[1.5%] bottom-10 hidden sm:block" />

      {/* Header coordinate */}
      <TechBadge className="absolute right-0 top-0">
        SL / SYSTEM / LIVE
      </TechBadge>

      {/* LAYER 01 — DEV (purple) */}
      <div className="hero-layer hero-layer-1 absolute left-0 top-[4%] z-10 w-[64%] border border-silver bg-ivory/95 shadow-[0_1px_0_rgba(26,26,31,0.06)]">
        <div className="flex items-center justify-between border-b border-line-soft px-3 py-2">
          <TechBadge color="text-dev-600">SL / DEV</TechBadge>
          <span className="h-px flex-1 mx-2 bg-line-soft" />
          <span className="font-mono text-[9px] text-muted">SYSTEM.CORE</span>
        </div>
        <div className="space-y-2 px-4 py-4">
          <div className="flex items-center gap-2">
            <NodeDot color="bg-dev-500" pulse />
            <span className="font-mono text-[10px] text-charcoal">dev.core</span>
            <span className="ml-auto font-mono text-[9px] text-muted">online</span>
          </div>
          <div className="flex items-center gap-2">
            <NodeDot color="bg-dev-400" />
            <span className="font-mono text-[10px] text-charcoal">api.gateway</span>
            <span className="ml-auto font-mono text-[9px] text-dev-600">200 OK</span>
          </div>
          <div className="flex items-center gap-2">
            <NodeDot color="bg-dev-300" />
            <span className="font-mono text-[10px] text-charcoal">web.assets</span>
            <span className="ml-auto font-mono text-[9px] text-muted">sync</span>
          </div>
        </div>
        {/* mini bar chart */}
        <div className="flex h-8 items-end gap-1 px-4 pb-3">
          {[30, 55, 40, 70, 60, 85, 50].map((h, i) => (
            <span key={i} className="flex-1 bg-dev-500/25" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      {/* LAYER 02 — IoT (amber) */}
      <div className="hero-layer hero-layer-2 absolute left-[14%] top-[30%] z-20 w-[68%] border border-silver bg-ivory/95 shadow-[0_2px_0_rgba(26,26,31,0.06)]">
        <div className="flex items-center justify-between border-b border-line-soft px-3 py-2">
          <TechBadge color="text-iot-600">SL / IOT</TechBadge>
          <span className="h-px flex-1 mx-2 bg-line-soft" />
          <span className="font-mono text-[9px] text-muted">SENSOR.FEED</span>
        </div>
        <div className="grid grid-cols-2 gap-2 px-4 py-4">
          <div className="border border-line-soft bg-white px-3 py-2">
            <p className="font-mono text-[8px] uppercase tracking-widest text-muted">Temp</p>
            <p className="font-mono text-lg font-semibold text-charcoal">24.8 °C</p>
          </div>
          <div className="border border-line-soft bg-white px-3 py-2">
            <p className="font-mono text-[8px] uppercase tracking-widest text-muted">Humidity</p>
            <p className="font-mono text-lg font-semibold text-charcoal">61 %</p>
          </div>
          <div className="col-span-2 border border-line-soft bg-white px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 signal-dot" />
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted">Data stream</p>
              <span className="ml-auto font-mono text-[9px] text-iot-600">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 03 — Infrastructure (red) */}
      <div className="hero-layer hero-layer-3 absolute bottom-0 left-[28%] z-30 w-[70%] border border-silver bg-ivory/95 shadow-[0_3px_0_rgba(26,26,31,0.07)]">
        <div className="flex items-center justify-between border-b border-line-soft px-3 py-2">
          <TechBadge color="text-infra-600">SL / INFRA</TechBadge>
          <span className="h-px flex-1 mx-2 bg-line-soft" />
          <span className="font-mono text-[9px] text-muted">NETWORK.TOPO</span>
        </div>
        <div className="relative px-4 py-4">
          {/* minimal topology */}
          <div className="flex items-center justify-center gap-3">
            <div className="border border-infra-300 bg-white px-2 py-1">
              <p className="font-mono text-[8px] uppercase tracking-wider text-infra-600">Firewall</p>
            </div>
            <span className="text-silver">——</span>
            <div className="border border-infra-200 bg-white px-2 py-1">
              <p className="font-mono text-[8px] uppercase tracking-wider text-muted">Switch</p>
            </div>
            <span className="text-silver">——</span>
            <div className="border border-silver bg-white px-2 py-1">
              <p className="font-mono text-[8px] uppercase tracking-wider text-muted">Node</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-muted">
            <span>UPLINK 1Gb/s</span>
            <span className="text-infra-600">● OK</span>
          </div>
        </div>
      </div>

      {/* Coord grid label bottom */}
      <TechBadge className="absolute bottom-0 left-0 text-silver">
        MAPUTO / MZ / 25.92°S
      </TechBadge>
    </div>
  )
}

/* ── FRONT VISUAL: reusable per-front panel ──────── */
export function FrontVisual({ front }) {
  const config = {
    DEV: {
      accent: "text-dev-500",
      badge: "bg-dev-500",
      label: "SL / DEV",
      tag: "BUILD DIGITAL SYSTEMS",
      rows: [
        { dot: "bg-dev-500", name: "web.app", status: "online" },
        { dot: "bg-dev-400", name: "api.gateway", status: "200 OK" },
        { dot: "bg-dev-300", name: "db.cluster", status: "sync" },
      ],
      bars: [35, 60, 45, 75, 55, 90, 65],
    },
    IoT: {
      accent: "text-iot-500",
      badge: "bg-iot-500",
      label: "SL / IOT",
      tag: "CONNECT THE PHYSICAL WORLD",
      rows: [
        { dot: "bg-iot-500", name: "sensor.temp", status: "24.8°C" },
        { dot: "bg-iot-400", name: "sensor.hum", status: "61%" },
        { dot: "bg-iot-500", name: "power.meter", status: "1.82kW" },
      ],
      bars: [20, 45, 70, 40, 80, 55, 35],
    },
    INFRA: {
      accent: "text-infra-500",
      badge: "bg-infra-500",
      label: "SL / INFRA",
      tag: "BUILD THE FOUNDATION",
      rows: [
        { dot: "bg-infra-500", name: "firewall", status: "active" },
        { dot: "bg-infra-400", name: "switch.01", status: "up" },
        { dot: "bg-infra-500", name: "server.nas", status: "healthy" },
      ],
      bars: [50, 70, 55, 80, 65, 90, 75],
    },
  }[front]

  return (
    <div className="relative border border-silver bg-ivory/90 p-5">
      <div className="flex items-center justify-between border-b border-line-soft pb-2">
        <TechBadge color={config.accent}>{config.label}</TechBadge>
        <span className="h-px flex-1 mx-2 bg-line-soft" />
        <span className="font-mono text-[9px] text-muted uppercase tracking-widest">{config.tag.split(" ")[0]}</span>
      </div>
      <div className="mt-3 space-y-2">
        {config.rows.map((r) => (
          <div key={r.name} className="flex items-center gap-2">
            <NodeDot color={r.dot} pulse />
            <span className="font-mono text-[11px] text-charcoal">{r.name}</span>
            <span className={`ml-auto font-mono text-[9px] ${config.accent}`}>{r.status}</span>
          </div>
        ))}
      </div>
      <div className={`mt-4 flex h-10 items-end gap-1 ${config.accent} opacity-30`}>
        {config.bars.map((h, i) => (
          <span key={i} className="flex-1" style={{ height: `${h}%`, backgroundColor: "currentColor" }} />
        ))}
      </div>
    </div>
  )
}

/* ── PRODUCT VISUAL: per-product technical mock ──── */
export function ProductVisual({ slug, className = "" }) {
  const map = {
    presence: {
      accent: "text-dev-600",
      dot: "bg-dev-500",
      lines: [
        { l: "hero.title", strong: true },
        { l: "cta.button", strong: false },
        { l: "contact.whatsapp", strong: false },
      ],
    },
    "business-systems": {
      accent: "text-dev-600",
      dot: "bg-dev-500",
      lines: [
        { l: "clients.registry", strong: true },
        { l: "sales.dashboard", strong: false },
        { l: "stock.control", strong: false },
      ],
    },
    commerce: {
      accent: "text-iot-600",
      dot: "bg-iot-500",
      lines: [
        { l: "catalog.live", strong: true },
        { l: "orders.queue", strong: false },
        { l: "payments.gateway", strong: false },
      ],
    },
    automation: {
      accent: "text-dev-600",
      dot: "bg-dev-500",
      lines: [
        { l: "flow.inbound", strong: true },
        { l: "rule.engine", strong: false },
        { l: "notify.push", strong: false },
      ],
    },
    infrastructure: {
      accent: "text-infra-600",
      dot: "bg-infra-500",
      lines: [
        { l: "uplink.gateway", strong: true },
        { l: "vlan.segment", strong: false },
        { l: "backup.sync", strong: false },
      ],
    },
    monitor: {
      accent: "text-iot-600",
      dot: "bg-iot-500",
      lines: [
        { l: "sensor.feed", strong: true },
        { l: "telemetry.buffer", strong: false },
        { l: "alert.threshold", strong: false },
      ],
    },
    network: {
      accent: "text-infra-600",
      dot: "bg-infra-500",
      lines: [
        { l: "edge.router", strong: true },
        { l: "access.points", strong: false },
        { l: "dhcp.pool", strong: false },
      ],
    },
    secure: {
      accent: "text-infra-600",
      dot: "bg-infra-500",
      lines: [
        { l: "firewall.edge", strong: true },
        { l: "policy.hardening", strong: false },
        { l: "endpoint.protect", strong: false },
      ],
    },
  }

  const item = map[slug] || map.presence

  return (
    <div
      className={`relative border border-silver bg-ivory/90 p-5 ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b border-line-soft pb-2">
        <TechBadge color={item.accent}>SL / {slug.toUpperCase()}</TechBadge>
        <span className="h-px flex-1 mx-2 bg-line-soft" />
        <span className={`h-1.5 w-1.5 rounded-full ${item.dot} signal-dot`} />
      </div>
      <div className="mt-3 space-y-2">
        {item.lines.map((row) => (
          <div key={row.l} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-silver" />
            <span className={`font-mono text-[11px] ${row.strong ? "text-charcoal font-semibold" : "text-muted"}`}>
              {row.l}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Philosophy Icons (front-aligned) ─────────────── */
export const pillarIcons = {
  Estável: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <path d="M6 16v16M42 16v16" stroke="#c8c6c1" strokeWidth="2" />
      <path d="M8 24h7l4-8 6 16 5-12 3 4h7" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3.5" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
    </svg>
  ),
  Segura: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <path d="M24 6l14 5v12c0 9-6 15-14 19-8-4-14-10-14-19V11l14-5z" stroke="#dc2626" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M17 24l5 5 9-11" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Acessível: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <rect x="6" y="8" width="24" height="32" rx="3" stroke="#c8c6c1" strokeWidth="2" />
      <rect x="34" y="14" width="10" height="20" rx="2" stroke="#d97706" strokeWidth="2.5" />
      <path d="M30 40h-26" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 20h8" stroke="#c8c6c1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Inclusiva: (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
      <circle cx="14" cy="16" r="4" stroke="#7c3aed" strokeWidth="2.5" />
      <circle cx="34" cy="16" r="4" stroke="#c8c6c1" strokeWidth="2" />
      <circle cx="24" cy="16" r="4" stroke="#c8c6c1" strokeWidth="2" />
      <circle cx="14" cy="34" r="4" stroke="#c8c6c1" strokeWidth="2" />
      <circle cx="34" cy="34" r="4" stroke="#7c3aed" strokeWidth="2.5" />
      <circle cx="24" cy="34" r="4" stroke="#c8c6c1" strokeWidth="2" />
    </svg>
  ),
}