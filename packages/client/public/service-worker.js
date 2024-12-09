const CACHE_NAME = 'cache-v1';
const ASSETS_MANIFEST = '/manifest.json';

self.addEventListener('install', event => {
  event.waitUntil(
    fetch(ASSETS_MANIFEST)
      .then(response => response.json())
      .then(manifest => {
        const assetsToCache = Object.values(manifest).map(item => item.file);
        return caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(assetsToCache);
        });
      }),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME).map(name => caches.delete(name)),
      );
    }),
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    }),
  );
});
