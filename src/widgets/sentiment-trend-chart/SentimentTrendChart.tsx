'use client';

import { useState } from 'react';
import { useSentimentTrend } from './model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { DatePickerWithRange, DateRange as CustomDateRange } from '@/shared/ui';

export function SentimentTrendChart() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const { data: trend, isLoading, error } = useSentimentTrend({
    startDate: date?.from ? format(date.from, 'yyyy-MM-dd') : '',
    endDate: date?.to ? format(date.to, 'yyyy-MM-dd') : '',
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>감성 분석 트렌드</CardTitle>
        <DatePickerWithRange 
          value={date} 
          onChange={(range: CustomDateRange) => setDate(range as any)} 
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-72 w-full" />
        ) : error ? (
          <p>오류: {error.message}</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trend}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => format(new Date(value), 'MM/dd')}
              />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="positive" stroke="#22c55e" name="긍정" />
              <Line type="monotone" dataKey="negative" stroke="#ef4444" name="부정" />
              <Line type="monotone" dataKey="neutral" stroke="#a1a1aa" name="중립" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
} 