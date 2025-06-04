'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy } from 'react-icons/fa';
import { 
  GROOM_NAME, GROOM_ACCOUNT_NUMBER, GROOM_FATHER_NAME, GROOM_FATHER_ACCOUNT_NUMBER, GROOM_MOTHER_NAME, GROOM_MOTHER_ACCOUNT_NUMBER,
  BRIDE_NAME, BRIDE_ACCOUNT_NUMBER, BRIDE_FATHER_NAME, BRIDE_FATHER_ACCOUNT_NUMBER, BRIDE_MOTHER_NAME, BRIDE_MOTHER_ACCOUNT_NUMBER
} from '../config';

const Account = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'groom' | 'bride' | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('계좌번호가 복사되었습니다.');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button 
          onClick={() => { setOpen(true); setType('groom'); }} 
          className="flex-1 py-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-base font-medium text-gray-900"
        >
          신랑측 계좌번호 보기
        </button>
        <button 
          onClick={() => { setOpen(true); setType('bride'); }} 
          className="flex-1 py-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-base font-medium text-gray-900"
        >
          신부측 계좌번호 보기
        </button>
      </div>

      {open && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative"
          >
            <button 
              onClick={() => setOpen(false)} 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
            <h3 className="text-xl font-serif mb-6 text-center">
              {type === 'groom' ? '신랑측 계좌번호' : '신부측 계좌번호'}
            </h3>
            <div className="space-y-4">
              {type === 'groom' ? (
                <>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{GROOM_NAME}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-600">{GROOM_ACCOUNT_NUMBER}</p>
                      <button 
                        onClick={() => copyToClipboard(GROOM_ACCOUNT_NUMBER)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <FaCopy />
                        <span>복사하기</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{GROOM_FATHER_NAME}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-600">{GROOM_FATHER_ACCOUNT_NUMBER}</p>
                      <button 
                        onClick={() => copyToClipboard(GROOM_FATHER_ACCOUNT_NUMBER)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <FaCopy />
                        <span>복사하기</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{GROOM_MOTHER_NAME}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-600">{GROOM_MOTHER_ACCOUNT_NUMBER}</p>
                      <button 
                        onClick={() => copyToClipboard(GROOM_MOTHER_ACCOUNT_NUMBER)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <FaCopy />
                        <span>복사하기</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{BRIDE_NAME}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-600">{BRIDE_ACCOUNT_NUMBER}</p>
                      <button 
                        onClick={() => copyToClipboard(BRIDE_ACCOUNT_NUMBER)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <FaCopy />
                        <span>복사하기</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{BRIDE_FATHER_NAME}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-600">{BRIDE_FATHER_ACCOUNT_NUMBER}</p>
                      <button 
                        onClick={() => copyToClipboard(BRIDE_FATHER_ACCOUNT_NUMBER)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <FaCopy />
                        <span>복사하기</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{BRIDE_MOTHER_NAME}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-600">{BRIDE_MOTHER_ACCOUNT_NUMBER}</p>
                      <button 
                        onClick={() => copyToClipboard(BRIDE_MOTHER_ACCOUNT_NUMBER)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <FaCopy />
                        <span>복사하기</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Account; 