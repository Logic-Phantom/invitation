'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

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
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
          level: 3
        };

        const map = new window.kakao.maps.Map(container, options);
        
        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);

        // 인포윈도우 생성
        const iwContent = `
          <div style="padding:10px;width:200px;text-align:center;">
            <strong>웨딩홀</strong><br>
            서울특별시 중구 태평로1가
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12"
    >
      <h2 className="text-2xl font-bold text-center mb-8">오시는 길</h2>
      <div className="space-y-4">
        <div id="map" className="w-full h-[400px] rounded-lg shadow-lg" />
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">웨딩홀</h3>
          <p className="text-gray-600">서울특별시 중구 태평로1가</p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">지하철:</span> 1호선 시청역 2번 출구
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">버스:</span> 시청앞 정류장 하차
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Location; 