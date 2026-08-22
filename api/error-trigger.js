/**
 * Vercel Serverless Function: /api/error-trigger
 * 
 * When a user clicks the button on the live website, this endpoint is called.
 * It writes a critical error log and responds with 500, causing a red ERROR row
 * to appear in the Vercel Logs dashboard in real-time.
 */

export default function handler(req, res) {
  const timestamp = new Date().toISOString();
  
  // 1. Log critical error directly to Vercel runtime logs
  console.error(`[${timestamp}] 🚨 CRITICAL ERROR: Unhandled exception in telemetry worker`);
  console.error(`TypeError: Cannot read properties of undefined (reading 'cluster_id') at /api/error-trigger.js:18:25`);
  console.error(`    at handler (/vercel/path0/api/error-trigger.js:18:25)`);
  console.error(`    at Server.<anonymous> (/vercel/path0/node_modules/@vercel/node/dist/index.js)`);

  // 2. Return 500 Internal Server Error so Vercel marks this request with a RED 500 badge
  return res.status(500).json({
    error: 'Internal Server Error',
    code: 'UNHANDLED_EXCEPTION',
    message: "Cannot read properties of undefined (reading 'cluster_id')",
    file: '/api/error-trigger.js',
    line: 18,
    timestamp: timestamp
  });
}
