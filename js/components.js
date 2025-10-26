// LUWEI SYSTEM - Component System
// 재사용 가능한 컴포넌트들을 위한 모듈화된 시스템

class LUWEIComponent {
    constructor(element, options = {}) {
        this.element = element;
        this.options = { ...this.defaultOptions, ...options };
        this.init();
    }

    get defaultOptions() {
        return {};
    }

    init() {
        // 컴포넌트 초기화 로직
        this.bindEvents();
    }

    bindEvents() {
        // 이벤트 바인딩 로직
    }

    destroy() {
        // 컴포넌트 정리 로직
    }
}

// 제품 카드 컴포넌트
class ProductCard extends LUWEIComponent {
    get defaultOptions() {
        return {
            showPrice: true,
            showStatus: true,
            showActions: true,
            animation: true
        };
    }

    init() {
        super.init();
        this.render();
    }

    render() {
        const product = this.options.product;
        if (!product) return;

        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        // 디버깅 정보 출력
        console.log('Rendering product card:', product.id, {
            status: product.status,
            youtubeUrl: product.youtubeUrl,
            gumroadUrl: product.gumroadUrl,
            showActions: this.options.showActions
        });

        this.element.innerHTML = `
            <div class="product-card ${product.status === 'active' ? 'product-card--active' : ''} ${product.status === 'coming-soon' ? 'product-card--coming-soon' : ''}" 
                 data-product-id="${product.id}">
                ${product.icon ? `<div class="product-card__icon">${product.icon}</div>` : ''}
                
                <div class="product-card__content">
                    <h3 class="product-card__title">
                        ${isKorean ? product.name : product.nameEn}
                    </h3>
                    
                    ${product.subtitle ? `
                        <p class="product-card__subtitle">
                            ${isKorean ? product.subtitle : product.subtitleEn}
                        </p>
                    ` : ''}
                    
                    <p class="product-card__description">
                        ${isKorean ? product.description : product.descriptionEn}
                    </p>
                    
                    ${this.options.showPrice && product.price ? `
                        <div class="product-card__price">
                            ${LUWEI_UTILS.formatPrice(product.price)}
                        </div>
                    ` : ''}
                    
                    ${this.options.showStatus && product.status === 'coming-soon' ? `
                        <div class="product-card__status">
                            <span class="product-card__schedule">
                                ${isKorean ? product.releaseDate : product.releaseDateEn}
                            </span>
                        </div>
                    ` : ''}
                    
                    ${this.options.showActions && (product.status === 'active' || product.youtubeUrl || product.gumroadUrl) ? `
                        <div class="product-card__actions">
                            ${product.youtubeUrl ? `
                                <a href="${product.youtubeUrl}" 
                                   class="btn btn--small" 
                                   target="_blank" 
                                   rel="noopener noreferrer">
                                    <span data-ko="무료 미리듣기" data-en="Free Preview">
                                        ${isKorean ? '무료 미리듣기' : 'Free Preview'}
                                    </span>
                                </a>
                            ` : ''}
                            ${product.gumroadUrl ? `
                                <a href="${product.gumroadUrl}" 
                                   class="btn btn--small btn--outline" 
                                   target="_blank" 
                                   rel="noopener noreferrer">
                                    <span data-ko="전체 오디오 구매" data-en="Get Full Audio">
                                        ${isKorean ? '전체 오디오 구매' : 'Get Full Audio'}
                                    </span>
                                </a>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        if (this.options.animation) {
            this.addAnimation();
        }
    }

    addAnimation() {
        const card = this.element.querySelector('.product-card');
        if (!card) return;

        // Intersection Observer로 애니메이션 트리거
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('product-card--animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);
    }
}

// 카테고리 섹션 컴포넌트
class CategorySection extends LUWEIComponent {
    get defaultOptions() {
        return {
            categoryId: null,
            title: '',
            titleEn: '',
            description: '',
            descriptionEn: '',
            showViewAll: false,
            maxItems: null,
            hideTitle: false
        };
    }

    init() {
        super.init();
        this.render();
    }

    render() {
        const categoryId = this.options.categoryId;
        const products = LUWEI_UTILS.getProductsByCategory(categoryId);
        const categoryInfo = LUWEI_UTILS.getCategoryInfo(categoryId);
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        // 제품 수 제한
        const displayProducts = this.options.maxItems 
            ? products.slice(0, this.options.maxItems)
            : products;

        this.element.innerHTML = `
            <div class="category-section" data-category="${categoryId}">
                ${!this.options.hideTitle ? `
                    <div class="category-section__header">
                        <h2 class="category-section__title">
                            ${this.options.title || (isKorean ? categoryInfo?.name : categoryInfo?.nameEn)}
                        </h2>
                        
                        ${(this.options.description || categoryInfo?.description) ? `
                            <p class="category-section__description">
                                ${isKorean 
                                    ? (this.options.description || categoryInfo?.description)
                                    : (this.options.descriptionEn || categoryInfo?.descriptionEn)
                                }
                            </p>
                        ` : ''}
                        
                        ${this.options.showViewAll ? `
                            <a href="#${categoryId}" class="category-section__view-all">
                                <span data-ko="전체 보기" data-en="View All">
                                    ${isKorean ? '전체 보기' : 'View All'}
                                </span>
                            </a>
                        ` : ''}
                    </div>
                ` : ''}
                
                <div class="category-section__grid">
                    ${displayProducts.map(product => `
                        <div class="category-section__item" data-product-id="${product.id}">
                            <!-- 제품 카드가 여기에 동적으로 삽입됩니다 -->
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // 각 제품 카드 렌더링
        const productItems = this.element.querySelectorAll('.category-section__item');
        productItems.forEach((item, index) => {
            const productCard = new ProductCard(item, {
                product: displayProducts[index],
                ...this.options.productCardOptions
            });
        });
    }
}

// 네비게이션 컴포넌트
class Navigation extends LUWEIComponent {
    get defaultOptions() {
        return {
            showLanguageToggle: true,
            showShareButton: true,
            sticky: false
        };
    }

    init() {
        super.init();
        this.render();
        this.bindEvents();
    }

    render() {
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        this.element.innerHTML = `
            <nav class="nav" aria-label="Main navigation">
                <div class="nav__container">
                    <a href="/" class="nav__logo" aria-label="LUWEI SYSTEM Home">
                        <img src="./assets/LUWEI SYSTEM.svg" alt="LUWEI SYSTEM" class="nav__logo-img">
                    </a>
                    
                    <ul class="nav__menu">
                        <li><a href="/" class="nav__link" data-ko="Home" data-en="Home">${isKorean ? 'Home' : 'Home'}</a></li>
                        <li><a href="#about" class="nav__link" data-ko="브랜드 철학" data-en="Philosophy">${isKorean ? '브랜드 철학' : 'Philosophy'}</a></li>
                        <li><a href="#routines" class="nav__link" data-ko="무 루틴" data-en="MU Routine">${isKorean ? '무 루틴' : 'MU Routine'}</a></li>
                        <li><a href="#app" class="nav__link" data-ko="앱" data-en="App">${isKorean ? '앱' : 'App'}</a></li>
                        <li><a href="#goods" class="nav__link" data-ko="굿즈" data-en="Goods">${isKorean ? '굿즈' : 'Goods'}</a></li>
                        <li><a href="#schedule" class="nav__link" data-ko="출시 일정" data-en="Schedule">${isKorean ? '출시 일정' : 'Schedule'}</a></li>
                        <li><a href="#connect" class="nav__link" data-ko="연결" data-en="Connect">${isKorean ? '연결' : 'Connect'}</a></li>
                    </ul>
                    
                    <div class="nav__button-group">
                        ${this.options.showLanguageToggle ? `
                            <button class="lang-toggle" aria-label="언어 전환">
                                <span class="lang-toggle__text">${isKorean ? 'EN' : '한'}</span>
                            </button>
                        ` : ''}
                        
                        ${this.options.showShareButton ? `
                            <button class="share-toggle" onclick="copyToClipboard()" aria-label="링크 공유">
                                <span class="share-toggle__text">🔗</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </nav>
        `;
    }

    bindEvents() {
        // 언어 토글 이벤트
        const langToggle = this.element.querySelector('.lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }

        // 네비게이션 링크 이벤트
        const navLinks = this.element.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e);
            });
        });
    }

    toggleLanguage() {
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const newLang = currentLang === 'ko' ? 'en' : 'ko';
        
        console.log('Toggling language from', currentLang, 'to', newLang);
        
        localStorage.setItem('luwei-lang', newLang);
        
        // 전체 페이지 언어 업데이트
        this.updatePageLanguage(newLang);
    }

    updatePageLanguage(lang) {
        console.log('Updating page language to:', lang);
        
        // 모든 다국어 요소 업데이트
        const elements = document.querySelectorAll('[data-ko][data-en]');
        console.log('Found', elements.length, 'multilingual elements');
        
        elements.forEach(element => {
            if (lang === 'en') {
                const englishText = element.getAttribute('data-en');
                if (englishText) {
                    element.innerHTML = englishText;
                    element.setAttribute('lang', 'en');
                }
            } else {
                const koreanText = element.getAttribute('data-ko');
                if (koreanText) {
                    element.innerHTML = koreanText;
                    element.setAttribute('lang', 'ko');
                }
            }
        });
        
        // 브랜드 철학 섹션 특별 처리
        this.updateAboutSection(lang);

        // 동적 콘텐츠 업데이트
        this.updateDynamicContent(lang);
        
        // 언어 토글 버튼 텍스트 업데이트
        this.updateLanguageToggleButton(lang);
        
        console.log('Page language update completed');
    }
    
    updateLanguageToggleButton(lang) {
        const langToggle = document.querySelector('.lang-toggle');
        if (langToggle) {
            const toggleText = langToggle.querySelector('.lang-toggle__text');
            if (toggleText) {
                toggleText.textContent = lang === 'ko' ? 'EN' : '한';
            }
        }
    }
    
    updateAboutSection(lang) {
        // 브랜드 철학 섹션의 복잡한 구조 업데이트
        const aboutCards = document.querySelectorAll('.about__card');
        aboutCards.forEach(card => {
            const title = card.querySelector('.about__card-title');
            const text = card.querySelector('.about__card-text');
            
            if (title && title.hasAttribute('data-ko') && title.hasAttribute('data-en')) {
                title.innerHTML = lang === 'en' ? title.getAttribute('data-en') : title.getAttribute('data-ko');
            }
            
            if (text && text.hasAttribute('data-ko') && text.hasAttribute('data-en')) {
                text.innerHTML = lang === 'en' ? text.getAttribute('data-en') : text.getAttribute('data-ko');
            }
        });
        
        // 브랜드 톤 그리드 업데이트
        const brandToneItems = document.querySelectorAll('.brand-tone-item');
        brandToneItems.forEach(item => {
            if (item.hasAttribute('data-ko') && item.hasAttribute('data-en')) {
                item.innerHTML = lang === 'en' ? item.getAttribute('data-en') : item.getAttribute('data-ko');
            }
        });
        
        // 색상 팔레트 업데이트
        const colorNames = document.querySelectorAll('.color-name');
        colorNames.forEach(name => {
            if (name.hasAttribute('data-ko') && name.hasAttribute('data-en')) {
                name.innerHTML = lang === 'en' ? name.getAttribute('data-en') : name.getAttribute('data-ko');
            }
        });
    }

    updateDynamicContent(lang) {
        console.log('Updating dynamic content for language:', lang);
        
        // 모든 카테고리 섹션 다시 렌더링
        const categorySections = document.querySelectorAll('[id$="-category-section"]');
        categorySections.forEach(section => {
            const categoryId = section.id.replace('-category-section', '');
            
            // 해당 카테고리의 컴포넌트 다시 생성
            if (categoryId === 'routines') {
                new LUWEI_COMPONENTS.CategorySection(section, {
                    categoryId: 'routines',
                    showViewAll: true,
                    maxItems: 4
                });
            } else if (categoryId === 'templates') {
                new LUWEI_COMPONENTS.CategorySection(section, {
                    categoryId: 'templates',
                    showViewAll: true,
                    maxItems: 3
                });
            } else if (categoryId === 'goods') {
                new LUWEI_COMPONENTS.CategorySection(section, {
                    categoryId: 'goods',
                    showViewAll: false,
                    maxItems: 1,
                    hideTitle: true
                });
            } else if (categoryId === 'digitalArt') {
                new LUWEI_COMPONENTS.CategorySection(section, {
                    categoryId: 'digitalArt',
                    showViewAll: false,
                    maxItems: 1,
                    hideTitle: true
                });
            }
        });
        
        // 히어로 섹션 다시 렌더링
        const heroContainer = document.getElementById('hero-container');
        if (heroContainer) {
            new LUWEI_COMPONENTS.HeroSection(heroContainer, {
                showSchedule: true,
                showCTA: true,
                showDynamicMessage: true
            });
        }
        
        console.log('Dynamic content update completed');
    }

    handleNavClick(e) {
        const href = e.target.closest('a').getAttribute('href');
        
        if (href === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.pushState(null, null, '/');
        } else if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = this.element.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, href);
            }
        }
    }
}

// 히어로 섹션 컴포넌트
class HeroSection extends LUWEIComponent {
    get defaultOptions() {
        return {
            showSchedule: true,
            showCTA: true,
            showDynamicMessage: true
        };
    }

    init() {
        super.init();
        this.render();
        this.bindEvents();
    }

    render() {
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        this.element.innerHTML = `
            <section id="home" class="hero">
                <div class="hero__container">
                    <div class="hero__content">
                        <div class="hero__circle">
                            <img src="./assets/Circle_logo.svg" alt="" class="hero__circle-img" aria-hidden="true">
                        </div>
                        
                        <div class="hero__text">
                            <h1 class="hero__title">
                                <span class="hero__line hero__line--main" data-ko="시스템을 끈다." data-en="Turn off the system.">
                                    ${isKorean ? '시스템을 끈다.' : 'Turn off the system.'}
                                </span>
                                <span class="hero__line hero__line--sub" data-ko="감정은 흐른다." data-en="Emotions flow.">
                                    ${isKorean ? '감정은 흐른다.' : 'Emotions flow.'}
                                </span>
                                <span class="hero__line hero__line--sub" data-ko="나는 중심에 남는다." data-en="I remain centered.">
                                    ${isKorean ? '나는 중심에 남는다.' : 'I remain centered.'}
                                </span>
                                <span class="hero__line hero__line--en" lang="en">
                                    System off. Emotions flow. I remain centered.
                                </span>
                            </h1>
                            
                            ${this.options.showSchedule ? `
                                <div class="hero__schedule">
                                    <p class="hero__schedule-text" 
                                       data-ko="✨ '물·빛' 시리즈 출시 완료!<br>2025년 1월 – LUWEI 모바일 앱 출시<br>12월 말 – 패키지 공개" 
                                       data-en="✨ 'Water·Light' series is now available!<br>January 2025 – LUWEI mobile app<br>End of year – Complete package">
                                        ${isKorean 
                                            ? '✨ \'물·빛\' 시리즈 출시 완료!<br>2025년 1월 – LUWEI 모바일 앱 출시<br>12월 말 – 패키지 공개'
                                            : '✨ \'Water·Light\' series is now available!<br>January 2025 – LUWEI mobile app<br>End of year – Complete package'
                                        }
                                    </p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    ${this.options.showCTA ? `
                        <div class="hero__cta">
                            <a href="${LUWEI_CONFIG.links.gumroad}" 
                               class="btn btn--primary" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="첫 오디오 체험하기 - Gumroad 방문"
                               data-ko="첫 오디오 체험하기"
                               data-en="Try First Audio">
                                ${isKorean ? '첫 오디오 체험하기' : 'Try First Audio'}
                            </a>
                            <a href="${LUWEI_CONFIG.links.youtube}" 
                               class="btn btn--secondary" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="무료 명상 오디오 듣기 - YouTube 방문"
                               data-ko="무료 명상 오디오 듣기"
                               data-en="Listen Free Audio">
                                ${isKorean ? '무료 명상 오디오 듣기' : 'Listen Free Audio'}
                            </a>
                        </div>
                    ` : ''}
                    
                    ${this.options.showDynamicMessage ? `
                        <div class="hero__dynamic-content">
                            <div class="dynamic-message" id="dynamic-message">
                                <span class="message-text" 
                                      data-ko="지금 이 순간, 고요함을 느껴보세요." 
                                      data-en="Feel the stillness in this moment.">
                                    ${isKorean ? '지금 이 순간, 고요함을 느껴보세요.' : 'Feel the stillness in this moment.'}
                                </span>
                            </div>
                        </div>
                    ` : ''}
                    
                    <p class="hero__subtitle">
                        LUWEI SYSTEM — <span lang="en">A calm digital brand from Seoul</span>
                    </p>
                </div>
            </section>
        `;
    }

    bindEvents() {
        // 동적 메시지 시스템 초기화
        if (this.options.showDynamicMessage) {
            this.initDynamicMessages();
        }
    }

    initDynamicMessages() {
        const messageElement = document.getElementById('dynamic-message');
        if (!messageElement) return;

        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const messages = LUWEI_CONFIG.messages[currentLang];
        let currentIndex = 0;

        const updateMessage = () => {
            const messageText = messageElement.querySelector('.message-text');
            if (!messageText) return;

            // 페이드 아웃
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(10px)';

            setTimeout(() => {
                // 텍스트 업데이트
                messageText.textContent = messages[currentIndex];

                // 페이드 인
                messageElement.style.opacity = '1';
                messageElement.style.transform = 'translateY(0)';

                // 다음 메시지로 이동
                currentIndex = (currentIndex + 1) % messages.length;
            }, 500);
        };

        // 8초마다 메시지 업데이트
        setInterval(updateMessage, 8000);
    }
}

// 컴포넌트 팩토리
class ComponentFactory {
    static create(type, element, options = {}) {
        const componentMap = {
            'product-card': ProductCard,
            'category-section': CategorySection,
            'navigation': Navigation,
            'hero-section': HeroSection
        };

        const ComponentClass = componentMap[type];
        if (!ComponentClass) {
            console.error(`Unknown component type: ${type}`);
            return null;
        }

        return new ComponentClass(element, options);
    }

    static createAll() {
        // 자동으로 모든 컴포넌트 생성
        const componentElements = document.querySelectorAll('[data-component]');
        
        componentElements.forEach(element => {
            const type = element.dataset.component;
            const options = element.dataset.options ? JSON.parse(element.dataset.options) : {};
            
            this.create(type, element, options);
        });
    }
}

// 전역 접근을 위한 설정
window.LUWEI_COMPONENTS = {
    ProductCard,
    CategorySection,
    Navigation,
    HeroSection,
    ComponentFactory
};

console.log('LUWEI SYSTEM: Component system loaded successfully');
