import { AnalyzedNewsItem } from '@/shared/types/api';
import { Badge } from '@/shared/ui/Badge';
import { Clock } from 'lucide-react';
import { SENTIMENT_LABELS, mapESGCategory } from '@/shared/constants/dashboard';

interface NewsListItemProps {
  item: AnalyzedNewsItem;
  index: number;
}

export function NewsListItem({ item, index }: NewsListItemProps) {
  return (
    <div className="border-l-2 border-gray-100 pl-4 pb-4 last:pb-0">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-500">
              {index + 1}
            </span>
            <a
              href={item.news_item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm line-clamp-2 flex-1 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {item.news_item.title.replace(/<[^>]*>/g, '')}
            </a>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {item.news_item.description.replace(/<[^>]*>/g, '')}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{new Date(item.news_item.pub_date).toLocaleDateString('ko-KR')}</span>
            <span>•</span>
            <span>{item.news_item.mention_count}회 언급</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 ml-4">
          <Badge
            variant={
              item.sentiment_analysis.sentiment === SENTIMENT_LABELS['긍정']
                ? 'default'
                : item.sentiment_analysis.sentiment === SENTIMENT_LABELS['부정']
                ? 'destructive'
                : 'secondary'
            }
            className="text-xs"
          >
            {item.sentiment_analysis.sentiment === SENTIMENT_LABELS['긍정']
              ? SENTIMENT_LABELS['긍정']
              : item.sentiment_analysis.sentiment === SENTIMENT_LABELS['부정']
              ? SENTIMENT_LABELS['부정']
              : SENTIMENT_LABELS['중립']}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {mapESGCategory(item.esg_classification.esg_category)}
          </Badge>
        </div>
      </div>
    </div>
  );
} 