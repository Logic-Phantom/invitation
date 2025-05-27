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
      const handleLoadedData = () => {
        console.log('Video loaded successfully');
        setIsVideoLoaded(true);
        handlePlayVideo();
      };

      const handleError = (e: Event) => {
        console.error('Video loading error:', e);
        setVideoError(true);
      };

      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);

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
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      {/* 콘텐츠 */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-sm md:text-base tracking-widest mb-4 font-light text-white" style={{ letterSpacing: '0.2em' }}>
            2025년 6월 27일
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h1 className="text-2xl md:text-3xl font-serif mb-4 text-white">저희 결혼합니다</h1>
          <p className="text-sm md:text-base text-white max-w-md mx-auto">
            저희의 결혼 소식이 부담스럽지 않게 다가가길 바라며,<br />
            편한 마음으로 오셔서 축하해주시면 감사하겠습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-20 w-full text-center"
        >
          <p className="text-sm md:text-base text-white mb-2">2025년 6월 27일 금요일 오후 1시</p>
          <p className="text-base md:text-lg font-medium text-white">DEAR HOTEL GRAND HALL</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Header; 