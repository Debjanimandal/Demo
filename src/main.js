import './style.css';
import { renderDashboardView } from './components/dashboard.js';

// ==============================================================================
// ⚠️ INTENTIONAL DEPLOYMENT/BUILD FAILURE TEST SCENARIO
// ==============================================================================
// Purpose: This line causes Vercel (or `npm run build`) to fail with:
// "Rollup failed to resolve import './components/metrics-chart.js' from 'src/main.js'"
//
// 🔧 THE FIX FOR AUTOMATED REPAIR AGENTS / PATCH PIPELINES:
// Change './components/metrics-chart.js' to './components/metrics.js'
// ==============================================================================
import { renderMetrics } from './components/metrics.js';

function initApp() {
  const root = document.getElementById('dashboard-root');
  if (!root) return;

  const metricsHtml = renderMetrics();
  const dashboardHtml = renderDashboardView();

  root.innerHTML = metricsHtml + dashboardHtml;

  // Setup interactive demo handlers
  setupInteractions();
}

function setupInteractions() {
  const triggerBtn = document.getElementById('btn-trigger-action');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', async () => {
      const logStream = document.getElementById('audit-log-stream');
      const time = new Date().toTimeString().split(' ')[0];

      if (logStream) {
        const pingLog = document.createElement('div');
        pingLog.className = 'log-line';
        pingLog.innerHTML = `
          <span class="log-time">[${time}]</span>
          <span class="log-level log-info">[HTTP]</span>
          <span class="log-msg">Invoking Serverless Endpoint: GET /api/telemetry...</span>
        `;
        logStream.prepend(pingLog);
      }

      try {
        const res = await fetch('/api/telemetry');
        const data = await res.json();

        if (logStream) {
          const log = document.createElement('div');
          log.className = 'log-line';
          if (res.ok) {
            log.innerHTML = `
              <span class="log-time">[${time}]</span>
              <span class="log-level log-success">[200 OK]</span>
              <span class="log-msg">Telemetry sync nominal: ${data.status}</span>
            `;
          } else {
            log.innerHTML = `
              <span class="log-time">[${time}]</span>
              <span class="log-level log-warn" style="color: var(--danger);">[500 ERROR]</span>
              <span class="log-msg" style="color: #ff7b72;">Serverless Crash: "${data.message || data.error}" (Check Vercel Runtime Logs)</span>
            `;
          }
          logStream.prepend(log);
        }
      } catch (err) {
        if (logStream) {
          const errLog = document.createElement('div');
          errLog.className = 'log-line';
          errLog.innerHTML = `
            <span class="log-time">[${time}]</span>
            <span class="log-level log-warn" style="color: var(--danger);">[FETCH FAIL]</span>
            <span class="log-msg" style="color: #ff7b72;">${err.message}</span>
          `;
          logStream.prepend(errLog);
        }
      }
    });
  }

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
