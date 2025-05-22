import type { IJsonModel } from 'flexlayout-react';

/**
 * Default starter layout when no user‑saved state exists.
 */
export const defaultLayout: IJsonModel = {
  global: {
    splitterSize: 4,
    tabEnableRenderOnDemand: true, // perf: keep off‑screen widgets unmounted
  },
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "tabset",
        weight: 50,
        enableTabStrip: false,
        children: [{ component: "FxWidget", name: "FX Widget" }],
      },
      {
        type: "tabset",
        weight: 50,
        enableTabStrip: false,
        children: [{ component: "RatesWidget", name: "Rates Widget" }],
      },
    ],
  },
};
