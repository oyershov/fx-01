import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        fx: 'http://localhost:3001/assets/remoteEntry.js',
        rates: 'http://localhost:3002/assets/remoteEntry.js'
      },
      shared: [
        'react',
        'react-dom',
        '@emotion/react',
        '@emotion/styled'
      ]
    })
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 3000
  }
})
