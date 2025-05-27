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

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
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
            <p className="text-sm text-gray-500">2025년 6월 27일</p>
            <p className="text-sm text-gray-500">오후 1시</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Weather; 