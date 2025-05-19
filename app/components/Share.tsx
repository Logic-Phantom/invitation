import React from 'react';
import { WEDDING_INVITATION_URL } from '../config';

const Share = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '결혼식에 초대합니다',
          text: '저희 결혼식에 초대합니다. 참석해 주시면 감사하겠습니다.',
          url: WEDDING_INVITATION_URL,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      const url = WEDDING_INVITATION_URL;
      await navigator.clipboard.writeText(url);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-light mb-8">청첩장 공유하기</h2>
        <div className="space-y-4">
          <button
            onClick={handleShare}
            className="w-full py-4 px-6 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            카카오톡으로 공유하기
          </button>
          <button
            onClick={handleShare}
            className="w-full py-4 px-6 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            링크로 공유하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default Share; 