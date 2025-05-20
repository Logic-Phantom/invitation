# 💌 Wedding Invitation Project

## ✨ 프로젝트 개요
이 프로젝트는 **Next.js 13**을 기반으로 한 **모던 웹 기반의 웨딩 초대장** 애플리케이션입니다.

💎 **TypeScript**와 **Tailwind CSS**로 구성되었으며, 반응형 웹과 애니메이션, 카카오 맵 통합 등의 다양한 기능을 지원합니다.

> 모바일과 데스크탑 모두에서 우아하게 작동하며, 신랑 신부의 스타일에 맞게 커스터마이징할 수 있습니다.

---

## 🚀 배포 정보
- 🔗 **배포 URL**: [https://invitation-dusky-psi.vercel.app/](https://invitation-dusky-psi.vercel.app/)
- 🛠️ **배포 플랫폼**: [Vercel](https://vercel.com)
- 🔄 **자동 배포**: GitHub `main` 브랜치에 push 시 자동 배포
- 📡 **배포 상태**: Live

---

## 🛠️ 기술 스택
| 구분 | 기술 |
|------|------|
| 🧱 프레임워크 | Next.js 13.4.19 |
| 💬 언어 | TypeScript |
| 🎨 스타일링 | Tailwind CSS |
| 🎞️ 애니메이션 | Framer Motion |
| 🗺️ 지도 | Kakao Maps SDK |
| 🧩 UI 컴포넌트 | Heroicons, React Icons, Swiper |

---

## 🌟 주요 기능
- 📱 **반응형 웹 디자인** (모바일 퍼스트)
- 🖼️ **모던하고 직관적인 UI/UX**
- 🎬 **프리미엄 애니메이션 효과**
- 🗺️ **카카오맵 위치 안내**
- 📷 **이미지 슬라이더** (하객 사진 및 드레스샷 등)

---

## 📁 프로젝트 구조
```
├── app/                 # Next.js 13 App Router 구조
├── public/              # 정적 파일 (이미지, 폰트 등)
├── src/                 # 소스 코드
├── .next/               # Next.js 빌드 결과물
└── node_modules/        # 의존성 패키지
```

---

## ⚙️ 시작하기

### 📌 필수 조건
- Node.js 18.0.0 이상
- npm 또는 yarn 설치

### 📦 설치
\`\`\`bash
npm install
# 또는
yarn install
\`\`\`

### ▶️ 개발 서버 실행
\`\`\`bash
npm run dev
# 또는
yarn dev
\`\`\`

### 📦 프로덕션 빌드
\`\`\`bash
npm run build
# 또는
yarn build
\`\`\`

### 🚀 프로덕션 서버 실행
\`\`\`bash
npm run start
# 또는
yarn start
\`\`\`

---

## ☁️ Vercel 배포 가이드

### 1️⃣ Vercel 계정 생성 및 GitHub 연동
- [Vercel](https://vercel.com) 에 가입 후 GitHub 계정 연동
- "New Project" 클릭하여 저장소 선택

### 2️⃣ 프로젝트 설정
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `next build`
- **Output Directory**: `.next`

### 3️⃣ 환경 변수 설정
- Vercel 대시보드 > Project Settings > Environment Variables 에서 다음 추가:
  - `NEXT_PUBLIC_KAKAO_MAP_API_KEY` = `카카오 지도 API 키`

### 4️⃣ 자동 배포 구성
- ✅ `main` 브랜치 push 시 **자동 배포**
- 🔍 PR 생성 또는 브랜치 push 시 **Preview 배포**

### 5️⃣ 배포 확인
- 🔗 **배포 URL**: [https://invitation-dusky-psi.vercel.app/](https://invitation-dusky-psi.vercel.app/)
- 📊 **배포 상태**: [Vercel Dashboard](https://vercel.com/lims-projects-54b4a420/invitation/FEMZz28fHJftFHC7nsgcwWm3VmDf)

---

## 📌 개발 가이드라인
- ✅ **TypeScript** 기반으로 안전한 코드 작성
- 🎨 **Tailwind CSS**를 활용한 유연한 스타일링
- 🔧 **컴포넌트 기반 개발**로 재사용성 확보
- 📱 **모바일 최적화 및 반응형 디자인** 준수

---

## 📄 라이선스
MIT License © 2024 Wedding Invitation Project

---

> 💡 자유롭게 커스터마이징하여 나만의 특별한 모바일 청첩장을 만들어보세요!