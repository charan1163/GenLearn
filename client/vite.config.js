import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/GenLearn/' : '/',
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
}); 