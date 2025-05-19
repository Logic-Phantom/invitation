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
      className="py-20 px-4 text-center bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 rounded-2xl shadow-xl max-w-2xl mx-auto mb-12"
    >
      <h2 className="text-3xl font-bold mb-10 text-pink-500 tracking-widest">초대합니다</h2>
      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} viewport={{ once: true }}>
          서로 마주 보며 다져온 사랑을<br />
          이제 함께 한곳을 바라보며 걸어갈 수 있는<br />
          큰 사랑으로 키우고자 합니다.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} viewport={{ once: true }}>
          저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게<br />
          앞날을 축복해 주시면 감사하겠습니다.
        </motion.p>
        <div className="mt-16 space-y-4">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} viewport={{ once: true }} className="text-lg font-semibold text-purple-500">{GROOM_NAME} · {BRIDE_NAME}</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} viewport={{ once: true }} className="text-gray-500 text-base">
            {GROOM_FATHER_NAME} · {GROOM_MOTHER_NAME}의 장남 {GROOM_NAME}<br />
            {BRIDE_FATHER_NAME} · {BRIDE_MOTHER_NAME}의 장녀 {BRIDE_NAME}
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
};

export default Invitation; 