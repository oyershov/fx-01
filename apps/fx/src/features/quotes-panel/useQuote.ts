import { useEffect, useState } from "react";
import { quotesSocket } from "@fx-01/ws-client";
import type { QuoteMsg } from "@fx-01/shared/protocol";

/**
 * Live quote for a single instrument.
 *
 * @param instrument e.g. "EUR/USD"
 * @returns the most recent QuoteMsg (or null before the first tick)
 */
export function useQuote(instrument: QuoteMsg["instrument"]) {
  const [quote, setQuote] = useState<QuoteMsg | null>(null);

  useEffect(() => {
    // Subscribe to quotes for the chosen instrument
    const unsubscribe = quotesSocket.onQuote((msg) => {
      if (msg.instrument === instrument) setQuote(msg);
    });

    // Cleanup: remove the listener; wrapper returns void
    return () => {
      unsubscribe();
    };
  }, [instrument]);

  return quote;
}

