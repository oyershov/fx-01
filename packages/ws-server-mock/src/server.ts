import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";

/* ── Types ──────────────────────────────────────────────────────────────── */
const PAIRS = ["EUR/USD", "GBP/USD", "USD/JPY"] as const;

export interface QuoteMsg {
  type: "quote";
  instrument: (typeof PAIRS)[number];
  bid: number;
  ask: number;
  ts: number;
  id: string;
}

/* ── Helpers ────────────────────────────────────────────────────────────── */
const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/* ── Price engine ───────────────────────────────────────────────────────── */
type PriceState = Record<(typeof PAIRS)[number], number>;

const state: PriceState = {
  "EUR/USD": 1.12,
  "GBP/USD": 1.26,
  "USD/JPY": 148,
};

function step(): void {
  for (const k of PAIRS) {
    const jump =
      k === "USD/JPY" ? randInt(-2, 2) * 0.01 : randInt(-2, 2) * 0.0001;
    state[k] = +(state[k] + jump).toFixed(k === "USD/JPY" ? 3 : 4);
  }
}

function toMsg(pair: (typeof PAIRS)[number], mid: number): QuoteMsg {
  const spread = pair === "USD/JPY" ? 0.03 : 0.0003; // ≈3 pips
  return {
    type: "quote",
    instrument: pair,
    bid: +(mid - spread / 2).toFixed(pair === "USD/JPY" ? 3 : 5),
    ask: +(mid + spread / 2).toFixed(pair === "USD/JPY" ? 3 : 5),
    ts: Date.now(),
    id: nanoid(), // unique per tick
  };
}

/* ── WebSocket broadcast loop ───────────────────────────────────────────── */
const wss = new WebSocketServer({ port: 4000 });
console.log("🟢  Mock WS on ws://localhost:4000");

setInterval(() => {
  step();
  for (const pair of PAIRS) {
    const payload = JSON.stringify(toMsg(pair, state[pair]));
    wss.clients.forEach(
      (client) => client.readyState === client.OPEN && client.send(payload),
    );
  }
}, 200); // 5 Hz per instrument
