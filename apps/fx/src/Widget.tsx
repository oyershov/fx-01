import { QuoteTile } from './components/QuoteTile';

export default function Widget() {
  return (
    <div className="flex gap-4">
      <QuoteTile instrument="EUR/USD" />
      <QuoteTile instrument="GBP/USD" />
      <QuoteTile instrument="USD/JPY" />
    </div>
  )
}
