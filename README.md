# 💌 Wedding Invitation Project

## ✨ 프로젝트 개요
이 프로젝트는 **Next.js 13**을 기반으로 한 **모던 웹 기반의 웨딩 초대장** 애플리케이션입니다.

💎 **TypeScript**와 **Tailwind CSS**로 구성되었으며, 반응형 웹과 애니메이션, 카카오 맵 통합 등의 다양한 기능을 지원합니다.

> 모바일과 데스크탑 모두에서 우아하게 작동하며, 신랑 신부의 스타일에 맞게 커스터마이징할 수 있습니다.

---

## ��️ 기술 스택
| 구분 | 기술 | 버전 |
|------|------|------|
| 🧱 프레임워크 | Next.js | 13.4.19 |
| 💬 언어 | TypeScript | 5.2.2 |
| 🎨 스타일링 | Tailwind CSS | 3.3.3 |
| 🎞️ 애니메이션 | Framer Motion | 10.18.0 |
| 🗺️ 지도 | Kakao Maps SDK | 1.1.27 |
| 🧩 UI 컴포넌트 | Heroicons | 2.0.18 |
| 🧩 UI 컴포넌트 | React Icons | 5.5.0 |
| 🧩 UI 컴포넌트 | Swiper | 10.3.1 |

---

## 🌟 주요 기능
- 📱 **반응형 웹 디자인**
  - 모바일 퍼스트 접근
  - 모든 디바이스에서 최적화된 UI/UX
  - Tailwind CSS를 활용한 유연한 레이아웃

- 🖼️ **모던 UI/UX**
  - 깔끔하고 직관적인 인터페이스
  - 부드러운 페이지 전환 효과
  - 사용자 친화적인 네비게이션

- 🎬 **프리미엄 애니메이션**
  - Framer Motion 기반 부드러운 애니메이션
  - 스크롤 기반 인터랙션
  - 시각적 피드백 효과

- 🗺️ **카카오맵 통합**
  - 실시간 위치 안내
  - 커스텀 마커 및 인포윈도우
  - 반응형 지도 컨트롤

- 📷 **이미지 갤러리**
  - Swiper 기반 이미지 슬라이더
  - 터치/드래그 지원
  - 자동 재생 및 네비게이션

---

## 📁 프로젝트 구조
```
├── app/                 # Next.js 13 App Router 구조
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 메인 페이지
│   └── globals.css     # 전역 스타일
├── public/             # 정적 파일
│   ├── images/        # 이미지 에셋
│   └── fonts/         # 폰트 파일
├── src/               # 소스 코드
│   ├── components/    # 재사용 컴포넌트
│   ├── styles/       # 스타일 관련 파일
│   └── utils/        # 유틸리티 함수
├── .next/            # Next.js 빌드 결과물
└── node_modules/     # 의존성 패키지
```

---

## ⚙️ 시작하기

### 📌 필수 조건
- Node.js 18.0.0 이상
- npm 또는 yarn 설치
- 카카오맵 API 키

### 📦 설치
```bash
# 저장소 클론
git clone [repository-url]

# 의존성 설치
npm install
# 또는
yarn install
```

### ▶️ 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

### 📦 프로덕션 빌드
```bash
npm run build
# 또는
yarn build
```

### 🚀 프로덕션 서버 실행
```bash
npm run start
# 또는
yarn start
```

---

## 📄 라이선스
MIT License © 2024 Wedding Invitation Project

---

> 💡 자유롭게 커스터마이징하여 나만의 특별한 모바일 청첩장을 만들어보세요!