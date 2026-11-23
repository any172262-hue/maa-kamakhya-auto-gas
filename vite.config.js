import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => ({
  base: command === 'build' || mode === 'production' || process.env.NODE_ENV === 'production' ? '/maa-kamakhya-auto-gas/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  }
}));
