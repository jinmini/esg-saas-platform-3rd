// ESG 보고서 빌더 메인 페이지
'use client';

import { useState } from 'react';
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Globe,
  Leaf,
  Users,
  Building2
} from "lucide-react";
import { useRouter } from 'next/navigation';

// ESG 프레임워크 타입 정의
interface Framework {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  estimatedTime: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  features: string[];
}

// 프레임워크 설정
const frameworks: Framework[] = [
  {
    id: 'gri',
    name: 'GRI Standards',
    description: '글로벌 지속가능성 보고 표준에 따른 종합 ESG 보고서',
    icon: <Globe className="h-8 w-8" />,
    color: 'bg-green-100 text-green-800',
    estimatedTime: '4-6주',
    complexity: 'Intermediate',
    features: [
      '중요성 평가 (Materiality Assessment)',
      '이해관계자 참여',
      '300+ 공시 지표',
      '업종별 맞춤 가이드'
    ]
  },
  {
    id: 'sasb',
    name: 'SASB Standards',
    description: '산업별 중요 지속가능성 정보 공시 표준',
    icon: <Building2 className="h-8 w-8" />,
    color: 'bg-blue-100 text-blue-800',
    estimatedTime: '2-4주',
    complexity: 'Beginner',
    features: [
      '산업별 특화 지표',
      '재무적 중요성 중심',
      '투자자 친화적',
      '효율적 데이터 수집'
    ]
  },
  {
    id: 'tcfd',
    name: 'TCFD Framework',
    description: '기후 관련 재무정보 공개 권고안',
    icon: <Leaf className="h-8 w-8" />,
    color: 'bg-purple-100 text-purple-800',
    estimatedTime: '3-5주',
    complexity: 'Advanced',
    features: [
      '기후 시나리오 분석',
      '리스크 및 기회 평가',
      '거버넌스 구조',
      '전략 및 재무 계획'
    ]
  },
  {
    id: 'integrated',
    name: '통합 보고서',
    description: 'GRI + SASB + TCFD 통합 ESG 보고서',
    icon: <Users className="h-8 w-8" />,
    color: 'bg-orange-100 text-orange-800',
    estimatedTime: '6-8주',
    complexity: 'Advanced',
    features: [
      '다중 프레임워크 통합',
      '포괄적 ESG 커버리지',
      '이해관계자별 맞춤 정보',
      '전문 검토 지원'
    ]
  }
];

const complexityColors = {
  'Beginner': 'bg-green-100 text-green-800',
  'Intermediate': 'bg-yellow-100 text-yellow-800',
  'Advanced': 'bg-red-100 text-red-800'
};

export default function ReportBuilderPage() {
  const router = useRouter();
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const handleFrameworkSelect = (frameworkId: string) => {
    setSelectedFramework(frameworkId);
  };

  const handleStartBuilder = () => {
    if (selectedFramework) {
      router.push(`/reports/builder/${selectedFramework}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">ESG 보고서 작성하기</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          단계별 가이드를 통해 전문적인 ESG 보고서를 쉽게 작성하세요. 
          기존 리스크 데이터를 자동으로 활용하여 효율적으로 보고서를 완성할 수 있습니다.
        </p>
      </div>

      {/* 진행 과정 */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            보고서 작성 프로세스
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
              <h3 className="font-semibold">프레임워크 선택</h3>
              <p className="text-sm text-muted-foreground">GRI, SASB, TCFD 중 선택</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
              <h3 className="font-semibold">데이터 통합</h3>
              <p className="text-sm text-muted-foreground">기존 ESG 데이터 자동 매핑</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
              <h3 className="font-semibold">단계별 작성</h3>
              <p className="text-sm text-muted-foreground">가이드에 따른 체계적 작성</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
              <h3 className="font-semibold">검토 및 완성</h3>
              <p className="text-sm text-muted-foreground">협업 검토 후 보고서 생성</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 프레임워크 선택 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">1단계: ESG 보고 프레임워크 선택</h2>
        <p className="text-muted-foreground mb-6">
          귀하의 조직과 목적에 가장 적합한 ESG 보고 프레임워크를 선택하세요.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {frameworks.map((framework) => (
            <Card 
              key={framework.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedFramework === framework.id 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleFrameworkSelect(framework.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${framework.color.replace('text-', 'bg-').replace('-800', '-200')}`}>
                      {framework.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{framework.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={complexityColors[framework.complexity]}>
                          {framework.complexity}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          예상 소요시간: {framework.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedFramework === framework.id && (
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <CardDescription className="text-base">
                  {framework.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">주요 기능:</h4>
                  <ul className="space-y-1">
                    {framework.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 시작 버튼 */}
      {selectedFramework && (
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {frameworks.find(f => f.id === selectedFramework)?.name} 보고서 작성 시작
                </h3>
                <p className="opacity-90">
                  선택한 프레임워크로 ESG 보고서 작성을 시작합니다. 
                  기존 데이터가 자동으로 연결되어 빠르게 시작할 수 있습니다.
                </p>
              </div>
              <Button 
                size="lg"
                variant="secondary"
                onClick={handleStartBuilder}
                className="gap-2"
              >
                보고서 작성 시작
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 기존 데이터 활용 안내 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            기존 ESG 데이터 활용
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-muted-foreground">분석된 ESG 기사</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-muted-foreground">리스크 평가 기업</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-muted-foreground">자동 매핑 가능</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            기존에 수집된 ESG 리스크 데이터가 보고서 작성 시 자동으로 활용됩니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
