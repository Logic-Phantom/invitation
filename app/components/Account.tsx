'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AccountInfo {
  name: string;
  bank: string;
  number: string;
  relation: string;
}

const accounts: AccountInfo[] = [
  {
    name: '홍길동',
    bank: '국민은행',
    number: '123-456-789012',
    relation: '신랑'
  },
  {
    name: '김미래',
    bank: '신한은행',
    number: '987-654-321098',
    relation: '신부'
  }
];

export default function Account() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="py-32 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 tracking-wide">
            마음 전하실 곳
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            축하의 마음을 담아 보내주셔서 감사합니다
          </p>
          <div className="w-20 h-px bg-gray-300 mx-auto" />
        </div>
        
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          {accounts.map((account, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#f9f9f9] rounded-xl p-8 space-y-6"
            >
              <div className="space-y-2 text-center">
                <p className="text-sm text-gray-500">{account.relation}</p>
                <h3 className="text-xl font-medium text-gray-800">{account.name}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">{account.bank}</p>
                  <p className="text-lg font-mono text-gray-800 mt-1">{account.number}</p>
                </div>
                
                <button
                  onClick={() => copyToClipboard(account.number, index)}
                  className="w-full py-3 px-4 bg-white text-gray-600 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  {copiedIndex === index ? '복사완료' : '복사하기'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 