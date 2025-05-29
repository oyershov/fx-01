import React from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { QuoteMsg } from "@fx-01/shared/protocol";

import { useQuoteData } from './hooks/useQuoteData';
import { usePriceDirection } from './hooks/usePriceDirection';

export const QuoteRow: React.FC<{ instrument: QuoteMsg["instrument"]; precision?: number }> = ({
  instrument,
  precision = 5,
}) => {
  const { quote, prev, formatter } = useQuoteData(instrument, precision);
  const direction = usePriceDirection(quote?.bid, prev?.bid);

  if (!quote) {
    return (
      <Row>
        <InstrumentCell>{instrument}</InstrumentCell>
        <Cell>—</Cell>
        <Cell>—</Cell>
        <Cell>—</Cell>
      </Row>
    );
  }

  const spread = (quote.ask - quote.bid).toFixed(precision);

  return (
    <Row>
      <InstrumentCell>{instrument}</InstrumentCell>
      <PriceCell direction={direction}>{formatter.format(quote.bid)}</PriceCell>
      <PriceCell direction={direction}>{formatter.format(quote.ask)}</PriceCell>
      <SpreadCell>{spread}</SpreadCell>
    </Row>
  );
};

const Row = styled.div`
  display: contents;
  font-variant-numeric: tabular-nums;
  font-size: 0.875rem;
`;

const Cell = styled.div`
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InstrumentCell = styled(Cell)`
  font-weight: 600;
`;

const flash = keyframes`
  from { background-color: var(--flash-color); }
  to   { background-color: transparent; }
`;

const PriceCell = styled(Cell)<{ direction: "up" | "down" | "none" }>`
  text-align: right;
  ${({ direction }) =>
    direction !== "none" &&
    css`
      --flash-color: ${direction === "up" ? "#e2f6e9" : "#fdecea"};
      animation: ${flash} 0.6s ease-out;
      color: ${direction === "up" ? "#1f7a1f" : "#c2252c"};
    `}
`;

const SpreadCell = styled(Cell)`
  text-align: right;
  opacity: 0.8;
`;
