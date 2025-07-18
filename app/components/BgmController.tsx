"use client";
import { useRef, useState, useEffect } from 'react';

const SONG_TITLE = "물론 (허각) - Vocal by 서현";

export default function BgmController() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // 초기값을 true로 설정
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [playError, setPlayError] = useState(false);
  const [userManuallyStopped, setUserManuallyStopped] = useState(false); // 사용자가 수동으로 정지했는지 추적

  // 실제 오디오 재생 상태 추적
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setPlayError(false);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setPlayError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // 컴포넌트 마운트 시 자동 재생 시도
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play().catch((error) => {
        console.log('초기 자동 재생 실패:', error);
        setPlayError(true);
        setIsPlaying(false);
      });
    }
  }, []);

  // 첫 사용자 상호작용 시 자동 재생 시도 (모바일용)
  useEffect(() => {
    const handleFirstInteraction = async () => {
      // 사용자가 수동으로 정지한 경우에는 재생하지 않음
      if (userManuallyStopped) return;
      
      if (!hasUserInteracted && audioRef.current && !isPlaying) {
        setHasUserInteracted(true);
        try {
          await audioRef.current.play();
        } catch (error) {
          console.log('사용자 상호작용 후 재생 실패:', error);
          setPlayError(true);
        }
      }
    };

    // 모바일과 데스크탑 모두 지원
    const events = ['touchstart', 'click', 'keydown'];
    
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [hasUserInteracted, isPlaying, userManuallyStopped]);

  // 버튼 클릭 시 오디오 직접 제어
  const handlePlayPause = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setUserManuallyStopped(true); // 사용자가 수동으로 정지함을 표시
      } else {
        await audioRef.current.play();
        setUserManuallyStopped(false); // 재생 시 수동 정지 상태 해제
      }
    } catch (error) {
      console.error('오디오 제어 오류:', error);
      setPlayError(true);
    }
  };

  return (
    <>
      {/* 배경음악 오디오 */}
      <audio
        ref={audioRef}
        src="/music/wedding.mp3"
        autoPlay
        loop
        preload="metadata"
        style={{ display: 'none' }}
      />
      {/* BGM 컨트롤러 */}
      <div className="fixed top-6 right-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md shadow-lg rounded-full px-4 py-2 border border-gray-200">
        <button
          onClick={handlePlayPause}
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 shadow hover:bg-gray-100 ${
            isPlaying ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-400'
          }`}
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
        {playError && !hasUserInteracted && (
          <span className="ml-2 text-xs text-red-400">재생을 위해 화면을 터치해주세요</span>
        )}
      </div>
    </>
  );
} 