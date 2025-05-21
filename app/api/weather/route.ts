import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 현재 날짜와 시간
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    // 기상청 단기예보 API URL
    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.WEATHER_API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${year}${month}${day}&base_time=${hour}${minute}&nx=60&ny=127`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('날씨 정보를 가져오는데 실패했습니다.');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { error: '날씨 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 