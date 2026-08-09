# 🔄 Backup Automático - Farmácia Lurio (Windows)
$AppName = "Farmácia Lurio"
$DbName = "lurio.db"
$BackupDir = "$env:APPDATA\$AppName\backups"
$SourcePath = "$env:APPDATA\$AppName\$DbName"

if (!(Test-Path $BackupDir)) { New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null }

$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$DestPath = "$BackupDir\${AppName}_backup_$Timestamp.db"

try {
    Copy-Item -Path $SourcePath -Destination $DestPath -Force -ErrorAction Stop
    Write-Host "✅ Backup criado: $DestPath" -ForegroundColor Green

    # Manter apenas os últimos 7 backups
    Get-ChildItem -Path "$BackupDir\${AppName}_backup_*.db" | Sort-Object LastWriteTime -Descending | Select-Object -Skip 7 | Remove-Item -Force -ErrorAction SilentlyContinue
} catch {
    Write-Host "❌ Erro no backup: $_" -ForegroundColor Red
}