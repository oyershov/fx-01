/**
 * ---------------------------------------------------------------------------
 * WebSocket protocol
 * ---------------------------------------------------------------------------
 *  • Pure TypeScript (no Node-only APIs)
 *  • Zod schemas => runtime validation
 *  • Inferred types => compile-time contract   (QuoteMsg, HeartbeatMsg…)
 * ---------------------------------------------------------------------------
 */

import { z } from 'zod';

/* ───────────────────────── 1. Common constants ────────────────────────── */

export const PAIRS = ["EUR/USD", "GBP/USD", "USD/JPY"] as const;
export type Pair = (typeof PAIRS)[number];

/* ───────────────────────── 2. Quote message ───────────────────────────── */

const QuoteMsgSchema = z.object({
  type:       z.literal("quote"),
  instrument: z.enum(PAIRS),
  bid:        z.number(),
  ask:        z.number(),
  ts:         z.number().int(),
  id:         z.string(),
});

export type QuoteMsg = z.infer<typeof QuoteMsgSchema>;

/* ───────────────────────── 3. Extra messages (optional) ───────────────── */

const HeartbeatMsgSchema = z.object({
  type: z.literal("hb"),
  ts:   z.number().int(),
});
export type HeartbeatMsg = z.infer<typeof HeartbeatMsgSchema>;

const ErrorMsgSchema = z.object({
  type: z.literal("error"),
  msg:  z.string(),
});
export type ErrorMsg = z.infer<typeof ErrorMsgSchema>;

/* ───────────────────────── 4. Union & helpers ─────────────────────────── */

export type InboundMsg = QuoteMsg | HeartbeatMsg | ErrorMsg;

/** Runtime discriminators (shared by server & client) */
export const schemas = {
  quote: QuoteMsgSchema,
  hb:    HeartbeatMsgSchema,
  error: ErrorMsgSchema,
};

/**
 * Parse an unknown frame coming from the socket.
 * Throws ZodError on failure — caller decides how to handle.
 */
export function parseMessage(raw: unknown): InboundMsg {
  if (!raw || typeof raw !== "object" || !("type" in raw)) {
    throw new Error("Malformed frame: missing type");
  }
  switch (raw.type) {
    case "quote": return QuoteMsgSchema.parse(raw);
    case "hb":    return HeartbeatMsgSchema.parse(raw);
    case "error": return ErrorMsgSchema.parse(raw);
    default:      throw new Error(`Unknown frame type ${raw.type}`);
  }
}
