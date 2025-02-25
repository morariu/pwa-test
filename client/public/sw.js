
const CACHE_NAME = 'auth-pwa-v1';
const BASE_PATH = '/pwa-test';
const OFFLINE_URL = `${BASE_PATH}/offline.html`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        OFFLINE_URL,
        `${BASE_PATH}/`,
        `${BASE_PATH}/auth`,
        `${BASE_PATH}/manifest.json`
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return new Response('', {
              status: 404,
              statusText: 'Not Found'
            });
          });
      })
  );
});
