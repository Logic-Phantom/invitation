'use client';

import React from 'react';

const Calendar: React.FC = () => {
  const weddingDate = new Date('2026-06-27');
  const month = weddingDate.toLocaleString('ko-KR', { month: 'long' });
  const year = weddingDate.getFullYear();
  const day = weddingDate.getDate();
  const dayOfWeek = weddingDate.toLocaleString('ko-KR', { weekday: 'long' });

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mt-4">
      <div className="text-center">
        <h3 className="text-2xl font-medium text-gray-900 mb-4">{year}년 {month}</h3>
        <div className="flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-gray-900 mb-2">{day}</div>
          <div className="text-xl text-gray-600">{dayOfWeek}</div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 