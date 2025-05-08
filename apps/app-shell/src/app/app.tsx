import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '@fx-01/ui';

const FX = React.lazy(() => import('fx/Module'));
const Rates = React.lazy(() => import('rates/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <Header />
      <Routes>
        <Route path="/" element={<FX />} />
        <Route path="/dashboard" element={<FX />} />
        <Route path="/portfolio" element={<Rates />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
