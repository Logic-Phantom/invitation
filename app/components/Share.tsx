import React, { useEffect } from 'react';
import { WEDDING_INVITATION_URL } from '../config';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    Kakao: any;
  }
}

const Share = () => {
  useEffect(() => {
    // 카카오 SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY);
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '결혼식에 초대합니다',
          text: '저희 결혼식에 초대합니다. 참석해 주시면 감사하겠습니다.',
          url: window.location.href,
        });
      } catch (error) {
        alert('공유가 취소되었습니다.');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다.');
      } catch {
        alert('복사에 실패했습니다.');
      }
    }
  };

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      alert('카카오 SDK를 불러오는데 실패했습니다.');
      return;
    }

    try {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '결혼식에 초대합니다',
          description: '저희 결혼식에 초대합니다. 참석해 주시면 감사하겠습니다.',
          imageUrl: 'https://invitation-dusky-psi.vercel.app/images/wedding-bg-poster.png',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '청첩장 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
        callback: () => {
          console.log('카카오톡 공유 성공');
        },
        fail: (error: any) => {
          console.error('카카오톡 공유 실패', error);
          alert('카카오톡 공유에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      });
    } catch (error) {
      console.error('카카오톡 공유 중 오류 발생', error);
      alert('카카오톡 공유 중 오류가 발생했습니다.');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 bg-gradient-to-b from-pink-50 via-blue-50 to-purple-50 rounded-2xl shadow-xl max-w-md mx-auto mb-12"
    >
      <h2 className="text-2xl font-light mb-8 text-pink-500 tracking-widest text-center">청첩장 공유하기</h2>
      <div className="space-y-4 text-center">
        <button
          onClick={handleKakaoShare}
          className="w-full py-4 px-6 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-300 transition-colors text-lg font-semibold shadow"
        >
          카카오톡으로 공유하기
        </button>
        <button
          onClick={handleShare}
          className="w-full py-4 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-lg font-semibold shadow"
        >
          링크 복사하기
        </button>
      </div>
    </motion.section>
  );
};

export default Share; 