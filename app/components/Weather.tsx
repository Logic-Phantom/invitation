'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudSun, FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';

interface WeatherData {
  temperature: string;
  weather: string;
}

// 날씨 상태 코드 타입 정의
type WeatherCode = '0' | '1' | '2' | '3' | '4';

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        
        if (!response.ok) {
          throw new Error('날씨 정보를 가져오는데 실패했습니다.');
        }

        const data = await response.json();

        if (data.response?.body?.items?.item) {
          const items = data.response.body.items.item;
          
          const currentTemp = items.find((item: any) => item.category === 'TMP')?.fcstValue || '정보 없음';
          const currentWeather = items.find((item: any) => item.category === 'PTY')?.fcstValue || '0';
          
          const weatherText = {
            '0': '맑음',
            '1': '비',
            '2': '비/눈',
            '3': '눈',
            '4': '소나기'
          }[currentWeather as WeatherCode] || '날씨 정보 없음';

          setWeather({
            temperature: `${currentTemp}°C`,
            weather: weatherText
          });
        } else {
          throw new Error('날씨 정보를 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('날씨 정보 가져오기 실패:', err);
        setError(err instanceof Error ? err.message : '날씨 정보를 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherCode: string) => {
    switch (weatherCode) {
      case '0':
        return <FaSun className="text-4xl text-yellow-400" />;
      case '1':
        return <FaCloudRain className="text-4xl text-blue-400" />;
      case '2':
        return <FaCloudRain className="text-4xl text-blue-400" />;
      case '3':
        return <FaSnowflake className="text-4xl text-blue-200" />;
      case '4':
        return <FaCloudRain className="text-4xl text-blue-400" />;
      default:
        return <FaCloud className="text-4xl text-gray-400" />;
    }
  };

  // 6월 달력 데이터 생성
  const generateCalendar = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const firstDay = new Date(2026, 5, 1).getDay(); // 6월 1일의 요일
    const lastDate = new Date(2026, 6, 0).getDate(); // 6월의 마지막 날짜
    const calendar = [];
    
    // 요일 헤더
    calendar.push(
      <div key="header" className="grid grid-cols-7 gap-2 mb-4">
        {days.map((day, index) => (
          <div 
            key={day} 
            className={`text-center py-2 text-xs font-medium ${
              index === 0 
                ? 'text-rose-400' 
                : index === 6 
                ? 'text-sky-400' 
                : 'text-gray-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    );

    // 날짜 그리드
    let date = 1;
    const rows = [];
    
    for (let i = 0; i < 5; i++) {
      const cells = [];
      let hasDate = false;
      
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          cells.push(
            <div 
              key={`empty-${j}`} 
              className="h-12 border border-gray-100 rounded-lg"
            ></div>
          );
        } else if (date > lastDate) {
          cells.push(
            <div 
              key={`empty-end-${j}`} 
              className="h-12 border border-gray-100 rounded-lg"
            ></div>
          );
        } else {
          hasDate = true;
          const isWeddingDay = date === 27;
          cells.push(
            <div
              key={date}
              className={`h-12 flex items-center justify-center text-sm transition-all duration-300 border border-gray-100 rounded-lg ${
                isWeddingDay
                  ? 'relative group'
                  : j === 0
                  ? 'text-rose-400'
                  : j === 6
                  ? 'text-sky-400'
                  : 'text-gray-600'
              }`}
            >
              {date}
              {isWeddingDay && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-200/50 transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-pink-300/50">
                    <span className="relative z-10 text-white font-medium">{date}</span>
                  </div>
                </div>
              )}
            </div>
          );
          date++;
        }
      }
      
      if (hasDate) {
        rows.push(
          <div key={i} className="grid grid-cols-7 gap-2">
            {cells}
          </div>
        );
      }
    }
    calendar.push(...rows);
    
    return calendar;
  };

  return (
    <div className="space-y-4">
      {/* 날씨 정보 섹션 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        {loading ? (
          <div className="text-center text-gray-500">날씨 정보를 불러오는 중...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : weather ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getWeatherIcon(weather.weather)}
              <div>
                <p className="text-2xl font-medium text-gray-900">{weather.temperature}</p>
                <p className="text-gray-600">{weather.weather}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">2026년 06월 27일</p>
              <p className="text-sm text-gray-500">오후 1시</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* 캘린더 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="section-title mb-4">웨딩데이</h2>
        <p className="text-center text-gray-600 mb-4 text-sm">2026년 6월</p>
        <div className="calendar p-4 bg-white rounded-xl border border-gray-100">
          {generateCalendar()}
        </div>
      </motion.div>
    </div>
  );
};

export default Weather; 