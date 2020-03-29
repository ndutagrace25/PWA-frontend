const staticCacheName = "destination-laikipia-static-v104";
const dynamicCatcheName = "site-dynamic-v3";

const assets = [
    "/",
    "/index.html",
    "/pages/riders.html",
    '/pages/vendor.html',
    '/pages/fallback.html',
    '/js/script.js',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    '/img/icons/icon-72x72.png',
    '/img/icons/icon-96x96.png',
    '/img/icons/icon-128x128.png',
    '/img/icons/icon-144x144.png',
    '/img/icons/icon-152x152.png',
    '/img/icons/icon-192x192.png',
    '/img/icons/icon-384x384.png',
    '/img/icons/icon-512x512.png',
    '/img/Boda Boda.svg',
    '/img/Boda.svg',
    '/img/Bucheries.svg',
    '/img/Cargo.svg',
    '/img/Eateries.svg',
    '/img/Gas.svg',
    '/img/Groceries.svg',
    '/img/Pharmaceuticals.svg',
    '/img/Services.svg',
    '/img/Shops.svg',
    '/img/Taxi.svg',
    '/img/Wines & Spirits.svg',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    'https://unpkg.com/axios/dist/axios.min.js'
];

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

// Install SW
self.addEventListener("install", evt => {
    // console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            // console.log("caching shell assets");
            cache.addAll(assets);
        })
    );
});

// Activate event
self.addEventListener("activate", evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            return Promise.all(
                keys
                .filter(key => key !== staticCacheName && key !== dynamicCatcheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch event
self.addEventListener("fetch", evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches
        .match(evt.request)
        .then(cacheRes => {
            return (
                cacheRes ||
                fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicCatcheName).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone());
                        limitCacheSize(dynamicCatcheName, 50);
                        return fetchRes;
                    });
                })
            );
        })
        .catch(() => {
            if (evt.request.url.indexOf(".html") > -1) {
                return caches.match("/pages/fallback.html");
            }
        })
    );
});