// LUWEI SYSTEM - Service Worker
// 오프라인 지원 및 캐시 전략 구현

const CACHE_NAME = 'luwei-system-v2';
const STATIC_CACHE_NAME = 'luwei-static-v2';
const DYNAMIC_CACHE_NAME = 'luwei-dynamic-v2';

// 캐시할 정적 리소스
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/framework.css',
    '/css/pages.css',
    '/styles.css',
    '/js/config.js',
    '/js/components.js',
    '/js/content-manager.js',
    '/js/performance.js',
    '/script.js',
    '/assets/LUWEI SYSTEM.svg',
    '/assets/Circle_logo.svg',
    '/assets/favicon.png',
    '/assets/favicon.svg',
];

// 캐시할 폰트
const FONT_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+KR:wght@300;400;500;600&display=swap'
];

// 설치 이벤트
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            // 정적 리소스 캐시
            caches.open(STATIC_CACHE_NAME).then(cache => {
                return cache.addAll(STATIC_ASSETS);
            }),
            
            // 폰트 캐시
            caches.open(STATIC_CACHE_NAME).then(cache => {
                return cache.addAll(FONT_ASSETS);
            })
        ]).then(() => {
            console.log('Service Worker installed successfully');
            return self.skipWaiting();
        })
    );
});

// 활성화 이벤트
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        Promise.all([
            // 오래된 캐시 정리
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE_NAME && 
                            cacheName !== DYNAMIC_CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // 모든 클라이언트 제어
            self.clients.claim()
        ]).then(() => {
            console.log('Service Worker activated successfully');
        })
    );
});

// fetch 이벤트
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // GET 요청만 처리
    if (request.method !== 'GET') {
        return;
    }
    
    // 외부 도메인 요청 처리
    if (url.origin !== location.origin) {
        event.respondWith(handleExternalRequest(request));
        return;
    }
    
    // 내부 요청 처리
    event.respondWith(handleInternalRequest(request));
});

// 내부 요청 처리
async function handleInternalRequest(request) {
    const url = new URL(request.url);
    
    // 정적 리소스 (Cache First)
    if (isStaticResource(url.pathname)) {
        return handleCacheFirst(request, STATIC_CACHE_NAME);
    }
    
    // API 요청 (Network First)
    if (url.pathname.startsWith('/api/')) {
        return handleNetworkFirst(request, DYNAMIC_CACHE_NAME);
    }
    
    // HTML 페이지 (Network First with Fallback)
    if (request.headers.get('accept').includes('text/html')) {
        return handleHTMLRequest(request);
    }
    
    // 기타 리소스 (Stale While Revalidate)
    return handleStaleWhileRevalidate(request, DYNAMIC_CACHE_NAME);
}

// 외부 요청 처리
async function handleExternalRequest(request) {
    const url = new URL(request.url);
    
    // Google Fonts
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        return handleCacheFirst(request, STATIC_CACHE_NAME);
    }
    
    // 기타 외부 리소스는 네트워크 우선
    try {
        const response = await fetch(request);
        return response;
    } catch (error) {
        console.log('External request failed:', request.url);
        return new Response('Network error', { status: 408 });
    }
}

// Cache First 전략
async function handleCacheFirst(request, cacheName) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Cache first failed:', request.url);
        return new Response('Offline', { status: 503 });
    }
}

// Network First 전략
async function handleNetworkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('Network first failed, trying cache:', request.url);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('Offline', { status: 503 });
    }
}

// Stale While Revalidate 전략
async function handleStaleWhileRevalidate(request, cacheName) {
    const cachedResponse = await caches.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            const cache = caches.open(cacheName);
            cache.then(c => c.put(request, networkResponse.clone()));
        }
        return networkResponse;
    }).catch(() => {
        return cachedResponse || new Response('Offline', { status: 503 });
    });
    
    return cachedResponse || fetchPromise;
}

// HTML 요청 처리
async function handleHTMLRequest(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            return networkResponse;
        }
    } catch (error) {
        console.log('HTML network request failed:', request.url);
    }
    
    // 오프라인 페이지 반환
    const offlineResponse = await caches.match('/offline.html');
    if (offlineResponse) {
        return offlineResponse;
    }
    
    // 기본 오프라인 응답
    return new Response(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>오프라인 - LUWEI SYSTEM</title>
            <style>
                body {
                    font-family: 'Noto Sans KR', sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #CFE8FF 0%, #FFFFFF 100%);
                    color: #111;
                }
                .offline-container {
                    text-align: center;
                    padding: 2rem;
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    max-width: 400px;
                }
                .offline-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }
                .offline-title {
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin-bottom: 1rem;
                }
                .offline-message {
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                .retry-btn {
                    background: #CFE8FF;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 2rem;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .retry-btn:hover {
                    background: #B8D8F0;
                    transform: translateY(-2px);
                }
            </style>
        </head>
        <body>
            <div class="offline-container">
                <div class="offline-icon">📡</div>
                <h1 class="offline-title">오프라인 상태</h1>
                <p class="offline-message">
                    인터넷 연결을 확인하고<br>
                    다시 시도해주세요.
                </p>
                <button class="retry-btn" onclick="window.location.reload()">
                    다시 시도
                </button>
            </div>
        </body>
        </html>
    `, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    });
}

// 정적 리소스 확인
function isStaticResource(pathname) {
    const staticExtensions = ['.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico'];
    return staticExtensions.some(ext => pathname.endsWith(ext));
}

// 백그라운드 동기화
self.addEventListener('sync', event => {
    console.log('Background sync:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // 오프라인 중 저장된 데이터 동기화
        const pendingData = await getPendingData();
        
        for (const data of pendingData) {
            await syncData(data);
        }
        
        console.log('Background sync completed');
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

async function getPendingData() {
    // IndexedDB에서 대기 중인 데이터 가져오기
    return [];
}

async function syncData(data) {
    // 서버에 데이터 동기화
    try {
        const response = await fetch('/api/sync', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // 동기화 성공 시 로컬 데이터 정리
            await removePendingData(data.id);
        }
    } catch (error) {
        console.error('Data sync failed:', error);
        throw error;
    }
}

async function removePendingData(id) {
    // IndexedDB에서 동기화된 데이터 제거
    console.log('Removing pending data:', id);
}

// 푸시 알림
self.addEventListener('push', event => {
    console.log('Push notification received:', event);
    
    const options = {
        body: event.data ? event.data.text() : '새로운 업데이트가 있습니다.',
        icon: '/assets/favicon.png',
        badge: '/assets/favicon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: '확인하기',
                icon: '/assets/favicon.png'
            },
            {
                action: 'close',
                title: '닫기',
                icon: '/assets/favicon.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('LUWEI SYSTEM', options)
    );
});

// 알림 클릭
self.addEventListener('notificationclick', event => {
    console.log('Notification clicked:', event);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// 메시지 처리
self.addEventListener('message', event => {
    console.log('Service Worker message:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(clearAllCaches());
    }
});

async function clearAllCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
}

console.log('LUWEI SYSTEM Service Worker loaded');
