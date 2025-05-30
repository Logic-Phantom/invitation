import React from 'react';
import { GROOM_NAME, BRIDE_NAME, GROOM_FATHER_NAME, GROOM_MOTHER_NAME, BRIDE_FATHER_NAME, BRIDE_MOTHER_NAME } from '../config';
import { motion } from 'framer-motion';

const Invitation = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center py-8"
    >
      <h2 className="section-title mb-6">초대합니다</h2>
      <div className="space-y-6 text-gray-700 text-base md:text-lg max-w-md mx-auto leading-relaxed flex justify-center">
        <img 
          src="/images/wedding-text.png" 
          alt="청첩장 문구" 
          className="w-full max-w-[320px] h-auto object-contain" 
          style={{ aspectRatio: 'auto' }}
        />
      </div>
    </motion.section>
  );
};

export default Invitation; 