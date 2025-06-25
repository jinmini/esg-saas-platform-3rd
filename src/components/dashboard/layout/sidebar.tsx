// 대시보드 사이드바 컴포넌트

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  FileText,
  Building2,
  Search,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  {
    title: '대시보드',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: '분석 결과',
    href: '/analysis',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: '기업 관리',
    href: '/companies',
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    title: '크롤링',
    href: '/crawler',
    icon: <Globe className="h-4 w-4" />,
  },
  {
    title: '리포트',
    href: '/reports',
    icon: <FileBarChart className="h-4 w-4" />,
  },
  {
    title: '설정',
    href: '/settings',
    icon: <Settings className="h-4 w-4" />,
  },
];

const quickLinks = [
  {
    title: '고위험 알림',
    href: '/alerts/high-risk',
    icon: <AlertTriangle className="h-4 w-4" />,
    badge: 3,
  },
  {
    title: '트렌드 분석',
    href: '/trends',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: '빠른 검색',
    href: '/search',
    icon: <Search className="h-4 w-4" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'relative flex flex-col h-full bg-card border-r transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* 로고 영역 */}
      <div className="flex items-center h-16 px-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-semibold text-lg">ESG Analyzer</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn('ml-auto', collapsed && 'mx-auto')}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* 메인 네비게이션 */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {!collapsed && (
            <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">
              메인 메뉴
            </p>
          )}
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    collapsed && 'justify-center px-2'
                  )}
                >
                  {item.icon}
                  {!collapsed && (
                    <>
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            );
          })}

          {/* 빠른 링크 */}
          {!collapsed && (
            <>
              <div className="my-4 border-t" />
              <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">
                빠른 링크
              </p>
              {quickLinks.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className="w-full justify-start gap-3"
                      size="sm"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </>
          )}
        </nav>
      </ScrollArea>

      {/* 하단 정보 */}
      {!collapsed && (
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground">
            <p>버전 1.0.0</p>
            <p className="mt-1">© 2025 ESG Analyzer</p>
          </div>
        </div>
      )}
    </div>
  );
}
