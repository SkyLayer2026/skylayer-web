# ==========================================================
# 🏗️  Script de Criação de Estrutura – Farmácia Luri
# 🖥️  Compatível com Windows 10 / 11 (PowerShell 5.1+)
# 📌  Execute: .\setup_farmacia_luri.ps1
# ==========================================================

$root = "farmacia-luri-sistema"

Write-Host "📁 Criando estrutura de pastas..." -ForegroundColor Cyan

# 📂 Diretórios
$dirs = @(
    "$root/src/assets",
    "$root/src/components/POS",
    "$root/src/components/Inventory",
    "$root/src/components/Alerts",
    "$root/src/components/ui",
    "$root/src/components/Dashboard",
    "$root/src/components/Profit",
    "$root/src/components/AlertSystem",
    "$root/src/pages",
    "$root/src/hooks",
    "$root/src/services",
    "$root/src/store",
    "$root/src/utils",
    "$root/src/types",
    "$root/electron/ipcHandlers",
    "$root/electron/config",
    "$root/electron/services",
    "$root/database/migrations",
    "$root/database/backup",
    "$root/sync",
    "$root/backend/src/config",
    "$root/backend/src/middleware",
    "$root/backend/src/routes",
    "$root/backend/src/services",
    "$root/scripts"
)

foreach ($dir in $dirs) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
        Write-Host "  ✅ $dir"
    }
}

Write-Host "📄 Criando arquivos base..." -ForegroundColor Cyan

# 📄 Arquivos (placeholder)
$files = @(
    "$root/package.json",
    "$root/vite.config.ts",
    "$root/tsconfig.json",
    "$root/electron-builder.json",
    "$root/.env.example",
    "$root/README.md",
    "$root/src/main.tsx",
    "$root/src/App.tsx",
    "$root/electron/main.ts",
    "$root/electron/preload.ts",
    "$root/database/schema.sql",
    "$root/sync/queue.ts",
    "$root/sync/conflictResolver.ts",
    "$root/backend/package.json",
    "$root/backend/.env",
    "$root/backend/schema.sql",
    "$root/backend/src/index.ts",
    "$root/backend/src/config/db.ts",
    "$root/backend/src/middleware/auth.ts",
    "$root/backend/src/routes/sync.ts",
    "$root/backend/src/routes/reports.ts",
    "$root/backend/src/services/syncProcessor.ts",
    "$root/backend/src/services/profitService.ts",
    "$root/backend/src/services/alertAggregator.ts",
    "$root/electron/config/printer.json",
    "$root/electron/config/alerts.json",
    "$root/electron/services/printerService.ts",
    "$root/electron/services/alertEngine.ts",
    "$root/src/services/localDb.ts",
    "$root/src/services/syncService.ts",
    "$root/src/services/printerService.ts",
    "$root/src/services/receiptService.ts",
    "$root/src/services/dashboardApi.ts",
    "$root/src/services/posCheckout.ts",
    "$root/src/services/printService.ts",
    "$root/src/services/profitApi.ts",
    "$root/src/store/posCartStore.ts",
    "$root/src/store/alertStore.ts",
    "$root/src/types/dashboard.ts",
    "$root/src/types/profit.ts",
    "$root/src/types/alerts.ts",
    "$root/src/pages/POSPage.tsx",
    "$root/src/pages/DashboardPage.tsx",
    "$root/src/pages/ProfitReportPage.tsx",
    "$root/src/components/Dashboard/KPICards.tsx",
    "$root/src/components/Dashboard/SalesComparisonChart.tsx",
    "$root/src/components/Dashboard/AlertsTable.tsx",
    "$root/src/components/Dashboard/SyncStatusBadge.tsx",
    "$root/src/components/Profit/MarginChart.tsx",
    "$root/src/components/Profit/LossBreakdown.tsx",
    "$root/src/components/Profit/ExportButtons.tsx",
    "$root/src/components/Profit/DateRangePicker.tsx",
    "$root/src/components/AlertSystem/AlertBadge.tsx",
    "$root/src/components/AlertSystem/AlertInbox.tsx",
    "$root/scripts/dev.ps1",
    "$root/scripts/build.ps1",
    "$root/scripts/backup.ps1"
)

foreach ($file in $files) {
    if (!(Test-Path $file)) {
        Set-Content -Path $file -Value "// ⚠️ Cole aqui o código correspondente do tutorial." -Encoding UTF8
        Write-Host "  📝 $file"
    }
}

Write-Host "`n🎉 Estrutura criada com sucesso em: $root" -ForegroundColor Green
Write-Host "📌 Próximo passo: Cole os códigos que enviei nos arquivos correspondentes." -ForegroundColor Yellow
Write-Host "🔧 Execute: cd $root && npm install && npm run dev" -ForegroundColor White