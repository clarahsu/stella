const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/stella/',

  // Hinzufügen der Proxy-Konfiguration
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Der Backend-Server läuft auf diesem Port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

