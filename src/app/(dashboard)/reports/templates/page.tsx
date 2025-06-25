import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Eye,
  Globe,
  Building2,
  Leaf,
  Users
} from "lucide-react";

const templates = [
  {
    id: 'gri',
    name: 'GRI Standards Template',
    description: '글로벌 지속가능성 보고 표준 템플릿',
    icon: Globe,
    category: '지속가능성',
    downloadCount: 1250,
    lastUpdated: '2024-03-20'
  },
  {
    id: 'sasb',
    name: 'SASB Standards Template',
    description: '산업별 지속가능성 회계 표준 템플릿',
    icon: Building2,
    category: '회계 표준',
    downloadCount: 890,
    lastUpdated: '2024-03-18'
  },
  {
    id: 'tcfd',
    name: 'TCFD Framework Template',
    description: '기후 관련 재무정보 공개 템플릿',
    icon: Leaf,
    category: '기후 변화',
    downloadCount: 650,
    lastUpdated: '2024-03-15'
  },
  {
    id: 'integrated',
    name: 'Integrated Reporting Template',
    description: '통합 보고서 작성 템플릿',
    icon: Users,
    category: '통합 보고',
    downloadCount: 420,
    lastUpdated: '2024-03-10'
  }
];

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-3xl font-bold">보고서 템플릿</h1>
        <p className="text-muted-foreground mt-1">
          검증된 ESG 보고서 템플릿을 다운로드하여 사용하세요
        </p>
      </div>

      {/* 템플릿 그리드 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => {
          const Icon = template.icon;
          
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {template.category}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{template.downloadCount}회 다운로드</span>
                    <span>업데이트: {template.lastUpdated}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      미리보기
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 사용법 안내 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            템플릿 사용법
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                1
              </div>
              <h3 className="font-medium mb-1">템플릿 다운로드</h3>
              <p className="text-xs text-muted-foreground">
                필요한 표준에 맞는 템플릿을 선택하여 다운로드하세요
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                2
              </div>
              <h3 className="font-medium mb-1">데이터 입력</h3>
              <p className="text-xs text-muted-foreground">
                조직의 ESG 데이터를 템플릿에 맞춰 입력하세요
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                3
              </div>
              <h3 className="font-medium mb-1">보고서 완성</h3>
              <p className="text-xs text-muted-foreground">
                검토 후 최종 보고서를 생성하고 배포하세요
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
