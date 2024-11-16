self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('todoer-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/js/app.js',
        '/images/favicon.png',
        '/images/favicon160.png',
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
