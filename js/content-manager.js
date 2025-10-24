// LUWEI SYSTEM - Dynamic Content Management System
// 확장 가능한 콘텐츠 관리 및 페이지 라우팅 시스템

class ContentManager {
    constructor() {
        this.currentPage = 'home';
        this.contentCache = new Map();
        this.init();
    }

    init() {
        this.setupRouting();
        this.loadInitialContent();
        this.bindEvents();
    }

    setupRouting() {
        // URL 해시 변경 감지
        window.addEventListener('hashchange', () => {
            this.handleRouteChange();
        });

        // 초기 라우트 처리
        this.handleRouteChange();
    }

    handleRouteChange() {
        const hash = window.location.hash.substring(1) || 'home';
        this.navigateToPage(hash);
    }

    navigateToPage(pageId) {
        if (this.currentPage === pageId) return;

        this.currentPage = pageId;
        this.loadPageContent(pageId);
        this.updateNavigation(pageId);
        this.updatePageTitle(pageId);
    }

    async loadPageContent(pageId) {
        try {
            // 캐시에서 먼저 확인
            if (this.contentCache.has(pageId)) {
                this.renderPageContent(pageId, this.contentCache.get(pageId));
                return;
            }

            // 페이지별 콘텐츠 로드
            const content = await this.fetchPageContent(pageId);
            this.contentCache.set(pageId, content);
            this.renderPageContent(pageId, content);

        } catch (error) {
            console.error(`Error loading page ${pageId}:`, error);
            this.showErrorPage(pageId);
        }
    }

    async fetchPageContent(pageId) {
        // 페이지별 콘텐츠 정의
        const pageContents = {
            home: this.getHomeContent(),
            routines: this.getRoutinesContent(),
            templates: this.getTemplatesContent(),
            goods: this.getGoodsContent(),
            digitalArt: this.getDigitalArtContent(),
            schedule: this.getScheduleContent(),
            connect: this.getConnectContent(),
            about: this.getAboutContent()
        };

        return pageContents[pageId] || this.getNotFoundContent();
    }

    getHomeContent() {
        return {
            type: 'home',
            sections: [
                {
                    id: 'hero',
                    component: 'hero-section',
                    data: {
                        showSchedule: true,
                        showCTA: true,
                        showDynamicMessage: true
                    }
                },
                {
                    id: 'featured-products',
                    component: 'category-section',
                    data: {
                        categoryId: 'routines',
                        title: '추천 제품',
                        titleEn: 'Featured Products',
                        description: '지금 바로 경험해보세요',
                        descriptionEn: 'Experience now',
                        maxItems: 2,
                        showViewAll: true
                    }
                }
            ]
        };
    }

    getRoutinesContent() {
        const routines = LUWEI_UTILS.getProductsByCategory('routines');
        const categoryInfo = LUWEI_UTILS.getCategoryInfo('routines');
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        return {
            type: 'category',
            categoryId: 'routines',
            title: isKorean ? categoryInfo.name : categoryInfo.nameEn,
            description: isKorean ? categoryInfo.description : categoryInfo.descriptionEn,
            products: routines,
            filters: [
                { id: 'all', label: isKorean ? '전체' : 'All', labelEn: 'All' },
                { id: 'active', label: isKorean ? '출시됨' : 'Available', labelEn: 'Available' },
                { id: 'coming-soon', label: isKorean ? '출시 예정' : 'Coming Soon', labelEn: 'Coming Soon' }
            ],
            sortOptions: [
                { id: 'name', label: isKorean ? '이름순' : 'Name', labelEn: 'Name' },
                { id: 'price', label: isKorean ? '가격순' : 'Price', labelEn: 'Price' },
                { id: 'release', label: isKorean ? '출시일순' : 'Release Date', labelEn: 'Release Date' }
            ]
        };
    }

    getTemplatesContent() {
        const templates = LUWEI_UTILS.getProductsByCategory('templates');
        const categoryInfo = LUWEI_UTILS.getCategoryInfo('templates');
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        return {
            type: 'category',
            categoryId: 'templates',
            title: isKorean ? categoryInfo.name : categoryInfo.nameEn,
            description: isKorean ? categoryInfo.description : categoryInfo.descriptionEn,
            products: templates,
            filters: [
                { id: 'all', label: isKorean ? '전체' : 'All', labelEn: 'All' },
                { id: 'coming-soon', label: isKorean ? '출시 예정' : 'Coming Soon', labelEn: 'Coming Soon' }
            ],
            sortOptions: [
                { id: 'name', label: isKorean ? '이름순' : 'Name', labelEn: 'Name' },
                { id: 'price', label: isKorean ? '가격순' : 'Price', labelEn: 'Price' },
                { id: 'release', label: isKorean ? '출시일순' : 'Release Date', labelEn: 'Release Date' }
            ]
        };
    }

    getGoodsContent() {
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        return {
            type: 'category',
            categoryId: 'goods',
            title: isKorean ? '굿즈' : 'Goods',
            description: isKorean ? '브랜드 굿즈' : 'Brand Goods',
            products: [],
            comingSoon: true,
            message: isKorean 
                ? '곧 출시될 굿즈를 기대해주세요. 브랜드의 감성을 담은 특별한 아이템들이 준비 중입니다.'
                : 'Stay tuned for upcoming goods. Special items that embody the brand\'s sensibility are being prepared.'
        };
    }

    getDigitalArtContent() {
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        return {
            type: 'category',
            categoryId: 'digitalArt',
            title: isKorean ? '디지털 아트' : 'Digital Art',
            description: isKorean ? '디지털 아트워크' : 'Digital Artworks',
            products: [],
            comingSoon: true,
            message: isKorean 
                ? '곧 출시될 디지털 아트워크를 기대해주세요. 고요함을 담은 디지털 작품들이 준비 중입니다.'
                : 'Stay tuned for upcoming digital artworks. Digital works that embody stillness are being prepared.'
        };
    }

    getScheduleContent() {
        return {
            type: 'schedule',
            schedule: LUWEI_CONFIG.schedule
        };
    }

    getConnectContent() {
        return {
            type: 'connect',
            links: LUWEI_CONFIG.links,
            bookstores: LUWEI_CONFIG.bookstores
        };
    }

    getAboutContent() {
        return {
            type: 'about',
            brandTone: LUWEI_CONFIG.brandTone,
            colors: LUWEI_CONFIG.colors
        };
    }

    getNotFoundContent() {
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        return {
            type: 'not-found',
            title: isKorean ? '페이지를 찾을 수 없습니다' : 'Page Not Found',
            message: isKorean 
                ? '요청하신 페이지를 찾을 수 없습니다. 홈으로 돌아가시거나 다른 페이지를 확인해주세요.'
                : 'The requested page could not be found. Please return to the home page or check another page.'
        };
    }

    renderPageContent(pageId, content) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // 페이지별 렌더링
        switch (content.type) {
            case 'home':
                this.renderHomePage(mainContent, content);
                break;
            case 'category':
                this.renderCategoryPage(mainContent, content);
                break;
            case 'schedule':
                this.renderSchedulePage(mainContent, content);
                break;
            case 'connect':
                this.renderConnectPage(mainContent, content);
                break;
            case 'about':
                this.renderAboutPage(mainContent, content);
                break;
            case 'not-found':
                this.renderNotFoundPage(mainContent, content);
                break;
            default:
                this.renderNotFoundPage(mainContent, content);
        }

        // 페이지 로드 완료 이벤트 발생
        this.dispatchPageLoadEvent(pageId, content);
    }

    renderHomePage(container, content) {
        container.innerHTML = `
            <div class="page page--home">
                <div class="page__content">
                    <!-- 히어로 섹션은 별도로 렌더링됨 -->
                    <div id="home-hero-container"></div>
                    
                    <!-- 추천 제품 섹션 -->
                    <div id="featured-products-container"></div>
                </div>
            </div>
        `;

        // 히어로 섹션 렌더링
        const heroContainer = document.getElementById('home-hero-container');
        if (heroContainer) {
            new LUWEI_COMPONENTS.HeroSection(heroContainer, content.sections[0].data);
        }

        // 추천 제품 섹션 렌더링
        const featuredContainer = document.getElementById('featured-products-container');
        if (featuredContainer) {
            new LUWEI_COMPONENTS.CategorySection(featuredContainer, content.sections[1].data);
        }
    }

    renderCategoryPage(container, content) {
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        container.innerHTML = `
            <div class="page page--category" data-category="${content.categoryId}">
                <div class="page__header">
                    <div class="container">
                        <h1 class="page__title">${content.title}</h1>
                        <p class="page__description">${content.description}</p>
                        
                        ${content.comingSoon ? `
                            <div class="page__coming-soon">
                                <p>${content.message}</p>
                            </div>
                        ` : `
                            <div class="page__controls">
                                <div class="page__filters">
                                    <label for="filter-select">${isKorean ? '필터:' : 'Filter:'}</label>
                                    <select id="filter-select" class="page__filter-select">
                                        ${content.filters.map(filter => `
                                            <option value="${filter.id}">${isKorean ? filter.label : filter.labelEn}</option>
                                        `).join('')}
                                    </select>
                                </div>
                                
                                <div class="page__sort">
                                    <label for="sort-select">${isKorean ? '정렬:' : 'Sort:'}</label>
                                    <select id="sort-select" class="page__sort-select">
                                        ${content.sortOptions.map(option => `
                                            <option value="${option.id}">${isKorean ? option.label : option.labelEn}</option>
                                        `).join('')}
                                    </select>
                                </div>
                            </div>
                        `}
                    </div>
                </div>
                
                <div class="page__content">
                    <div class="container">
                        ${content.comingSoon ? `
                            <div class="page__coming-soon-content">
                                <div class="coming-soon-card">
                                    <div class="coming-soon-icon">🚀</div>
                                    <h3>${isKorean ? '곧 출시됩니다' : 'Coming Soon'}</h3>
                                    <p>${content.message}</p>
                                </div>
                            </div>
                        ` : `
                            <div class="page__products" id="category-products-container">
                                <!-- 제품들이 여기에 동적으로 렌더링됩니다 -->
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;

        // 제품이 있는 경우 렌더링
        if (!content.comingSoon && content.products.length > 0) {
            this.renderCategoryProducts(content);
        }

        // 필터 및 정렬 이벤트 바인딩
        if (!content.comingSoon) {
            this.bindCategoryControls(content);
        }
    }

    renderCategoryProducts(content) {
        const container = document.getElementById('category-products-container');
        if (!container) return;

        container.innerHTML = `
            <div class="category-products-grid">
                ${content.products.map(product => `
                    <div class="category-products__item" data-product-id="${product.id}">
                        <!-- 제품 카드가 여기에 동적으로 삽입됩니다 -->
                    </div>
                `).join('')}
            </div>
        `;

        // 각 제품 카드 렌더링
        const productItems = container.querySelectorAll('.category-products__item');
        productItems.forEach((item, index) => {
            new LUWEI_COMPONENTS.ProductCard(item, {
                product: content.products[index],
                showPrice: true,
                showStatus: true,
                showActions: true,
                animation: true
            });
        });
    }

    bindCategoryControls(content) {
        const filterSelect = document.getElementById('filter-select');
        const sortSelect = document.getElementById('sort-select');

        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.filterProducts(content.categoryId, e.target.value);
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProducts(content.categoryId, e.target.value);
            });
        }
    }

    filterProducts(categoryId, filterId) {
        const products = LUWEI_UTILS.getProductsByCategory(categoryId);
        let filteredProducts = products;

        if (filterId !== 'all') {
            filteredProducts = products.filter(product => product.status === filterId);
        }

        this.updateProductsDisplay(filteredProducts);
    }

    sortProducts(categoryId, sortId) {
        const products = LUWEI_UTILS.getProductsByCategory(categoryId);
        let sortedProducts = [...products];

        switch (sortId) {
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'release':
                // 출시일 기준 정렬 (현재는 상태 기준)
                sortedProducts.sort((a, b) => {
                    const statusOrder = { 'active': 0, 'coming-soon': 1 };
                    return statusOrder[a.status] - statusOrder[b.status];
                });
                break;
        }

        this.updateProductsDisplay(sortedProducts);
    }

    updateProductsDisplay(products) {
        const container = document.getElementById('category-products-container');
        if (!container) return;

        container.innerHTML = `
            <div class="category-products-grid">
                ${products.map(product => `
                    <div class="category-products__item" data-product-id="${product.id}">
                        <!-- 제품 카드가 여기에 동적으로 삽입됩니다 -->
                    </div>
                `).join('')}
            </div>
        `;

        // 각 제품 카드 렌더링
        const productItems = container.querySelectorAll('.category-products__item');
        productItems.forEach((item, index) => {
            new LUWEI_COMPONENTS.ProductCard(item, {
                product: products[index],
                showPrice: true,
                showStatus: true,
                showActions: true,
                animation: true
            });
        });
    }

    renderSchedulePage(container, content) {
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        container.innerHTML = `
            <div class="page page--schedule">
                <div class="page__header">
                    <div class="container">
                        <h1 class="page__title">${isKorean ? '출시 일정' : 'Release Schedule'}</h1>
                        <p class="page__description">${isKorean ? '루웨이의 새로운 제품들이 출시되는 일정을 확인하세요' : 'Check the schedule for LUWEI\'s new product releases'}</p>
                    </div>
                </div>
                
                <div class="page__content">
                    <div class="container">
                        <div class="schedule-timeline">
                            ${content.schedule.map((item, index) => `
                                <div class="schedule-item ${item.status === 'current' ? 'schedule-item--current' : ''} ${item.status === 'global' ? 'schedule-item--global' : ''}">
                                    <div class="schedule-item__timeline-dot"></div>
                                    <div class="schedule-item__date">${isKorean ? item.date : item.dateEn}</div>
                                    <div class="schedule-item__content">
                                        <h3 class="schedule-item__title">${isKorean ? item.title : item.titleEn}</h3>
                                        <p class="schedule-item__description">${isKorean ? item.description : item.descriptionEn}</p>
                                        ${item.progress ? `
                                            <div class="schedule-item__progress">
                                                <div class="progress-bar">
                                                    <div class="progress-fill" style="width: ${item.progress}%"></div>
                                                </div>
                                                <div class="progress-text">${item.progress}% ${isKorean ? '완료' : 'Complete'}</div>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderConnectPage(container, content) {
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        container.innerHTML = `
            <div class="page page--connect">
                <div class="page__header">
                    <div class="container">
                        <h1 class="page__title">${isKorean ? '연결' : 'Connect'}</h1>
                        <p class="page__description">${isKorean ? '루웨이와 다양한 방법으로 연결하세요' : 'Connect with LUWEI in various ways'}</p>
                    </div>
                </div>
                
                <div class="page__content">
                    <div class="container">
                        <div class="connect-grid">
                            <div class="connect-section">
                                <h3>${isKorean ? '소셜 미디어' : 'Social Media'}</h3>
                                <div class="connect-links">
                                    <a href="${content.links.instagram}" class="connect-link" target="_blank" rel="noopener noreferrer">
                                        <div class="connect-link__icon">📸</div>
                                        <div class="connect-link__content">
                                            <span class="connect-link__title">Instagram</span>
                                            <span class="connect-link__subtitle">${isKorean ? '아카이브' : 'Archive'}</span>
                                        </div>
                                    </a>
                                    
                                    <a href="${content.links.youtube}" class="connect-link" target="_blank" rel="noopener noreferrer">
                                        <div class="connect-link__icon">🎥</div>
                                        <div class="connect-link__content">
                                            <span class="connect-link__title">YouTube</span>
                                            <span class="connect-link__subtitle">${isKorean ? '무료 오디오' : 'Free Audio'}</span>
                                        </div>
                                    </a>
                                    
                                    <a href="${content.links.github}" class="connect-link" target="_blank" rel="noopener noreferrer">
                                        <div class="connect-link__icon">⚙️</div>
                                        <div class="connect-link__content">
                                            <span class="connect-link__title">GitHub</span>
                                            <span class="connect-link__subtitle">${isKorean ? '프로젝트' : 'Projects'}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            
                            <div class="connect-section">
                                <h3>${isKorean ? '제품 구매' : 'Purchase Products'}</h3>
                                <div class="connect-links">
                                    <a href="${content.links.gumroad}" class="connect-link" target="_blank" rel="noopener noreferrer">
                                        <div class="connect-link__icon">🛒</div>
                                        <div class="connect-link__content">
                                            <span class="connect-link__title">Gumroad</span>
                                            <span class="connect-link__subtitle">${isKorean ? '구매' : 'Purchase'}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bookstore-section">
                            <h3>${isKorean ? '주요 서점에서 구매하기' : 'Available at Major Bookstores'}</h3>
                            <div class="bookstore-grid">
                                ${content.bookstores.map(bookstore => `
                                    <a href="${bookstore.url}" class="bookstore-link" target="_blank" rel="noopener noreferrer">
                                        <div class="bookstore-link__icon">${bookstore.icon}</div>
                                        <div class="bookstore-link__name">${bookstore.name}</div>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAboutPage(container, content) {
        const currentLang = LUWEI_UTILS.getCurrentLanguage();
        const isKorean = currentLang === 'ko';

        container.innerHTML = `
            <div class="page page--about">
                <div class="page__header">
                    <div class="container">
                        <h1 class="page__title">${isKorean ? '브랜드 철학' : 'Brand Philosophy'}</h1>
                        <p class="page__description">${isKorean ? '루웨이의 브랜드 철학과 가치를 알아보세요' : 'Learn about LUWEI\'s brand philosophy and values'}</p>
                    </div>
                </div>
                
                <div class="page__content">
                    <div class="container">
                        <div class="about-sections">
                            <div class="about-section">
                                <h3>${isKorean ? '브랜드 톤' : 'Brand Tone'}</h3>
                                <div class="brand-tone-grid">
                                    ${content.brandTone.map((tone, index) => `
                                        <div class="brand-tone-item brand-tone-item--${index + 1}">
                                            ${isKorean ? tone.ko : tone.en}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="about-section">
                                <h3>${isKorean ? '색감 코드' : 'Color Palette'}</h3>
                                <div class="color-palette-grid">
                                    ${Object.entries(content.colors).map(([key, value]) => `
                                        <div class="color-item">
                                            <div class="color-swatch" style="background-color: ${value};"></div>
                                            <div class="color-info">
                                                <div class="color-name">${key}</div>
                                                <div class="color-value">${value}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderNotFoundPage(container, content) {
        container.innerHTML = `
            <div class="page page--not-found">
                <div class="page__content">
                    <div class="container">
                        <div class="not-found-content">
                            <h1 class="not-found__title">${content.title}</h1>
                            <p class="not-found__message">${content.message}</p>
                            <a href="#home" class="btn btn--primary">${content.title.includes('찾을 수 없습니다') ? '홈으로 돌아가기' : 'Go Home'}</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showErrorPage(pageId) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        mainContent.innerHTML = `
            <div class="page page--error">
                <div class="page__content">
                    <div class="container">
                        <div class="error-content">
                            <h1>오류가 발생했습니다</h1>
                            <p>페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
                            <a href="#home" class="btn btn--primary">홈으로 돌아가기</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateNavigation(activePageId) {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            const href = link.getAttribute('href');
            if (href === `#${activePageId}` || (href === '/' && activePageId === 'home')) {
                link.classList.add('nav__link--active');
            }
        });
    }

    updatePageTitle(pageId) {
        const pageTitles = {
            home: 'LUWEI SYSTEM — 명상 오디오와 감정 루틴 템플릿',
            routines: '무 루틴 — LUWEI SYSTEM',
            templates: '템플릿 — LUWEI SYSTEM',
            goods: '굿즈 — LUWEI SYSTEM',
            digitalArt: '디지털 아트 — LUWEI SYSTEM',
            schedule: '출시 일정 — LUWEI SYSTEM',
            connect: '연결 — LUWEI SYSTEM',
            about: '브랜드 철학 — LUWEI SYSTEM'
        };

        document.title = pageTitles[pageId] || 'LUWEI SYSTEM';
    }

    dispatchPageLoadEvent(pageId, content) {
        const event = new CustomEvent('pageLoaded', {
            detail: { pageId, content }
        });
        window.dispatchEvent(event);
    }

    bindEvents() {
        // 페이지 로드 이벤트 리스너
        window.addEventListener('pageLoaded', (e) => {
            console.log(`Page loaded: ${e.detail.pageId}`);
            
            // 페이지별 추가 초기화 로직
            this.initializePageSpecificFeatures(e.detail.pageId, e.detail.content);
        });
    }

    initializePageSpecificFeatures(pageId, content) {
        switch (pageId) {
            case 'schedule':
                this.initializeProgressAnimations();
                break;
            case 'routines':
            case 'templates':
                this.initializeProductInteractions();
                break;
        }
    }

    initializeProgressAnimations() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    initializeProductInteractions() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    // 제품 카드 클릭 시 상세 정보 표시 (향후 구현)
                    console.log('Product card clicked:', card.dataset.productId);
                }
            });
        });
    }

    loadInitialContent() {
        // 초기 페이지 로드
        this.navigateToPage('home');
    }

    // 공개 메서드들
    getCurrentPage() {
        return this.currentPage;
    }

    refreshPage() {
        const currentPage = this.getCurrentPage();
        this.contentCache.delete(currentPage);
        this.loadPageContent(currentPage);
    }

    clearCache() {
        this.contentCache.clear();
    }
}

// 전역 접근을 위한 설정
window.LUWEI_CONTENT_MANAGER = ContentManager;

console.log('LUWEI SYSTEM: Content management system loaded successfully');
