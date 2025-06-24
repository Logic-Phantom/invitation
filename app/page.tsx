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
      
      // 정확한 날짜 차이 계산
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      
      // 음수 처리
      if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // 시간, 분, 초 계산
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
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
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-2 md:space-y-4">
              <p className="text-gray-600 whitespace-nowrap text-sm md:text-base">임영택 · 김정혜의 차남</p>
              <h3 className="text-lg md:text-xl font-serif">신랑 임채명</h3>
            </div>
            <div className="space-y-2 md:space-y-4">
              <p className="text-gray-600 whitespace-nowrap text-sm md:text-base">김경복 · 박향미의 차녀</p>
              <h3 className="text-lg md:text-xl font-serif">신부 김서현</h3>
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
          <p className="text-center text-gray-500 text-sm mb-8">
            축하의 마음을 전하실 수 있도록<br />
            감사한 마음으로 받겠습니다
          </p>
          <Account />
        </motion.section>

        {/* 공유하기 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="section-title mb-6">공유하기</h2>
          <p className="text-center text-gray-500 text-sm mb-4">
            소중한 분들과 함께 나누고 싶은<br />
            저희의 특별한 순간입니다
          </p>
          <Share />
        </motion.section>


      </motion.div>
    </main>
  );
} 