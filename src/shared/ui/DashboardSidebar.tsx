// 대시보드 사이드바 컴포넌트

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/cn';
import { 
  Home, 
  FileText, 
  TestTube,
  ExternalLink
} from 'lucide-react';

const navigation = [
  { name: '대시보드', href: '/dashboard', icon: Home },
  { name: '리포트', href: '/reports', icon: FileText },
  { name: '외부 이슈 분석', href: '/external-issues', icon: ExternalLink },
  { name: '중대성 평가', href: '/materiality-assessment', icon: TestTube },
];

// 개발환경에서만 표시되는 메뉴
const developmentNavigation = [
  { name: 'API 테스트', href: '/api-test', icon: TestTube },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const isDevelopment = process.env.NODE_ENV === 'development';

  // 현재 환경에 따라 네비게이션 메뉴 구성
  const currentNavigation = isDevelopment 
    ? [...navigation, ...developmentNavigation]
    : navigation;

  return (
    <div className="flex h-full w-64 flex-col bg-gray-50">
      {/* 로고 영역 */}
      <div className="flex h-16 flex-shrink-0 items-center border-b border-gray-200 px-4">
        <h1 className="text-xl font-bold text-gray-900">ESG Platform</h1>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {currentNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                isActive
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                )}
                aria-hidden="true"
              />
              {item.name}
              {/* 개발환경 전용 메뉴 표시 */}
              {isDevelopment && item.name === 'API 테스트' && (
                <span className="ml-auto text-xs text-orange-500 font-medium">DEV</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 하단 정보 */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500">
          <p>ESG Platform v1.0</p>
          {isDevelopment && (
            <p className="mt-1 text-orange-500 font-medium">개발 환경</p>
          )}
        </div>
      </div>
    </div>
  );
}
