import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 환경변수 디버깅
    console.log('Environment variables check:');
    console.log('KMA_API_KEY exists:', !!process.env.KMA_API_KEY);
    console.log('KMA_API_KEY length:', process.env.KMA_API_KEY?.length || 0);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    // API 키 확인 및 디코딩
    if (!process.env.KMA_API_KEY) {
      console.warn('KMA_API_KEY 환경변수가 설정되지 않았습니다. 더미 데이터를 반환합니다.');
      
      // 더미 날씨 데이터 반환 (로컬 개발용)
      const dummyData = {
        response: {
          header: {
            resultCode: "00",
            resultMsg: "NORMAL_SERVICE"
          },
          body: {
            items: {
              item: [
                {
                  fcstDate: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
                  fcstTime: "0600",
                  category: "TMP",
                  fcstValue: "22"
                },
                {
                  fcstDate: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
                  fcstTime: "0600", 
                  category: "SKY",
                  fcstValue: "1"
                },
                {
                  fcstDate: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
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

    // URL 인코딩된 API 키 디코딩
    const decodedApiKey = decodeURIComponent(process.env.KMA_API_KEY);
    console.log('Decoded API key length:', decodedApiKey.length);
    console.log('API Key format check:');
    console.log('- Contains %: ', process.env.KMA_API_KEY.includes('%'));
    console.log('- Contains +: ', process.env.KMA_API_KEY.includes('+'));
    console.log('- Contains /: ', process.env.KMA_API_KEY.includes('/'));
    console.log('- Contains =: ', process.env.KMA_API_KEY.includes('='));
    console.log('- Starts with: ', process.env.KMA_API_KEY.substring(0, 10));

    // 서울 좌표 (경복궁)
    const nx = 60;  // 경복궁 격자 X 좌표
    const ny = 127; // 경복궁 격자 Y 좌표
    
    // 현재 날짜와 시간
    const now = new Date();
    let base_date = now.toISOString().slice(0, 10).replace(/-/g, '');
    
    // 기상청 API 시간 기준 (매시 45분 이후에 발표)
    // 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00, 23:00
    const hour = now.getHours();
    let base_time;
    if (hour < 2) {
      base_time = '2300'; // 전날 23시
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      base_date = yesterday.toISOString().slice(0, 10).replace(/-/g, '');
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

    console.log('Current time:', now.toISOString());
    console.log('Using base_date:', base_date, 'base_time:', base_time);

    // API 키를 직접 사용 (디코딩하지 않음)
    const apiUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?` +
      `serviceKey=${process.env.KMA_API_KEY}&` +
      `pageNo=1&` +
      `numOfRows=1000&` +
      `dataType=JSON&` +
      `base_date=${base_date}&` +
      `base_time=${base_time}&` +
      `nx=${nx}&` +
      `ny=${ny}`;

    console.log('API URL (first 100 chars):', apiUrl.substring(0, 100) + '...');
    console.log('Raw API Key (first 20 chars):', process.env.KMA_API_KEY.substring(0, 20) + '...');

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error('Weather API response not ok:', response.status, response.statusText);
      throw new Error(`날씨 정보를 가져오는데 실패했습니다. (${response.status})`);
    }

    // 응답이 JSON인지 확인
    const contentType = response.headers.get('content-type');
    console.log('Response content-type:', contentType);
    
    if (!contentType || !contentType.includes('application/json')) {
      // XML 응답인 경우 내용을 로그로 출력
      const responseText = await response.text();
      console.error('Weather API returned XML response:', responseText.substring(0, 500));
      
      // XML 응답에서 오류 메시지 확인
      if (responseText.includes('SERVICE_KEY_IS_NOT_REGISTERED_ERROR')) {
        console.warn('API 키가 등록되지 않았습니다. 더미 데이터를 반환합니다.');
        
        // 더미 날씨 데이터 반환
        const dummyData = {
          response: {
            header: {
              resultCode: "00",
              resultMsg: "NORMAL_SERVICE"
            },
            body: {
              items: {
                item: [
                  {
                    fcstDate: base_date,
                    fcstTime: "0600",
                    category: "TMP",
                    fcstValue: "22"
                  },
                  {
                    fcstDate: base_date,
                    fcstTime: "0600", 
                    category: "SKY",
                    fcstValue: "1"
                  },
                  {
                    fcstDate: base_date,
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
      } else if (responseText.includes('NO_DATA')) {
        throw new Error('해당 시간의 날씨 데이터가 없습니다.');
      } else {
        throw new Error('API에서 JSON 응답을 받지 못했습니다.');
      }
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