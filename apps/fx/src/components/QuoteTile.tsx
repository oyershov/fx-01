import { type FC } from 'react';
import { useQuote } from '../hooks/useQuote';

interface Props {
  instrument: "EUR/USD" | "GBP/USD" | "USD/JPY";
}

export const QuoteTile: FC<Props> = ({ instrument }) => {
  const quote = useQuote(instrument);

  if (!quote) {
    return (
      <div className="rounded bg-slate-100 p-3 w-40 text-center">
        {instrument}<br />—
      </div>
    );
  }

  const { bid, ask } = quote;
  return (
    <div className="rounded bg-white shadow p-3 w-40 text-center">
      <strong>{instrument}</strong><br />
      <span className="text-green-600">{bid}</span>{" / "}
      <span className="text-red-600">{ask}</span>
    </div>
  );
};
