const CACHE_NAME = 'cinescope-cache-v1';
const OFFLINE_URL = '/offline.html';

// Files to cache on install
const urlsToCache = [
    '/',
    '/offline.html',
    '/logo-192.png',
    '/logo-512.png',
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache opened');
            return cache.addAll(urlsToCache).catch((err) => {
                console.log('Cache addAll error:', err);
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Handle API requests differently
    if (event.request.url.includes('/api/') || event.request.url.includes('tmdb')) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Cache successful responses
                    if (response.ok) {
                        const cache = caches.open(CACHE_NAME);
                        cache.then((c) => c.put(event.request, response.clone()));
                    }
                    return response;
                })
                .catch(() => {
                    // Return cached response if network fails
                    return caches.match(event.request);
                })
        );
    } else {
        // For static assets, use cache first strategy
        event.respondWith(
            caches
                .match(event.request)
                .then((response) => {
                    if (response) {
                        return response;
                    }

                    return fetch(event.request)
                        .then((response) => {
                            if (!response || response.status !== 200) {
                                return response;
                            }

                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                            return response;
                        })
                        .catch(() => {
                            // Return offline page if both cache and network fail
                            if (event.request.mode === 'navigate') {
                                return caches.match(OFFLINE_URL);
                            }
                            return new Response('Offline', {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: new Headers({
                                    'Content-Type': 'text/plain',
                                }),
                            });
                        });
                })
        );
    }
});

// Background sync event (future enhancement)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-favorites') {
        event.waitUntil(syncFavorites());
    }
});

async function syncFavorites() {
    try {
        // Implement sync logic here
        console.log('Syncing favorites...');
    } catch (error) {
        console.error('Sync failed:', error);
    }
}

// Push notification event (future enhancement)
self.addEventListener('push', (event) => {
    const data = event.data?.json() ?? {};
    const title = data.title || 'CineScope';
    const options = {
        body: data.body || 'New content available!',
        icon: '/logo-192.png',
        badge: '/logo-192.png',
        tag: 'cinescope-notification',
        requireInteraction: false,
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
