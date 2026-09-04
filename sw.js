// The Shelf — service worker
// Network-first for the app shell so a fresh deploy is never masked by a
// stale cache (this was almost certainly the cause of "thumbnails work but
// content doesn't" — an old cached index.html/js being served instead of
// the current one). Falls back to cache only when offline.

const CACHE_NAME = 'the-shelf-v2'; // bump this string whenever you redeploy to force a clean cache

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Only handle same-origin GET requests; let everything else (CDN scripts,
  // cross-origin API calls, etc.) pass straight through untouched.
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(req)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        return res;
      })
      .catch(() =>
        caches.match(req).then(cached => cached || Promise.reject('no-match'))
      )
  );
});
