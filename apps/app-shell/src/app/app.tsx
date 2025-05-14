import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '@fx-01/ui';
import useStore from 'store/Module'

const FX = React.lazy(() => import('fx/Module'));
const Rates = React.lazy(() => import('rates/Module'));

export function App() {
  const { price, increment } = useStore();

  return (
    <React.Suspense fallback={null}>
      <Header />
      <button onClick={increment}>Increase price: {price}</button>
      <Routes>
        <Route path="/" element={<FX />} />
        <Route path="/dashboard" element={<FX />} />
        <Route path="/portfolio" element={<Rates />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
