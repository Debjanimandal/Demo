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

  let isHealthyMode = false;
  const modeSwitch = document.getElementById('mode-toggle-switch');
  const testbedCard = document.getElementById('testbed-card');
  const testbedTitle = document.getElementById('testbed-title');
  const testbedBadge = document.getElementById('testbed-badge');
  const toggleLabel = document.getElementById('toggle-label');
  const testbedDesc = document.getElementById('testbed-desc');
  const btnIcon = document.getElementById('btn-icon');
  const btnText = document.getElementById('btn-text');
  const prodErrorBtn = document.getElementById('btn-trigger-prod-error');

  if (modeSwitch) {
    modeSwitch.addEventListener('change', (e) => {
      isHealthyMode = e.target.checked;
      
      if (isHealthyMode) {
        // Switch to Healthy Mode (200 OK)
        testbedCard.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        testbedCard.style.background = 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(22, 27, 34, 0.8) 100%)';
        testbedTitle.style.color = '#34d399';
        testbedTitle.innerHTML = '<span>🟢</span> Live Reliability Simulator (Resolved State)';
        testbedBadge.style.background = 'rgba(16, 185, 129, 0.2)';
        testbedBadge.style.color = '#34d399';
        testbedBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        testbedBadge.innerText = 'Active State: 200 OK';
        toggleLabel.innerText = 'Healthy Mode (200 OK)';
        toggleLabel.style.color = '#34d399';
        testbedDesc.innerHTML = 'Currently set to <strong>Healthy / Resolved Mode</strong>. Clicking the button will execute <code>/api/error-trigger?mode=healthy</code>, writing a healthy <code>200 OK</code> event into your <strong>Vercel Runtime Logs</strong>.';
        prodErrorBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        prodErrorBtn.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.4)';
        btnIcon.innerText = '✨';
        btnText.innerText = 'Fire Healthy Request (200 OK in Logs)';
      } else {
        // Switch to Error Mode (500)
        testbedCard.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        testbedCard.style.background = 'linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, rgba(22, 27, 34, 0.8) 100%)';
        testbedTitle.style.color = '#f87171';
        testbedTitle.innerHTML = '<span>🔥</span> Live Reliability Simulator';
        testbedBadge.style.background = 'rgba(239, 68, 68, 0.2)';
        testbedBadge.style.color = '#f87171';
        testbedBadge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        testbedBadge.innerText = 'Active State: 500 ERROR';
        toggleLabel.innerText = 'Failure Mode (500)';
        toggleLabel.style.color = 'var(--text-primary)';
        testbedDesc.innerHTML = 'Currently set to <strong>Failure Mode</strong>. Clicking the button will execute <code>/api/error-trigger?mode=error</code>, writing an unhandled <code>TypeError 500</code> into your <strong>Vercel Runtime Logs</strong>. Flip the switch above to reverse to <strong>Healthy Mode (200 OK)</strong>.';
        prodErrorBtn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
        prodErrorBtn.style.boxShadow = '0 4px 14px rgba(239, 68, 68, 0.4)';
        btnIcon.innerText = '💥';
        btnText.innerText = 'Generate Error in Vercel Logs';
      }
    });
  }

  if (prodErrorBtn) {
    prodErrorBtn.addEventListener('click', async () => {
      const statusDiv = document.getElementById('error-trigger-status');
      const logStream = document.getElementById('audit-log-stream');
      const time = new Date().toTimeString().split(' ')[0];
      const endpoint = isHealthyMode ? '/api/error-trigger?mode=healthy' : '/api/error-trigger?mode=error';

      if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.style.color = isHealthyMode ? '#34d399' : '#f87171';
        statusDiv.innerHTML = `⏳ Sending request to <code>${endpoint}</code>...`;
      }

      try {
        const res = await fetch(endpoint);
        const data = await res.json();

        if (statusDiv) {
          if (res.ok) {
            statusDiv.style.color = '#34d399';
            statusDiv.innerHTML = `✅ <strong>HTTP 200 OK Logged!</strong> Successful execution recorded in Vercel. Open your <a href="https://vercel.com/ayushman-guptas-projects-1a929afd/demo/logs" target="_blank" style="color: #34d399; text-decoration: underline;">Vercel Logs tab</a> to see the green 200 log!`;
          } else {
            statusDiv.style.color = '#f87171';
            statusDiv.innerHTML = `❌ <strong>HTTP 500 Recorded!</strong> Critical error log dispatched to Vercel. Open your <a href="https://vercel.com/ayushman-guptas-projects-1a929afd/demo/logs" target="_blank" style="color: #60a5fa; text-decoration: underline;">Vercel Logs tab</a> and click <strong>Refresh Query</strong> to see the log!`;
          }
        }

        if (logStream) {
          const log = document.createElement('div');
          log.className = 'log-line';
          if (res.ok) {
            log.innerHTML = `
              <span class="log-time">[${time}]</span>
              <span class="log-level log-success">[200 OK]</span>
              <span class="log-msg">/api/error-trigger: "${data.message}"</span>
            `;
          } else {
            log.innerHTML = `
              <span class="log-time">[${time}]</span>
              <span class="log-level log-warn" style="color: var(--danger);">[500 CRASH]</span>
              <span class="log-msg" style="color: #ff7b72;">/api/error-trigger: "${data.message}"</span>
            `;
          }
          logStream.prepend(log);
        }
      } catch (err) {
        if (statusDiv) {
          statusDiv.innerHTML = `Request processed. Check Vercel backend logs.`;
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
