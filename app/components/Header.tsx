'use client';

import { motion } from 'framer-motion';
import { GROOM_NAME, BRIDE_NAME } from '../config';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Header = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = async () => {
    if (videoRef.current) {
      try {
        setIsLoading(true);
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          }).catch(error => {
            console.log('Video play failed:', error);
            setVideoError(true);
            setIsLoading(false);
          });
        }
      } catch (error) {
        console.log('Video play failed:', error);
        setVideoError(true);
        setIsLoading(false);
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

      const handleCanPlay = () => {
        console.log('Video can play');
        if (!isPlaying) {
          handlePlayVideo();
        }
      };

      const handleWaiting = () => {
        console.log('Video is buffering');
      };

      const handlePlaying = () => {
        console.log('Video is playing');
        setIsPlaying(true);
      };

      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('waiting', handleWaiting);
      videoElement.addEventListener('playing', handlePlaying);

      // 비디오 최적화 설정
      videoElement.preload = 'metadata';
      videoElement.playsInline = true;
      videoElement.muted = true;
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('webkit-playsinline', '');
      
      // 비디오 소스 설정 - WebM 포맷 추가
      const videoSource = document.createElement('source');
      videoSource.src = '/videos/wedding-bg.mp4';
      videoSource.type = 'video/mp4';
      
      const videoSourceWebM = document.createElement('source');
      videoSourceWebM.src = '/videos/wedding-bg.webm';
      videoSourceWebM.type = 'video/webm';
      
      videoElement.appendChild(videoSource);
      videoElement.appendChild(videoSourceWebM);

      // 모바일 디바이스 체크 및 최적화
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        // 모바일에서는 더 낮은 해상도로 시작
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('webkit-playsinline', '');
        videoElement.setAttribute('x5-playsinline', '');
        videoElement.setAttribute('x5-video-player-type', 'h5');
        videoElement.setAttribute('x5-video-player-fullscreen', 'false');
        
        // 모바일에서의 캐싱 전략
        videoElement.setAttribute('crossorigin', 'anonymous');
        videoElement.setAttribute('preload', 'metadata');
      }
      
      videoElement.load();

      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('waiting', handleWaiting);
        videoElement.removeEventListener('playing', handlePlaying);
      };
    }
  }, []);

  return (
    <div 
      className="relative h-screen w-full overflow-hidden"
      onClick={handlePlayVideo}
    >
      {/* 비디오 배경 */}
      {(!isVideoLoaded || videoError || isLoading) && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src="/images/wedding-bg-poster.png"
            alt="Wedding Background"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded && !videoError && !isLoading ? 'opacity-100' : 'opacity-0'
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
            2026년 06월 27일 (토)
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h1 className="text-2xl md:text-3xl font-serif mb-4 text-white">저희 결혼합니다</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-20 w-full text-center"
        >
          <p className="text-sm md:text-base text-white mb-2">2026년 06월 27일 (토) 오후 2시 40분</p>
          <p className="text-base md:text-lg font-medium text-white">더베뉴지서울 웨딩홀</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Header; 