'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShareAlt } from 'react-icons/fa';
import { WEDDING_INVITATION_URL } from '../config';

declare global {
  interface Window {
    Kakao: any;
  }
}

const Share = () => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    const initializeKakao = () => {
      const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
      if (!appKey) {
        console.error('Kakao App Key is not defined');
        return;
      }

      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          try {
            window.Kakao.init(appKey);
            console.log('Kakao SDK initialized successfully');
            setIsKakaoInitialized(true);
          } catch (error) {
            console.error('Error initializing Kakao SDK:', error);
          }
        } else {
          console.log('Kakao SDK already initialized');
          setIsKakaoInitialized(true);
        }
      }
    };

    const loadKakaoSDK = () => {
      if (document.querySelector('script[src="https://developers.kakao.com/sdk/js/kakao.js"]')) {
        console.log('Kakao SDK script already loaded');
        initializeKakao();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      
      script.onload = () => {
        console.log('Kakao SDK script loaded successfully');
        setTimeout(initializeKakao, 100);
      };

      script.onerror = (error) => {
        console.error('Error loading Kakao SDK:', error);
        alert('카카오톡 공유 기능을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
      };

      document.body.appendChild(script);
    };

    loadKakaoSDK();

    return () => {
      const script = document.querySelector('script[src="https://developers.kakao.com/sdk/js/kakao.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '결혼식에 초대합니다',
          text: '저희 결혼식에 초대합니다. 참석해 주시면 감사하겠습니다.',
          url: currentUrl,
        });
      } catch (error) {
        console.error('Share error:', error);
        alert('공유가 취소되었습니다.');
      }
    } else {
      try {
        // 임시 textarea 엘리먼트 생성
        const textarea = document.createElement('textarea');
        textarea.value = currentUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // 텍스트 선택 및 복사
        textarea.select();
        document.execCommand('copy');
        
        // 임시 엘리먼트 제거
        document.body.removeChild(textarea);
        
        alert('링크가 클립보드에 복사되었습니다.');
      } catch (error) {
        console.error('Copy error:', error);
        alert('복사에 실패했습니다. 직접 링크를 복사해주세요: ' + currentUrl);
      }
    }
  };

  const shareKakao = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK not loaded');
      alert('카카오톡 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      console.error('Kakao SDK not initialized');
      const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
      if (!appKey) {
        alert('카카오톡 공유 기능을 사용할 수 없습니다.');
        return;
      }
      try {
        window.Kakao.init(appKey);
        console.log('Kakao SDK initialized on share attempt');
      } catch (error) {
        console.error('Error initializing Kakao SDK:', error);
        alert('카카오톡 공유 기능을 초기화하는데 실패했습니다. 페이지를 새로고침해주세요.');
        return;
      }
    }

    const currentUrl = window.location.href;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || currentUrl;
    const imageUrl = `${baseUrl}/images/wedding-bg-poster.png`;

    try {
      console.log('Attempting to share via Kakao:', {
        currentUrl,
        baseUrl,
        imageUrl
      });

      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '임채명 ♥ 김서현 결혼합니다',
          description: '2026년 06월 27일 (토)\n오후 2시 40분\n더 베뉴지',
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: '청첩장 보기',
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
      console.log('Kakao share request sent successfully');
    } catch (error) {
      console.error('Kakao share error:', error);
      alert('카카오톡 공유하기에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={shareKakao}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FEE500] text-[#3C1E1E] rounded-full hover:bg-[#FDD835] transition-colors duration-300 shadow-md"
          >
            <FaShareAlt className="w-5 h-5" />
            <span>카카오톡으로 공유</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-md"
          >
            <FaShareAlt className="w-5 h-5" />
            <span>링크 공유</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Share; 