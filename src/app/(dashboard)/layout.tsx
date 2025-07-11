// 대시보드 레이아웃

import React from 'react';
import { Metadata } from 'next';
import { Sidebar } from '@/shared/ui/DashboardSidebar';
import { Header } from '@/shared/ui/DashboardHeader';

export const metadata: Metadata = {
  title: 'ESG Risk Analyzer - 대시보드',
  description: 'ESG 리스크 분석 및 모니터링을 위한 AI 기반 대시보드',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* 사이드바 */}
      <Sidebar />
      
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <Header />
        
        {/* 페이지 콘텐츠 */}
        <main className="flex-1 overflow-y-auto bg-muted/10">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
