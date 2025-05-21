'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from './components/Header';
import Invitation from './components/Invitation';
import Gallery from './components/Gallery';
import Account from './components/Account';
import Share from './components/Share';
import PetalEffect from './components/PetalEffect';
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
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <PetalEffect />
      <Header />
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 py-8 space-y-12"
      >
        <Invitation />
        <Gallery />
        <Location />
        <Account />
        <Share />
      </motion.div>
    </main>
  );
} 