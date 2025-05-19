'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

declare global {
  interface Window {
    kakao: any;
  }
}

const Location = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.579617, 126.977041), // 경복궁 좌표
          level: 3
        };

        const map = new window.kakao.maps.Map(container, options);
        
        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(37.579617, 126.977041);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);

        // 인포윈도우 생성
        const iwContent = `
          <div style="padding:10px;width:200px;text-align:center;">
            <strong>웨딩홀</strong><br>
            경복궁 (서울특별시 종로구 사직로 161)
          </div>
        `;
        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent
        });

        // 마커 클릭 시 인포윈도우 표시
        window.kakao.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
      });
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 bg-gradient-to-b from-purple-50 via-blue-50 to-pink-50 rounded-2xl shadow-xl max-w-5xl mx-auto mb-12"
    >
      <div className="flex flex-col items-center mb-6">
        <FaMapMarkerAlt className="text-4xl text-pink-400 mb-2" />
        <h2 className="text-2xl font-bold text-center text-blue-500 tracking-widest">오시는 길</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center min-h-[400px]">
          <div id="map" className="w-full h-[350px] rounded-xl" />
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-2 text-purple-500 flex items-center gap-2"><FaMapMarkerAlt className="inline text-pink-400" /> 웨딩홀</h3>
          <p className="text-gray-600 mb-4">경복궁 (서울특별시 종로구 사직로 161)</p>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">지하철:</span> 3호선 경복궁역 5번 출구 도보 5분
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">버스:</span> 경복궁 정류장 하차
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Location; 