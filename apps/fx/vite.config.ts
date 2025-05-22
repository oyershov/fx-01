import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  build: {
    target: 'esnext',
    modulePreload: false,
  },
  plugins: [
    react(),
    federation({
      name: 'fx',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget.tsx'
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 3001
  }
})
