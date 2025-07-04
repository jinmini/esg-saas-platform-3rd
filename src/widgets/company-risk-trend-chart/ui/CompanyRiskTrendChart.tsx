'use client';

import { useCompanyRiskTrend } from '../model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { chartDateFormat, chartDateFormatter } from '@/shared/lib/chart-date-formatters';

interface CompanyRiskTrendChartProps {
  companyId: string;
  startDate: string;
  endDate: string;
}

export function CompanyRiskTrendChart({
  companyId,
  startDate,
  endDate,
}: CompanyRiskTrendChartProps) {
  const {
    data: trendData,
    isLoading,
    error,
  } = useCompanyRiskTrend(companyId, { startDate, endDate });

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  if (error) {
    return <p>오류가 발생했습니다: {error.message}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>회사 리스크 트렌드</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(date) => chartDateFormat(date, 'short')} />
            <YAxis />
            <Tooltip
              labelFormatter={(label) => chartDateFormat(label, 'long')}
              formatter={(value: number, name: string) => [
                value.toFixed(2),
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
            />
            <Legend />
            <Line type="monotone" dataKey="overall" stroke="#8884d8" name="종합" />
            <Line type="monotone" dataKey="environmental" stroke="#82ca9d" name="환경" />
            <Line type="monotone" dataKey="social" stroke="#ffc658" name="사회" />
            <Line type="monotone" dataKey="governance" stroke="#ff8042" name="지배구조" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 