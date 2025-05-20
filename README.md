# Wedding Invitation Project

## 프로젝트 개요
이 프로젝트는 Next.js 13을 기반으로 한 모던 웹 기반의 웨딩 초대장 애플리케이션입니다. TypeScript와 Tailwind CSS를 사용하여 개발되었으며, 반응형 디자인을 지원합니다.

## 배포 정보
- **배포 URL**: [https://invitation-dusky-psi.vercel.app/](https://invitation-dusky-psi.vercel.app/)
- **배포 플랫폼**: Vercel
- **배포 상태**: Live
- **자동 배포**: GitHub main 브랜치 push 시 자동 배포

## 기술 스택
- **프레임워크**: Next.js 13.4.19
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **지도**: Kakao Maps SDK
- **UI 컴포넌트**: 
  - Heroicons
  - React Icons
  - Swiper (슬라이더)

## 주요 기능
- 반응형 웹 디자인
- 모던한 UI/UX
- 애니메이션 효과
- 카카오맵 통합
- 이미지 슬라이더

## 프로젝트 구조
```
├── app/                 # Next.js 13 App Router 구조
├── public/             # 정적 파일 (이미지, 폰트 등)
├── src/                # 소스 코드
├── .next/              # Next.js 빌드 결과물
└── node_modules/       # 의존성 패키지
```

## 시작하기

### 필수 조건
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치
```bash
npm install
# 또는
yarn install
```

### 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

### 프로덕션 빌드
```bash
npm run build
# 또는
yarn build
```

### 프로덕션 서버 실행
```bash
npm run start
# 또는
yarn start
```

## Vercel 배포 가이드

### 1. Vercel 계정 설정
1. [Vercel 웹사이트](https://vercel.com)에 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭

### 2. 프로젝트 배포 설정
1. GitHub 저장소 선택
2. 프로젝트 설정:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `next build`
   - Output Directory: `.next`

### 3. 환경 변수 설정
Vercel 대시보드의 Project Settings > Environment Variables에서:
- `NEXT_PUBLIC_KAKAO_MAP_API_KEY` 추가 (카카오맵 API 키)

### 4. 자동 배포 설정
- main 브랜치 push 시 자동 배포
- 다른 브랜치 push 시 프리뷰 배포
- Pull Request 생성 시 자동 프리뷰 배포

### 5. 배포 확인
- 배포 URL: [https://invitation-dusky-psi.vercel.app/](https://invitation-dusky-psi.vercel.app/)
- 배포 상태: [Vercel 대시보드](https://vercel.com/lims-projects-54b4a420/invitation/FEMZz28fHJftFHC7nsgcwWm3VmDf)

## 개발 가이드라인
- TypeScript를 사용하여 타입 안정성 확보
- Tailwind CSS를 사용한 스타일링
- 컴포넌트 기반 개발
- 반응형 디자인 원칙 준수

## 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.
