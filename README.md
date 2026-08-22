# PulseStream // Autonomous Reliability & Vercel Failure Demo

> A mock web application designed as a testbed for automated error-detection, Vercel log-scraping, and autonomous GitHub code repair agents.

---

## 🎯 Purpose of this Repository

This repository is intentionally structured to produce a **reproducible deployment & build failure** when deployed on Vercel or when built locally via `npm run build`.

It is meant to demonstrate automated failure detection workflows:
1. **Triggering Deployment Failure**: Vercel triggers `npm run build` which throws an unresolved import error.
2. **Log Ingestion**: An autonomous agent / webhook pipeline reads the Vercel deployment error logs or GitHub issues.
3. **Automated Diagnosis & Fix**: The agent parses the codebase, locates the typo in `src/main.js`, applies the patch, opens a PR / commits to `main`, and resolves the build failure.

---

## 🚨 The Intentional Failure Details

### The Error in `src/main.js` (Line 11)
```javascript
// Current Broken Code:
import { renderMetrics } from './components/metrics-chart.js';
```

### Expected Vercel Deployment Log Output
```text
[vite]: Rollup failed to resolve import "./components/metrics-chart.js" from "src/main.js".
This is most likely not the problem with Vite itself, but with your project configuration.
error during build:
Error: [vite]: Rollup failed to resolve import "./components/metrics-chart.js" from "src/main.js".
    at error (file:///vercel/path0/node_modules/rollup/dist/es/shared/parseAst.js:337:30)
    at ModuleLoader.handleInvalidResolvedId (file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:19154:24)
Error: Command "npm run build" exited with 1
```

---

## 🛠️ The Solution (How the Agent / You Fixes It)

In [src/main.js](src/main.js), replace `./components/metrics-chart.js` with `./components/metrics.js`:

```diff
- import { renderMetrics } from './components/metrics-chart.js';
+ import { renderMetrics } from './components/metrics.js';
```

Once fixed:
- `npm run build` succeeds cleanly.
- Vercel automatically deploys the modern live telemetry dashboard.

---

## 🚀 Local Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify the Failure (Build Test)
```bash
npm run build
```
*(You will see the build fail with the unresolved import error above).*

### 3. Test Local Development Server
```bash
npm run dev
```

---

## 📦 Vercel Deployment Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build` (or `vite build`)
- **Output Directory**: `dist`
- **Install Command**: `npm install`
