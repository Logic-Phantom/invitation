# Vercel 배포 및 환경변수 설정 가이드

## 날씨 API 500 에러 해결 방법

### 1. Vercel 환경변수 설정

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - 프로젝트 선택

2. **환경변수 설정**
   - Settings → Environment Variables
   - 새 환경변수 추가:
     - **Name**: `KMA_API_KEY`
     - **Value**: 기상청 API 키 (예: `your-api-key-here`)
     - **Environment**: Production, Preview, Development 모두 선택

3. **API 키 확인**
   - 기상청 공공데이터포털에서 발급받은 API 키가 올바른지 확인
   - URL 인코딩이 필요한 특수문자가 포함되어 있는지 확인

### 2. 디버깅 방법

1. **디버그 엔드포인트 확인**
   ```
   https://your-vercel-app.vercel.app/api/debug
   ```
   - 환경변수가 올바르게 설정되었는지 확인
   - API 키의 길이와 특수문자 포함 여부 확인

2. **날씨 API 직접 테스트**
   ```
   https://your-vercel-app.vercel.app/api/weather
   ```
   - API 응답 확인
   - 콘솔 로그 확인

### 3. 일반적인 문제와 해결책

#### 문제 1: API 키가 설정되지 않음
- **증상**: `KMA_API_KEY not found, returning dummy data` 로그
- **해결**: Vercel 환경변수에서 `KMA_API_KEY` 설정 확인

#### 문제 2: API 키 인코딩 문제
- **증상**: API 호출 실패
- **해결**: API 키에 특수문자(%, +, /, =)가 포함된 경우 URL 인코딩 확인

#### 문제 3: 외부 API 호출 실패
- **증상**: `Error fetching weather` 로그
- **해결**: 기상청 API 서버 상태 확인, 네트워크 연결 확인

### 4. 수정된 코드의 주요 개선사항

1. **에러 처리 강화**
   - 각 API 호출을 try-catch로 감쌈
   - 타임아웃 설정 (10초)
   - 상세한 로깅 추가

2. **폴백 메커니즘**
   - API 키가 없으면 더미 데이터 반환
   - API 호출 실패 시 더미 데이터 반환
   - 클라이언트에서 에러 상태 표시

3. **디버깅 지원**
   - 환경변수 상태 로깅
   - API 응답 상태 로깅
   - 디버그 엔드포인트 제공

### 5. 배포 후 확인사항

1. **환경변수 재배포**
   - 환경변수 변경 후 재배포 필요
   - `git push` 또는 Vercel에서 수동 재배포

2. **로그 확인**
   - Vercel Functions 로그에서 에러 메시지 확인
   - 브라우저 개발자 도구에서 네트워크 탭 확인

3. **테스트**
   - `/api/debug` 엔드포인트로 환경변수 상태 확인
   - `/api/weather` 엔드포인트로 날씨 데이터 확인
   - 실제 페이지에서 날씨 컴포넌트 동작 확인
