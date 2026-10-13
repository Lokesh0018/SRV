import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Libraries change far less often than app code; separate chunks keep
        // them cached across deploys.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          // checked first: 'lucide-react' would also match the react test below
          if (id.includes('lucide-react')) return 'vendor-icons';
          if (id.includes('gsap')) return 'vendor-gsap';
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'vendor-react';
          }
        },
      },
    },
  },
})
