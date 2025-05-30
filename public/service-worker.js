
const CACHE_NAME = 'olympic-calendar-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Add paths to your JS/CSS bundles if they are not CDN-hosted and have stable names
  // For this example, Tailwind is from CDN and JS bundles might have hashed names
  // So, we mainly cache the entry points and icons.
  // The actual JS bundles from the build process (e.g. main.js, vendor.js) should also be listed here.
  // For simplicity, assuming Vite or similar bundler outputs to /assets/
  // This part needs to be adjusted based on the actual build output.
  // For now, focusing on core static assets.
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
  // Tailwind CSS is cached by the browser due to CDN, but SW can also cache it if needed.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add core assets that are known at build time
        // For dynamic assets or CDN resources, use fetch event.
        return cache.addAll(urlsToCache.filter(url => !url.startsWith('http')));
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic' && !response.type === 'cors') {
              if (response.type === 'opaque' && event.request.url.includes('cdn.tailwindcss.com')) {
                 // Allow opaque responses for CDN resources like Tailwind
              } else {
                return response; // Don't cache invalid responses unless it's an opaque CDN resource
              }
            }
            
            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                 // Cache opaque responses for CDN resources
                if (response.type === 'opaque' && event.request.url.includes('cdn.tailwindcss.com')) {
                    cache.put(event.request, responseToCache);
                } else if (response.type === 'basic' || response.type === 'cors') {
                    cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});