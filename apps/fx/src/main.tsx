import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import QuotesWidget from './features/quotes-panel/QuotesWidget'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuotesWidget />
  </StrictMode>,
)
