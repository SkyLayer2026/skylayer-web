#!/bin/bash
# 🔄 Backup Automático - Farmácia Lurio (Linux)
APP_DIR="$HOME/.config/Farmácia Lurio"
DB_PATH="$APP_DIR/lurio.db"
BACKUP_DIR="$APP_DIR/backups"
mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")
cp "$DB_PATH" "$BACKUP_DIR/lurio_backup_$TIMESTAMP.db"

echo "✅ Backup criado: $BACKUP_DIR/lurio_backup_$TIMESTAMP.db"

# Manter apenas os últimos 7 backups
ls -t "$BACKUP_DIR"/lurio_backup_*.db | tail -n +8 | xargs -r rm