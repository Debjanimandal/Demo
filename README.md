# PulseStream // Cloud Telemetry & Autonomous Reliability Testbed

> A mock web application designed as a testbed for automated error-detection, Vercel build & runtime log scraping, and autonomous GitHub code repair agents.

---

## 🎯 Purpose of this Repository

This repository provides two realistic reliability test scenarios for AI agents, PatchR, and automated remediation bots:

1. **Build / Deploy Failure Scenario** (Pre-Deployment)
2. **Serverless Runtime 500 Failure Scenario** (Post-Deployment / In Production)

---

## 🚨 Production Issue Scenario: Serverless 500 Runtime Exception

### How to Trigger in Production:
- **Option 1**: Visit `https://<your-vercel-domain>/api/telemetry` directly in your browser or via curl.
- **Option 2**: Click the **"Live Health Check"** button on the live dashboard.

### What Happens:
1. The project builds and deploys to Vercel with **0 build errors** (HTTP 200 on the landing page).
2. When the Serverless API route `/api/telemetry` is invoked, it crashes at runtime with a **500 Internal Server Error**.

### The Bug in [api/telemetry.js](api/telemetry.js) (Line 23):
```javascript
// Current Bug: Attempting to access property on undefined when req.query.cluster is missing
const clusterStatus = cluster.status.toUpperCase();
```

### Expected Vercel Runtime Log:
*(Found under **Vercel Project Dashboard → Logs**)*
```text
[ERROR] 22:15:02.124 CRITICAL [500] Telemetry Runtime Exception: Cannot read properties of undefined (reading 'status')
TypeError: Cannot read properties of undefined (reading 'status')
    at handler (/vercel/path0/api/telemetry.js:23:36)
    at ...
```

---

## 🛠️ The Solution (How the Agent / You Fixes It)

In [api/telemetry.js](api/telemetry.js), provide a safe fallback or check:

```diff
- const clusterStatus = cluster.status.toUpperCase();
+ const clusterData = cluster || { status: 'optimal' };
+ const clusterStatus = clusterData.status.toUpperCase();
```

Once patched and pushed to GitHub:
- Vercel automatically deploys the hotfix.
- Calling `/api/telemetry` returns `200 OK` with valid telemetry JSON.
- The live dashboard console turns green.

---

## 🚀 Local Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Test (Verifies build passes cleanly)
```bash
npm run build
```

### 3. Local Development
```bash
npm run dev
```

---

## 📦 Vercel Deployment Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
