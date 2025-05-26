# @fx-01/ws-client

A singleton wrapper that opens **one** live connection to
`ws://localhost:4000`, validates frames with `@fx-01/shared/protocol`, and
reconnects automatically.

```ts
import { quotesSocket } from "@fx-01/ws-client";

const unsubscribe = quotesSocket.onQuote((q) => {
  console.log(q.instrument, q.bid, q.ask);
});

// later…
unsubscribe();
