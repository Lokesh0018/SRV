// Route chunks, shared by the lazy() routes in App.tsx and the prefetching below.
// import() is cached by the browser, so prefetching then navigating costs one fetch.
const loaders = {
  '/': () => import('./pages/Home'),
  '/about': () => import('./pages/About'),
  '/services': () => import('./pages/Services'),
  '/contact': () => import('./pages/Contact'),
} as const;

export type RoutePath = keyof typeof loaders;
export const loadRoute = loaders;

const requested = new Set<string>();

/** Start downloading a page's JS/CSS ahead of navigation (on hover, focus or touch). */
export function prefetchRoute(path: string) {
  const load = loaders[path as RoutePath];
  if (!load || requested.has(path)) return;
  requested.add(path);
  load().catch(() => requested.delete(path));
}

/**
 * Once the current page has loaded and the browser is idle, warm the other
 * routes so in-app navigation is instant. Skipped for Data Saver and 2G.
 */
export function prefetchAllWhenIdle() {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')) return;

  const run = () => Object.keys(loaders).forEach(prefetchRoute);
  const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(run, { timeout: 4000 }) : setTimeout(run, 1500));
  // wait for the current page's own assets (hero video, images) to get first claim on the network
  if (document.readyState === 'complete') setTimeout(idle, 2000);
  else window.addEventListener('load', () => setTimeout(idle, 2000), { once: true });
}
