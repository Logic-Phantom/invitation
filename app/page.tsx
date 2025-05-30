'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Header from './components/Header';
import Invitation from './components/Invitation';
import Gallery from './components/Gallery';
import Account from './components/Account';
import Share from './components/Share';
import Weather from './components/Weather';
// import Calendar from './components/Calendar';
import { motion, Variants } from 'framer-motion';

// 카카오맵 컴포넌트는 클라이언트 사이드에서만 렌더링되어야 합니다
const Location = dynamic(() => import('./components/Location'), {
  loading: () => <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
});

const Calendar = dynamic(() => import('./components/Calendar'), {
  loading: () => <div className="h-[100px] bg-gray-100 rounded-lg flex items-center justify-center">Loading calendar...</div>
});

export default function Home() {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const startDate = new Date('2015-06-27');
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setElapsedTime(`${years}년 ${months}개월 ${days}일 ${hours}시 ${minutes}분 ${seconds}초`);
    };

    // 초기 실행
    updateTime();
    
    // 1초마다 업데이트
    const interval = setInterval(updateTime, 1000);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval);
  }, []);

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
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-600">임영택 · 김정혜의 차남</p>
              <h3 className="text-xl font-serif">신랑 임채명</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">김경복 · 박향미의 차녀</p>
              <h3 className="text-xl font-serif">신부 김서현</h3>
            </div>
          </div>
        </motion.section>

        {/* 만난 날짜 & D-day 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-6"
        >
          <h2 className="section-title mb-4">함께한 시간</h2>
          <div className="flex flex-col items-center">
            <div className="text-gray-600 text-xl">
              {elapsedTime}
            </div>
          </div>
        </motion.section>

        {/* 초대합니다 섹션 */}
        <Invitation />

        {/* 갤러리 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">갤러리</h2>
          <div className="w-full max-w-md mx-auto">
            <Gallery />
          </div>
        </motion.section>

        {/* 위치 정보 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">오시는 길</h2>
          <Location />
        </motion.section>

        {/* 날씨 정보 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">날씨/일정</h2>
          <Weather />
        </motion.section>

        {/* 계좌 정보 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">마음 전하실 곳</h2>
          <Account />
        </motion.section>

        {/* 공유하기 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title mb-2">공유하기</h2>
          <Share />
        </motion.section>
      </motion.div>
    </main>
  );
} 