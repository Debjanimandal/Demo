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
  `;
}
