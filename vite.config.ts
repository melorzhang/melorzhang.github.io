import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// 用 require 导入 JSON，避免 ts/rollup 解析问题
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version)
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // 由 'autoUpdate' 改为 'prompt'
      manifest: {
        name: '菜单选择器',
        short_name: '菜单选择器',
        start_url: '.',
        display: 'standalone',
        background_color: '#f9fafb',
        theme_color: '#1677ff',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});