'use client';

import { useRealtimeAlerts } from '../model';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert';
import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { formatTimeAgo } from '@/shared/lib';

const alertIcons = {
  high_risk: <AlertCircle className="h-4 w-4 text-red-500" />,
  new_issue: <CheckCircle className="h-4 w-4 text-blue-500" />,
  trend_change: <TrendingUp className="h-4 w-4 text-yellow-500" />,
};

export function RealtimeAlerts() {
  const { data: alerts, isLoading, error } = useRealtimeAlerts();

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>실시간 알림</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts?.map((alert) => (
          <div key={alert.id} className="flex items-start gap-3">
            <div>{alertIcons[alert.type]}</div>
            <div className="flex-1">
              <p className="font-semibold">{alert.title}</p>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatTimeAgo(alert.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 