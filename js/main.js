// LUWEI SYSTEM - Main JavaScript Entry Point
// 모듈화된 구조의 메인 진입점

import { renderPage } from './content-manager.js';
import { initializePerformanceOptimizations } from './performance.js';

// 페이지 로드 시 렌더링
document.addEventListener('DOMContentLoaded', () => {
    console.log('LUWEI SYSTEM - Main script loaded');
    
    // 성능 최적화 초기화
    initializePerformanceOptimizations();
    
    // 서비스 워커 등록
    registerServiceWorker();
    
    // 동적 콘텐츠 렌더링
    renderPage();
    
    // 언어 전환 기능 초기화
    initializeLanguageToggle();
    
    // 공유 기능 초기화
    initializeShareFunction();
    
    // 동적 메시지 업데이트 초기화
    initializeDynamicMessages();
    
    // 스크롤 애니메이션 초기화
    initializeScrollAnimations();
    
    // 오프라인 상태 모니터링
    initializeOfflineMonitoring();
});

// 서비스 워커 등록
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });
            
            console.log('Service Worker registered successfully:', registration.scope);
            
            // 서비스 워커 업데이트 확인
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // 새 버전 사용 가능 알림
                        showUpdateNotification();
                    }
                });
            });
            
            // 서비스 워커 메시지 처리
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'CACHE_UPDATED') {
                    console.log('Cache updated:', event.data.url);
                }
            });
            
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
}

// 업데이트 알림 표시
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="update-content">
            <span class="update-text">새로운 버전이 사용 가능합니다</span>
            <button class="update-btn" onclick="updateApp()">업데이트</button>
            <button class="close-btn" onclick="closeUpdateNotification()">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #CFE8FF 0%, #FFFFFF 100%);
        border: 2px solid rgba(207, 232, 255, 0.5);
        border-radius: 12px;
        padding: 16px;
        z-index: 10000;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(10px);
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 10초 후 자동 닫기
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeUpdateNotification();
        }
    }, 10000);
}

// 앱 업데이트
window.updateApp = function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(registration => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
            }
        });
    }
};

// 업데이트 알림 닫기
window.closeUpdateNotification = function() {
    const notification = document.querySelector('.update-notification');
    if (notification) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }
};

// 오프라인 상태 모니터링
function initializeOfflineMonitoring() {
    function updateOnlineStatus() {
        const isOnline = navigator.onLine;
        document.body.classList.toggle('offline', !isOnline);
        
        if (!isOnline) {
            showOfflineIndicator();
        } else {
            hideOfflineIndicator();
        }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // 초기 상태 확인
    updateOnlineStatus();
}

// 오프라인 인디케이터 표시
function showOfflineIndicator() {
    let indicator = document.querySelector('.offline-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'offline-indicator';
        indicator.innerHTML = `
            <div class="offline-content">
                <span class="offline-icon">📡</span>
                <span class="offline-text">오프라인</span>
            </div>
        `;
        
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
            color: white;
            padding: 8px 20px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            z-index: 10001;
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(indicator);
    }
}

// 오프라인 인디케이터 숨기기
function hideOfflineIndicator() {
    const indicator = document.querySelector('.offline-indicator');
    if (indicator) {
        indicator.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(indicator)) {
                document.body.removeChild(indicator);
            }
        }, 300);
    }
}

// 언어 전환 기능
function initializeLanguageToggle() {
    const langToggle = document.querySelector('.lang-toggle');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', () => {
        const currentLang = localStorage.getItem('luwei-lang') || 'ko';
        const newLang = currentLang === 'ko' ? 'en' : 'ko';
        
        localStorage.setItem('luwei-lang', newLang);
        
        // 페이지 새로고침으로 언어 변경 적용
        window.location.reload();
    });
}

// 공유 기능
function initializeShareFunction() {
    const shareToggle = document.querySelector('.share-toggle');
    if (!shareToggle) return;
    
    shareToggle.addEventListener('click', async () => {
        const url = window.location.href;
        
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'LUWEI SYSTEM',
                    text: '조용한 시스템, 고요한 질서',
                    url: url
                });
            } else {
                await navigator.clipboard.writeText(url);
                showToast('링크가 복사되었습니다');
            }
        } catch (error) {
            console.error('Share failed:', error);
            // 폴백: 수동 복사
            try {
                await navigator.clipboard.writeText(url);
                showToast('링크가 복사되었습니다');
            } catch (clipboardError) {
                console.error('Clipboard failed:', clipboardError);
                showToast('공유에 실패했습니다');
            }
        }
    });
}

// 토스트 메시지 표시
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(toast);
    
    // 애니메이션
    setTimeout(() => toast.style.opacity = '1', 100);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// 동적 메시지 업데이트
function initializeDynamicMessages() {
    const messageElement = document.getElementById('dynamic-message');
    if (!messageElement) return;
    
    const messages = [
        "지금 이 순간, 고요함을 느껴보세요.",
        "호흡과 함께 마음을 비워보세요.",
        "감정의 흐름을 관찰해보세요.",
        "내면의 평화를 찾아보세요.",
        "현재에 집중해보세요.",
        "마음의 소리에 귀 기울여보세요.",
        "고요한 순간을 만들어보세요.",
        "자연스러운 흐름을 받아들이세요."
    ];
    
    let currentIndex = 0;
    
    function updateMessage() {
        const messageText = messageElement.querySelector('.message-text');
        if (messageText) {
            messageText.style.opacity = '0';
            
            setTimeout(() => {
                messageText.textContent = messages[currentIndex];
                messageText.style.opacity = '1';
                currentIndex = (currentIndex + 1) % messages.length;
            }, 500);
        }
    }
    
    // 10초마다 메시지 업데이트
    setInterval(updateMessage, 10000);
}

// 스크롤 애니메이션
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animatedElements = document.querySelectorAll(
        '.routine-card, .template-card, .schedule-card, .connect__link, .bookstore__card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 전역 함수로 공유 (기존 script.js와의 호환성)
window.copyToClipboard = async function() {
    const url = window.location.href;
    try {
        await navigator.clipboard.writeText(url);
        showToast('링크가 복사되었습니다');
    } catch (error) {
        console.error('Clipboard failed:', error);
        showToast('공유에 실패했습니다');
    }
};

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
    }
    
    @keyframes slideUp {
        from { transform: translateY(0); }
        to { transform: translateY(-100%); }
    }
    
    .update-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .update-text {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: #111;
    }
    
    .update-btn {
        background: #CFE8FF;
        border: 1px solid rgba(207, 232, 255, 0.5);
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .update-btn:hover {
        background: #B8D8F0;
        transform: translateY(-1px);
    }
    
    .close-btn {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .close-btn:hover {
        color: #111;
    }
    
    .offline-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    .offline-icon {
        font-size: 16px;
    }
    
    .offline-text {
        font-weight: 500;
    }
`;
document.head.appendChild(style);

console.log('LUWEI SYSTEM - Main script initialized');
