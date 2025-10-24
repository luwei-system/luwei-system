# LUWEI SYSTEM - 브랜드 스타일 가이드

## 개요
루웨이 시스템의 브랜드 감성과 방향성을 담은 디자인 시스템입니다. "조용한 시스템, 고요한 질서"라는 브랜드 철학을 바탕으로 설계되었습니다.

## 브랜드 철학

### 핵심 가치
- **고요함**: 시끄러운 세상 속에서 평온을 제공
- **구조**: 감정에 피로한 사람들에게 무(無)의 구조 제공
- **자연스러움**: 과장되지 않고 자연스러운 흐름
- **여백**: 충분한 여백과 느림의 리듬감

### 브랜드 톤
1. **단정한 질서** - 깔끔하고 정돈된 구조
2. **느린 흐름** - 급하지 않은 자연스러운 흐름
3. **대칭의 아름다움** - 균형 잡힌 시각적 구조
4. **무편집의 진실** - 과장되지 않은 진실된 표현
5. **진짜의 순간** - 진정성 있는 순간의 포착

## 색상 팔레트

### 주요 색상
```css
/* 하늘색 - 개방/평온 */
--color-primary: #CFE8FF;

/* 연회색 - 안정/균형 */
--color-secondary: #E9EEF2;

/* 연초록 - 자연/흐름 */
--color-accent: #DFF5E1;

/* 옅은 분홍 - 따뜻함/연결 */
--color-accent-pink: #FFD7E5;

/* 흰색 - 순수/깨끗함 */
--color-white: #FFFFFF;
```

### 텍스트 색상
```css
/* 기본 텍스트 */
--color-text: #111111;

/* 연한 텍스트 */
--color-text-light: #222222;

/* 테두리 */
--color-border: #E9EEF2;

/* 연한 테두리 */
--color-border-light: #F5F7FA;
```

### 색상 사용 가이드라인
- **하늘색**: 주요 액션, 강조 요소, 브랜드 아이덴티티
- **연회색**: 배경, 구분선, 중성적 요소
- **연초록**: 자연스러운 액션, 성공 상태
- **옅은 분홍**: 특별한 강조, 따뜻한 메시지
- **흰색**: 배경, 카드, 깔끔한 공간

## 타이포그래피

### 폰트 패밀리
```css
/* 기본 폰트 */
--font-primary: 'Noto Sans KR', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* 모노스페이스 폰트 */
--font-secondary: 'Inter', monospace;
```

### 폰트 크기 시스템
```css
--font-size-xs: 0.75rem;    /* 12px - 작은 텍스트 */
--font-size-sm: 0.875rem;   /* 14px - 보조 텍스트 */
--font-size-base: 1rem;     /* 16px - 기본 텍스트 */
--font-size-lg: 1.125rem;   /* 18px - 강조 텍스트 */
--font-size-xl: 1.25rem;    /* 20px - 소제목 */
--font-size-2xl: 1.5rem;    /* 24px - 제목 */
--font-size-3xl: 2rem;      /* 32px - 섹션 제목 */
--font-size-4xl: 2.5rem;    /* 40px - 페이지 제목 */
--font-size-5xl: 3rem;      /* 48px - 큰 제목 */
--font-size-6xl: 4rem;      /* 64px - 히어로 제목 */
```

### 폰트 가중치
- **300 (Light)**: 히어로 텍스트, 큰 제목
- **400 (Normal)**: 기본 텍스트, 본문
- **500 (Medium)**: 버튼, 네비게이션
- **600 (Semibold)**: 소제목, 강조 텍스트
- **700 (Bold)**: 가격, 중요한 숫자

## 간격 시스템

### 기본 간격 단위
```css
--spacing-xs: 0.25rem;      /* 4px - 최소 간격 */
--spacing-sm: 0.5rem;      /* 8px - 작은 간격 */
--spacing-md: 1rem;        /* 16px - 기본 간격 */
--spacing-lg: 1.5rem;      /* 24px - 중간 간격 */
--spacing-xl: 2rem;        /* 32px - 큰 간격 */
--spacing-2xl: 3rem;       /* 48px - 섹션 간격 */
--spacing-3xl: 4rem;        /* 64px - 큰 섹션 간격 */
--spacing-4xl: 5rem;        /* 80px - 페이지 간격 */
--spacing-5xl: 6.25rem;     /* 100px - 최대 간격 */
```

### 간격 사용 원칙
- **여백 우선**: 충분한 여백으로 여유로운 느낌
- **일관성**: 동일한 레벨의 요소는 동일한 간격 사용
- **계층 구조**: 중요한 요소일수록 더 큰 간격

## 브레이크포인트

### 반응형 브레이크포인트
```css
--breakpoint-xs: 320px;    /* 초소형 모바일 */
--breakpoint-sm: 480px;    /* 소형 모바일 */
--breakpoint-md: 768px;    /* 태블릿 */
--breakpoint-lg: 1024px;   /* 데스크탑 */
--breakpoint-xl: 1200px;   /* 큰 데스크탑 */
--breakpoint-2xl: 1440px;  /* 초대형 데스크탑 */
```

### 모바일 우선 설계
- 모든 스타일은 모바일을 기본으로 설계
- `min-width` 미디어 쿼리 사용
- 터치 친화적 인터페이스 (최소 44px 터치 영역)

## 컴포넌트 스타일

### 버튼 시스템

#### 기본 버튼
```css
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: var(--font-size-base);
    font-weight: 500;
    border: 2px solid transparent;
    border-radius: var(--radius-full);
    transition: all var(--animation-duration-normal) var(--animation-easing);
}
```

#### 버튼 변형
- **Primary**: 옅은 분홍 배경, 주요 액션
- **Secondary**: 연초록 테두리, 보조 액션
- **Outline**: 회색 테두리, 중성적 액션
- **Ghost**: 투명 배경, 미묘한 액션

#### 버튼 크기
- **Small**: `--spacing-xs --spacing-md`, `--font-size-sm`
- **Medium**: `--spacing-sm --spacing-lg`, `--font-size-base` (기본)
- **Large**: `--spacing-md --spacing-xl`, `--font-size-lg`

### 카드 시스템

#### 기본 카드
```css
.card {
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    transition: all var(--animation-duration-normal) var(--animation-easing);
    box-shadow: var(--shadow-sm);
}
```

#### 카드 변형
- **Elevated**: 더 큰 그림자로 강조
- **Interactive**: 호버 시 상승 효과
- **Product**: 제품 정보 표시용

### 그리드 시스템

#### 기본 그리드
```css
.grid {
    display: grid;
    gap: var(--spacing-lg);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
```

#### 반응형 그리드
- **Auto-fit**: `repeat(auto-fit, minmax(280px, 1fr))`
- **Auto-fill**: `repeat(auto-fill, minmax(280px, 1fr))`

## 애니메이션

### 애니메이션 지속시간
```css
--animation-duration-fast: 0.2s;    /* 빠른 인터랙션 */
--animation-duration-normal: 0.3s;   /* 기본 애니메이션 */
--animation-duration-slow: 0.5s;     /* 느린 전환 */
```

### 애니메이션 이징
```css
--animation-easing: ease;           /* 기본 */
--animation-easing-in: ease-in;    /* 시작 빠름 */
--animation-easing-out: ease-out;  /* 끝 빠름 */
--animation-easing-in-out: ease-in-out; /* 양쪽 빠름 */
```

### 애니메이션 원칙
- **자연스러움**: 과도하지 않은 자연스러운 움직임
- **의미**: 사용자에게 피드백을 제공하는 의미 있는 애니메이션
- **성능**: GPU 가속을 활용한 부드러운 애니메이션

## 그림자 시스템

### 그림자 레벨
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);   /* 미묘한 그림자 */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);   /* 기본 그림자 */
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1); /* 강한 그림자 */
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1); /* 매우 강한 그림자 */
```

### 그림자 사용 가이드라인
- **Small**: 텍스트, 작은 요소
- **Medium**: 카드, 버튼
- **Large**: 모달, 드롭다운
- **XLarge**: 특별한 강조 요소

## 테두리 반경

### 반경 시스템
```css
--radius-sm: 0.25rem;      /* 4px - 작은 요소 */
--radius-md: 0.5rem;       /* 8px - 기본 요소 */
--radius-lg: 0.75rem;      /* 12px - 큰 요소 */
--radius-xl: 1rem;         /* 16px - 카드 */
--radius-2xl: 1.5rem;      /* 24px - 큰 카드 */
--radius-full: 9999px;      /* 완전한 원형 */
```

## 접근성

### 색상 대비
- 텍스트와 배경의 최소 대비율 4.5:1
- 중요한 정보는 색상에만 의존하지 않음

### 포커스 표시
```css
*:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}
```

### 키보드 네비게이션
- 모든 인터랙티브 요소는 키보드로 접근 가능
- 논리적인 탭 순서
- 스킵 링크 제공

## 다국어 지원

### 언어별 스타일
- 한국어: 기본 폰트 크기
- 영어: 약간 작은 폰트 크기 (0.9배)
- 언어 전환 시 부드러운 전환

### 텍스트 방향
- LTR (Left-to-Right) 기본
- RTL 언어 지원 준비

## 성능 최적화

### CSS 최적화
- Critical CSS 인라인
- Non-critical CSS 지연 로딩
- 사용하지 않는 CSS 제거

### 애니메이션 최적화
- `transform`과 `opacity` 사용
- `will-change` 속성 적절히 사용
- `prefers-reduced-motion` 지원

## 브랜드 적용 예시

### 히어로 섹션
- 큰 여백과 중앙 정렬
- 부드러운 그라데이션 배경
- 자연스러운 타이포그래피 계층

### 제품 카드
- 충분한 패딩과 여백
- 호버 시 미묘한 상승 효과
- 브랜드 색상의 테두리

### 네비게이션
- 깔끔한 수평 레이아웃
- 부드러운 포커스 전환
- 브랜드 로고 강조

## 확장성

### 새로운 컴포넌트 추가
1. 기존 디자인 토큰 활용
2. 일관된 네이밍 컨벤션
3. 반응형 고려
4. 접근성 검토

### 테마 확장
- 다크 모드 지원 준비
- 계절별 테마 가능성
- 브랜드 확장 시 색상 팔레트 확장

## 사용 가이드라인

### DO (해야 할 것)
- 충분한 여백 사용
- 브랜드 색상 일관성 유지
- 모바일 우선 설계
- 접근성 고려
- 자연스러운 애니메이션

### DON'T (하지 말아야 할 것)
- 과도한 색상 사용
- 급작스러운 애니메이션
- 작은 터치 영역
- 색상에만 의존한 정보 전달
- 일관성 없는 간격

---

이 스타일 가이드는 루웨이 브랜드의 확장과 함께 지속적으로 업데이트됩니다.
