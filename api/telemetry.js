/**
 * Vercel Serverless Function: /api/telemetry
 * 
 * ==============================================================================
 * ⚠️ INTENTIONAL PRODUCTION RUNTIME ERROR SCENARIO
 * ==============================================================================
 * Purpose: This file builds and deploys cleanly to Vercel with 0 build errors.
 * However, when called at runtime (GET /api/telemetry), it throws a 500 error:
 * 
 * Vercel Runtime Log Output:
 * [ERROR] TypeError: Cannot read properties of undefined (reading 'status')
 *     at handler (/vercel/path0/api/telemetry.js:23:36)
 * 
 * 🔧 THE FIX FOR AUTOMATED REPAIR AGENTS / PATCH PIPELINES:
 * Ensure safe fallback or null-check:
 * const clusterData = req.query?.cluster ? JSON.parse(req.query.cluster) : { name: 'primary-edge', status: 'optimal' };
 * ==============================================================================
 */

export default function handler(req, res) {
  try {
    const { cluster } = req.query;

    // ⚠️ RUNTIME CRASH: 'cluster' is undefined when called without query params,
    // causing an unhandled TypeError in production:
    const clusterStatus = cluster.status.toUpperCase();

    return res.status(200).json({
      service: 'PulseStream Telemetry Engine',
      timestamp: new Date().toISOString(),
      cluster: cluster,
      status: clusterStatus,
      uptime: '99.99%'
    });
  } catch (error) {
    console.error('CRITICAL [500] Telemetry Runtime Exception:', error.message);
    console.error(error.stack);
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      hint: 'Check Vercel Runtime Logs for full stack trace'
    });
  }
}
