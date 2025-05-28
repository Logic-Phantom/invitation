'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Header from './components/Header';
import Invitation from './components/Invitation';
import Gallery from './components/Gallery';
import Account from './components/Account';
import Share from './components/Share';
import Weather from './components/Weather';
import { motion, Variants } from 'framer-motion';

// 카카오맵 컴포넌트는 클라이언트 사이드에서만 렌더링되어야 합니다
const Location = dynamic(() => import('./components/Location'), {
  loading: () => <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
});

export default function Home() {
  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="max-w-4xl mx-auto px-4 py-16 space-y-24"
      >
        {/* 신랑/신부 소개 섹션 */}
        <section className="text-center">
          <h2 className="section-title">신랑 & 신부</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/profile-groom.jpg"
                  alt="신랑 프로필"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-serif">신랑 임채명</h3>
              <p className="text-gray-600">96년 9월 27일</p>
              <p className="text-gray-600">서울 양천구</p>
              <p className="text-gray-600">IT 개발자 💻</p>
              <p className="text-gray-600">임영택 · 김정혜의 차남</p>
            </div>
            <div className="space-y-4">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/profile-bride.jpg"
                  alt="신부 프로필"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-serif">신부 김서현</h3>
              <p className="text-gray-600">96년 5월 10일</p>
              <p className="text-gray-600">서울 양천구</p>
              <p className="text-gray-600">IT 회사 연구원 🎨</p>
              <p className="text-gray-600">김경복 · 박향미의 차녀</p>
            </div>
          </div>
        </section>

        {/* 웨딩 인터뷰 섹션 */}
        <section className="text-center">
          <h2 className="section-title">웨딩 인터뷰</h2>
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">1. 결혼하시는 소감이 어떠세요?</h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <span className="font-medium">🤵🏻‍♂️ 채명</span><br />
                  인생은 지금부터 시작인 것 같아요.<br />
                  앞으로 매일 함께 맛있는 밥을 먹고, 함께 기뻐하고, 함께 여행하고<br />
                  모든 것을 언제나 함께할 수 있다는 생각에 벌써부터 행복합니다.😁
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">👰🏻‍♀️ 서현</span><br />
                  매일 데이트하고 헤어질 때 마다 아쉬웠는데<br />
                  이제는 매일 함께 있을 수 있어서 행복해요.💗<br />
                  어떻게 하루를 보냈는지 이야기하고 마주보며 웃는<br />
                  그런 소박한 나날들을 보낼 생각에 설레입니다.🥰
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 갤러리 섹션 */}
        <section>
          <h2 className="section-title">갤러리</h2>
          <Gallery />
        </section>

        {/* 위치 정보 섹션 */}
        <section>
          <h2 className="section-title">오시는 길</h2>
          <Location />
        </section>

        {/* 날씨 정보 섹션 */}
        <section>
          <h2 className="section-title">예상 날씨</h2>
          <Weather />
        </section>

        {/* 계좌 정보 섹션 */}
        <section>
          <h2 className="section-title">마음 전하실 곳</h2>
          <Account />
        </section>

        {/* 공유하기 섹션 */}
        <section>
          <h2 className="section-title mb-2">공유하기</h2>
          <Share />
        </section>
      </motion.div>
    </main>
  );
} 