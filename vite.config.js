import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: '/Coaching-Sim/',
  publicDir: '../public',
  build: {
    outDir: '../dist',
  },
})
