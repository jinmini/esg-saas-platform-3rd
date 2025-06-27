'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (companyName: string) => void;
  isLoading: boolean;
}

export function AnalysisForm({ onAnalyze, isLoading }: AnalysisFormProps) {
  const [companyName, setCompanyName] = useState('한국중부발전');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (companyName.trim()) {
      onAnalyze(companyName.trim());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ESG 뉴스 분석</CardTitle>
        <CardDescription>분석할 기업명을 입력하고 최신 ESG 리스크를 확인하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="예: 삼성전자, LG에너지솔루션"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading || !companyName.trim()}>
            {isLoading ? '분석 중...' : '분석'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
