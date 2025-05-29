# FX 01

**FX 01** is a modular, real-time trading platform showcasing modern web architecture principles. Built with **React**, **TypeScript** and **Module Federation**, it demonstrates scalable development practices through micro-frontend architecture and domain-driven design.

## ✨ Monorepo Structure
The repository is organized into two primary directories: `apps/` and `packages/`.

### 🧩 `apps/` — Micro-frontend Applications

Each subdirectory under `apps/` represents an independently deployable application, aligning with specific business domains or hosting responsibilities.

- `host/`: The main shell application responsible for layout, routing, and orchestrating micro-frontends. It dynamically loads remote modules from other apps.
- `fx/`: Focused on Foreign Exchange (FX) trading functionalities. Exposes components like:
  - **Quotes Panel**: Displays real-time FX quotes.
  - **Instrument Selector**: Allows users to select financial instruments (e.g., "EUR/USD").
  - **Order Entry Panel**: Interface for placing and managing FX trades.
- `rates/`: Dedicated to Rates trading features. Exposes components such as:
  - **Interactive Chart**: Visualizes market trends and data.
  - **Spread Matrix Display**: Shows spreads across various instruments.
  - **Trade Blotter**: Displays trade history.

---

### 🧱 `packages/` — Shared Libraries and Utilities

Shared code and utilities are housed here to promote reusability and maintain consistency across applications.

- `shared/`: Acts as the "shared kernel" containing:
  - `protocol.ts`: Canonical definitions of WebSocket messages exchanged between front-ends and back-end services.
- `ws-client/`: A singleton wrapper that establishes a single live WebSocket connection. It validates frames using `@fx-01/shared/protocol` and handles automatic reconnections.
- `ws-server/`: The WebSocket server implementation that broadcasts real-time data to connected clients.
- `event/`: Provides a publish-subscribe mechanism for custom events, facilitating communication between applications. For instance, when the Instrument Selector changes the selected pair, the Chart component can react accordingly. Consider it like a global state management.


## 🏗️ Architecture Overview

- **Micro-Frontend (MFE) Architecture**: Each domain (e.g., FX, Rates) is developed, deployed, and maintained independently, ensuring scalability and flexibility.
- **Module Federation**: Enables runtime loading of remote modules, reducing build times and improving performance.
- **Turborepo Monorepo**: Centralized repository for consistent tooling, dependency management, and streamlined orchestration.
- **Domain Isolation**: Each feature area is encapsulated to enhance maintainability, scalability, and team autonomy.
- **Real-Time Communication**: WebSocket integration provides live updates across the platform.
- **Global State Management**: PubSub mechanism has been used to communicate across micro-frontends.


## 🚀 Getting Started

### Prerequisites
  **Node.js**: Ensure you have Node.js installed (v16 or higher recommended).
  **pnpm**: Install pnpm as the package manager for dependency management.

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd fx-01
```

3. Install dependencies:
```bash
pnpm install
```

### Running the Application

1. Start all applications in parallel:

```bash
pnpm turbo run dev --parallel
```

This command launches the following applications:
- **Host**: http://localhost:3000
- **FX**: http://localhost:3001
- **Rates**: http://localhost:3002
- **WS server**: http://localhost:4000

2. Open your browser and navigate to http://localhost:3000 to access the platform.
