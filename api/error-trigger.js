/**
 * Vercel Serverless Function: /api/error-trigger
 * 
 * Supports two modes:
 * - mode="error" (or default): Throws runtime TypeError and returns 500 (logs error in Vercel Logs).
 * - mode="healthy": Resolves safely and returns 200 OK (logs healthy request in Vercel Logs).
 */

export default function handler(req, res) {
  const { mode } = req.query;
  const timestamp = new Date().toISOString();

  if (mode === 'healthy') {
    // 🟢 Healthy Resolved State:
    console.log(`[${timestamp}] [INFO] [200 OK] Telemetry pipeline operational. Auto-remediation validated.`);
    return res.status(200).json({
      status: 'healthy',
      mode: 'healthy',
      message: 'System operating normally. All clusters online.',
      timestamp: timestamp
    });
  }

  // 🔴 Error Failure State:
  // Log critical error directly to Vercel runtime logs
  console.error(`[${timestamp}] 🚨 CRITICAL ERROR: Unhandled exception in telemetry worker`);
  console.error(`TypeError: Cannot read properties of undefined (reading 'cluster_id') at /api/error-trigger.js:25:25`);
  console.error(`    at handler (/vercel/path0/api/error-trigger.js:25:25)`);
  console.error(`    at Server.<anonymous> (/vercel/path0/node_modules/@vercel/node/dist/index.js)`);

  return res.status(500).json({
    error: 'Internal Server Error',
    code: 'UNHANDLED_EXCEPTION',
    mode: 'error',
    message: "Cannot read properties of undefined (reading 'cluster_id')",
    file: '/api/error-trigger.js',
    line: 25,
    timestamp: timestamp
  });
}
