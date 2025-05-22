# FX 01

FX 01 is a modular, domain-driven trading platform designed to demonstrate modern web architecture principles. It provides real-time financial tools and features tailored for multiple market domains, showcasing the power of micro-frontend architecture and scalable development practices.

## ✨ Key Features

### FX Module
- **Quotes**: Real-time live quotes for financial instruments.
- **Instrument Selector**: User selects a financial instrument (e.g., "EUR/USD" or "10Y UST"). Publishes instrument-selected event.
- **Order Entry Panel**: Streamlined interface for placing and managing trades.

### Rates Module
- **Interactive Chart**: Dynamic visualization of market trends and data.
- **Spread Matrix Display**: Comprehensive view of spreads across various instruments.
- **Trade Blotter**: Displays trades history.

## 🏗️ Architecture Overview

- **Micro-Frontend (MFE) Architecture**: Each domain (e.g., FX, Rates) is developed, deployed, and maintained independently, ensuring scalability and flexibility.
- **Module Federation**: Enables runtime loading of remote modules, reducing build times and improving performance.
- **Turborepo Monorepo**: Centralized repository for consistent tooling, dependency management, and streamlined orchestration.
- **Domain Isolation**: Each feature area is encapsulated to enhance maintainability, scalability, and team autonomy.
- **Global State Management**: (Planned) A unified approach to managing shared state across modules.

## 🚀 Getting Started

### Development

To start the platform locally, run the following command:

```bash
pnpm turbo run dev --parallel
```

This command starts the **host** (host application) on port `3000` and dynamically serves the following remote applications:

  - FX Module: Available on port `3001`
  - Rates Module: Available on port `3002`

Prerequisites
  **Node.js**: Ensure you have Node.js installed (v16 or higher recommended).
  **pnpm**: Install pnpm as the package manager for dependency management.

Installation
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

Running the Application
1. Start the host application and remote modules:
```bash
pnpm turbo run dev --parallel
```

2. Open your browser and navigate to http://localhost:3000 to access the platform.
