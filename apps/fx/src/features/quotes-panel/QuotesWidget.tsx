import React from "react";
import { QuotesPanel } from './QuotesPanel';

const QuotesWidget: React.FC = () => {
  return <QuotesPanel instruments={["EUR/USD", "GBP/USD", "USD/JPY"]} />;
};

export default QuotesWidget;
