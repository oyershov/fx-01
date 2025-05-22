import React, { Suspense, useMemo } from 'react';
import { Layout, Model, type IJsonModel } from 'flexlayout-react';
import 'flexlayout-react/style/dark.css';

// -----------------------------------------------------------------------------
// Widget registry – maps widget IDs (used by FlexLayout) to vite‑federation module
// specifiers ("<remote-alias>/<exposedModule>"). Keep this in sync with the
// `remotes` config in vite.config.ts for your host app.
// -----------------------------------------------------------------------------
const registry: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  FxWidget:    React.lazy(() => import('fx/Widget')),
  RatesWidget: React.lazy(() => import('rates/Widget')),
};


// -----------------------------------------------------------------------------
// Default starter layout when no user‑saved state exists
// -----------------------------------------------------------------------------
const defaultJson: IJsonModel = {
  global: { splitterSize: 4, tabEnableRenderOnDemand: true },
  layout: {
    type: 'row', weight: 100, children: [
      { type: 'tabset', weight: 50, children: [
          { component: 'FxWidget', name: 'Fx Widget' },
        ]},
      { type: 'tabset', weight: 50, children: [
          { component: 'RatesWidget', name: 'Rates Widget' },
        ]},
    ],
  },
};

export function FlexLayoutHost() {
  // Build model once
  const model = useMemo(() => Model.fromJson(defaultJson), []);

  // Factory: synchronously returns a React element. We use React.lazy so
  // FlexLayout gets the element instantly and Suspense handles the async part.
  const factory = (node: any) => {
    const key: string = node.getComponent();
    const modulePath = registry[key];
    if (!modulePath) return <div className="p-2">Unknown widget: {key}</div>;

        const LazyComp = registry[key];
    if (!LazyComp) {
      return <div className="p-2">Unknown widget: {key}</div>;
    }

    return (
      <Suspense fallback={<div className="p-2">Loading {key}…</div>}>
        <LazyComp />
      </Suspense>
    );
  };

  return (
    <Layout
      className="h-screen bg-slate-900 text-slate-50"
      model={model}
      factory={factory}
    />
  );
}


/**
 * Dynamically import a remote module exposed via vite‑plugin‑federation.
 * Use the module specifier exactly as configured in vite.config.ts
 *   e.g.   import('fx/QuotePanel')
 * The `@vite-ignore` comment stops Vite from trying to pre‑bundle it.
 */
export async function loadRemote(modulePath: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore – vite will resolve the string at runtime
  return import(/* @vite-ignore */ modulePath);
}

export default FlexLayoutHost;
