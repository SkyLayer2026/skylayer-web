#!/bin/bash
# 🚀 Deploy do Servidor Cloud Farmácia Lurio
set -e

echo "📦 Instalando dependências do sistema..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git ufw

echo "🌐 Configurando firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 3000/tcp
sudo ufw --force enable

echo "📂 Clonando/Preparando projeto..."
mkdir -p /opt/lurio-server
# (Cole seus arquivos do server/ aqui ou use git pull)

cd /opt/lurio-server/server
npm install --production

echo "⚙️ Instalando PM2 (gerenciador de processos)..."
sudo npm install -g pm2

echo "▶️ Iniciando servidor..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd

echo "✅ Servidor online!"
echo "🌐 Dashboard: http://$(curl -s ifconfig.me):3000"
echo "🔑 Lembre-se de configurar a API_KEY no server/ e nos apps."