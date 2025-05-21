'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudSun } from 'react-icons/fa';

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
        console.log('Weather data:', data);

        if (data.response?.body?.items?.item) {
          const items = data.response.body.items.item;
          
          // 현재 시간의 날씨 정보 찾기
          const currentTemp = items.find((item: any) => item.category === 'TMP')?.fcstValue || '정보 없음';
          const currentWeather = items.find((item: any) => item.category === 'PTY')?.fcstValue || '0';
          
          // 날씨 상태 코드를 텍스트로 변환
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

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 rounded-2xl shadow-xl max-w-5xl mx-auto mb-12"
    >
      <div className="flex flex-col items-center mb-8">
        <FaCloudSun className="text-4xl text-yellow-400 mb-2" />
        <h2 className="text-2xl font-bold text-center text-blue-500 tracking-widest">결혼식 날씨</h2>
        <p className="text-gray-500 mt-2">2025년 6월 27일 예상 날씨</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {loading ? (
          <div className="text-center text-gray-500">날씨 정보를 불러오는 중...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : weather ? (
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-500 mb-4">
              {weather.temperature}
            </div>
            <div className="text-gray-600 text-xl mb-4">
              {weather.weather}
            </div>
            <div className="text-sm text-gray-500 text-center">
              * 날씨 정보는 기상청 단기 예보 기준으로 제공됩니다.<br />
              * 결혼식 날짜가 가까워질수록 더 정확한 날씨 정보를 확인하실 수 있습니다.
            </div>
          </div>
        ) : null}
      </div>
    </motion.section>
  );
};

export default Weather; 