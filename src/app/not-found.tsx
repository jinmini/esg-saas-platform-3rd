'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-esg-black text-white">
      <div className="container flex max-w-4xl flex-col items-center justify-center px-5 text-center">
        <h1 className="mb-4 text-7xl font-bold text-esg-blue">404</h1>
        <h2 className="mb-8 text-2xl font-semibold">페이지를 찾을 수 없습니다</h2>
        <p className="mb-8 text-lg">
          방문하려는 페이지가 삭제되었거나, 이름이 변경되었거나, 일시적으로 사용할 수 없습니다.
        </p>
        <Link 
          href="/" 
          className="rounded-md bg-esg-blue px-8 py-3 text-white transition-all hover:bg-opacity-90"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
} 