'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaWalking, FaBus, FaCar } from 'react-icons/fa';

declare global {
  interface Window {
    kakao: any;
  }
}

const Location = () => {
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [infowindow, setInfowindow] = useState<any>(null);
  const [selectedRouteType, setSelectedRouteType] = useState<'walk' | 'bus' | 'car'>('walk');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 개발 환경에서 테스트용 좌표 (서울역)
  const getDefaultLocation = () => {
    return {
      latitude: 37.554648,
      longitude: 126.970605
    };
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      console.log('Kakao Maps script loaded');
      window.kakao.maps.load(() => {
        console.log('Kakao Maps initialized');
        const container = document.getElementById('map');
        if (!container) {
          console.error('Map container not found');
          return;
        }

        const options = {
          center: new window.kakao.maps.LatLng(37.579617, 126.977041),
          level: 3
        };

        const newMap = new window.kakao.maps.Map(container, options);
        setMap(newMap);
        
        const markerPosition = new window.kakao.maps.LatLng(37.579617, 126.977041);
        const newMarker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        newMarker.setMap(newMap);
        setMarker(newMarker);

        const iwContent = `
          <div style="padding:10px;width:200px;text-align:center;">
            <strong>웨딩홀</strong><br>
            경복궁 (서울특별시 종로구 사직로 161)
          </div>
        `;
        const newInfowindow = new window.kakao.maps.InfoWindow({
          content: iwContent
        });
        setInfowindow(newInfowindow);

        window.kakao.maps.event.addListener(newMarker, 'click', function() {
          newInfowindow.open(newMap, newMarker);
        });

        setIsMapLoaded(true);
      });
    };

    script.onerror = (error) => {
      console.error('Error loading Kakao Maps script:', error);
    };
  }, []);

  const showRoute = () => {
    console.log('Show route button clicked');
    console.log('Map loaded:', isMapLoaded);
    console.log('Map instance:', map);
    console.log('Marker instance:', marker);

    if (!map || !marker) {
      console.error('Map or marker not initialized');
      return;
    }

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isSecure = window.location.protocol === 'https:';

    // 개발 환경에서는 위치 정보 요청 시도
    if (isLocalhost || isSecure) {
      if (navigator.geolocation) {
        console.log('Getting current position...');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Current position:', position);
            const startLat = position.coords.latitude;
            const startLng = position.coords.longitude;
            const endLat = 37.579617;
            const endLng = 126.977041;

            const startPos = new window.kakao.maps.LatLng(startLat, startLng);
            const endPos = new window.kakao.maps.LatLng(endLat, endLng);

            // 기존 경로 제거
            if (map.getOverlayMapTypeId()) {
              map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
            }

            // 경로 그리기
            const polyline = new window.kakao.maps.Polyline({
              path: [startPos, endPos],
              strokeWeight: 5,
              strokeColor: '#FF0000',
              strokeOpacity: 0.7,
              strokeStyle: 'solid'
            });

            polyline.setMap(map);

            // 경로가 모두 보이도록 지도 영역 조정
            const bounds = new window.kakao.maps.LatLngBounds();
            bounds.extend(startPos);
            bounds.extend(endPos);
            map.setBounds(bounds);

            // 경로 안내 정보 표시
            const iwContent = `
              <div style="padding:10px;width:200px;text-align:center;">
                <strong>경로 안내</strong><br>
                ${selectedRouteType === 'walk' ? '도보' : selectedRouteType === 'bus' ? '대중교통' : '차량'} 경로
              </div>
            `;
            const routeInfowindow = new window.kakao.maps.InfoWindow({
              content: iwContent,
              position: startPos
            });
            routeInfowindow.open(map);

            // 카카오맵 길찾기 페이지로 이동
            const url = `https://map.kakao.com/link/to/경복궁,${endLat},${endLng}`;
            window.open(url, '_blank');
          },
          (error) => {
            console.error('Error getting current position:', error);
            // 위치 정보 접근 실패 시 기본 위치(서울역) 사용
            const defaultLocation = getDefaultLocation();
            const startLat = defaultLocation.latitude;
            const startLng = defaultLocation.longitude;
            const endLat = 37.579617;
            const endLng = 126.977041;

            const startPos = new window.kakao.maps.LatLng(startLat, startLng);
            const endPos = new window.kakao.maps.LatLng(endLat, endLng);

            // 경로 그리기
            const polyline = new window.kakao.maps.Polyline({
              path: [startPos, endPos],
              strokeWeight: 5,
              strokeColor: '#FF0000',
              strokeOpacity: 0.7,
              strokeStyle: 'solid'
            });

            polyline.setMap(map);

            // 경로가 모두 보이도록 지도 영역 조정
            const bounds = new window.kakao.maps.LatLngBounds();
            bounds.extend(startPos);
            bounds.extend(endPos);
            map.setBounds(bounds);

            // 경로 안내 정보 표시
            const iwContent = `
              <div style="padding:10px;width:200px;text-align:center;">
                <strong>경로 안내 (기본 위치)</strong><br>
                서울역에서 경복궁까지<br>
                ${selectedRouteType === 'walk' ? '도보' : selectedRouteType === 'bus' ? '대중교통' : '차량'} 경로
              </div>
            `;
            const routeInfowindow = new window.kakao.maps.InfoWindow({
              content: iwContent,
              position: startPos
            });
            routeInfowindow.open(map);

            // 카카오맵 길찾기 페이지로 이동
            const url = `https://map.kakao.com/link/to/경복궁,${endLat},${endLng}`;
            window.open(url, '_blank');
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        console.error('Geolocation is not supported');
        alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
      }
    } else {
      // 프로덕션 환경에서 HTTPS가 아닌 경우
      alert('보안 연결(HTTPS)이 필요합니다. 프로덕션 환경에서는 HTTPS를 사용해주세요.');
    }
  };

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
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-2 flex flex-col">
          <div id="map" className="w-full h-[350px] rounded-xl mb-4" />
          <div className="flex gap-2 justify-center mb-4">
            <button
              onClick={() => setSelectedRouteType('walk')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                selectedRouteType === 'walk' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              <FaWalking /> 도보
            </button>
            <button
              onClick={() => setSelectedRouteType('bus')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                selectedRouteType === 'bus' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              <FaBus /> 대중교통
            </button>
            <button
              onClick={() => setSelectedRouteType('car')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                selectedRouteType === 'car' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              <FaCar /> 차량
            </button>
          </div>
          <button
            onClick={showRoute}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            현재 위치에서 경로 안내
          </button>
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-2 text-purple-500 flex items-center gap-2">
            <FaMapMarkerAlt className="inline text-pink-400" /> 웨딩홀
          </h3>
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