import React from 'react';
import { WEDDING_INVITATION_URL } from '../config';
import { motion } from 'framer-motion';

const Share = () => {
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
          onClick={handleShare}
          className="w-full py-4 px-6 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-300 transition-colors text-lg font-semibold shadow"
        >
          카카오톡/링크로 공유하기
        </button>
      </div>
    </motion.section>
  );
};

export default Share; 