"use client";

import type { Metadata } from 'next'
import { Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import { useRef, useState, useEffect } from 'react';

const notoSerif = Noto_Serif_KR({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif'
})

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans'
})

export const metadata: Metadata = {
  title: '채명 & 서현',
  description: '소중한 분들을 초대합니다',
  icons: {
    icon: [
      { url: '/images/favicon.png' },
      { url: '/favicon.ico' }
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // BGM 관련 상태 및 참조
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isFirstTouch, setIsFirstTouch] = useState(false);

  // 자동재생 시도 및 모바일 첫 터치 대응
  useEffect(() => {
    const handleFirstTouch = () => {
      if (!isFirstTouch && audioRef.current) {
        audioRef.current.play();
        setIsFirstTouch(true);
      }
    };
    document.body.addEventListener('touchstart', handleFirstTouch, { once: true });
    return () => {
      document.body.removeEventListener('touchstart', handleFirstTouch);
    };
  }, [isFirstTouch]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <html lang="ko" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className={`${notoSans.className} antialiased`}>
        <main className="min-h-screen bg-white text-gray-900">
          {children}
        </main>
        {/* 배경음악 오디오 */}
        <audio
          ref={audioRef}
          src="/music/wedding.mp3"
          autoPlay
          loop
          style={{ display: 'none' }}
        />
        {/* BGM 컨트롤러 */}
        <div className="fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md shadow-lg rounded-full px-4 py-2 border border-gray-200">
          <button
            onClick={handlePlayPause}
            className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 shadow hover:bg-gray-100 ${isPlaying ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-400'}`}
            aria-label={isPlaying ? '배경음악 일시정지' : '배경음악 재생'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <polygon points="6,4 20,12 6,20 6,4" fill="currentColor" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-pink-400 cursor-pointer"
            aria-label="볼륨 조절"
          />
        </div>
      </body>
    </html>
  )
} 