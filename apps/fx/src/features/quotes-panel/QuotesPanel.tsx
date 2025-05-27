import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import type { QuoteMsg } from "@fx-01/shared/protocol";

import { useQuote } from './useQuote';

/**
 * Keeps the previous value of a variable so we can compare it on the next render.
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * Flash animation for price updates.
 * A subtle background flash is combined with a color tint of the text itself.
 */
const flash = keyframes`
  from { background-color: var(--flash-color); }
  to   { background-color: transparent;    }
`;

interface PriceCellProps {
  direction: "up" | "down" | "none";
}

/*
 * ========  Layout & Basic Cells  ========
 */
const Grid = styled.div`
  display: grid;
  /* 5 columns: Instrument | Bid | Ask | Spread */
  grid-template-columns: 10rem repeat(3, minmax(6rem, 1fr));
  gap: 0.25rem 0.5rem;
  align-items: center;
  font-family: "Inter", sans-serif;
  user-select: none;
`;

const Header = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
  opacity: 0.6;
  display: contents; /* let children flow into the grid */
`;

const Row = styled.div`
  display: contents; /* each cell becomes a grid item */
  font-variant-numeric: tabular-nums; /* monospaced digits for smooth quote changes */
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

const PriceCell = styled(Cell)<PriceCellProps>`
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

const QuoteRow: React.FC<{ instrument: QuoteMsg["instrument"]; precision?: number }> = ({
  instrument,
  precision = 5,
}) => {
  const quote = useQuote(instrument);
  const prev = usePrevious(quote);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }),
    [precision],
  );

  if (!quote) {
    // Before the first tick arrives – show placeholders
    return (
      <Row>
        <InstrumentCell>{instrument}</InstrumentCell>
        <Cell>—</Cell>
        <Cell>—</Cell>
        <Cell>—</Cell>
      </Row>
    );
  }

  const direction: "up" | "down" | "none" = prev
    ? quote.bid > prev.bid
      ? "up"
      : quote.bid < prev.bid
      ? "down"
      : "none"
    : "none";

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

export const QuotesPanel: React.FC<{ instruments: QuoteMsg["instrument"][] }> = ({ instruments }) => {
  return (
    <Grid>
      <Header>
        <Cell>Instrument</Cell>
        <Cell>Bid</Cell>
        <Cell>Ask</Cell>
        <Cell>Spread</Cell>
      </Header>

      {instruments.map((inst) => (
        <QuoteRow key={inst} instrument={inst} />
      ))}
    </Grid>
  );
};

export default QuotesPanel;
