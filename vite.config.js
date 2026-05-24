import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/bird/',  // repo name 
  server:{
    open:true,
    port:5173,
  }
})
