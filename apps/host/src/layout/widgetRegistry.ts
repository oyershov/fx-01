import React from 'react';

/**
 * Central place to register widgets that can appear in layout. Keeping this
 * isolated makes it trivial for developers to add/remove widgets without
 * touching core layout code.
 */
export const widgetRegistry = {
  FxQuotesPanel: React.lazy(() => import('fx/QuotesPanel')),
  RatesWidget: React.lazy(() => import('rates/Widget')),
} as const;

export type WidgetId = keyof typeof widgetRegistry;
