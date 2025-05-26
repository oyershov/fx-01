# @fx-01/shared

This package contains the **protocol.ts** which is **canonical definition** of the WebSocket messages
exchanged by the fx-01 front-ends and back-end services.

- **Written once** in TypeScript + Zod  
  (`packages/shared/protocol.ts`)
- **Consumed** by  
  - `@fx-01/ws-server` (Node mock price engine)  
  - `@fx-01/ws-client` (browser singleton wrapper)  
  - every micro-frontend (FX, Rates, …) for static typing
- **Runtime-safe** – both server and client can call  
  `parseMessage(raw)` to validate frames at the boundary.

| Message | Fields | Notes |
|---------|--------|-------|
| `quote` | `instrument`, `bid`, `ask`, `ts`, `id` | Emitted every 200 ms per instrument |
| `hb`    | `ts`                          | Heart-beat (optional) |
| `error` | `msg`                         | Human-readable problem |

## Install

```bash
# inside another workspace package
pnpm add @fx-01/shared
