import { NextResponse } from 'next/server';

async function fetchWeather(base_date: string, base_time: string, nx: number, ny: number, apiKey: string) {
  const apiUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?` +
    `serviceKey=${apiKey}&` +
    `pageNo=1&` +
    `numOfRows=1000&` +
    `dataType=JSON&` +
    `base_date=${base_date}&` +
    `base_time=${base_time}&` +
    `nx=${nx}&` +
    `ny=${ny}`;

  console.log('Fetching weather from:', apiUrl.replace(apiKey, 'API_KEY_HIDDEN'));

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; WeatherApp/1.0)',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response status:', response.status);
    console.log('API response resultCode:', data?.response?.header?.resultCode);
    
    return { data, response };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('fetchWeather error:', error);
    throw error;
  }
}

export async function GET() {
  try {
    // 환경변수 디버깅 (Vercel 환경 확인용)
    console.log('=== Vercel Environment Check ===');
    console.log('KMA_API_KEY exists:', !!process.env.KMA_API_KEY);
    console.log('KMA_API_KEY length:', process.env.KMA_API_KEY?.length || 0);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
    console.log('VERCEL_URL:', process.env.VERCEL_URL);
    
    // API 키 확인 - 없으면 더미 데이터 반환
    if (!process.env.KMA_API_KEY) {
      console.log('KMA_API_KEY not found, returning dummy data');
      const dummyData = {
        response: {
          header: {
            resultCode: "00",
            resultMsg: "NORMAL_SERVICE (DUMMY DATA - API KEY NOT SET)"
          },
          body: {
            items: {
              item: [
                {
                  fcstDate: "20260627",
                  fcstTime: "0600",
                  category: "TMP",
                  fcstValue: "22"
                },
                {
                  fcstDate: "20260627",
                  fcstTime: "0600", 
                  category: "SKY",
                  fcstValue: "1"
                },
                {
                  fcstDate: "20260627",
                  fcstTime: "0600",
                  category: "PTY",
                  fcstValue: "0"
                }
              ]
            }
          }
        }
      };
      return NextResponse.json(dummyData);
    }

    // 서울 좌표 (경복궁)
    const nx = 60;  // 경복궁 격자 X 좌표
    const ny = 127; // 경복궁 격자 Y 좌표
    const apiKey = process.env.KMA_API_KEY;

    // base_time 계산 (기존 로직 유지)
    const now = new Date();
    const hour = now.getHours();
    let base_time;
    if (hour < 2) {
      base_time = '2300';
    } else if (hour < 5) {
      base_time = '0200';
    } else if (hour < 8) {
      base_time = '0500';
    } else if (hour < 11) {
      base_time = '0800';
    } else if (hour < 14) {
      base_time = '1100';
    } else if (hour < 17) {
      base_time = '1400';
    } else if (hour < 20) {
      base_time = '1700';
    } else if (hour < 23) {
      base_time = '2000';
    } else {
      base_time = '2300';
    }

    // 오늘 날짜로 시도 (실제 날씨 데이터)
    const koreaTimeOffset = 9 * 60; // 9시간을 분으로
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const koreaTime = new Date(utc + (koreaTimeOffset * 60000));
    let base_date = koreaTime.toISOString().slice(0, 10).replace(/-/g, '');
    
    try {
      console.log(`Trying to fetch weather for ${base_date} at ${base_time}`);
      const { data, response } = await fetchWeather(base_date, base_time, nx, ny, apiKey);
      const resultCode = data?.response?.header?.resultCode;
      const items = data?.response?.body?.items?.item;
      
      console.log('API resultCode:', resultCode);
      console.log('Items count:', items?.length || 0);
      
      if (resultCode === '00' && items && items.length > 0) {
        console.log('Successfully fetched weather data for today');
        return NextResponse.json(data);
      } else if (resultCode !== '00') {
        console.log('API returned error:', data?.response?.header?.resultMsg);
      }
    } catch (error) {
      console.error('Error fetching weather for today:', error);
    }

    // 2026-06-27로 폴백 시도 (결혼식 날짜)
    try {
      base_date = "20260627";
      console.log(`Fallback: trying to fetch weather for ${base_date} at ${base_time}`);
      const { data, response } = await fetchWeather(base_date, base_time, nx, ny, apiKey);
      const resultCode2 = data?.response?.header?.resultCode;
      const items2 = data?.response?.body?.items?.item;
      
      if (resultCode2 === '00' && items2 && items2.length > 0) {
        console.log('Successfully fetched weather data for 2026-06-27');
        return NextResponse.json(data);
      }
    } catch (error) {
      console.error('Error fetching weather for 2026-06-27:', error);
    }

    // 둘 다 실패하면 더미 데이터 반환
    console.log('Both API calls failed, returning dummy data');
    return NextResponse.json({
      response: {
        header: { resultCode: "00", resultMsg: "DUMMY_DATA_FALLBACK" },
        body: {
          items: {
            item: [
              { fcstDate: "20260627", fcstTime: "1400", category: "TMP", fcstValue: "22" },
              { fcstDate: "20260627", fcstTime: "1400", category: "SKY", fcstValue: "1" },
              { fcstDate: "20260627", fcstTime: "1400", category: "PTY", fcstValue: "0" }
            ]
          }
        }
      }
    });
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { error: '날씨 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 