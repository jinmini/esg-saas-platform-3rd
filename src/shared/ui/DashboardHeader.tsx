// 대시보드 헤더 컴포넌트

'use client';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Avatar, AvatarFallback } from '@/shared/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/DropdownMenu';
import {
  Bell,
  Search,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Badge } from '@/shared/ui/Badge';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleNotificationClick = () => {
    router.push('/notifications');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleSettingsClick = () => {
    router.push('/settings');
  };

  const handleLogout = () => {
    // TODO: 로그아웃 처리
    console.log('Logout');
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-background">
      {/* 검색바 */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="기업명, 키워드 검색..."
            className="pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {/* 우측 액션 버튼들 */}
      <div className="flex items-center gap-2 ml-4">
        {/* 테마 토글 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* 알림 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>알림</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNotificationClick}>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">고위험 알림</p>
                <p className="text-xs text-muted-foreground">
                  삼성전자의 ESG 리스크 점수가 80%를 초과했습니다
                </p>
                <p className="text-xs text-muted-foreground">5분 전</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleNotificationClick}>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">크롤링 완료</p>
                <p className="text-xs text-muted-foreground">
                  ESG 키워드 크롤링이 완료되었습니다 (153건)
                </p>
                <p className="text-xs text-muted-foreground">1시간 전</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleNotificationClick}>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">리포트 생성</p>
                <p className="text-xs text-muted-foreground">
                  월간 ESG 리스크 리포트가 준비되었습니다
                </p>
                <p className="text-xs text-muted-foreground">3시간 전</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNotificationClick} className="text-center">
              모든 알림 보기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 도움말 */}
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* 사용자 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">사용자</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              <User className="mr-2 h-4 w-4" />
              프로필
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              설정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
