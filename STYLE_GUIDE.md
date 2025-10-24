# LUWEI SYSTEM - 스타일 가이드

## 브랜드 철학
**"조용한 시스템, 고요한 질서"** - 세상이 시끄러울수록, 사람들에게 고요의 시스템을 제공하기 위해.

### 브랜드 톤
- **단정한 질서** - 깔끔하고 정돈된 디자인
- **느린 흐름** - 급하지 않은, 자연스러운 사용자 경험
- **대칭의 아름다움** - 균형 잡힌 레이아웃과 비율
- **무편집의 진실** - 과도한 장식 없는 순수한 디자인
- **진짜의 순간** - 진정성 있는 콘텐츠와 상호작용

## 색상 팔레트

### 주요 색상
```css
/* 하늘색 - 개방/평온 */
--color-primary: #CFE8FF;
--color-primary-light: #E8F4FF;
--color-primary-dark: #B8D8F0;

/* 연회색 - 안정/균형 */
--color-secondary: #E9EEF2;
--color-secondary-light: #F5F7FA;
--color-secondary-dark: #D1D9E0;

/* 연초록 - 자연/흐름 */
--color-accent: #DFF5E1;
--color-accent-light: #F0F9F1;
--color-accent-dark: #C8E5CA;

/* 옅은 분홍 - 따뜻함/연결 */
--color-accent-pink: #FFD7E5;
--color-accent-pink-light: #FFE8F0;
--color-accent-pink-dark: #F5C6D6;
```

### 텍스트 색상
```css
--color-text: #111;           /* 기본 텍스트 */
--color-text-light: #333;     /* 보조 텍스트 */
--color-text-muted: #666;     /* 비활성 텍스트 */
--color-text-inverse: #FFFFFF; /* 반전 텍스트 */
```

### 배경 색상
```css
--color-bg: #FFFFFF;         /* 기본 배경 */
--color-bg-light: #F8FAFC;   /* 연한 배경 */
--color-bg-dark: #111;       /* 어두운 배경 */
```

### 테두리 색상
```css
--color-border: #E9EEF2;     /* 기본 테두리 */
--color-border-light: #F5F7FA; /* 연한 테두리 */
--color-border-dark: #D1D9E0;  /* 진한 테두리 */
```

## 타이포그래피

### 폰트 패밀리
```css
/* 기본 폰트 스택 */
font-family: 'Noto Sans KR', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* 한글 우선 */
font-family: 'Noto Sans KR', sans-serif;

/* 영문 우선 */
font-family: 'Inter', sans-serif;
```

### 폰트 크기
```css
/* 제목 */
--font-size-h1: clamp(36px, 6vw, 56px);    /* 메인 제목 */
--font-size-h2: clamp(28px, 5vw, 40px);    /* 섹션 제목 */
--font-size-h3: clamp(20px, 3vw, 24px);    /* 카드 제목 */
--font-size-h4: clamp(18px, 2.5vw, 20px);  /* 부제목 */

/* 본문 */
--font-size-body: 16px;                    /* 기본 본문 */
--font-size-small: 14px;                   /* 작은 텍스트 */
--font-size-caption: 12px;                 /* 캡션/라벨 */

/* 특수 */
--font-size-hero: clamp(40px, 7vw, 64px);  /* 히어로 텍스트 */
--font-size-quote: 20px;                   /* 인용문 */
```

### 폰트 두께
```css
--font-weight-light: 300;    /* 가벼운 텍스트 */
--font-weight-normal: 400;   /* 기본 텍스트 */
--font-weight-medium: 500;   /* 강조 텍스트 */
--font-weight-semibold: 600; /* 제목 텍스트 */
```

### 줄 간격
```css
--line-height-tight: 1.2;    /* 제목 */
--line-height-normal: 1.6;   /* 본문 */
--line-height-relaxed: 1.8;  /* 긴 텍스트 */
```

## 간격 시스템

### 기본 간격 단위
```css
--space-xs: 4px;    /* 매우 작은 간격 */
--space-sm: 8px;    /* 작은 간격 */
--space-md: 16px;   /* 중간 간격 */
--space-lg: 24px;   /* 큰 간격 */
--space-xl: 32px;   /* 매우 큰 간격 */
--space-2xl: 48px;  /* 초대형 간격 */
--space-3xl: 64px;  /* 최대 간격 */
```

### 컴포넌트별 간격
```css
/* 카드 내부 패딩 */
--card-padding: 24px;

/* 섹션 간격 */
--section-padding: 80px;

/* 그리드 간격 */
--grid-gap: 24px;

/* 버튼 패딩 */
--button-padding: 12px 24px;
--button-padding-small: 8px 16px;
```

## 레이아웃

### 컨테이너
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.container--narrow {
    max-width: 800px;
}

.container--wide {
    max-width: 1400px;
}
```

### 그리드 시스템
```css
/* 기본 그리드 */
.grid {
    display: grid;
    gap: var(--grid-gap);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* 반응형 그리드 */
@media (min-width: 768px) {
    .md\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
    .md\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1024px) {
    .lg\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
    .lg\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}
```

### 플렉스박스
```css
.flex {
    display: flex;
}

.flex-col {
    flex-direction: column;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.justify-between {
    justify-content: space-between;
}
```

## 컴포넌트

### 버튼
```css
.btn {
    display: inline-block;
    padding: var(--button-padding);
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    border: 2px solid var(--color-primary);
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 25px;
    font-family: inherit;
}

.btn:hover {
    background-color: var(--color-primary);
    color: var(--color-text);
}

.btn--primary {
    background-color: var(--color-accent-pink);
    color: var(--color-text);
    border-color: var(--color-accent-pink);
}

.btn--primary:hover {
    background-color: transparent;
    color: var(--color-accent-pink);
}

.btn--secondary {
    border-color: var(--color-accent);
    color: var(--color-text);
}

.btn--secondary:hover {
    background-color: var(--color-accent);
    color: var(--color-text);
}

.btn--small {
    padding: var(--button-padding-small);
    font-size: 14px;
}
```

### 카드
```css
.card {
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: var(--card-padding);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: all 0.2s ease-in-out;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}
```

### 섹션 제목
```css
.section__title {
    font-size: var(--font-size-h2);
    font-weight: 300;
    text-align: center;
    margin-bottom: var(--space-2xl);
    color: var(--color-text);
}
```

## 애니메이션

### 기본 전환
```css
/* 기본 전환 시간 */
--transition-fast: 0.2s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;

/* 호버 효과 */
.hover-lift {
    transition: transform var(--transition-fast);
}

.hover-lift:hover {
    transform: translateY(-2px);
}

/* 페이드 효과 */
.fade-in {
    opacity: 0;
    transition: opacity var(--transition-normal);
}

.fade-in.visible {
    opacity: 1;
}
```

### 키프레임 애니메이션
```css
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
```

## 반응형 디자인

### 브레이크포인트
```css
/* 모바일 */
@media (max-width: 767px) {
    .container {
        padding: 0 16px;
    }
    
    .section__title {
        font-size: var(--font-size-h3);
        margin-bottom: var(--space-xl);
    }
}

/* 태블릿 */
@media (min-width: 768px) and (max-width: 1023px) {
    .container {
        padding: 0 24px;
    }
}

/* 데스크톱 */
@media (min-width: 1024px) {
    .container {
        padding: 0 32px;
    }
}
```

### 모바일 우선 접근법
```css
/* 기본 스타일 (모바일) */
.component {
    font-size: 14px;
    padding: 16px;
}

/* 태블릿 이상 */
@media (min-width: 768px) {
    .component {
        font-size: 16px;
        padding: 24px;
    }
}

/* 데스크톱 이상 */
@media (min-width: 1024px) {
    .component {
        font-size: 18px;
        padding: 32px;
    }
}
```

## 접근성

### 색상 대비
```css
/* 고대비 모드 */
@media (prefers-contrast: high) {
    :root {
        --color-primary: #0066CC;
        --color-text: #000000;
        --color-text-light: #333333;
    }
}
```

### 모션 감소
```css
/* 모션 감소 모드 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    html {
        scroll-behavior: auto;
    }
}
```

### 포커스 스타일
```css
*:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

.btn:focus {
    outline: 2px solid var(--color-accent-pink);
    outline-offset: 2px;
}
```

## 성능 최적화

### 하드웨어 가속
```css
.performance-optimized {
    will-change: transform;
    transform: translateZ(0);
}
```

### 지연 로딩
```css
.lazy {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lazy.loaded {
    opacity: 1;
}
```

## 사용 예시

### 색상 사용
```html
<!-- 주요 액션 버튼 -->
<button class="btn btn--primary">구매하기</button>

<!-- 보조 액션 버튼 -->
<button class="btn btn--secondary">자세히 보기</button>

<!-- 카드 배경 -->
<div class="card" style="background-color: var(--color-secondary);">
    내용
</div>
```

### 타이포그래피 사용
```html
<!-- 메인 제목 -->
<h1 style="font-size: var(--font-size-hero); font-weight: var(--font-weight-normal);">
    시스템을 끈다.
</h1>

<!-- 섹션 제목 -->
<h2 class="section__title">브랜드 철학</h2>

<!-- 본문 텍스트 -->
<p style="font-size: var(--font-size-body); line-height: var(--line-height-normal);">
    세상이 시끄러울수록, 사람들에게 고요의 시스템을 제공하기 위해.
</p>
```

### 간격 사용
```html
<!-- 카드 내부 간격 -->
<div class="card" style="padding: var(--card-padding);">
    <h3 style="margin-bottom: var(--space-md);">제목</h3>
    <p style="margin-bottom: var(--space-lg);">내용</p>
</div>

<!-- 섹션 간격 -->
<section style="padding: var(--section-padding) 0;">
    내용
</section>
```

## 브랜드 가이드라인

### 금지사항
- ❌ 과도한 그라데이션 사용
- ❌ 강렬한 색상 조합
- ❌ 복잡한 애니메이션
- ❌ 과도한 그림자 효과
- ❌ 작은 폰트 크기 (12px 미만)

### 권장사항
- ✅ 충분한 여백 사용
- ✅ 일관된 색상 팔레트
- ✅ 명확한 계층 구조
- ✅ 부드러운 전환 효과
- ✅ 접근성 고려

### 브랜드 톤 반영
- **단정한 질서**: 깔끔한 레이아웃과 일관된 간격
- **느린 흐름**: 부드러운 애니메이션과 자연스러운 전환
- **대칭의 아름다움**: 균형 잡힌 그리드와 비율
- **무편집의 진실**: 불필요한 장식 제거
- **진짜의 순간**: 의미 있는 상호작용과 피드백

---

이 스타일 가이드는 LUWEI SYSTEM의 브랜드 철학을 반영하여 일관되고 고요한 사용자 경험을 제공하기 위해 설계되었습니다.
