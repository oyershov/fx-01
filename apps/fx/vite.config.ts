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
      './QuotesPanel': './src/features/quotes-panel/QuotesWidget.tsx',
      },
      shared: [
        'react',
        'react-dom',
        '@emotion/react',
        '@emotion/styled'
      ],
    })
  ],
  server: {
    port: 3001
  }
})
