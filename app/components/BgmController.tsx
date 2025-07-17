"use client";
import { useRef, useState, useEffect } from 'react';

const SONG_TITLE = "물론 (허각) - Vocal by 서현";

export default function BgmController() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFirstInteraction, setIsFirstInteraction] = useState(false);
  const [playError, setPlayError] = useState(false);
  const [isActuallyPlaying, setIsActuallyPlaying] = useState(false);

  // 실제 오디오 재생 상태 추적
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handlePlay = () => setIsActuallyPlaying(true);
    const handlePause = () => setIsActuallyPlaying(false);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // 최초 렌더링 시 play 시도
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {
        setPlayError(true);
      });
    }
  }, []);

  // 첫 상호작용(터치/클릭) 시 play 시도
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isFirstInteraction && audioRef.current) {
        audioRef.current.play().then(() => {
          setPlayError(false);
        }).catch(() => {
          setPlayError(true);
        });
        setIsFirstInteraction(true);
      }
    };
    document.body.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.body.addEventListener('click', handleFirstInteraction, { once: true });
    return () => {
      document.body.removeEventListener('touchstart', handleFirstInteraction);
      document.body.removeEventListener('click', handleFirstInteraction);
    };
  }, [isFirstInteraction]);

  // 재생/정지 상태 변경 시 (버튼 직접 제어로 인해 필요 없음)
  // useEffect(() => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.play().then(() => {
  //         setPlayError(false);
  //       }).catch(() => {
  //         setPlayError(true);
  //       });
  //     } else {
  //       audioRef.current.pause();
  //     }
  //   }
  // }, [isPlaying]);

  // 버튼 클릭 시 오디오 직접 제어
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isActuallyPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setPlayError(false);
      }).catch(() => {
        setPlayError(true);
      });
    }
  };

  // 버튼 아이콘: 실제로 음악이 재생 중일 때만 정지(⏸️), 그 외엔 재생(▶️)
  const showPauseIcon = isActuallyPlaying;

  return (
    <>
      {/* 배경음악 오디오 */}
      <audio
        ref={audioRef}
        src="/music/wedding.mp3"
        autoPlay
        loop
        style={{ display: 'none' }}
      />
      {/* BGM 컨트롤러 */}
      <div className="fixed top-6 right-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md shadow-lg rounded-full px-4 py-2 border border-gray-200">
        <button
          onClick={handlePlayPause}
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 shadow hover:bg-gray-100 ${showPauseIcon ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-400'}`}
          aria-label={showPauseIcon ? '배경음악 일시정지' : '배경음악 재생'}
        >
          {showPauseIcon ? (
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
        <span
          className="ml-1 max-w-[160px] truncate text-xs text-gray-500 font-medium select-none"
          title={SONG_TITLE}
        >
          <span className="inline-block align-middle mr-1" aria-hidden="true">
            {/* FontAwesome 스타일의 음표 아이콘 */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-3.5 h-3.5 inline" fill="currentColor">
              <path d="M369.9 1.7c7.8 3.9 14.1 12.2 14.1 22.3V352c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64c8.4 0 16.4 1.6 23.8 4.5V150.6l-192 38.4V424c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64c8.4 0 16.4 1.6 23.8 4.5V128c0-11.2 7.8-20.9 18.7-22.8l224-44.8c6.1-1.2 12.3-.4 17.4 2.3z" />
            </svg>
          </span>
          {SONG_TITLE}
        </span>
        {playError && (
          <span className="ml-2 text-xs text-red-400">재생을 위해 버튼을 눌러주세요</span>
        )}
      </div>
    </>
  );
} 