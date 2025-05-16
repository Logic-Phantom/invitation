# 모바일 청첩장

Next.js와 Tailwind CSS를 사용한 모던한 모바일 청첩장 프로젝트입니다.

## 주요 기능

- 애니메이션이 있는 반응형 디자인
- 이미지 갤러리 (Swiper.js)
- 카카오맵 위치 정보
- 계좌번호 복사 기능

## 기술 스택

- Next.js 13+
- TypeScript
- Tailwind CSS
- Framer Motion
- Swiper.js
- 카카오맵 SDK

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 환경 설정

1. `.env.local` 파일 생성:
```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key
```

2. 이미지 추가:
- `public/images/` 디렉토리에 웨딩 사진 추가
- `Gallery.tsx`의 이미지 경로 수정

3. 개인정보 수정:
- `Header.tsx`: 신랑/신부 이름, 날짜, 장소
- `Location.tsx`: 예식장 주소, 교통편
- `Account.tsx`: 계좌번호 정보

## 배포

Vercel을 통해 쉽게 배포할 수 있습니다:

1. GitHub 저장소 연결
2. 환경 변수 설정
3. 배포 자동화

## 라이선스

MIT License
