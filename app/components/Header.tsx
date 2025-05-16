'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex flex-col items-center justify-center relative bg-[#f9f9f9] px-4"
    >
      <div className="absolute inset-0 bg-[url('/images/header-bg.jpg')] bg-cover bg-center opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center space-y-12 relative"
      >
        <div className="space-y-6">
          <p className="text-gray-600 tracking-widest">WEDDING INVITATION</p>
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 tracking-wider">
            홍길동 ❤️ 김미래
          </h1>
        </div>

        <div className="w-20 h-px bg-gray-300 mx-auto" />

        <div className="space-y-4 text-gray-600">
          <p className="font-light tracking-wide">
            2024년 12월 31일 토요일 오후 2시
          </p>
          <p className="font-light">
            보테가마지오 2층 어반홀
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center text-gray-400 space-y-2"
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