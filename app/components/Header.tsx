'use client';

import { motion } from 'framer-motion';
import { GROOM_NAME, BRIDE_NAME } from '../config';

const Header = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 비디오 배경 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/wedding-bg.mp4" type="video/mp4" />
      </video>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* 콘텐츠 */}
      <div className="relative h-full flex flex-col items-center justify-center text-[#bfa14a] px-4 select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs md:text-sm tracking-widest mb-2 font-light text-[#bfa14a]" style={{ letterSpacing: '0.18em' }}>YOU'RE INVITED</span>
          <span className="text-5xl md:text-6xl font-light mb-8 text-[#bfa14a]">6.27</span>
          <span className="text-xl md:text-2xl tracking-[0.3em] mb-12 font-light text-[#bfa14a]">임채명 - 김서현</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-20 w-full text-center flex flex-col items-center justify-center"
        >
          <span className="text-xs md:text-sm text-white mb-1 tracking-wide">2025년 6월 27일 금요일 오후 1시</span>
          <span className="text-sm md:text-base font-medium text-white tracking-wide">DEAR HOTEL GRAND HALL</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Header; 