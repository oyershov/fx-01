import {
  parseMessage,
  QuoteMsg,
  InboundMsg,
} from '@fx-01/shared/protocol';

export type ConnectionStatus =
  | "connecting"
  | "open"
  | "closed"
  | "reconnecting"
  | "error";

type QuoteHandler = (msg: QuoteMsg) => void;
type StatusHandler = (s: ConnectionStatus) => void;

class QuotesSocket {
  /* ------------------------------------------------------------------ */
  private ws: WebSocket | null = null;
  private url: string;

  private quoteSubs   = new Set<QuoteHandler>();
  private statusSubs  = new Set<StatusHandler>();

  private reconnectAttempts = 0;
  private reconnectTimer: number | null = null;

  private heartbeatInterval = 15_000;          // 15 s
  private heartbeatTimer: number | null = null;
  private lastRx = Date.now();

  /* ------------------------------------------------------------------ */
  constructor(url = "ws://localhost:4000") {
    this.url = url;
    this.open();
  }

  /* ---------- public API -------------------------------------------- */
  /** Subscribe to live quotes. Returns an unsubscribe fn. */
  onQuote(fn: QuoteHandler) {
    this.quoteSubs.add(fn);
    return () => this.quoteSubs.delete(fn);
  }

  /** Subscribe to connection-status changes. */
  onStatus(fn: StatusHandler) {
    this.statusSubs.add(fn);
    return () => this.statusSubs.delete(fn);
  }

  /** Manually close the socket (rarely needed). */
  close() {
    this.clearTimers();
    this.ws?.close(1000, "client closed");
    this.ws = null;
  }

  /* ---------- internals --------------------------------------------- */
  private open() {
    this.emitStatus(this.reconnectAttempts ? "reconnecting" : "connecting");

    this.ws = new WebSocket(this.url);

    /* --------------- events ---------------- */
    this.ws.addEventListener("open", () => {
      this.reconnectAttempts = 0;
      this.emitStatus("open");
      this.scheduleHeartbeat();
    });

    this.ws.addEventListener("message", (ev) => this.handleMessage(ev.data));

    this.ws.addEventListener("close", () => {
      this.emitStatus("closed");
      this.scheduleReconnect();
    });

    this.ws.addEventListener("error", (err) => {
      console.error("[ws-client] socket error", err);
      this.emitStatus("error");
      // ‘error’ is usually followed by ‘close’, where we schedule reconnect
    });
  }

  private handleMessage(raw: string) {
    this.lastRx = Date.now();

    let msg: InboundMsg;
    try {
      msg = parseMessage(JSON.parse(raw));
    } catch (e) {
      console.warn("[ws-client] invalid frame discarded", e);
      return;
    }

    if (msg.type === "quote") {
      this.quoteSubs.forEach((fn) => fn(msg));
    }
    /* hb & error need no extra handling here */
  }

  /* ---------- heartbeat & reconnect --------------------------------- */
  private scheduleHeartbeat() {
    this.clearHeartbeat();
    this.heartbeatTimer = window.setInterval(() => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

      const now = Date.now();
      if (now - this.lastRx > this.heartbeatInterval * 2) {
        // no traffic in ~30 s → reconnect
        console.warn("[ws-client] stale connection → reconnect");
        this.ws.close(4000, "stale");
        return;
      }

      // Send tiny textual heartbeat; server echoes ‘hb’
      this.ws.send(JSON.stringify({ type: "hb", ts: now }));
    }, this.heartbeatInterval);
  }

  private scheduleReconnect() {
    if (this.reconnectTimer !== null) return; // already scheduled

    const delay = Math.min(500 * 2 ** this.reconnectAttempts, 30_000);
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      this.reconnectAttempts += 1;
      this.open();
    }, delay);
  }

  /* ---------- helpers ----------------------------------------------- */
  private emitStatus(s: ConnectionStatus) {
    this.statusSubs.forEach((fn) => fn(s));
  }

  private clearHeartbeat() {
    if (this.heartbeatTimer !== null) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private clearTimers() {
    this.clearHeartbeat();
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}

export const quotesSocket = new QuotesSocket();
