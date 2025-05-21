import React from 'react';
import { motion } from 'framer-motion';

const Intro = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-8 px-4 text-center"
    >
      <h2 className="text-2xl font-light mb-8 text-pink-500 tracking-widest">소개</h2>
      <div className="space-y-6 max-w-2xl mx-auto">
        <p className="text-gray-700 leading-relaxed font-light">
          서로 다른 두 사람이 만나 하나의 길을 걷기로 했습니다.<br />
          저희 두 사람의 새로운 시작을 함께 축하해 주시면 감사하겠습니다.
        </p>
        <div className="space-y-2">
          <p className="text-gray-600 font-light">신랑 김민수</p>
          <p className="text-gray-600 font-light">신부 이지은</p>
        </div>
      </div>
    </motion.section>
  );
};

export default Intro; 