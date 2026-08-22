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
    triggerBtn.addEventListener('click', () => {
      const logStream = document.getElementById('audit-log-stream');
      if (logStream) {
        const time = new Date().toTimeString().split(' ')[0];
        const log = document.createElement('div');
        log.className = 'log-line';
        log.innerHTML = `
          <span class="log-time">[${time}]</span>
          <span class="log-level log-success">[HEALTH]</span>
          <span class="log-msg">Manual health check passed (4 clusters online, 0 errors)</span>
        `;
        logStream.prepend(log);
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
