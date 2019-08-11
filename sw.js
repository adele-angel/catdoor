const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/src/js/app.js",
  "/src/js/ui.js",
  "/src/js/materialize.min.js",
  "/src/css/styles.css",
  "/src/css/materialize.min.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "/src/pages/fallback.html",
  "/src/img/logo.svg",
  "/src/video/getting_started.mp4"
];

// cache size limit function
const limitCacheSize = (cacheName, size) => {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size)
        cache.delete(keys[0]).then(limitCacheSize(cacheName, size));
    });
  });
};

// install service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => cache.addAll(assets))
  );
});

// activate event
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", event => {
  if (event.request.url.indexOf("http") === 0) {
    if (event.request.url.indexOf("firestore.googleapis.com") === -1) {
      event.respondWith(
        caches.match(event.request).then(cacheResponse => {
          return (
            cacheResponse ||
            fetch(event.request)
              .then(fetchResponse => {
                return caches.open(dynamicCacheName).then(cache => {
                  cache.put(event.request.url, fetchResponse.clone());
                  limitCacheSize(dynamicCacheName, 15);
                  return fetchResponse;
                });
              })
              .catch(() => {
                if (event.request.url.indexOf(".html") > -1) {
                  return caches.match("/src/pages/fallback.html");
                }
              })
          );
        })
      );
    }
  }
});
