import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Tailwind v4 se integra como plugin de Vite: no hace falta tailwind.config.js
  plugins: [react(), tailwindcss()],
})
