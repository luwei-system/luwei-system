# LUWEI SYSTEM - 프로젝트 구조 가이드

## 프로젝트 개요
LUWEI SYSTEM은 모듈화된 구조로 설계된 정적 웹사이트입니다. 브랜드 철학인 "조용한 시스템, 고요한 질서"를 반영하여 확장 가능하고 유지보수가 용이한 아키텍처를 제공합니다.

## 디렉토리 구조
```
luwei-system/
├── assets/                 # 정적 자산
│   ├── Circle_logo.svg     # 브랜드 로고
│   ├── LUWEI SYSTEM.svg    # 메인 로고
│   ├── favicon.png         # 파비콘
│   ├── favicon.svg         # SVG 파비콘
│   └── og-image.png        # 소셜 미디어 이미지
├── css/                    # 스타일시트
│   ├── framework.css      # 기본 프레임워크
│   └── pages.css          # 페이지별 스타일
├── js/                     # JavaScript 모듈
│   ├── config.js          # 설정 데이터
│   ├── components.js      # 컴포넌트 생성 함수
│   ├── content-manager.js  # 콘텐츠 관리
│   ├── main.js            # 메인 진입점
│   ├── performance.js     # 성능 최적화
│   └── script.js          # 기존 스크립트 (호환성)
├── index.html             # 메인 HTML 파일
├── index-old.html         # 기존 HTML 백업
├── offline.html           # 오프라인 페이지
├── sw.js                  # 서비스 워커
├── STYLE_GUIDE.md         # 스타일 가이드
└── README.md              # 프로젝트 설명
```

## 핵심 모듈 설명

### 1. 설정 관리 (`js/config.js`)
**역할**: 모든 브랜드 정보, 콘텐츠, 설정을 중앙화
**주요 기능**:
- 브랜드 정보 (이름, 태그라인, 철학)
- 네비게이션 메뉴
- 제품 데이터 (루틴 시리즈)
- 템플릿 정보
- 출시 일정
- 연결 링크
- 서점 정보
- 동적 메시지

**사용법**:
```javascript
import LUWEI_CONFIG from './config.js';

// 브랜드 이름 가져오기
const brandName = LUWEI_CONFIG.brand.name;

// 제품 목록 가져오기
const products = LUWEI_CONFIG.products;
```

### 2. 컴포넌트 시스템 (`js/components.js`)
**역할**: 재사용 가능한 HTML 컴포넌트 생성
**주요 컴포넌트**:
- `createTopBanner()` - 상단 배너
- `createNavigation()` - 네비게이션
- `createHeroSection()` - 히어로 섹션
- `createAboutSection()` - 브랜드 철학
- `createProductsSection()` - 제품 섹션
- `createTemplatesSection()` - 템플릿 섹션
- `createReleaseScheduleSection()` - 출시 일정
- `createConnectSection()` - 연결 섹션
- `createBookstoreSection()` - 서점 섹션
- `createFooter()` - 푸터

**사용법**:
```javascript
import { createHeroSection } from './components.js';

const heroHTML = createHeroSection();
document.getElementById('hero-container').innerHTML = heroHTML;
```

### 3. 콘텐츠 관리 (`js/content-manager.js`)
**역할**: 페이지 렌더링 및 동적 콘텐츠 관리
**주요 기능**:
- 페이지 전체 렌더링
- 컴포넌트 순서 관리
- 언어 변경 이벤트 처리

**사용법**:
```javascript
import { renderPage } from './content-manager.js';

// 페이지 렌더링
renderPage();
```

### 4. 성능 최적화 (`js/performance.js`)
**역할**: 성능 모니터링 및 최적화
**주요 기능**:
- 이미지 지연 로딩
- 리소스 프리로딩
- Core Web Vitals 모니터링
- 메모리 최적화
- 네트워크 최적화

**사용법**:
```javascript
import { initializePerformanceOptimizations } from './performance.js';

// 성능 최적화 초기화
initializePerformanceOptimizations();
```

### 5. 메인 진입점 (`js/main.js`)
**역할**: 애플리케이션 초기화 및 이벤트 관리
**주요 기능**:
- 서비스 워커 등록
- 언어 전환 기능
- 공유 기능
- 동적 메시지 업데이트
- 스크롤 애니메이션
- 오프라인 상태 모니터링

## 스타일 시스템

### 1. 프레임워크 (`css/framework.css`)
**역할**: 기본 스타일 및 유틸리티 클래스
**주요 기능**:
- CSS 리셋
- 기본 타이포그래피
- 색상 팔레트
- 유틸리티 클래스 (레이아웃, 간격)
- 기본 버튼 스타일
- 반응형 유틸리티

### 2. 페이지 스타일 (`css/pages.css`)
**역할**: 페이지별 세부 스타일
**주요 섹션**:
- 상단 배너
- 네비게이션
- 히어로 섹션
- 브랜드 철학
- 제품 섹션
- 템플릿 섹션
- 출시 일정
- 연결 섹션
- 서점 섹션
- 푸터

## 서비스 워커 (`sw.js`)
**역할**: 오프라인 지원 및 캐시 관리
**주요 기능**:
- 정적 리소스 캐싱
- 동적 콘텐츠 캐싱
- 오프라인 페이지 제공
- 백그라운드 동기화
- 푸시 알림

## 확장 가이드

### 새로운 제품 추가
1. `js/config.js`의 `products` 배열에 새 제품 추가:
```javascript
{
    id: "new-product",
    type: "routine",
    status: "active",
    icon: "🌟",
    title: { ko: "새 제품", en: "New Product" },
    subtitle: { ko: "부제목", en: "Subtitle" },
    description: { ko: "설명", en: "Description" },
    price: "₩4,900",
    actions: [
        { text: { ko: "구매하기", en: "Buy Now" }, href: "https://example.com", type: "primary" }
    ]
}
```

### 새로운 섹션 추가
1. `js/components.js`에 새 컴포넌트 함수 생성
2. `js/content-manager.js`의 `renderPage()` 함수에 추가
3. `css/pages.css`에 해당 스타일 추가

### 새로운 언어 지원
1. `js/config.js`의 모든 텍스트 객체에 새 언어 추가
2. `js/components.js`의 `getLocalizedText()` 함수 수정
3. 언어 전환 로직 업데이트

## 성능 최적화

### 캐시 전략
- **정적 리소스**: Cache First
- **HTML 페이지**: Network First with Fallback
- **API 요청**: Network First
- **기타 리소스**: Stale While Revalidate

### 이미지 최적화
- SVG 사용 (로고, 아이콘)
- WebP 형식 지원
- 지연 로딩 적용
- 반응형 이미지

### 폰트 최적화
- `font-display: swap` 사용
- 폰트 프리로딩
- 필요한 폰트만 로드

## 접근성

### 키보드 네비게이션
- 모든 인터랙티브 요소에 포커스 스타일
- Tab 순서 최적화
- 스킵 링크 제공

### 스크린 리더 지원
- 시맨틱 HTML 사용
- 적절한 ARIA 라벨
- alt 텍스트 제공

### 색상 대비
- WCAG AA 기준 준수
- 고대비 모드 지원

## 브라우저 지원

### 지원 브라우저
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 폴백 지원
- ES6 모듈 미지원 브라우저를 위한 폴백
- CSS Grid 미지원 브라우저를 위한 Flexbox 폴백
- 서비스 워커 미지원 브라우저를 위한 일반 네비게이션

## 배포 및 빌드

### 정적 호스팅
- GitHub Pages
- Netlify
- Vercel

### 환경 변수
- `NODE_ENV`: production/development
- `API_URL`: API 엔드포인트 (향후 확장용)

### 빌드 최적화
- CSS 압축
- JavaScript 번들링 (필요시)
- 이미지 최적화
- HTML 압축

## 모니터링 및 분석

### 성능 메트릭
- Core Web Vitals 추적
- 페이지 로드 시간
- 메모리 사용량
- 네트워크 상태

### 사용자 분석
- 페이지 뷰 추적
- 사용자 행동 분석
- 오프라인 사용 패턴

## 보안

### 콘텐츠 보안 정책 (CSP)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com; 
               img-src 'self' data: https:;">
```

### HTTPS 강제
- 모든 리소스 HTTPS 사용
- HSTS 헤더 설정

## 유지보수

### 정기 업데이트
- 의존성 업데이트
- 보안 패치 적용
- 성능 최적화

### 콘텐츠 관리
- 제품 정보 업데이트
- 출시 일정 수정
- 새로운 섹션 추가

### 모니터링
- 에러 로그 확인
- 성능 메트릭 분석
- 사용자 피드백 수집

---

이 구조는 LUWEI SYSTEM의 브랜드 철학을 반영하여 확장 가능하고 유지보수가 용이한 웹사이트를 구축하기 위해 설계되었습니다.
