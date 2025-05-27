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
    <section className="py-6 px-4 bg-gradient-to-b from-blue-50 via-pink-50 to-purple-50 rounded-xl shadow-lg max-w-2xl mx-auto mb-6">
      <h2 className="text-lg font-light text-center mb-6 text-purple-500">축하의 마음을 전하세요</h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button onClick={() => { setOpen(true); setType('groom'); }} className="flex-1 py-4 bg-white rounded-lg shadow hover:bg-pink-100 transition text-base font-semibold text-pink-500">신랑측 계좌번호 보기</button>
        <button onClick={() => { setOpen(true); setType('bride'); }} className="flex-1 py-4 bg-white rounded-lg shadow hover:bg-purple-100 transition text-base font-semibold text-purple-500">신부측 계좌번호 보기</button>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative animate-fade-in">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-pink-400 text-xl">×</button>
            <h3 className="text-lg font-bold mb-4 text-center text-pink-500">{type === 'groom' ? '신랑측 계좌번호' : '신부측 계좌번호'}</h3>
            <div className="space-y-3">
              {type === 'groom' ? (
                <>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{GROOM_NAME}</p>
                      <p className="text-gray-600 text-sm">{GROOM_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(GROOM_ACCOUNT_NUMBER)} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs transition-colors">복사</button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{GROOM_FATHER_NAME}</p>
                      <p className="text-gray-600 text-sm">{GROOM_FATHER_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(GROOM_FATHER_ACCOUNT_NUMBER)} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs transition-colors">복사</button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{GROOM_MOTHER_NAME}</p>
                      <p className="text-gray-600 text-sm">{GROOM_MOTHER_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(GROOM_MOTHER_ACCOUNT_NUMBER)} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs transition-colors">복사</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{BRIDE_NAME}</p>
                      <p className="text-gray-600 text-sm">{BRIDE_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(BRIDE_ACCOUNT_NUMBER)} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs transition-colors">복사</button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{BRIDE_FATHER_NAME}</p>
                      <p className="text-gray-600 text-sm">{BRIDE_FATHER_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(BRIDE_FATHER_ACCOUNT_NUMBER)} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs transition-colors">복사</button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{BRIDE_MOTHER_NAME}</p>
                      <p className="text-gray-600 text-sm">{BRIDE_MOTHER_ACCOUNT_NUMBER}</p>
                    </div>
                    <button onClick={() => copyToClipboard(BRIDE_MOTHER_ACCOUNT_NUMBER)} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs transition-colors">복사</button>
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