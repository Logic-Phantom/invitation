'use client';

import dynamic from 'next/dynamic';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Account from './components/Account';

// 카카오맵 컴포넌트는 클라이언트 사이드에서만 렌더링되어야 합니다
const Location = dynamic(() => import('./components/Location'), {
  loading: () => <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
});

export default function Home() {
  return (
    <>
      <Header />
      <Gallery />
      <Location />
      <Account />
    </>
  );
} 