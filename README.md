# FX 01

**FX 01** is a practical example of how to structure a real-time, modular web application using modern tools like **React**, **TypeScript**, **Vite**, and **Module Federation**.

The project happens to simulate a trading platform, but the architecture and patterns here are general — applicable to any complex UI where multiple teams or domains need to work independently, and where live data is involved.

This repo is meant to be useful as a reference, not a framework or starter kit.

## What This Project Tries to Show
- How to build **micro-frontends** that are independently developed and deployed.
- How to use **Module Federation** to load parts of your app at runtime.
- How to set up **WebSocket communication** for real-time updates.
- How to organize shared logic and types across apps in a **monorepo**.
- How to use a **publish/subscribe pattern** to coordinate loosely coupled components.

## Tech Stack
- **React + TypeScript**: for all frontends.
- **Vite**: fast local dev and build.
- **Webpack Module Federation**: for runtime integration between apps.
- **Turborepo**: to manage builds across the monorepo.
- **WebSocket**: for live updates.
- **Custom Event Bus**: for loosely coupled global state management.

## 📁 Monorepo Structure
The repository is organized into two primary directories: `apps/` and `packages/`.

### 🧩 `apps/` — Micro-frontend Applications

Each subdirectory under `apps/` represents an independently deployable application, aligning with specific business domains or hosting responsibilities.

- `host/`: Main container application. Handles layout and routing, loads other apps via module federation.
- `fx/`: Foreign exchange domain. Contains:
  - **Quotes Panel**: Displays real-time FX quotes.
  - **Instrument Selector**: Allows users to select financial instruments (e.g., "EUR/USD").
  - **Order Entry Panel**: Interface for placing and managing FX trades. (not available)
- `rates/`: Dedicated to Rates trading features. Exposes components such as:
  - **Interactive Chart**: Visualizes market trends and data.
  - **Spread Matrix Display**: Shows spreads across various instruments. (not available)
  - **Trade Blotter**: Displays trade history. (not available)

> While this project uses finance as the domain, these apps could represent any product areas — analytics, logistics, health data, etc.

---

### 🧱 `packages/` — Shared Libraries and Utilities

Shared code and utilities are housed here to promote reusability and maintain consistency across applications.

- `shared/`: Type definitions and protocols shared across apps and services.
- `ws-client/`: WebSocket client abstraction - shared singleton connection, auto-reconnect, validation using shared protocol.
- `ws-server/`: Simulated WebSocket server for broadcasting real-time messages.
- `event/`: Simple pub/sub utility for decoupled communication between components (e.g., one app can react when another changes a selected item).

## How It Works
- **Each app is built independently** using Vite + React + TypeScript.
- **Host loads remote apps** dynamically at runtime using Webpack Module Federation.
- **Apps communicate via events** (publish/subscribe) or shared global state.
- **WebSocket server** broadcasts simulated data. Clients listen and react in real time.
- Everything is wired together in a **monorepo with Turborepo** to manage builds and scripts efficiently.

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- pnpm (used for workspace-aware installs and scripts)

### Setup
```bash
git clone <repository-url>
cd fx-01
pnpm install
```

### Run All Apps

```bash
pnpm turbo run dev --parallel
```

Apps will be available at:
- **Host**: http://localhost:3000
- **FX**: http://localhost:3001
- **Rates**: http://localhost:3002
- **WS server**: http://localhost:4000

Open http://localhost:3000 in your browser to see the full platform.

**Enjoy!**
