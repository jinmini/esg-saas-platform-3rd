import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { LABELS } from '@/shared/constants/dashboard';
import { AnalyzedNewsItem } from '@/shared/types/api';
import { NewsListItem } from './news-list-item';

interface NewsListProps {
  analyzed_news: AnalyzedNewsItem[];
  companyToAnalyze: string;
}

export function NewsList({ analyzed_news, companyToAnalyze }: NewsListProps) {
  if (!analyzed_news) return null;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            📰 {LABELS.news}
            <span className="text-lg font-medium">{companyToAnalyze}</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {analyzed_news.slice(0, 10).map((item, index) => (
          <NewsListItem key={index} item={item} index={index} />
        ))}
      </CardContent>
    </Card>
  );
} 