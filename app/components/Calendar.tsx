'use client';

import React from 'react';

const Calendar: React.FC = () => {
  const year = 2026;
  const month = 6; // 6월
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const weeks: number[][] = [];
  let week: (number | null)[] = Array(firstDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week as number[]);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week as number[]);
  }

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm mt-4">
      <div className="text-center">
        <h3 className="text-2xl font-medium text-gray-900 mb-8">2026년 6월</h3>
        <div className="inline-block">
          <div className="grid grid-cols-7 gap-3 mb-2">
            {weekDays.map((d, i) => (
              <div key={d} className={`text-center py-1 text-sm font-medium ${i === 0 ? 'text-rose-400' : i === 6 ? 'text-sky-400' : 'text-gray-500'}`}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-3">
            {weeks.flat().map((date, idx) => (
              <div key={idx} className="flex items-center justify-center">
                {date ? (
                  <div className={`w-8 h-8 flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${date === 27 ? 'bg-gradient-to-br from-pink-400 to-rose-400 text-white shadow-lg rounded-[0.75rem]' : 'bg-white text-gray-700 border border-gray-100'}`}>{date}</div>
                ) : (
                  <div className="w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 