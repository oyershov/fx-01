import React from 'react'

import { FlexLayoutHost } from './layout/FlexLayoutHost'

function App() {
  return (
    <React.Suspense fallback="Loading App...">
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <header style={{ height: 48, background: "#1e293b", color: "#f1f5f9", display: "flex", alignItems: "center", paddingInline: 16 }}>
          FX 01
        </header>
        <main style={{ flex: 1 }}>
          <FlexLayoutHost />
        </main>
      </div>
    </React.Suspense>
  )
}

export default App
