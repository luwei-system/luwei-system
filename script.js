// LUWEI SYSTEM - JavaScript

(function() {
    'use strict';

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav__link');
        const navLogo = document.querySelector('.nav__logo');
        
        // Handle logo click
        if (navLogo) {
            navLogo.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Update URL to clean root
                history.pushState(null, null, '/');
                
                // Update active nav link
                updateActiveNavLink('home');
            });
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Handle home link
                if (href === '/') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // Update URL to clean root
                    history.pushState(null, null, '/');
                    
                    // Update active nav link
                    updateActiveNavLink('home');
                }
                // Only handle internal links
                else if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const navHeight = document.querySelector('.nav').offsetHeight;
                        const targetPosition = targetElement.offsetTop - navHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update URL without triggering scroll
                        history.pushState(null, null, href);
                        
                        // Update active nav link
                        updateActiveNavLink(targetId);
                    }
                }
            });
        });
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink(activeId) {
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('nav__link--active');
            }
        });
    }

    // Handle scroll-based navigation highlighting
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        function updateActiveSection() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && 
                    window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            if (current) {
                updateActiveNavLink(current);
            }
        }
        
        // Throttle scroll events for better performance
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateActiveSection);
                ticking = true;
            }
        }
        
        function handleScroll() {
            ticking = false;
            requestTick();
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial call
        updateActiveSection();
    }

    // Enhanced focus management for accessibility
    function initFocusManagement() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '/';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: var(--color-text);
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Trap focus in modals (if any are added later)
        function trapFocus(element) {
            const focusableElements = element.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            element.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }

        // Apply focus trap to any future modal elements
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('modal')) {
                        trapFocus(node);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Keyboard navigation enhancements
    function initKeyboardNavigation() {
        // Handle Enter key on buttons and links
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target;
                
                if (target.classList.contains('btn') || 
                    target.classList.contains('connect__link') ||
                    target.classList.contains('routine-card')) {
                    
                    if (e.key === ' ') {
                        e.preventDefault();
                    }
                    
                    target.click();
                }
            }
        });

        // Handle Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close any open modals or overlays
                const openModals = document.querySelectorAll('.modal[aria-hidden="false"]');
                openModals.forEach(modal => {
                    modal.setAttribute('aria-hidden', 'true');
                    modal.style.display = 'none';
                });
                
                // Return focus to trigger element
                const trigger = document.querySelector('[aria-expanded="true"]');
                if (trigger) {
                    trigger.focus();
                    trigger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // Performance optimizations
    function initPerformanceOptimizations() {
        // Lazy load images (if any are added later)
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        }

        // Preload critical resources
        function preloadCriticalResources() {
            const criticalResources = [
                'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+KR:wght@300;400;500;600&display=swap'
            ];

            criticalResources.forEach(function(resource) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = resource;
                document.head.appendChild(link);
            });
        }

        preloadCriticalResources();
    }

    // Error handling and fallbacks
    function initErrorHandling() {
        // Handle external link errors gracefully
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[target="_blank"]');
            if (link) {
                // Add loading state
                const originalText = link.textContent;
                link.textContent = 'Loading...';
                link.style.opacity = '0.7';
                
                // Reset after a delay (in case the page loads)
                setTimeout(function() {
                    link.textContent = originalText;
                    link.style.opacity = '1';
                }, 2000);
            }
        });

        // Handle JavaScript errors gracefully
        window.addEventListener('error', function(e) {
            console.warn('LUWEI SYSTEM: A non-critical error occurred:', e.error);
            // Don't break the user experience for minor JS errors
        });
    }

    // Language toggle functionality
    function initLanguageToggle() {
        const langToggle = document.querySelector('.lang-toggle');
        const langText = document.querySelector('.lang-toggle__text');
        let currentLang = 'ko'; // Default to Korean
        
        function updateLanguage(lang) {
            const elements = document.querySelectorAll('[data-ko][data-en]');
            
            elements.forEach(element => {
                if (lang === 'en') {
                    element.innerHTML = element.getAttribute('data-en');
                    element.setAttribute('lang', 'en');
                } else {
                    element.innerHTML = element.getAttribute('data-ko');
                    element.setAttribute('lang', 'ko');
                }
            });
            
            // Handle brand tone grid language switching
            const brandToneGrid = document.querySelector('.brand-tone-grid');
            if (brandToneGrid) {
                const koTexts = brandToneGrid.getAttribute('data-ko').split('|');
                const enTexts = brandToneGrid.getAttribute('data-en').split('|');
                const items = brandToneGrid.querySelectorAll('.brand-tone-item');
                
                items.forEach((item, index) => {
                    if (lang === 'en') {
                        item.textContent = enTexts[index] || enTexts[0];
                    } else {
                        item.textContent = koTexts[index] || koTexts[0];
                    }
                });
            }
            
            // Update toggle button text
            if (lang === 'en') {
                langText.textContent = '한';
            } else {
                langText.textContent = 'EN';
            }
            
            // Update document language
            document.documentElement.setAttribute('lang', lang);
            
            // Save preference
            localStorage.setItem('luwei-lang', lang);
            currentLang = lang;
        }
        
        // Load saved language preference
        const savedLang = localStorage.getItem('luwei-lang');
        if (savedLang) {
            currentLang = savedLang;
        }
        // Always update language on page load
        updateLanguage(currentLang);
        
        if (langToggle) {
            langToggle.addEventListener('click', function() {
                const newLang = currentLang === 'ko' ? 'en' : 'ko';
                updateLanguage(newLang);
            });
        }
        
        // Handle HTML content with innerHTML
        function updateHTMLContent(lang) {
            const htmlElements = document.querySelectorAll('[data-ko-html][data-en-html]');
            
            htmlElements.forEach(element => {
                if (lang === 'en') {
                    element.innerHTML = element.getAttribute('data-en-html');
                } else {
                    element.innerHTML = element.getAttribute('data-ko-html');
                }
            });
        }
        
        // Expose updateLanguage function globally for external use
        window.LUWEI.updateLanguage = updateLanguage;
    }

    // Initialize all functionality when DOM is ready
    function init() {
        // Check if DOM is already loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        try {
            initSmoothScrolling();
            initScrollSpy();
            initFocusManagement();
            initKeyboardNavigation();
            initPerformanceOptimizations();
            initErrorHandling();
            initLanguageToggle();
            
            console.log('LUWEI SYSTEM: Initialized successfully');
        } catch (error) {
            console.error('LUWEI SYSTEM: Initialization error:', error);
        }
    }

    // Start initialization
    init();

    // Expose utility functions for potential future use
    window.LUWEI = {
        updateActiveNavLink: updateActiveNavLink,
        trapFocus: function(element) {
            // Focus trap implementation (simplified version)
            const focusableElements = element.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    };

})();

// Simple Share Function
function copyToClipboard() {
    const url = 'https://luweisystem.com/';
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('링크가 복사되었습니다!');
        }).catch(() => {
            fallbackCopyToClipboard(url);
        });
    } else {
        fallbackCopyToClipboard(url);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('링크가 복사되었습니다!');
    } catch (err) {
        showToast('링크 복사에 실패했습니다.');
    }
    
    document.body.removeChild(textArea);
}

function showToast(message) {
    // 간단한 토스트 메시지 표시
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-primary);
        color: var(--color-text);
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease;
    `;
    
    // CSS 애니메이션 추가
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 2000);
}
