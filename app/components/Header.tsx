'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex flex-col items-center justify-center relative"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center space-y-12 relative z-10"
      >
        <div className="space-y-6">
          <p className="text-white tracking-widest text-sm">WEDDING INVITATION</p>
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-wider">
            홍길동 ❤️ 김미래
          </h1>
        </div>

        <div className="w-20 h-px bg-white/50 mx-auto" />

        <div className="space-y-4 text-white/90">
          <p className="font-light tracking-wide">
            2024년 12월 31일 토요일 오후 2시
          </p>
          <p className="font-light">
            보테가마지오 웨딩홀
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center text-white/70 space-y-2 z-10"
      >
        <p className="text-sm tracking-widest">SCROLL DOWN</p>
        <svg 
          className="w-6 h-6 animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>
    </motion.header>
  );
} 