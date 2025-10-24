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

    // Real-time clock functionality
    function initRealTimeClock() {
        const dateElement = document.getElementById('current-date');
        const timeElement = document.getElementById('current-time');
        
        if (!dateElement || !timeElement) return;
        
        function updateDateTime() {
            const now = new Date();
            const currentLang = localStorage.getItem('luwei-lang') || 'ko';
            
            // Format date
            let dateString;
            if (currentLang === 'en') {
                dateString = now.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } else {
                dateString = now.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                });
            }
            
            // Format time
            const timeString = now.toLocaleTimeString(currentLang === 'en' ? 'en-US' : 'ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            
            dateElement.textContent = dateString;
            timeElement.textContent = timeString;
        }
        
        // Update immediately
        updateDateTime();
        
        // Update every second
        setInterval(updateDateTime, 1000);
    }

    // Particle animation system
    function initParticleAnimation() {
        const particlesContainer = document.getElementById('particles-container');
        if (!particlesContainer) return;
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 25000);
        }
        
        // Create initial particles
        for (let i = 0; i < 8; i++) {
            setTimeout(createParticle, i * 2000);
        }
        
        // Continue creating particles
        setInterval(createParticle, 3000);
    }

    // Interactive circle effects
    function initInteractiveCircle() {
        const circleInteractive = document.getElementById('circle-interactive');
        const heroCircle = document.querySelector('.hero__circle');
        
        if (!circleInteractive || !heroCircle) return;
        
        // Mouse move effect
        heroCircle.addEventListener('mousemove', function(e) {
            const rect = heroCircle.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const intensity = 1 - (distance / maxDistance);
                circleInteractive.style.transform = `translate(-50%, -50%) scale(${1 + intensity * 0.2})`;
                circleInteractive.style.opacity = 0.3 + intensity * 0.4;
            }
        });
        
        heroCircle.addEventListener('mouseleave', function() {
            circleInteractive.style.transform = 'translate(-50%, -50%) scale(1)';
            circleInteractive.style.opacity = '0.3';
        });
        
        // Click ripple effect
        heroCircle.addEventListener('click', function(e) {
            const rect = heroCircle.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(207, 232, 255, 0.3);
                transform: translate(-50%, -50%);
                animation: ripple 1s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            heroCircle.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 1000);
        });
        
        // Add ripple animation CSS
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Real-time counters and progress animations
    function initCountersAndProgress() {
        // Animated counter function
        function animateCounter(element, start, end, duration) {
            const startTime = performance.now();
            const isDecimal = end % 1 !== 0;
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = start + (end - start) * easeOutQuart;
                
                if (isDecimal) {
                    element.textContent = current.toFixed(1);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
        
        // Update download count periodically
        function updateDownloadCount() {
            const downloadElement = document.getElementById('download-count');
            if (!downloadElement) return;
            
            const currentCount = parseInt(downloadElement.textContent.replace(/,/g, ''));
            const increment = Math.floor(Math.random() * 3) + 1; // 1-3 random increment
            const newCount = currentCount + increment;
            
            animateCounter(downloadElement, currentCount, newCount, 1000);
        }
        
        // Update rating with slight variations
        function updateRating() {
            const ratingElement = document.getElementById('rating');
            if (!ratingElement) return;
            
            const currentRating = parseFloat(ratingElement.textContent);
            const variation = (Math.random() - 0.5) * 0.1; // ±0.05 variation
            const newRating = Math.max(4.5, Math.min(5.0, currentRating + variation));
            
            animateCounter(ratingElement, currentRating, newRating, 800);
        }
        
        // Animate progress bars
        function animateProgressBars() {
            const progressElements = document.querySelectorAll('.progress-fill');
            
            progressElements.forEach(element => {
                const targetWidth = element.style.width;
                element.style.width = '0%';
                
                setTimeout(() => {
                    element.style.width = targetWidth;
                }, 500);
            });
        }
        
        // Initialize counters
        const downloadElement = document.getElementById('download-count');
        const ratingElement = document.getElementById('rating');
        
        if (downloadElement) {
            // Animate initial load
            animateCounter(downloadElement, 0, parseInt(downloadElement.textContent.replace(/,/g, '')), 2000);
            
            // Update periodically
            setInterval(updateDownloadCount, 30000); // Every 30 seconds
        }
        
        if (ratingElement) {
            // Animate initial load
            animateCounter(ratingElement, 0, parseFloat(ratingElement.textContent), 1500);
            
            // Update periodically
            setInterval(updateRating, 45000); // Every 45 seconds
        }
        
        // Animate progress bars on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        const scheduleSection = document.querySelector('.release-schedule');
        if (scheduleSection) {
            observer.observe(scheduleSection);
        }
    }

    // Dynamic content update function
    function updateDynamicContent() {
        // Get current language
        const currentLang = localStorage.getItem('luwei-lang') || 'ko';
        
        // Update announcement banner
        const bannerText = document.querySelector('.top-banner__text');
        if (bannerText) {
            if (currentLang === 'en') {
                bannerText.innerHTML = 'November: <strong>Water·Light</strong> meditation audio series launch';
            } else {
                bannerText.innerHTML = '11월 중: <strong>\'무 루틴\' 오디오 \'물·빛\'</strong> 시리즈 첫 출시';
            }
        }
        
        // Update hero schedule text
        const heroScheduleText = document.querySelector('.hero__schedule-text');
        if (heroScheduleText) {
            if (currentLang === 'en') {
                heroScheduleText.innerHTML = 'November – <strong>Water·Light</strong> meditation audio<br>December – OFF routine templates<br>End of year – Complete package';
            } else {
                heroScheduleText.innerHTML = '11월 중 – <strong>1분 명상 오디오 \'물·빛\'</strong> 출시<br>12월 초 – 감정 OFF 템플릿 공개<br>12월 말 – 패키지 공개';
            }
        }
        
        // Update schedule section titles
        const scheduleTitles = document.querySelectorAll('.schedule-card__title');
        scheduleTitles.forEach(title => {
            if (currentLang === 'en') {
                if (title.textContent.includes('Water·Light')) {
                    title.innerHTML = '<strong>Water·Light</strong> Meditation Audio Series';
                }
            } else {
                if (title.textContent.includes('물·빛')) {
                    title.innerHTML = '<strong>무 루틴 오디오 \'물·빛\'</strong> 시리즈';
                }
            }
        });
    }

    // Dynamic message system
    function initDynamicMessages() {
        const messageElement = document.getElementById('dynamic-message');
        if (!messageElement) return;
        
        const messages = {
            ko: [
                "지금 이 순간, 고요함을 느껴보세요.",
                "호흡과 함께 마음을 비워보세요.",
                "감정의 흐름을 관찰해보세요.",
                "내면의 평화를 찾아보세요.",
                "현재에 집중해보세요.",
                "마음의 소리에 귀 기울여보세요.",
                "고요한 순간을 만들어보세요.",
                "자연스러운 흐름을 받아들이세요."
            ],
            en: [
                "Feel the stillness in this moment.",
                "Empty your mind with each breath.",
                "Observe the flow of emotions.",
                "Find peace within yourself.",
                "Focus on the present moment.",
                "Listen to the voice of your heart.",
                "Create moments of tranquility.",
                "Accept the natural flow of life."
            ]
        };
        
        let currentIndex = 0;
        const currentLang = localStorage.getItem('luwei-lang') || 'ko';
        const currentMessages = messages[currentLang];
        
        function updateMessage() {
            const messageText = messageElement.querySelector('.message-text');
            if (!messageText) return;
            
            // Fade out
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                // Update text
                messageText.textContent = currentMessages[currentIndex];
                
                // Fade in
                messageElement.style.opacity = '1';
                messageElement.style.transform = 'translateY(0)';
                
                // Move to next message
                currentIndex = (currentIndex + 1) % currentMessages.length;
            }, 500);
        }
        
        // Update message every 8 seconds
        setInterval(updateMessage, 8000);
        
        // Update on language change
        const langToggle = document.querySelector('.lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                setTimeout(() => {
                    const newLang = localStorage.getItem('luwei-lang') || 'ko';
                    const newMessages = messages[newLang];
                    currentIndex = 0;
                    updateMessage();
                }, 100);
            });
        }
    }

    // Weather-based dynamic content
    function initWeatherBasedContent() {
        // Simple weather simulation based on time of day
        function getTimeBasedMood() {
            const hour = new Date().getHours();
            
            if (hour >= 6 && hour < 12) {
                return { mood: 'morning', color: '#FFD7E5' };
            } else if (hour >= 12 && hour < 18) {
                return { mood: 'afternoon', color: '#CFE8FF' };
            } else if (hour >= 18 && hour < 22) {
                return { mood: 'evening', color: '#DFF5E1' };
            } else {
                return { mood: 'night', color: '#E9EEF2' };
            }
        }
        
        function updateTimeBasedStyling() {
            const mood = getTimeBasedMood();
            const root = document.documentElement;
            
            // Update CSS custom properties
            root.style.setProperty('--time-based-color', mood.color);
            
            // Add subtle animation to hero section
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.setProperty('--time-color', mood.color);
            }
        }
        
        // Update every hour
        updateTimeBasedStyling();
        setInterval(updateTimeBasedStyling, 3600000); // 1 hour
    }

    // User interaction feedback system
    function initUserInteractionFeedback() {
        // Haptic feedback simulation
        function createHapticFeedback() {
            if ('vibrate' in navigator) {
                navigator.vibrate([50, 30, 50]);
            }
        }
        
        // Visual feedback for interactions
        function addVisualFeedback(element, type = 'click') {
            const feedback = document.createElement('div');
            feedback.className = `feedback-${type}`;
            
            const rect = element.getBoundingClientRect();
            feedback.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(207, 232, 255, 0.6);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 10000;
                animation: feedbackPulse 0.6s ease-out;
            `;
            
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 600);
        }
        
        // Add feedback styles
        if (!document.querySelector('#feedback-styles')) {
            const style = document.createElement('style');
            style.id = 'feedback-styles';
            style.textContent = `
                @keyframes feedbackPulse {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 100px;
                        height: 100px;
                        opacity: 0;
                    }
                }
                
                .interaction-success {
                    animation: successGlow 0.5s ease-out;
                }
                
                @keyframes successGlow {
                    0% { box-shadow: 0 0 0 rgba(223, 245, 225, 0.8); }
                    50% { box-shadow: 0 0 20px rgba(223, 245, 225, 0.8); }
                    100% { box-shadow: 0 0 0 rgba(223, 245, 225, 0.8); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add feedback to buttons and interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .nav__link, .connect__link, .routine-card, .template-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('click', function(e) {
                createHapticFeedback();
                addVisualFeedback(this, 'click');
                
                // Add success glow
                this.classList.add('interaction-success');
                setTimeout(() => {
                    this.classList.remove('interaction-success');
                }, 500);
            });
            
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Scroll feedback
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            
            // Add subtle scroll indicator
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '0.8';
                scrollTimeout = setTimeout(() => {
                    scrollIndicator.style.opacity = '0.3';
                }, 1000);
            }
        });
        
        // Keyboard navigation feedback
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const activeElement = document.activeElement;
                if (activeElement && (activeElement.classList.contains('btn') || activeElement.classList.contains('nav__link'))) {
                    addVisualFeedback(activeElement, 'focus');
                }
            }
        });
        
        // Form interaction feedback (for future forms)
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Success feedback
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('interaction-success');
                    setTimeout(() => {
                        submitBtn.classList.remove('interaction-success');
                    }, 1000);
                }
                
                showToast('감사합니다! 메시지가 전송되었습니다.');
            });
        });
    }

    // Language toggle functionality
    // Language Toggle - Updated 2024-12-19 - Debug Version
    function initLanguageToggle() {
        const langToggle = document.querySelector('.lang-toggle');
        const langText = document.querySelector('.lang-toggle__text');
        let currentLang = 'ko'; // Default to Korean
        
        console.log('Language toggle initialized:', { langToggle, langText });
        
        function updateLanguage(lang) {
            console.log('Updating language to:', lang);
            
            // Update all elements with data-ko and data-en attributes
            const elements = document.querySelectorAll('[data-ko][data-en]');
            console.log('Found elements to update:', elements.length);
            
            elements.forEach(element => {
                if (lang === 'en') {
                    element.innerHTML = element.getAttribute('data-en');
                    element.setAttribute('lang', 'en');
                } else {
                    element.innerHTML = element.getAttribute('data-ko');
                    element.setAttribute('lang', 'ko');
                }
            });
            
            // Update toggle button text
            if (langText) {
                if (lang === 'en') {
                    langText.textContent = '한';
                } else {
                    langText.textContent = 'EN';
                }
                console.log('Updated button text to:', langText.textContent);
            } else {
                console.error('langText element not found');
            }
            
            // Update document language
            document.documentElement.setAttribute('lang', lang);
            
            // Save preference
            localStorage.setItem('luwei-lang', lang);
            currentLang = lang;
            
            // Update dynamic content
            updateDynamicContent();
        }
        
        // Load saved language preference
        const savedLang = localStorage.getItem('luwei-lang');
        if (savedLang) {
            currentLang = savedLang;
        }
        // Always update language on page load
        updateLanguage(currentLang);
        
        if (langToggle) {
            langToggle.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Language toggle clicked, current lang:', currentLang);
                const newLang = currentLang === 'ko' ? 'en' : 'ko';
                console.log('Switching to:', newLang);
                updateLanguage(newLang);
            });
            console.log('Click event listener added to language toggle');
        } else {
            console.error('Language toggle button not found');
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
            initRealTimeClock();
            initParticleAnimation();
            initInteractiveCircle();
            initCountersAndProgress();
            initDynamicMessages();
            initWeatherBasedContent();
            initUserInteractionFeedback();
            
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
