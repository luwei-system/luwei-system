// LUWEI SYSTEM Service Worker - Offline Cache
const CACHE = 'luwei-pwa-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/explore.html',
  '/entrance.html',
  '/luwei-room.html',
  '/hourglass.html',
  '/js/luwei-player.js',
  '/js/luwei-reflection.js',
  '/js/luwei-sync.js',
  '/js/luwei-supabase.js',
  '/js/explore.js',
  // Large media are excluded to avoid 206 partial responses during install
  // '/assets/music/Weightless Mist.mp3',
  // '/assets/music/room1.mp3',
  // '/assets/music/room2.mp3',
  // '/assets/music/Hourglass Drift.mp3',
  '/assets/home.jpg',
  '/assets/door.png',
  '/assets/room.jpg',
  '/assets/음악아이콘.png',
  '/assets/책.png',
  '/assets/Circle_logo.svg'
];

// Install event - cache assets (skip 206 partial responses)
self.addEventListener('install', (e) => {
  console.log('[SW] Installing service worker...');
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      console.log('[SW] Caching assets individually');
      await Promise.all(
        ASSETS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: 'no-store' });
            if (res && res.ok && res.status === 200) {
              await cache.put(url, res.clone());
            } else {
              console.warn('[SW] Skip caching (non-200):', url, res && res.status);
            }
          } catch (err) {
            console.warn('[SW] Failed to cache:', url, err);
          }
        })
      );
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (e) => {
  console.log('[SW] Activating service worker...');
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE) {
          console.log('[SW] Removing old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (e) => {
  // Bypass caching for auth script to avoid stale versions
  if (e.request.url.includes('/js/luwei-auth.js')) {
    return e.respondWith(fetch(e.request));
  }
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) return res;
      return fetch(e.request).then((networkRes) => {
        if (!networkRes || networkRes.status !== 200 || networkRes.type !== 'basic') {
          return networkRes;
        }
        const responseToCache = networkRes.clone();
        caches.open(CACHE).then((cache) => { cache.put(e.request, responseToCache); });
        return networkRes;
      });
    }).catch(() => caches.match('/index.html'))
  );
});
