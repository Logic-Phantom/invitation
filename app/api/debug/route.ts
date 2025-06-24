import { NextResponse } from 'next/server';

export async function GET() {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      VERCEL_REGION: process.env.VERCEL_REGION,
    },
    apiKey: {
      exists: !!process.env.KMA_API_KEY,
      length: process.env.KMA_API_KEY?.length || 0,
      firstChars: process.env.KMA_API_KEY?.substring(0, 20) || 'N/A',
      containsSpecialChars: {
        percent: process.env.KMA_API_KEY?.includes('%') || false,
        plus: process.env.KMA_API_KEY?.includes('+') || false,
        slash: process.env.KMA_API_KEY?.includes('/') || false,
        equals: process.env.KMA_API_KEY?.includes('=') || false,
      }
    },
    allEnvVars: Object.keys(process.env).filter(key => 
      key.includes('KMA') || key.includes('VERCEL') || key.includes('NODE')
    ).reduce((obj, key) => {
      obj[key] = process.env[key] ? `${process.env[key]?.substring(0, 10)}...` : 'undefined';
      return obj;
    }, {} as Record<string, string>)
  };

  return NextResponse.json(debugInfo);
} 