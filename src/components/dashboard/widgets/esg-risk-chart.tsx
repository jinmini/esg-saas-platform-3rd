// ESG 리스크 차트 컴포넌트

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatChartDate } from '@/lib/utils/date';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ChartData {
  date: string;
  environmental: number;
  social: number;
  governance: number;
  overall?: number;
}

interface ESGRiskChartProps {
  data: ChartData[];
  title?: string;
  isLoading?: boolean;
  interval?: 'daily' | 'weekly' | 'monthly';
  chartType?: 'line' | 'area';
}

export function ESGRiskChart({
  data,
  title = 'ESG 리스크 추이',
  isLoading = false,
  interval = 'daily',
  chartType = 'line',
}: ESGRiskChartProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<'all' | 'E' | 'S' | 'G'>('all');

  // 차트 데이터 포맷팅
  const formattedData = data?.map(item => ({
    ...item,
    date: formatChartDate(item.date, interval),
    environmental: Math.round(item.environmental * 100),
    social: Math.round(item.social * 100),
    governance: Math.round(item.governance * 100),
    overall: item.overall ? Math.round(item.overall * 100) : undefined,
  }));

  const ChartComponent = chartType === 'area' ? AreaChart : LineChart;

  const chartColors = {
    environmental: '#10b981', // green-500
    social: '#3b82f6',        // blue-500
    governance: '#f59e0b',    // amber-500
    overall: '#6366f1',       // indigo-500
  };

  const chartConfig = {
    environmental: {
      label: '환경(E)',
      color: chartColors.environmental,
      show: selectedMetrics === 'all' || selectedMetrics === 'E',
    },
    social: {
      label: '사회(S)',
      color: chartColors.social,
      show: selectedMetrics === 'all' || selectedMetrics === 'S',
    },
    governance: {
      label: '지배구조(G)',
      color: chartColors.governance,
      show: selectedMetrics === 'all' || selectedMetrics === 'G',
    },
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Tabs value={selectedMetrics} onValueChange={(v) => setSelectedMetrics(v as any)}>
            <TabsList>
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="E">환경</TabsTrigger>
              <TabsTrigger value="S">사회</TabsTrigger>
              <TabsTrigger value="G">지배구조</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ChartComponent data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              formatter={(value: number) => `${value}%`}
              labelStyle={{ color: '#000' }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="line"
            />
            
            {Object.entries(chartConfig).map(([key, config]) => {
              if (!config.show) return null;
              
              if (chartType === 'area') {
                return (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={config.color}
                    fill={config.color}
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name={config.label}
                    connectNulls
                  />
                );
              }
              
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={config.color}
                  strokeWidth={2}
                  name={config.label}
                  dot={false}
                  connectNulls
                />
              );
            })}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
