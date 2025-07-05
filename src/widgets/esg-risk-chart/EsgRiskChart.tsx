// ESG 리스크 차트 컴포넌트

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Skeleton } from '@/shared/ui/Skeleton';
import { COLORS, renderCustomizedLabel } from './lib/chart-utils';

interface ChartData {
  name: string;
  value: number;
}

interface ESGRiskChartProps {
  data: ChartData[];
  title?: string;
  isLoading?: boolean;
  chartType?: 'pie' | 'donut';
}

export function ESGRiskChart({
  data,
  title = 'ESG 카테고리 분포',
  isLoading = false,
  chartType = 'pie',
}: ESGRiskChartProps) {

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full rounded-full" />
        </CardContent>
      </Card>
    );
  }

  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  if (total === 0) {
    return (
       <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">분석 데이터가 없습니다.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={110}
              innerRadius={chartType === 'donut' ? 60 : 0}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS['기타']} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `${value}건`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
            />
            <Legend
              iconType="circle"
              formatter={(value) => <span className="text-gray-700">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
