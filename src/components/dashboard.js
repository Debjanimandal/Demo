/**
 * Core Dashboard View Component
 */

export function renderDashboardView() {
  return `
    <div class="card grid-col-8">
      <div class="card-header">
        <span class="card-title">Active Service Clusters</span>
        <span class="badge badge-pulse">4 Nodes Active</span>
      </div>
      <div class="service-list">
        <div class="service-item">
          <div class="service-meta">
            <span class="status-indicator online"></span>
            <div>
              <div class="service-name">us-east-edge-router</div>
              <div class="service-latency">Vercel Serverless Edge // Region: iad1</div>
            </div>
          </div>
          <span class="status-badge healthy">99.98% Healthy</span>
        </div>
        
        <div class="service-item">
          <div class="service-meta">
            <span class="status-indicator online"></span>
            <div>
              <div class="service-name">auth-token-validator</div>
              <div class="service-latency">Global Auth Cache // Region: fra1</div>
            </div>
          </div>
          <span class="status-badge healthy">12ms Latency</span>
        </div>

        <div class="service-item">
          <div class="service-meta">
            <span class="status-indicator online"></span>
            <div>
              <div class="service-name">event-stream-consumer</div>
              <div class="service-latency">Kinesis / Kafka Bridge // Region: hnd1</div>
            </div>
          </div>
          <span class="status-badge healthy">0 Lag</span>
        </div>
      </div>
    </div>

    <div class="console-card card grid-col-4">
      <div class="console-header">
        <div class="console-dots">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
        </div>
        <div class="console-title">audit.log [stream]</div>
      </div>
      <div class="console-body" id="audit-log-stream">
        <div class="log-line">
          <span class="log-time">[21:55:01]</span>
          <span class="log-level log-info">[INFO]</span>
          <span class="log-msg">Worker process started</span>
        </div>
        <div class="log-line">
          <span class="log-time">[21:55:04]</span>
          <span class="log-level log-success">[OK]</span>
          <span class="log-msg">Health check passed</span>
        </div>
        <div class="log-line">
          <span class="log-time">[21:55:10]</span>
          <span class="log-level log-info">[INFO]</span>
          <span class="log-msg">Telemetry sync nominal</span>
        </div>
      </div>
    </div>
    <div class="card grid-col-12" style="border: 1px solid rgba(239, 68, 68, 0.4); background: linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, rgba(22, 27, 34, 0.8) 100%);">
      <div class="card-header">
        <span class="card-title" style="color: #f87171;">
          <span>🔥</span> Reliability Testbed: Trigger Production Log Error
        </span>
        <span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4);">
          Vercel Logs Generator
        </span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 680px;">
          Click the button below to send an API request to <code>/api/error-trigger</code>. This will immediately log an unhandled <code>TypeError 500</code> exception into your <strong>Vercel Dashboard &rarr; Logs</strong> page for your automated agent to read and fix.
        </p>
        <button id="btn-trigger-prod-error" class="btn" style="background: linear-gradient(135deg, #ef4444, #b91c1c); color: #fff; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);">
          <span>💥</span>
          <span>Click to Generate Error in Vercel Logs</span>
        </button>
      </div>
      <div id="error-trigger-status" style="margin-top: 0.75rem; font-family: var(--font-mono); font-size: 0.8rem; display: none;"></div>
    </div>
  `;
}
