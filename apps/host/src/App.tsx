import React from 'react'
import { FlexLayoutHost } from './layout/FlexLayoutHost'

function App() {
  return (
    <React.Suspense fallback="Loading App...">
      <h1>Host App</h1>
      <FlexLayoutHost />
    </React.Suspense>
  )
}

export default App
