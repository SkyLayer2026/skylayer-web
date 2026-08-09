module.exports = {
  apps: [{
    name: 'lurio-server',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      PORT: 3000,
      API_KEY: 'lurio_cloud_2024_secure', // 🔒 Alterar em produção
      NODE_ENV: 'production'
    }
  }]
};