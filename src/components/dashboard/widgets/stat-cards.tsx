import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { FileText, BarChart3, Clock, Zap, Send } from 'lucide-react';
import { Badge } from '@/shared/ui/Badge';
import { LABELS, SENTIMENT_LABELS, formatDateTime } from '@/shared/constants/dashboard';
import { NewsAnalysisResponse, DashboardStatusResponse } from '@/shared/types/api';
import { useExportToGoogleSheets } from '@/hooks/queries/useAnalysis';
import { Button } from '@/shared/ui/Button';

interface StatCardsProps {
  analysisResult: NewsAnalysisResponse;
  dashboardStatus: DashboardStatusResponse | undefined;
  companyToAnalyze: string;
}

export function StatCards({ analysisResult, dashboardStatus, companyToAnalyze }: StatCardsProps) {
  const { mutate: exportToSheet, isLoading: isExporting } = useExportToGoogleSheets();

  if (!analysisResult) return null;
  const { analysis_summary, search_info, analyzed_news } = analysisResult;
  const currentCompanyStatus = dashboardStatus?.analysis_results?.[companyToAnalyze];
  const totalArticles = currentCompanyStatus?.news_count || search_info.total;
  const analyzedArticles = analysis_summary.total_analyzed;
  const sentimentDist = analysis_summary.sentiment_distribution;

  const handleExport = () => {
    if (!analyzed_news || analyzed_news.length === 0) {
      // 여기에 toast 라이브러리를 사용해 사용자에게 알림을 줄 수 있습니다.
      console.warn('내보낼 데이터가 없습니다.');
      return;
    }
    exportToSheet({
      companyName: companyToAnalyze,
      analyzedNews: analyzed_news,
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* 전체 기사 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{LABELS.totalArticles}</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalArticles}</div>
          <p className="text-xs text-muted-foreground">{LABELS.collected}</p>
        </CardContent>
      </Card>
      {/* 감정 분석 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{LABELS.sentiment}</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analyzedArticles}</div>
          <div className="flex gap-1 mt-1">
            <Badge variant="outline" className="text-green-600 border-green-200">
              {SENTIMENT_LABELS['긍정']} {sentimentDist['긍정'] || 0}
            </Badge>
            <Badge variant="outline" className="text-gray-600 border-gray-200">
              {SENTIMENT_LABELS['중립']} {sentimentDist['중립'] || 0}
            </Badge>
            <Badge variant="outline" className="text-red-600 border-red-200">
              {SENTIMENT_LABELS['부정']} {sentimentDist['부정'] || 0}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{LABELS.analyzed}</p>
        </CardContent>
      </Card>
      {/* 수집 기간 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{LABELS.period}</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatDateTime(search_info.last_build_date)}</div>
          <p className="text-xs text-muted-foreground mt-1">{LABELS.periodDesc}</p>
        </CardContent>
      </Card>
      {/* 시스템 상태 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{LABELS.system}</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardStatus?.monitored_companies?.length || 0}</div>
          <div className="flex gap-1 mt-1">
            <Badge
              variant={dashboardStatus?.status === 'running' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {dashboardStatus?.status === 'running' ? '실행중' : '중지됨'}
            </Badge>
            <Badge
              variant={dashboardStatus?.redis_connected ? 'default' : 'destructive'}
              className="text-xs"
            >
              Redis {dashboardStatus?.redis_connected ? '연결됨' : '끊김'}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{LABELS.systemDesc}</p>
          <Button
            onClick={handleExport}
            disabled={isExporting || !analyzed_news || analyzed_news.length === 0}
            className="w-full mt-2"
            size="sm"
          >
            <Send className="h-4 w-4 mr-2" />
            {isExporting ? '보내는 중...' : '결과를 구글 시트로 내보내기'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 