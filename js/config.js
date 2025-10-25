// LUWEI SYSTEM - Configuration & Data Management
// 확장 가능한 구조를 위한 중앙 설정 파일

const LUWEI_CONFIG = {
    // 브랜드 설정
    brand: {
        name: "LUWEI SYSTEM",
        tagline: "조용한 시스템, 고요한 질서",
        taglineEn: "A silent system, a quiet order",
        description: "감정에 피로한 사람들에게 무(無)의 구조를 제공하는 브랜드",
        descriptionEn: "A brand that provides the structure of nothingness to those tired of emotions"
    },

    // 색상 팔레트 (요청사항 반영)
    colors: {
        primary: "#CFE8FF",      // 하늘색 - 개방/평온
        secondary: "#E9EEF2",    // 연회색 - 안정/균형  
        accent: "#DFF5E1",      // 연초록 - 자연/흐름
        accentPink: "#FFD7E5",  // 옅은 분홍 - 따뜻함/연결
        white: "#FFFFFF",       // 흰색
        text: "#111111",        // 텍스트
        textLight: "#222222"     // 연한 텍스트
    },

    // 타이포그래피 설정
    typography: {
        primaryFont: "'Noto Sans KR', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        secondaryFont: "'Inter', monospace",
        sizes: {
            xs: "12px",
            sm: "14px", 
            base: "16px",
            lg: "18px",
            xl: "20px",
            "2xl": "24px",
            "3xl": "32px",
            "4xl": "40px",
            "5xl": "48px",
            "6xl": "64px"
        }
    },

    // 간격 시스템
    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "80px",
        "5xl": "100px"
    },

    // 브레이크포인트 (모바일 우선)
    breakpoints: {
        xs: "320px",
        sm: "480px", 
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px"
    },

    // 애니메이션 설정
    animations: {
        duration: {
            fast: "0.2s",
            normal: "0.3s", 
            slow: "0.5s"
        },
        easing: {
            ease: "ease",
            easeIn: "ease-in",
            easeOut: "ease-out",
            easeInOut: "ease-in-out"
        }
    },

    // 제품 카테고리 (확장 가능한 구조)
    categories: {
        routines: {
            id: "routines",
            name: "무 루틴",
            nameEn: "MU Routine",
            description: "명상 오디오 시리즈",
            descriptionEn: "Meditation Audio Series",
            icon: "🌊",
            color: "primary"
        },
        templates: {
            id: "templates", 
            name: "템플릿",
            nameEn: "Templates",
            description: "감정 OFF 루틴 템플릿",
            descriptionEn: "Emotion OFF Routine Templates",
            icon: "📝",
            color: "accent"
        },
        goods: {
            id: "goods",
            name: "굿즈",
            nameEn: "Goods", 
            description: "브랜드 굿즈",
            descriptionEn: "Brand Goods",
            icon: "🎁",
            color: "accentPink"
        },
        digitalArt: {
            id: "digitalArt",
            name: "디지털 아트",
            nameEn: "Digital Art",
            description: "디지털 아트워크",
            descriptionEn: "Digital Artworks", 
            icon: "🎨",
            color: "secondary"
        }
    },

    // 현재 제품 데이터 (동적으로 관리 가능)
    products: {
        routines: [
            {
                id: "water",
                name: "무 루틴 : 물",
                nameEn: "MU Routine : Water",
                subtitle: "흐름의 원소",
                subtitleEn: "the element of flow",
                description: "9분 Audio-visual Meditation",
                descriptionEn: "9-minute Audio-visual Meditation",
                price: 4900,
                status: "active",
                icon: "🌊",
                features: ["9분 명상", "비주얼 가이드", "다운로드 가능"],
                featuresEn: ["9-min meditation", "Visual guide", "Downloadable"],
                youtubeUrl: "https://www.youtube.com/watch?v=lsxubjDemZA",
                gumroadUrl: "https://luweisystem.gumroad.com/l/ahqlv?layout=profile"
            },
            {
                id: "light",
                name: "무 루틴 : 빛", 
                nameEn: "MU Routine : Light",
                subtitle: "빛의 본질",
                subtitleEn: "the element of light",
                description: "10분 Audio-visual Meditation",
                descriptionEn: "10-minute Audio-visual Meditation",
                price: 9900,
                status: "active",
                icon: "💡",
                features: ["10분 명상", "비주얼 가이드", "다운로드 가능"],
                featuresEn: ["10-min meditation", "Visual guide", "Downloadable"],
                youtubeUrl: "https://youtu.be/UXK9_QSWdSo",
                gumroadUrl: "https://luweisystem.gumroad.com/l/ddvpx?layout=profile"
            },
            {
                id: "wind",
                name: "무 루틴 : 바람",
                nameEn: "MU Routine : Wind", 
                subtitle: "움직임의 원소",
                subtitleEn: "the element of movement",
                description: "2025년 출시 예정",
                descriptionEn: "Coming 2025",
                price: 4900,
                status: "coming-soon",
                icon: "🌬",
                features: ["자연스러운 흐름", "바람의 리듬", "움직임 가이드"],
                featuresEn: ["Natural flow", "Wind rhythm", "Movement guide"]
            },
            {
                id: "balance",
                name: "무 루틴 : 균형",
                nameEn: "MU Routine : Balance",
                subtitle: "질서의 원소", 
                subtitleEn: "the element of order",
                description: "2025년 출시 예정",
                descriptionEn: "Coming 2025",
                price: 4900,
                status: "coming-soon",
                icon: "🌾",
                features: ["완벽한 균형", "질서의 아름다움", "안정감"],
                featuresEn: ["Perfect balance", "Beauty of order", "Stability"]
            }
        ],
        templates: [
            {
                id: "daily-off",
                name: "하루 OFF",
                nameEn: "Daily OFF",
                description: "감정 OFF 루틴 기록 템플릿",
                descriptionEn: "OFF routine recording template",
                price: 2900,
                status: "coming-soon",
                releaseDate: "12월 초",
                releaseDateEn: "Early December"
            },
            {
                id: "emotion-calendar",
                name: "감정 캘린더", 
                nameEn: "Emotion Calendar",
                description: "월간 감정 흐름 추적 캘린더",
                descriptionEn: "Monthly emotion flow calendar",
                price: 3900,
                status: "coming-soon",
                releaseDate: "12월 중",
                releaseDateEn: "Mid December"
            },
            {
                id: "system-dashboard",
                name: "시스템 대시보드",
                nameEn: "System Dashboard", 
                description: "개인 고요 시스템 관리 대시보드",
                descriptionEn: "Personal stillness system dashboard",
                price: 4900,
                status: "coming-soon",
                releaseDate: "12월 말",
                releaseDateEn: "Late December"
            }
        ],
        goods: [
            {
                id: "coming-soon-goods",
                name: "곧 출시될 굿즈",
                nameEn: "Coming Soon Goods",
                description: "일상 속 고요함을 담은 굿즈",
                descriptionEn: "Goods that bring stillness to daily life",
                status: "coming-soon",
                releaseDate: "출시 예정",
                releaseDateEn: "Coming Soon",
                icon: "🎨"
            }
        ],
        digitalArt: [
            {
                id: "coming-soon-digital-art",
                name: "곧 출시될 디지털 아트워크",
                nameEn: "Coming Soon Digital Artwork",
                description: "디지털 공간의 고요한 아름다움",
                descriptionEn: "Quiet beauty in digital space",
                status: "coming-soon",
                releaseDate: "출시 예정",
                releaseDateEn: "Coming Soon",
                icon: "🖼️"
            }
        ]
    },

    // 출시 일정
    schedule: [
        {
            id: "water-light-series",
            date: "11월 중",
            dateEn: "Mid-November", 
            title: "무 루틴 오디오 '물·빛' 시리즈",
            titleEn: "'Water·Light' Meditation Audio Series",
            description: "물과 빛의 명상 오디오로 시작하는 고요의 여행",
            descriptionEn: "Begin your journey to stillness with Water and Light meditation audio",
            status: "completed",
            progress: 100
        },
        {
            id: "daily-templates",
            date: "12월 초",
            dateEn: "Early December",
            title: "하루 OFF 템플릿", 
            titleEn: "Daily OFF Templates",
            description: "감정 OFF 루틴을 기록하는 Notion 템플릿",
            descriptionEn: "Notion templates for recording your OFF routine",
            status: "upcoming"
        },
        {
            id: "luwei-package",
            date: "12월 말",
            dateEn: "Late December",
            title: "루웨이 패키지",
            titleEn: "LUWEI Package", 
            description: "오디오 + 템플릿이 함께하는 완전한 고요 시스템",
            descriptionEn: "Complete stillness system with audio + templates",
            status: "upcoming"
        },
        {
            id: "global-edition",
            date: "2025년 연말",
            dateEn: "End of 2025",
            title: "글로벌 영문판 출간",
            titleEn: "Global English Edition",
            description: "감정의 흐름을 국내를 넘어 세계로 확장합니다",
            descriptionEn: "Expanding the flow of emotions beyond Korea to the world",
            status: "global"
        }
    ],

    // 연결 링크
    links: {
        gumroad: "https://luweisystem.gumroad.com",
        instagram: "https://instagram.com/luweisystem", 
        youtube: "https://youtube.com/@luwei.system",
        github: "https://github.com/luwei-system"
    },

    // 서점 정보
    bookstores: [
        {
            name: "교보문고",
            url: "https://product.kyobobook.co.kr/detail/S000217121886",
            icon: "📚"
        },
        {
            name: "알라딘", 
            url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K162030191&start=pnaver_02",
            icon: "🔍"
        },
        {
            name: "예스24",
            url: "https://www.yes24.com/Product/Goods/148703380", 
            icon: "📖"
        },
        {
            name: "영풍문고",
            url: "https://www.ypbooks.co.kr/books/202507086796725471?gubun=NV&NaPm=ct%3Dmh36qnu8%7Cci%3Dc9d76ae840ed7ed6c22ba6c803a7ac717b1fa66a%7Ctr%3Dboksl1%7Csn%3D5295494%7Chk%3D277fe9f006ef1a073c6083bd47170eceae1554e7",
            icon: "🏪"
        },
        {
            name: "부크크",
            url: "https://bookk.co.kr/bookStore/68510a460804ee1e87094088",
            icon: "📘"
        },
        {
            name: "네이버 스마트스토어",
            url: "https://smartstore.naver.com/yes24book/products/12072646134",
            icon: "🛒"
        }
    ],

    // 동적 메시지
    messages: {
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
    },

    // 브랜드 톤 (요청사항 반영)
    brandTone: [
        { ko: "단정한 질서", en: "Orderly" },
        { ko: "느린 흐름", en: "Slow" },
        { ko: "대칭의 아름다움", en: "Symmetrical" },
        { ko: "무편집의 진실", en: "Unedited" },
        { ko: "진짜의 순간", en: "Real" }
    ],

    // 캐시 설정
    cache: {
        version: "20241219-v2",
        maxAge: 3600, // 1시간
        strategies: {
            static: "cache-first",
            dynamic: "network-first"
        }
    }
};

// 전역 접근을 위한 설정
window.LUWEI_CONFIG = LUWEI_CONFIG;

// 브라우저 콘솔에서 사용할 수 있는 언어 변경 함수
window.setLanguage = (lang) => {
    console.log('Setting language to:', lang);
    LUWEI_UTILS.setLanguage(lang);
};

// 브라우저 콘솔에서 현재 언어 확인 함수
window.getCurrentLanguage = () => {
    return LUWEI_UTILS.getCurrentLanguage();
};

// 브라우저 콘솔에서 언어 토글 테스트 함수
window.testLanguageToggle = () => {
    const nav = document.querySelector('#navigation-container');
    if (nav && nav._navigation) {
        nav._navigation.toggleLanguage();
    } else {
        console.log('Navigation not found or not initialized');
    }
};

// 유틸리티 함수들
window.LUWEI_UTILS = {
    // 색상 가져오기
    getColor: (colorName) => LUWEI_CONFIG.colors[colorName],
    
    // 브레이크포인트 체크
    isMobile: () => window.innerWidth < parseInt(LUWEI_CONFIG.breakpoints.md),
    isTablet: () => {
        const width = window.innerWidth;
        return width >= parseInt(LUWEI_CONFIG.breakpoints.md) && width < parseInt(LUWEI_CONFIG.breakpoints.lg);
    },
    isDesktop: () => window.innerWidth >= parseInt(LUWEI_CONFIG.breakpoints.lg),
    
    // 현재 언어 가져오기
    getCurrentLanguage: () => {
        const lang = localStorage.getItem('luwei-lang') || 'ko';
        console.log('Current language:', lang); // 디버깅용
        return lang;
    },
    
    // 언어 설정하기
    setLanguage: (lang) => {
        localStorage.setItem('luwei-lang', lang);
        console.log('Language set to:', lang); // 디버깅용
        location.reload(); // 페이지 새로고침으로 언어 변경 적용
    },
    
    // 제품 데이터 가져오기
    getProductsByCategory: (categoryId) => LUWEI_CONFIG.products[categoryId] || [],
    
    // 카테고리 정보 가져오기
    getCategoryInfo: (categoryId) => LUWEI_CONFIG.categories[categoryId] || null,
    
    // 가격 포맷팅
    formatPrice: (price) => `₩${price.toLocaleString()}`,
    
    // 날짜 포맷팅
    formatDate: (dateString, lang = 'ko') => {
        const date = new Date(dateString);
        return lang === 'en' 
            ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            : date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
    }
};

console.log('LUWEI SYSTEM: Configuration loaded successfully');
