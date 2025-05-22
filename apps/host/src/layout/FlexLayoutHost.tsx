import React, { Suspense, useMemo } from 'react';
import { Layout, Model, type TabNode } from 'flexlayout-react';
import { ErrorBoundary } from "react-error-boundary";

import { defaultLayout } from './layoutConfig';
import { FlexLayoutThemeDefault } from './themes/default';
import { widgetRegistry, type WidgetId } from './widgetRegistry';

/**
 * Host component that mounts FlexLayout and wires widget factory resolution.
 */
export function FlexLayoutHost() {
  const model = useMemo(() => Model.fromJson(defaultLayout), []);

  /**
   * Factory – translates FlexLayout TabNodes → React elements.
   *
   * @param node FlexLayout TabNode requesting a component render.
   * @returns   React element (wrapped in Suspense while remote code loads).
   */
  const factory = (node: TabNode): React.ReactElement | string => {
    const key = node.getComponent() as WidgetId;
    const LazyWidget = widgetRegistry[key];

    if (!LazyWidget) {
      return <div style={{ padding: 8 }}>Unknown widget {key}</div>;
    }

    return (
      <Suspense fallback={<div style={{ padding: 8 }}>Loading {key}…</div>}>
        <ErrorBoundary FallbackComponent={FallbackPanel}>
          <LazyWidget />
        </ErrorBoundary>
      </Suspense>
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <FlexLayoutThemeDefault />
      <Layout model={model} factory={factory} />
    </div>
  );
}

function FallbackPanel({ error }: { error: Error }): React.ReactElement {
  return (
    <div style={{ padding: 8, color: "#f87171" }}>
      {error.name}: {error.message}
    </div>
  );
}

export default FlexLayoutHost;
