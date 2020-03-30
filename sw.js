const staticCacheName = "destination-laikipia-static-v4";

const assets = [
    "/",
    "/index.html",
    "/pages/riders.html",
    "/pages/vendor.html",
    "/pages/fallback.html",
    "/js/script.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/css/styles.css",
    "/img/icons/icon-72x72.png",
    "/img/icons/icon-96x96.png",
    "/img/icons/icon-128x128.png",
    "/img/icons/icon-144x144.png",
    "/img/icons/icon-152x152.png",
    "/img/icons/icon-192x192.png",
    "/img/icons/icon-384x384.png",
    "/img/icons/icon-512x512.png",
    "/img/Boda Boda.svg",
    "/img/Boda.svg",
    "/img/Bucheries.svg",
    "/img/Cargo.svg",
    "/img/Eateries.svg",
    "/img/Gas.svg",
    "/img/Groceries.svg",
    "/img/Pharmaceuticals.svg",
    "/img/Services.svg",
    "/img/Shops.svg",
    "/img/Taxi.svg",
    "/img/Wines & Spirits.svg",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    "https://unpkg.com/axios/dist/axios.min.js"
];

// Install SW
self.addEventListener("install", evt => {
    // console.log('service worker installed');
    evt.waitUntil(
        caches
        .open(staticCacheName)
        .then(cache => {
            // console.log('caching shell assets', assets);
            cache.addAll(assets);
        })
        .catch(err => {
            // console.log('error occured', err);
        })
    );
});

// Activate event
self.addEventListener("activate", evt => {
    // console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch event
self.addEventListener("fetch", evt => {
    // console.log('service worker fetching', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheResponse => {
            return cacheResponse || fetch(evt.request);
        })
    );
});