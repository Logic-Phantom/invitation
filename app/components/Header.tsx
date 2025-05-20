'use client';

import { motion } from 'framer-motion';
import { GROOM_NAME, BRIDE_NAME } from '../config';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Header = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Video play failed:', error);
        setVideoError(true);
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // 비디오 로드 이벤트 리스너
      const handleLoadedData = () => {
        console.log('Video loaded successfully');
        setIsVideoLoaded(true);
        handlePlayVideo();
      };

      // 비디오 에러 이벤트 리스너
      const handleError = (e: Event) => {
        console.error('Video loading error:', e);
        setVideoError(true);
      };

      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);

      // 비디오 소스 설정
      videoElement.src = '/videos/wedding-bg.mp4';
      videoElement.load();

      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, []);

  return (
    <div 
      className="relative h-screen w-full overflow-hidden"
      onClick={handlePlayVideo}
    >
      {/* 비디오 배경 */}
      {(!isVideoLoaded || videoError) && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src="/images/wedding-bg-poster.png"
            alt="Wedding Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ objectFit: 'cover' }}
      />

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