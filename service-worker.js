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
  '/assets/music/Weightless Mist.mp3',
  '/assets/music/room1.mp3',
  '/assets/music/room2.mp3',
  '/assets/music/Hourglass Drift.mp3',
  '/assets/home.jpg',
  '/assets/door.png',
  '/assets/room.jpg',
  '/assets/음악아이콘.png',
  '/assets/책.png',
  '/assets/Circle_logo.svg'
];

// Install event - cache assets
self.addEventListener('install', (e) => {
  console.log('[SW] Installing service worker...');
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log('[SW] Caching assets');
      return cache.addAll(ASSETS);
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
      // Return cached version if found
      if (res) {
        return res;
      }
      
      // Otherwise fetch from network
      return fetch(e.request).then((res) => {
        // Don't cache if not a successful response
        if (!res || res.status !== 200 || res.type !== 'basic') {
          return res;
        }
        
        // Clone the response
        const responseToCache = res.clone();
        
        caches.open(CACHE).then((cache) => {
          cache.put(e.request, responseToCache);
        });
        
        return res;
      });
    }).catch(() => {
      // Return cached version if network fails
      return caches.match(e.request);
    })
  );
});
