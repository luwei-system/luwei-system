// LUWEI SYSTEM - JavaScript

(function() {
    'use strict';

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle internal links
                if (href.startsWith('#')) {
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
        skipLink.href = '#home';
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
