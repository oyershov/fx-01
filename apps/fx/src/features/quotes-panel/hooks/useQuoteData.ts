import { useMemo } from 'react';
import type { QuoteMsg } from "@fx-01/shared/protocol";

import { usePrevious } from './usePrevious';
import { useQuote } from './useQuote';

export function useQuoteData(instrument: QuoteMsg["instrument"], precision: number = 5) {
  const quote = useQuote(instrument);
  const prev = usePrevious(quote);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }),
    [precision]
  );

  return { quote, prev, formatter };
}
