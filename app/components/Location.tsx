'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaWalking, FaBus, FaCar, FaMap } from 'react-icons/fa';

declare global {
  interface Window {
    kakao: any;
  }
}

const Location = () => {
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [infowindow, setInfowindow] = useState<any>(null);
  const [selectedRouteType, setSelectedRouteType] = useState<'bus' | 'car'>('bus');
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
            center: new window.kakao.maps.LatLng(37.5601257, 126.8393084),
            level: 3
          };

          const newMap = new window.kakao.maps.Map(container, options);
          setMap(newMap);
          
          const markerPosition = new window.kakao.maps.LatLng(37.5601257, 126.8393084);
          const newMarker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          newMarker.setMap(newMap);
          setMarker(newMarker);

          const iwContent = `
            <div style="padding:10px;width:220px;text-align:center;">
              <strong>더 베뉴지</strong><br>
              서울특별시 강서구 등촌제3동 강서로 388 2층 베뉴지홀
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
        const endLat = 37.5601257;
        const endLng = 126.8393084;

        const startPos = new window.kakao.maps.LatLng(startLat, startLng);
        const endPos = new window.kakao.maps.LatLng(endLat, endLng);

        if (currentPolyline) {
          currentPolyline.setMap(null);
        }

        let url = '';

        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          url = `kakaomap://route?sp=${startLat},${startLng}&ep=${endLat},${endLng}&by=${selectedRouteType === 'bus' ? 'PUBLICTRANSIT' : 'CAR'}`;
        } else if (/Android/i.test(navigator.userAgent)) {
          url = `intent://route?sp=${startLat},${startLng}&ep=${endLat},${endLng}&by=${selectedRouteType === 'bus' ? 'PUBLICTRANSIT' : 'CAR'}#Intent;scheme=kakaomap;package=net.daum.android.map;end`;
        } else {
          alert('모바일 기기에서만 길찾기 기능을 지원합니다.');
          return;
        }

        window.location.href = url;

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
            ${selectedRouteType === 'bus' ? '대중교통' : '차량'} 경로
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

  const showTmapRoute = () => {
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
        const endLat = 37.5601257;
        const endLng = 126.8393084;

        const startPos = new window.kakao.maps.LatLng(startLat, startLng);
        const endPos = new window.kakao.maps.LatLng(endLat, endLng);

        if (currentPolyline) {
          currentPolyline.setMap(null);
        }

        let url = '';

        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          url = `tmap://route?startname=현재위치&startx=${startLng}&starty=${startLat}&goalname=더 베뉴지&goalx=${endLng}&goaly=${endLat}&pathType=${selectedRouteType === 'bus' ? '1' : '0'}`;
        } else if (/Android/i.test(navigator.userAgent)) {
          url = `intent://route?startname=현재위치&startx=${startLng}&starty=${startLat}&goalname=더 베뉴지&goalx=${endLng}&goaly=${endLat}&pathType=${selectedRouteType === 'bus' ? '1' : '0'}#Intent;scheme=tmap;package=com.skt.tmap.ku;end`;
        } else {
          alert('모바일 기기에서만 길찾기 기능을 지원합니다.');
          return;
        }

        window.location.href = url;

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
            <strong>티맵 경로 안내${isDefaultLocation ? ' (기본 위치)' : ''}</strong><br>
            ${isDefaultLocation ? '서울역에서 경복궁까지<br>' : ''}
            ${selectedRouteType === 'bus' ? '대중교통' : '차량'} 경로
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

        if (navigator.permissions && navigator.permissions.query) {
          navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
            if (permissionStatus.state === 'denied') {
              alert('위치 정보 접근이 거부되어 있습니다. 브라우저 설정에서 위치 정보 접근을 허용해주세요.');
              return;
            }
            requestLocation();
          });
        } else {
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
          <div className="flex flex-col">
            <span className="text-base font-bold text-gray-900">더베뉴지서울</span>
            <span className="text-gray-600 text-sm">서울특별시 강서구 등촌제3동 강서로 388 2층 베뉴지홀</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">주차 안내</h4>
          <p className="text-gray-600 text-sm">
            • 더 베뉴지(2층) 지하 주차장 이용 가능 (3시간 무료)<br />
            • 주차 공간이 제한적이오니 가급적 대중교통 이용을 부탁드립니다.<br />
            • 주차장 입구는 건물 정면에서 우측으로 50m 지점에 있습니다.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
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

        <div className="flex flex-col gap-2">
          <button
            onClick={showRoute}
            className="w-full py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            카카오맵 길찾기
          </button>
          <button
            onClick={showTmapRoute}
            className="w-full py-3 bg-[#00BFFF] text-white rounded-full hover:bg-[#0099CC] transition-colors"
          >
            티맵 길찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Location; 