import React from 'react';
import styled from '@emotion/styled';
import { type QuoteMsg } from "@fx-01/shared/protocol";

import { QuoteRow } from './QuoteRow';

export const QuotesPanel: React.FC<{ instruments: QuoteMsg["instrument"][] }> = ({ instruments }) => (
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

const Grid = styled.div`
  display: grid;
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
  display: contents;
`;

const Cell = styled.div`
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default QuotesPanel;
