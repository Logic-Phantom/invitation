'use client';

import React, { useState } from 'react';
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
    <section className="py-8 px-4 bg-gradient-to-b from-blue-50 via-pink-50 to-purple-50 rounded-2xl shadow-xl max-w-3xl mx-auto mb-6">
      <h2 className="text-2xl font-light text-center mb-12 text-purple-500">축하의 마음을 전하세요</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <button onClick={() => { setOpen(true); setType('groom'); }} className="flex-1 py-6 bg-white rounded-xl shadow hover:bg-pink-100 transition text-lg font-semibold text-pink-500">신랑측 계좌번호 보기</button>
        <button onClick={() => { setOpen(true); setType('bride'); }} className="flex-1 py-6 bg-white rounded-xl shadow hover:bg-purple-100 transition text-lg font-semibold text-purple-500">신부측 계좌번호 보기</button>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fade-in">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-pink-400 text-2xl">×</button>
            <h3 className="text-xl font-bold mb-6 text-center text-pink-500">{type === 'groom' ? '신랑측 계좌번호' : '신부측 계좌번호'}</h3>
            <div className="space-y-4">
              {type === 'groom' ? (
                <>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{GROOM_NAME}</p>
                      <p className="text-gray-600">{GROOM_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(GROOM_ACCOUNT_NUMBER)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">복사</button>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{GROOM_FATHER_NAME}</p>
                      <p className="text-gray-600">{GROOM_FATHER_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(GROOM_FATHER_ACCOUNT_NUMBER)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">복사</button>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{GROOM_MOTHER_NAME}</p>
                      <p className="text-gray-600">{GROOM_MOTHER_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(GROOM_MOTHER_ACCOUNT_NUMBER)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">복사</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{BRIDE_NAME}</p>
                      <p className="text-gray-600">{BRIDE_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(BRIDE_ACCOUNT_NUMBER)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">복사</button>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{BRIDE_FATHER_NAME}</p>
                      <p className="text-gray-600">{BRIDE_FATHER_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(BRIDE_FATHER_ACCOUNT_NUMBER)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">복사</button>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{BRIDE_MOTHER_NAME}</p>
                      <p className="text-gray-600">{BRIDE_MOTHER_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(BRIDE_MOTHER_ACCOUNT_NUMBER)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">복사</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Account; 