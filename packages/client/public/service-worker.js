const CACHE_NAME = `cache-v-1.0.0`;
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
      })
      .catch(() => {
        throw new Error('No assets manifest found');
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

// Only network fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (
          response.status < 200 ||
          response.status > 300 ||
          response.type !== 'basic' ||
          !response
        ) {
          return response;
        }
        const responseToCache = response.clone();
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
          return response;
        });
      })
      .catch(() => {
        return caches.open(CACHE_NAME).then(cache => {
          return cache.match(event.request).then(response => {
            if (response) {
              return response;
            }
            return new Response('Нет доступных данных для оффлайн режима', {
              status: 503,
              statusText: 'Service Unavailable',
            });
          });
        });
      }),
  );
});
