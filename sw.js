/* ═══════════════════════════════════════
   StudyOS — Service Worker
   Offline-first caching strategy
   ═══════════════════════════════════════ */

const CACHE_NAME = 'studyos-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/variables.css',
  './css/base.css',
  './css/components.css',
  './css/dashboard.css',
  './css/modules.css',
  './css/animations.css',
  './js/vendor/chart.umd.min.js',
  './js/storage.js',
  './js/router.js',
  './js/dashboard.js',
  './js/study.js',
  './js/focus.js',
  './js/revision.js',
  './js/sleep.js',
  './js/gym.js',
  './js/nutrition.js',
  './js/relax.js',
  './js/memory.js',
  './js/knowledge.js',
  './js/habits.js',
  './js/goals.js',
  './js/analytics.js',
  './js/achievements.js',
  './js/coach.js',
  './js/app.js',
];

// ── Install ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── Activate ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch — Cache First, Network Fallback ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip cross-origin requests (API calls, fonts, CDN)
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return response;
      }).catch(() => {
        // Offline fallback
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
