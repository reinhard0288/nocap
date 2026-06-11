const CACHE = 'nocap-v3';

// On install - cache nothing, just activate immediately
self.addEventListener('install', e => {
  self.skipWaiting();
});

// On activate - delete ALL old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        console.log('deleting cache:', key);
        return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

// Never serve from cache - always fetch fresh from network
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
