import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Tailwind v4 se integra como plugin de Vite: no hace falta tailwind.config.js
  plugins: [react(), tailwindcss()],
  build: {
    // La escena 3D (Three.js) pesa ~900 kB sin comprimir (~245 kB gzip).
    // Es esperado: se descarga en un archivo aparte y no bloquea la carga inicial.
    chunkSizeWarningLimit: 1000,
  },
})
