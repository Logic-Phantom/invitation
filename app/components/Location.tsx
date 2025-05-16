'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Location() {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=481616a4ac8b962173b2e85a0bf5cd99&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5662952, 126.9779451),
          level: 3,
          draggable: true,
          scrollwheel: true,
        };
        const map = new window.kakao.maps.Map(container, options);
        
        const markerPosition = new window.kakao.maps.LatLng(37.5662952, 126.9779451);
        
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        
        marker.setMap(map);
        
        const content = '<div class="customoverlay">' +
          '  <a href="https://map.kakao.com/link/map/보테가마지오,37.5662952,126.9779451" target="_blank">' +
          '    <span class="title">보테가마지오</span>' +
          '  </a>' +
          '</div>';

        new window.kakao.maps.CustomOverlay({
          map: map,
          position: markerPosition,
          content: content,
          yAnchor: 1
        });

        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <section className="py-32 bg-[#f9f9f9]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 tracking-wide">
            오시는 길
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            보테가마지오 웨딩홀
          </p>
          <div className="w-20 h-px bg-gray-300 mx-auto" />
        </div>
        
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[400px] rounded-xl overflow-hidden shadow-lg bg-white"
          >
            <div id="map" className="w-full h-full" />
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg space-y-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-medium text-gray-800">주소</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-gray-600">
                    서울특별시 중구 을지로 12<br />
                    보테가마지오 웨딩홀 2층
                  </p>
                  <p className="text-sm text-gray-500">
                    (구) 서울특별시 중구 을지로1가 192-11
                  </p>
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <button
                    onClick={() => {
                      window.open('https://map.kakao.com/link/map/보테가마지오,37.5662952,126.9779451', '_blank');
                    }}
                    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                  >
                    <span>지도 앱으로 보기</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('서울특별시 중구 을지로 12');
                    }}
                    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                  >
                    <span>주소 복사</span>
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-lg space-y-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-medium text-gray-800">지하철</h3>
              <div className="space-y-4">
                <div className="bg-[#f5f5f5] p-4 rounded-lg">
                  <ul className="text-gray-600 space-y-2">
                    <li>2호선 을지로입구역 하차</li>
                    <li>1번 출구에서 도보 1분</li>
                    <li className="text-sm text-gray-500 mt-2">
                      * 지하철이 가장 편리합니다
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-lg space-y-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-medium text-gray-800">버스</h3>
              <div className="space-y-4">
                <div className="bg-[#f5f5f5] p-4 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600 font-medium">간선버스</p>
                      <p className="text-sm text-gray-500">104, 105, 140, 421, 463, 507</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">광역버스</p>
                      <p className="text-sm text-gray-500">M4101, M4102, M4108, M5107</p>
                    </div>
                    <p className="text-sm text-gray-500">을지로입구역 하차</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 