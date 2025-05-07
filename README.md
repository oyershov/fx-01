# FX 01
FX 01 is a modular trading platform demonstrating domain-driven separation and modern web architecture. It showcases real-time financial tools across multiple market areas.

## ✨ Key Features
### FX Module
- Market Watch with live quotes
- Order Entry panel

### Rates Module
- Interactive Chart
- Spread Matrix display

## 🏗️ Architecture
- Micro-Frontend (MFE) architecture: Each domain (e.g., FX, Rates) is developed and deployed independently.
- Module Federation: Enables dynamic, runtime loading of remote modules for better scalability and performance.
- Nx Monorepo: Used for orchestration, consistent tooling, and streamlined dependency management.
- Domain Isolation: Each feature area is encapsulated for maintainability and team autonomy.
- Global State Management: TBD
