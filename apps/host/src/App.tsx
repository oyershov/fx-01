import React from 'react'
import FxWidget from 'fx/Widget'
import RatesWidget from 'rates/Widget'

function App() {
  return (
    <React.Suspense fallback="Loading App...">
      <h1>Host App</h1>
      <FxWidget />
      <RatesWidget />
    </React.Suspense>
  )
}

export default App
