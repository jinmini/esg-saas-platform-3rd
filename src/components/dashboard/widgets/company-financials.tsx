// 기업 재무 현황 위젯

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';

import { TrendingUp, TrendingDown, Minus, Building2 } from 'lucide-react';
import { CompanyFinancials } from '@/shared/lib/dashboard-mock-data';

interface CompanyFinancialsProps {
  companies: CompanyFinancials[];
  isLoading?: boolean;
}

export function CompanyFinancialsWidget({ companies, isLoading = false }: CompanyFinancialsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>담당 기업 재무 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000) {
      return `${(amount / 10000).toFixed(1)}조원`;
    } else {
      return `${amount.toLocaleString()}억원`;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          담당 기업 재무 현황
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {companies.map((company) => (
            <div key={company.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-lg">{company.companyName}</h4>
                <div className="flex items-center">
                  {getTrendIcon(company.trend)}
                  <span className={`text-sm ml-1 ${getTrendColor(company.trend)}`}>
                    {company.trend === 'up' && '상승'}
                    {company.trend === 'down' && '하락'}
                    {company.trend === 'stable' && '안정'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">매출</p>
                  <p className="text-lg font-semibold text-blue-700">
                    {formatCurrency(company.revenue)}
                  </p>
                </div>

                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">영업이익</p>
                  <p className="text-lg font-semibold text-green-700">
                    {formatCurrency(company.operatingProfit)}
                  </p>
                </div>

                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">부채비율</p>
                  <p className="text-lg font-semibold text-orange-700">
                    {company.debtRatio}%
                  </p>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500 text-right">
                기준일: {company.lastUpdated}
              </div>
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            담당 기업이 없습니다.
          </div>
        )}
      </CardContent>
    </Card>
  );
} 