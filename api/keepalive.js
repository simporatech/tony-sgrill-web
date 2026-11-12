import { createClient } from '@supabase/supabase-js';

/**
 * Vercel Serverless Function: Supabase Keep-Alive Ping
 * 
 * Scheduled to run once daily via Vercel Crons to prevent
 * the Supabase project on the free tier from pausing due to inactivity.
 */
export default async function handler(req, res) {
  // Only allow GET and POST requests
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Use GET or POST.',
    });
  }

  // Read environment variables via process.env for Node.js runtime on Vercel
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    return res.status(500).json({
      success: false,
      error: 'Supabase credentials are not configured in environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).',
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Extremely lightweight query to wake up and ping the PostgreSQL database
    const { data, error } = await supabase
      .from('menu_categories')
      .select('id')
      .limit(1);

    if (error) {
      console.error('[Keep-Alive] Supabase ping query failed:', error);
      return res.status(502).json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tony's Grill Supabase project keep-alive ping executed successfully.",
      count: data ? data.length : 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Keep-Alive] Unhandled serverless function error:', err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown server error during keep-alive execution.',
      timestamp: new Date().toISOString(),
    });
  }
}
