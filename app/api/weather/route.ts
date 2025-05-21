import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 서울 좌표 (경복궁)
    const nx = 60;  // 경복궁 격자 X 좌표
    const ny = 127; // 경복궁 격자 Y 좌표
    
    // 현재 날짜와 시간
    const now = new Date();
    const base_date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const base_time = '0200'; // 02:00 기준

    const response = await fetch(
      `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?` +
      `serviceKey=${process.env.KMA_API_KEY}&` +
      `pageNo=1&` +
      `numOfRows=1000&` +
      `dataType=JSON&` +
      `base_date=${base_date}&` +
      `base_time=${base_time}&` +
      `nx=${nx}&` +
      `ny=${ny}`
    );

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