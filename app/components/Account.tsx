'use client';

import React from 'react';
import { 
  GROOM_NAME, GROOM_ACCOUNT_NUMBER, GROOM_FATHER_NAME, GROOM_FATHER_ACCOUNT_NUMBER, GROOM_MOTHER_NAME, GROOM_MOTHER_ACCOUNT_NUMBER,
  BRIDE_NAME, BRIDE_ACCOUNT_NUMBER, BRIDE_FATHER_NAME, BRIDE_FATHER_ACCOUNT_NUMBER, BRIDE_MOTHER_NAME, BRIDE_MOTHER_ACCOUNT_NUMBER
} from '../config';

const Account = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('계좌번호가 복사되었습니다.');
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-light text-center mb-12">축하의 마음을 전하세요</h2>
        
        <div className="space-y-8">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-medium mb-6 text-center">신랑측 계좌번호</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{GROOM_NAME}</p>
                  <p className="text-gray-600">{GROOM_ACCOUNT_NUMBER}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(GROOM_ACCOUNT_NUMBER)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{GROOM_FATHER_NAME}</p>
                  <p className="text-gray-600">{GROOM_FATHER_ACCOUNT_NUMBER}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(GROOM_FATHER_ACCOUNT_NUMBER)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{GROOM_MOTHER_NAME}</p>
                  <p className="text-gray-600">{GROOM_MOTHER_ACCOUNT_NUMBER}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(GROOM_MOTHER_ACCOUNT_NUMBER)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-medium mb-6 text-center">신부측 계좌번호</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{BRIDE_NAME}</p>
                  <p className="text-gray-600">{BRIDE_ACCOUNT_NUMBER}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(BRIDE_ACCOUNT_NUMBER)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{BRIDE_FATHER_NAME}</p>
                  <p className="text-gray-600">{BRIDE_FATHER_ACCOUNT_NUMBER}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(BRIDE_FATHER_ACCOUNT_NUMBER)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{BRIDE_MOTHER_NAME}</p>
                  <p className="text-gray-600">{BRIDE_MOTHER_ACCOUNT_NUMBER}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(BRIDE_MOTHER_ACCOUNT_NUMBER)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account; 