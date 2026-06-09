/**
 * Vercel Speed Insights initialization
 * This file loads and initializes Speed Insights tracking for the site.
 */
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights with default configuration
injectSpeedInsights({
  // Enable debug logging in development
  debug: true,
  // Track all pages (100% sample rate)
  sampleRate: 1,
});
