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

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  const data = await response.json();
  return { data, response };
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
    
    // API 키 확인 및 디코딩
    if (!process.env.KMA_API_KEY) {
      // 더미 날씨 데이터 반환 (로컬 개발용)
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

    // 1. 20260627로 먼저 시도
    let base_date = "20260627";
    let { data, response } = await fetchWeather(base_date, base_time, nx, ny, apiKey);
    const resultCode = data?.response?.header?.resultCode;
    const items = data?.response?.body?.items?.item;
    if (resultCode === '00' && items && items.length > 0) {
      // 2026-06-27 데이터가 있으면 반환
      return NextResponse.json(data);
    }

    // 2. 없으면 오늘 날짜로 재시도
    const koreaTimeOffset = 9 * 60; // 9시간을 분으로
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const koreaTime = new Date(utc + (koreaTimeOffset * 60000));
    base_date = koreaTime.toISOString().slice(0, 10).replace(/-/g, '');
    ({ data, response } = await fetchWeather(base_date, base_time, nx, ny, apiKey));
    const resultCode2 = data?.response?.header?.resultCode;
    const items2 = data?.response?.body?.items?.item;
    if (resultCode2 === '00' && items2 && items2.length > 0) {
      return NextResponse.json(data);
    }

    // 둘 다 없거나 resultCode가 00이 아니면 더미 데이터 반환
    return NextResponse.json({
      response: {
        header: { resultCode: "00", resultMsg: "NO_DATA_RETURNED" },
        body: {
          items: {
            item: [
              { fcstDate: base_date, fcstTime: base_time, category: "TMP", fcstValue: "정보 없음" },
              { fcstDate: base_date, fcstTime: base_time, category: "SKY", fcstValue: "0" },
              { fcstDate: base_date, fcstTime: base_time, category: "PTY", fcstValue: "0" }
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