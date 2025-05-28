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
  const [currentPolyline, setCurrentPolyline] = useState<any>(null);

  // 개발 환경에서 테스트용 좌표 (서울역)
  const getDefaultLocation = () => {
    return {
      latitude: 37.554648,
      longitude: 126.970605
    };
  };

  useEffect(() => {
    const script = document.createElement('script');
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    
    if (!apiKey) {
      console.error('Kakao Map API Key is not defined');
      return;
    }

    // 이미 스크립트가 로드되어 있는지 확인
    if (document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]')) {
      console.log('Kakao Maps script already loaded');
      return;
    }

    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    script.async = true;
    
    script.onload = () => {
      console.log('Kakao Maps script loaded successfully');
      if (!window.kakao) {
        console.error('Kakao object not found after script load');
        return;
      }

      window.kakao.maps.load(() => {
        console.log('Kakao Maps initialized successfully');
        const container = document.getElementById('map');
        if (!container) {
          console.error('Map container not found');
          return;
        }

        try {
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
          console.log('Map setup completed successfully');
        } catch (error) {
          console.error('Error setting up map:', error);
          alert('지도 설정 중 오류가 발생했습니다. 페이지를 새로고침해주세요.');
        }
      });
    };

    script.onerror = (error) => {
      console.error('Error loading Kakao Maps script:', error);
      alert('지도를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
    };

    document.head.appendChild(script);

    return () => {
      const scriptElement = document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]');
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
    };
  }, []);

  const showRoute = () => {
    if (!map || !marker) {
      console.error('Map or marker not initialized');
      alert('지도가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.startsWith('192.168.');
    const isSecure = window.location.protocol === 'https:';

    if (!isLocalhost && !isSecure) {
      alert('보안 연결(HTTPS)이 필요합니다.');
      return;
    }

    const showRouteWithPosition = (startLat: number, startLng: number, isDefaultLocation: boolean = false) => {
      try {
        const endLat = 37.579617;
        const endLng = 126.977041;

        const startPos = new window.kakao.maps.LatLng(startLat, startLng);
        const endPos = new window.kakao.maps.LatLng(endLat, endLng);

        if (currentPolyline) {
          currentPolyline.setMap(null);
        }

        const routeType = selectedRouteType === 'walk' ? 'walk' : 
                        selectedRouteType === 'bus' ? 'transit' : 'car';
        const url = `https://map.kakao.com/link/to/경복궁,${endLat},${endLng}?mode=${routeType}&from=${startLat},${startLng}`;
        window.open(url, '_blank');

        const polyline = new window.kakao.maps.Polyline({
          path: [startPos, endPos],
          strokeWeight: 5,
          strokeColor: '#333333',
          strokeOpacity: 0.7,
          strokeStyle: 'solid'
        });

        polyline.setMap(map);
        setCurrentPolyline(polyline);

        const bounds = new window.kakao.maps.LatLngBounds();
        bounds.extend(startPos);
        bounds.extend(endPos);
        map.setBounds(bounds);

        const iwContent = `
          <div style="padding:10px;width:200px;text-align:center;">
            <strong>경로 안내${isDefaultLocation ? ' (기본 위치)' : ''}</strong><br>
            ${isDefaultLocation ? '서울역에서 경복궁까지<br>' : ''}
            ${selectedRouteType === 'walk' ? '도보' : selectedRouteType === 'bus' ? '대중교통' : '차량'} 경로
          </div>
        `;
        const routeInfowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
          position: startPos
        });
        routeInfowindow.open(map);
      } catch (error) {
        console.error('Error showing route:', error);
        alert('경로 표시 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    const checkAndRequestLocation = () => {
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 30000
        };

        // 먼저 권한 상태 확인
        if (navigator.permissions && navigator.permissions.query) {
          navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
            if (permissionStatus.state === 'denied') {
              alert('위치 정보 접근이 거부되어 있습니다. 브라우저 설정에서 위치 정보 접근을 허용해주세요.');
              return;
            }
            // 권한이 허용되었거나 prompt 상태인 경우 위치 정보 요청
            requestLocation();
          });
        } else {
          // permissions API를 지원하지 않는 브라우저의 경우 바로 위치 정보 요청
          requestLocation();
        }
      } else {
        alert('이 브라우저에서는 위치 정보를 사용할 수 없습니다.');
      }
    };

    const requestLocation = () => {
      const options = {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 30000
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const startLat = position.coords.latitude;
          const startLng = position.coords.longitude;
          showRouteWithPosition(startLat, startLng);
        },
        (error) => {
          console.error('Error getting current position:', error);
          
          let errorMessage = '현재 위치를 가져오는데 실패했습니다.';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = '위치 정보 접근 권한이 거부되었습니다.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = '위치 정보를 사용할 수 없습니다.';
              break;
            case error.TIMEOUT:
              errorMessage = '위치 정보 요청 시간이 초과되었습니다.';
              break;
          }

          alert(errorMessage);
        },
        options
      );
    };

    checkAndRequestLocation();
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
        <div id="map" className="w-full h-full" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-gray-600" />
          <span className="text-gray-600">서울특별시 종로구 사직로 161</span>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedRouteType('walk')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
              selectedRouteType === 'walk'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <FaWalking />
            <span>도보</span>
          </button>
          <button
            onClick={() => setSelectedRouteType('bus')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
              selectedRouteType === 'bus'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <FaBus />
            <span>대중교통</span>
          </button>
          <button
            onClick={() => setSelectedRouteType('car')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
              selectedRouteType === 'car'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <FaCar />
            <span>차량</span>
          </button>
        </div>

        <button
          onClick={showRoute}
          className="w-full py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          길찾기
        </button>
      </div>
    </div>
  );
};

export default Location; 