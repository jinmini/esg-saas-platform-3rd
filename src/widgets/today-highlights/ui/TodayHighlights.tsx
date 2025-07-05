import React from 'react';
import { useTodayHighlights } from '../model/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { TrendingUp, AlertTriangle, Building, Activity } from 'lucide-react';

export default function TodayHighlights() {
  const { data: highlights, isLoading, error } = useTodayHighlights();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>오늘의 하이라이트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">로딩 중...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>오늘의 하이라이트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>오늘의 하이라이트</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-500" />
            <span className="text-sm">총 분석: {highlights?.totalAnalyses || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-sm">고위험 알림: {highlights?.highRiskAlerts || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-green-500" />
            <span className="text-sm">신규 기업: {highlights?.newCompanies || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <span className="text-sm">평균 리스크: {highlights?.avgRiskScore?.toFixed(1) || 0}</span>
          </div>
        </div>
        
        {highlights?.trendingTopics && highlights.trendingTopics.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">트렌딩 토픽</h4>
            <div className="flex flex-wrap gap-2">
              {highlights.trendingTopics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 