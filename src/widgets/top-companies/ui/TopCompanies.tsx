import React from 'react';
import { useTopCompanies } from '../model/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Building, TrendingUp } from 'lucide-react';

export default function TopCompanies() {
  const { data: companies = [], isLoading, error } = useTopCompanies();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>주요 기업</CardTitle>
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
          <CardTitle>주요 기업</CardTitle>
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
        <CardTitle>주요 기업</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {companies?.map((company: any, index: number) => (
            <div key={company.id || index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-gray-500" />
                <div>
                  <h4 className="font-medium">{company.name}</h4>
                  <p className="text-sm text-gray-500">{company.industry}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={company.riskLevel === 'high' ? 'destructive' : 
                          company.riskLevel === 'medium' ? 'default' : 'secondary'}
                >
                  {company.riskScore?.toFixed(1) || '0.0'}
                </Badge>
                {company.trend > 0 ? (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ) : company.trend < 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />
                ) : (
                  <div className="h-4 w-4" />
                )}
              </div>
            </div>
          ))}
          
          {companies.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              표시할 기업이 없습니다.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 