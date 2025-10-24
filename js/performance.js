// LUWEI SYSTEM - Performance Optimization Module
// 성능 최적화 및 모니터링 기능

// 성능 최적화 초기화
export function initializePerformanceOptimizations() {
    console.log('Initializing performance optimizations...');
    
    // 이미지 지연 로딩
    initializeLazyLoading();
    
    // 리소스 프리로딩
    initializePreloading();
    
    // 성능 모니터링
    initializePerformanceMonitoring();
    
    // 메모리 최적화
    initializeMemoryOptimization();
    
    // 네트워크 최적화
    initializeNetworkOptimization();
    
    console.log('Performance optimizations initialized');
}

// 이미지 지연 로딩
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // 지연 로딩 대상 이미지들
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 리소스 프리로딩
function initializePreloading() {
    // 중요한 리소스 프리로드
    const criticalResources = [
        '/css/framework.css',
        '/css/pages.css',
        '/js/config.js',
        '/js/components.js',
        '/assets/LUWEI SYSTEM.svg',
        '/assets/Circle_logo.svg'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        
        if (resource.endsWith('.css')) {
            link.as = 'style';
        } else if (resource.endsWith('.js')) {
            link.as = 'script';
        } else if (resource.endsWith('.svg')) {
            link.as = 'image';
        }
        
        document.head.appendChild(link);
    });
    
    // 폰트 프리로드
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+KR:wght@300;400;500;600&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
}

// 성능 모니터링
function initializePerformanceMonitoring() {
    // Core Web Vitals 모니터링
    if ('PerformanceObserver' in window) {
        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
            
            // LCP가 2.5초를 초과하면 경고
            if (lastEntry.startTime > 2500) {
                console.warn('LCP is slow:', lastEntry.startTime);
            }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
                
                // FID가 100ms를 초과하면 경고
                if (entry.processingStart - entry.startTime > 100) {
                    console.warn('FID is slow:', entry.processingStart - entry.startTime);
                }
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
            
            // CLS가 0.1을 초과하면 경고
            if (clsValue > 0.1) {
                console.warn('CLS is high:', clsValue);
            }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
    
    // 페이지 로드 시간 모니터링
    window.addEventListener('load', () => {
        setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);
            console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
            console.log('Total Load Time:', navigation.loadEventEnd - navigation.fetchStart);
        }, 0);
    });
}

// 메모리 최적화
function initializeMemoryOptimization() {
    // 메모리 사용량 모니터링
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            console.log('Memory Usage:', {
                used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
                total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
                limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
            });
            
            // 메모리 사용량이 80%를 초과하면 경고
            if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
                console.warn('High memory usage detected');
                // 불필요한 이벤트 리스너 정리
                cleanupEventListeners();
            }
        }, 30000); // 30초마다 체크
    }
    
    // 가비지 컬렉션 힌트
    if ('gc' in window) {
        // 메모리 압박 상황에서 가비지 컬렉션 실행
        window.addEventListener('beforeunload', () => {
            if ('gc' in window) {
                window.gc();
            }
        });
    }
}

// 이벤트 리스너 정리
function cleanupEventListeners() {
    // 사용하지 않는 이벤트 리스너 제거
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        // 임시로 추가된 이벤트 리스너들 정리
        if (element.dataset.tempListener) {
            element.removeEventListener('click', element.tempClickHandler);
            delete element.tempClickHandler;
            delete element.dataset.tempListener;
        }
    });
}

// 네트워크 최적화
function initializeNetworkOptimization() {
    // 네트워크 상태 모니터링
    if ('connection' in navigator) {
        const connection = navigator.connection;
        console.log('Network Info:', {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
            saveData: connection.saveData
        });
        
        // 느린 연결에서 추가 최적화 적용
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            applySlowConnectionOptimizations();
        }
        
        // 데이터 절약 모드에서 최적화 적용
        if (connection.saveData) {
            applyDataSavingOptimizations();
        }
    }
    
    // 네트워크 상태 변경 감지
    if ('connection' in navigator) {
        navigator.connection.addEventListener('change', () => {
            const connection = navigator.connection;
            console.log('Network changed:', connection.effectiveType);
            
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                applySlowConnectionOptimizations();
            } else {
                removeSlowConnectionOptimizations();
            }
        });
    }
}

// 느린 연결 최적화
function applySlowConnectionOptimizations() {
    console.log('Applying slow connection optimizations...');
    
    // 이미지 품질 낮추기
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.dataset.originalSrc) {
            img.dataset.originalSrc = img.src;
        }
        // 저품질 이미지로 변경 (실제 구현에서는 서버에서 제공)
        // img.src = img.src.replace('.jpg', '_low.jpg');
    });
    
    // 애니메이션 비활성화
    document.body.classList.add('slow-connection');
    
    // 불필요한 리소스 로딩 중단
    const nonCriticalResources = document.querySelectorAll('link[rel="preload"]:not([href*="critical"])');
    nonCriticalResources.forEach(link => {
        link.remove();
    });
}

// 느린 연결 최적화 제거
function removeSlowConnectionOptimizations() {
    console.log('Removing slow connection optimizations...');
    
    // 원본 이미지로 복원
    const images = document.querySelectorAll('img[data-original-src]');
    images.forEach(img => {
        img.src = img.dataset.originalSrc;
        delete img.dataset.originalSrc;
    });
    
    // 애니메이션 재활성화
    document.body.classList.remove('slow-connection');
}

// 데이터 절약 최적화
function applyDataSavingOptimizations() {
    console.log('Applying data saving optimizations...');
    
    // 이미지 압축
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
    
    // 폰트 로딩 최적화
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
        link.href += '&display=swap';
    });
    
    // 불필요한 리소스 제거
    const decorativeElements = document.querySelectorAll('.decorative, .bg-pattern');
    decorativeElements.forEach(element => {
        element.style.display = 'none';
    });
}

// 성능 메트릭 수집
export function collectPerformanceMetrics() {
    const metrics = {};
    
    // Navigation Timing
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
        metrics.navigation = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            load: navigation.loadEventEnd - navigation.loadEventStart,
            total: navigation.loadEventEnd - navigation.fetchStart
        };
    }
    
    // Resource Timing
    const resources = performance.getEntriesByType('resource');
    metrics.resources = resources.map(resource => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize,
        type: resource.initiatorType
    }));
    
    // Memory Usage
    if ('memory' in performance) {
        const memory = performance.memory;
        metrics.memory = {
            used: memory.usedJSHeapSize,
            total: memory.totalJSHeapSize,
            limit: memory.jsHeapSizeLimit
        };
    }
    
    return metrics;
}

// 성능 리포트 전송
export function sendPerformanceReport(metrics) {
    // 실제 구현에서는 서버로 전송
    console.log('Performance Report:', metrics);
    
    // 로컬 스토리지에 저장 (개발용)
    const reports = JSON.parse(localStorage.getItem('performanceReports') || '[]');
    reports.push({
        timestamp: Date.now(),
        metrics: metrics
    });
    
    // 최근 10개만 유지
    if (reports.length > 10) {
        reports.splice(0, reports.length - 10);
    }
    
    localStorage.setItem('performanceReports', JSON.stringify(reports));
}

// 성능 최적화 CSS 추가
const performanceCSS = `
    /* 느린 연결 최적화 */
    .slow-connection * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    /* 지연 로딩 이미지 */
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    /* 데이터 절약 모드 */
    .data-saving .decorative,
    .data-saving .bg-pattern {
        display: none !important;
    }
    
    /* 성능 최적화된 애니메이션 */
    .performance-optimized {
        will-change: transform;
        transform: translateZ(0);
    }
`;

// CSS 스타일 추가
const style = document.createElement('style');
style.textContent = performanceCSS;
document.head.appendChild(style);

console.log('Performance optimization module loaded');