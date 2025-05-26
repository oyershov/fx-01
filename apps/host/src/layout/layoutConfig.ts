import type { IJsonModel } from 'flexlayout-react';

/**
 * Default starter layout when no user‑saved state exists.
 */
export const defaultLayout: IJsonModel = {
  global: {
    splitterSize: 4,
    tabEnableRenderOnDemand: true, // perf: keep off‑screen widgets unmounted
    tabSetEnableSingleTabStretch: true,
  },
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "tabset",
        weight: 50,
        children: [{
          component: "FxWidget",
          name: "FX Widget",
          enableClose: false,
          enablePopout: true
        }],
      },
      {
        type: "tabset",
        weight: 50,
        children: [{
          component: "RatesWidget",
          name: "Rates Widget",
          enableClose: false,
          enablePopout: true
        }],
      },
    ],
  },
};
